const {chromium}=require("playwright");
const fs=require("fs"),cp=require("child_process"),crypto=require("crypto");
const base="http://localhost:5678",evidence="lab4/evidence",shots="lab4/screenshots";
const compose=(args,opts={})=>cp.execFileSync("docker",["compose","-f","lab4/compose.yaml",...args],{encoding:"utf8",timeout:120000,...opts});
const flows=fs.readdirSync("lab4/flows").filter(x=>x.endsWith(".json")).sort().map(x=>({file:x,w:JSON.parse(fs.readFileSync("lab4/flows/"+x))}));
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const page=await browser.newPage({viewport:{width:1600,height:1000}});
 const res=[];
 try{
  const password=crypto.randomBytes(24).toString("hex")+"A1!";
  const email="lab4-test@example.invalid";
  const owner=await page.request.post(base+"/rest/owner/setup",{data:{email,firstName:"Arseniy",lastName:"Smirnov",password}});
  res.push({ownerSetup:owner.status()});
  if(!owner.ok())throw Error("Owner setup HTTP "+owner.status());
  const auth=await page.request.post(base+"/rest/login",{data:{emailOrLdapLoginId:email,password}});
  res.push({login:auth.status()});
  // Import using the official CLI, keeping credentials in the disposable container only.
  fs.writeFileSync("lab4/data/redis-credential.json",JSON.stringify([{id:"lab4redis0000001",name:"Lab4 Redis Smirnov",type:"redis",data:{host:"redis",port:6379,database:0,password:"",ssl:false}}]));
  compose(["exec","-T","n8n","n8n","import:credentials","--input=/data/redis-credential.json"]);
  fs.unlinkSync("lab4/data/redis-credential.json");
  compose(["exec","-T","n8n","n8n","import:workflow","--separate","--input=/imports"]);
  await page.goto(base+"/home/workflows",{waitUntil:"domcontentloaded"});await page.waitForTimeout(3000);
  const version=fs.readFileSync(evidence+"/n8n-version.txt","utf8").trim();
  await page.screenshot({path:shots+"/01-version-editor.png"});
  for(const {file,w} of flows){
   const record={file,id:w.id};res.push(record);
   try{
    // Execute imported workflow with n8n CLI, which actually runs the node engine.
    const output=compose(["exec","-T","n8n","n8n","execute","--id="+w.id,"--rawOutput"]);
    fs.writeFileSync(evidence+"/"+file.replace(".json",".txt"),output);
    record.execution="CLI exited successfully";
    if(file.startsWith("flow-09")){record.redisGet=compose(["exec","-T","redis","redis-cli","GET","smirnov"]).trim();if(record.redisGet!=="Smirnov / СДП УИР 241")throw Error("Redis GET mismatch");}
    if(file.startsWith("flow-10")){record.redisExists=compose(["exec","-T","redis","redis-cli","EXISTS","smirnov"]).trim();if(record.redisExists!=="0")throw Error("Redis key still exists");}
   }catch(e){record.error=String(e.message).slice(0,2500);}
   try{
    await page.goto(base+"/workflow/"+w.id,{waitUntil:"domcontentloaded"});await page.waitForTimeout(2000);
    await page.screenshot({path:shots+"/"+file.replace("flow-","").replace(".json",".png")});
    record.editorUrl=page.url();
   }catch(e){record.screenshotError=String(e.message).slice(0,300);}
  }
  // Export roundtrip, so the actual n8n format is available separately.
  compose(["exec","-T","n8n","n8n","export:workflow","--all","--pretty","--output=/data/n8n-export.json"]);
  fs.copyFileSync("lab4/data/n8n-export.json",evidence+"/n8n-export.json");
 }finally{fs.writeFileSync(evidence+"/results.json",JSON.stringify(res,null,2));await browser.close();}
 if(res.some(x=>x.error||x.screenshotError))process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1;});
