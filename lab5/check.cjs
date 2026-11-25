const {chromium}=require("playwright");
const fs=require("fs");
const base="http://localhost:8080",viewer="http://127.0.0.1:8081",email="lab5@example.com";
const out="lab5/evidence",shots="lab5/screenshots";
(async()=>{
 const b=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const p=await b.newPage({viewport:{width:1600,height:1000}});
 const result={};
 try{
  await p.goto(base+"/register",{waitUntil:"domcontentloaded"});
  await p.locator('input[type="email"]').waitFor({timeout:60000});
  await p.screenshot({path:shots+"/01-registration.png"});
  await p.locator('input[type="email"]').fill(email);
  await p.locator('button[type="submit"]').click();
  let m;
  for(let i=0;i<40;i++){
   const r=await fetch("http://localhost:8025/api/v1/messages").then(r=>r.json());
   if(r.messages?.length){m=await fetch("http://localhost:8025/api/v1/message/"+r.messages[0].ID).then(r=>r.json());break;}
   await p.waitForTimeout(1000);
  }
  if(!m)throw Error("Local verification email not received");
  const body=String(m.Text||"")+" "+String(m.HTML||"");
  const links=body.replaceAll("&amp;","&").match(/https?:\/\/[^\s"'<>]+/g)||[];
  let token;
  for(const l of links){try{const u=new URL(l);const t=u.searchParams.get("token");if(t&&/^\d{6}$/.test(t)){token=t;break;}}catch{}}
  if(!token)token=String(m.Text||"").match(/\b\d{6}\b/)?.[0];
  if(!token)throw Error("Verification code not recognized");
  const otp=p.locator('input[autocomplete="one-time-code"], input[data-input-otp]').first();
  if(await otp.isVisible().catch(()=>false)){await otp.fill(token);}else{const u=new URL(base+"/api/auth/callback/nodemailer");u.searchParams.set("token",token);u.searchParams.set("email",email);u.searchParams.set("callbackUrl",base+"/typebots");await p.goto(u.toString());}
  await p.waitForTimeout(2500);
  const session=await p.request.get(base+"/api/auth/session");
  const sd=await session.json().catch(()=>({}));
  result.sessionAuthenticated=Boolean(sd.user);
  await p.waitForTimeout(3000);
  await p.goto(base+"/typebots",{waitUntil:"domcontentloaded"});await p.waitForTimeout(2500);
  if(p.url().includes("signin")||p.url().includes("register"))throw Error("Registration/login did not complete");
  result.login="authenticated local owner";
  // Handle an optional first-use workspace prompt if present.
  const ws=p.getByRole("textbox",{name:/workspace/i}).first();
  if(await ws.isVisible().catch(()=>false)){await ws.fill("Smirnov / СДП УИР 241");await p.getByRole("button",{name:/create|continue/i}).first().click();await p.waitForTimeout(1500);}
  await p.screenshot({path:shots+"/01-workspace.png"});
  async function importFile(path,screenshot){
   await p.goto(base+"/typebots/create",{waitUntil:"domcontentloaded"});
   const input=p.locator('input[type="file"]').first();await input.waitFor({state:"attached",timeout:45000});
   await input.setInputFiles(path);
   await p.waitForURL(/\/typebots\/[^/]+\/edit/,{timeout:60000});
   await p.waitForTimeout(3000);await p.screenshot({path:shots+"/"+screenshot});
   return p.url().split("/typebots/")[1].split("/")[0];
  }
  result.templateId=await importFile("lab5/exports/template-before.json","02-before.png");
  result.botId=await importFile("lab5/exports/flow-01-faq.json","03-after.png");
  const id=result.botId;
  await p.goto(base+"/typebots/"+id+"/theme",{waitUntil:"domcontentloaded"});await p.waitForTimeout(2000);await p.screenshot({path:shots+"/07-theme.png"});
  await p.goto(base+"/typebots/"+id+"/edit");await p.waitForTimeout(2000);
  const publish=p.getByRole("button",{name:/^publish$/i}).first();
  if(await publish.isVisible().catch(()=>false)){await publish.click();await p.waitForTimeout(3000);}
  await p.goto(base+"/typebots/"+id+"/share");await p.waitForTimeout(3000);
  await p.screenshot({path:shots+"/10-publish.png"});
  const links=await p.locator("input, a[href]").evaluateAll(els=>els.map(e=>e.value||e.href||""));
  let url=links.find(x=>x.startsWith(viewer+"/")&&!x.includes("/api/"));
  if(!url){const r=await p.request.get(base+"/api/v1/typebots/"+id);if(r.ok()){const data=await r.json();if(data.typebot?.publicId)url=viewer+"/"+data.typebot.publicId;}}
  if(!url)throw Error("Published viewer URL not confirmed");
  result.localViewerUrl=url;
  await p.goto(url,{waitUntil:"domcontentloaded"});
  const input=p.locator("input[type=text], textarea").first();await input.waitFor({timeout:30000});await input.fill("Арсений");await input.press("Enter");
  await p.getByText("Другой вопрос",{exact:true}).last().click({timeout:30000});
  const q=p.locator("textarea, input[type=text]").last();await q.fill("расписание");await q.press("Enter");
  await p.getByText(/Для актуального расписания/).waitFor({timeout:30000});
  await p.screenshot({path:shots+"/08-result.png"});
  result.condition="schedule branch confirmed";
 }catch(e){result.error=String(e.message).replace(/https?:\/\/[^\s]+(?:token|callback)[^\s]*/g,"[redacted]").slice(0,400);process.exitCode=1;}
 finally{fs.writeFileSync(out+"/results.json",JSON.stringify(result,null,2));await b.close();}
})().catch(()=>{console.error("Typebot verification failed");process.exitCode=1;});
