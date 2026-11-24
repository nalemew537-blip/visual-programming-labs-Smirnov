const {chromium}=require("playwright");
const fs=require("fs");
const out="lab2/evidence";
const base="http://localhost:1880";
const flows=fs.readdirSync("lab2/flows").filter(f=>f.endsWith(".json")).sort().map(f=>({file:f,nodes:JSON.parse(fs.readFileSync("lab2/flows/"+f))}));
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:1600,height:950}});
 const results=[];
 try {
  await page.goto(base,{waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>window.RED && RED.nodes && RED.workspaces && typeof RED.workspaces.show==="function",{},{timeout:60000});
  await page.waitForTimeout(2500);
  const dismiss=async()=>{const b=page.getByText("No, do not enable notifications",{exact:true});if(await b.isVisible().catch(()=>false))await b.click();};
  await dismiss();
  const debugTab=page.locator('#red-ui-sidebar-tab-debug, #sidebar-tab-debug').first();
  if(await debugTab.count()) await debugTab.click().catch(()=>{});
  for(const {file,nodes} of flows){
   const tab=nodes.find(n=>n.type==="tab");
   try{
    await page.evaluate(id=>RED.workspaces.show(id),tab.id);
    await page.waitForTimeout(500);
    await dismiss();
    for(const n of nodes.filter(n=>n.type==="inject")) {
     const r=await page.request.post(base+"/inject/"+n.id);
     results.push({flow:file,inject:n.name,status:r.status()});
     await page.waitForTimeout(600);
    }
    await page.waitForTimeout(file.includes("mqtt")||file.includes("dashboard")?6500:1200);
    if(file.includes("context")) { const counter=nodes.find(n=>n.type==="inject"); await page.request.post(base+"/inject/"+counter.id); await page.request.post(base+"/inject/"+counter.id); await page.waitForTimeout(700); }
    await dismiss();
    await page.screenshot({path:out+"/"+file.replace("flow-","editor-").replace(".json",".png")});
   }catch(e){results.push({flow:file,error:String(e)});}
  }
  for(const [name,url,want] of [["text","/api/text",200],["info","/api/info",200],["items","/api/items?id=1",200],["invalid","/api/items?id=abc",400],["missing","/api/items?id=99",404]]){
   try{const r=await page.goto(base+url);results.push({url,status:r.status(),expected:want,body:await page.locator("body").innerText()});await page.screenshot({path:out+"/api-"+name+".png"});}catch(e){results.push({url,error:String(e)});}
  }
  try{await page.goto(base+"/ui/");await page.waitForTimeout(8000);await page.screenshot({path:out+"/dashboard.png"});}catch(e){results.push({dashboard:String(e)});}
  const logs=fs.readFileSync(out+"/startup.log","utf8");
  const docker=fs.readFileSync(out+"/docker-ps.txt","utf8");
  await page.setContent("<html><body style=\"background:white;color:#222;font:16px monospace;padding:24px\"><h2>Node-RED — Docker startup log</h2><pre id=\"log\"></pre></body></html>");
  await page.locator("#log").evaluate((el,s)=>el.textContent=s,logs+"\nDocker ps:\n"+docker);
  await page.screenshot({path:out+"/00-versions.png",fullPage:true});
 }finally{fs.writeFileSync(out+"/browser-results.json",JSON.stringify(results,null,2));await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
