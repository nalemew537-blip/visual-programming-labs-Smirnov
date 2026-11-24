const fs=require("fs");
(async()=>{
 const token=process.env.TELEGRAM_BOT_TOKEN;
 if(!token){console.error("Repository secret TELEGRAM_BOT_TOKEN is missing");process.exitCode=1;return;}
 fs.mkdirSync("lab2/data",{recursive:true});fs.mkdirSync("lab2/evidence",{recursive:true});
 let result;
 try{
  const r=await fetch("https://api.telegram.org/bot"+token+"/getMe",{signal:AbortSignal.timeout(15000)});
  result=await r.json();
 }catch{console.error("Telegram API unreachable");process.exitCode=1;return;}
 if(!result.ok||result.result.username.toLowerCase()!=="tvl_lab2_smirnov_bot"){console.error("Token invalid or belongs to a different bot");process.exitCode=1;return;}
 fs.writeFileSync("lab2/evidence/telegram-api.txt","PASS: Telegram getMe authenticated @"+result.result.username+"\n");
 console.log("Telegram getMe authenticated expected bot");
 const a=JSON.parse(fs.readFileSync("lab2/flows/flow-10-telegram.json","utf8"));
 const f=a.find(n=>n.id==="l2-10-fn");
 f.func=f.func.replace("let reply;","msg.lab2Case=command===\"/start\"?\"start\":command===\"/info\"?\"info\":\"echo\";\nlet reply;");
 const d=a.find(n=>n.id==="l2-10-out");
 d.active=false;
 a.find(n=>n.id==="l2-10-tx").wires=[["l2-10-out","lab2-test-sent"]];
 a.push({id:"lab2-test-sent",type:"function",z:"lab2-tab-10",name:"Sanitized delivery marker",func:"if ([\"start\",\"info\",\"echo\"].includes(msg.lab2Case)) node.warn(\"LAB2_TELEGRAM_OK \"+msg.lab2Case); return null;",outputs:1,noerr:0,x:900,y:180,wires:[[]]});
 fs.writeFileSync("lab2/data/flows.json",JSON.stringify(a));
 fs.writeFileSync("lab2/data/settings.js","module.exports={uiPort:1880,flowFile:'flows.json',credentialSecret:false,logging:{console:{level:'info',metrics:false,audit:false}}};\n");
 fs.writeFileSync("lab2/data/flows_cred.json",JSON.stringify({"l2-10-bot":{token}}),{mode:0o600});
})().catch(()=>{console.error("Bot test preparation failed");process.exitCode=1;});
