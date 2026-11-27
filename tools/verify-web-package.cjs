const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const project=path.resolve(__dirname,'..');
const root=fs.readFileSync(path.join(project,'dist/web-package-path.txt'),'utf8').trim();
const app=path.join(root,'web/app');
const html=fs.readFileSync(path.join(app,'index.html'),'utf8');
const info=JSON.parse(fs.readFileSync(path.join(root,'package-info.json')));
const checks=[];
function verify(name,fn){fn();checks.push(name);}
verify('Empty page title',()=>assert(html.includes('<title></title>')));
verify('Web startup defaults to Light and retains saved themes',()=>{
 const script=html.match(/<script>\r?\n\/\/ Set startup preferences[^\n]*\n([\s\S]*?)<\/script>/)?.[1];
 assert(script,'Packaged startup preferences not found');
 for(const [saved,expected] of [[null,'Light'],[{name:'Oxocarbon'},'Oxocarbon']]){
  let settings=saved ? JSON.stringify({theme:saved}) : null;
  const localStorage={getItem:()=>settings,setItem:(_key,value)=>{settings=value;}};
  vm.runInNewContext(script,{localStorage});
  assert.equal(JSON.parse(settings).theme.name,expected);
 }
});
verify('Main WASM validates and matches the release hash',()=>{
 const bytes=fs.readFileSync(path.join(app,info.mainWasm));
 assert(WebAssembly.validate(bytes));
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),info.mainWasmSha256);
});
verify('File worker WASM validates',()=>assert(WebAssembly.validate(fs.readFileSync(path.join(app,'worker_pkg/ocs_web_worker_bg.wasm')))));
verify('Preload integrity matches each packaged resource',()=>{
 for(const m of html.matchAll(/<link[^>]*href="([^"]+)"[^>]*integrity="sha384-([^"]+)"[^>]*>/g)){
  const file=path.join(root,'web',m[1].replace(/^\//,''));
  assert.equal(crypto.createHash('sha384').update(fs.readFileSync(file)).digest('base64'),m[2],m[1]);
 }
});
verify('Referenced manifest and localized titles are empty',()=>{
 const manifest=html.match(/rel="manifest" href="([^"]+)"/)[1];
 const labels=html.match(/fetch\("(locale-labels[^"/]+\.json)"\)/)[1];
 const data=JSON.parse(fs.readFileSync(path.join(app,manifest)));
 assert.equal(data.name,'');assert.equal(data.short_name,'');
 for(const v of Object.values(JSON.parse(fs.readFileSync(path.join(app,labels)))))assert.equal(v.title,'');
});
function files(directory){return fs.readdirSync(directory,{withFileTypes:true}).flatMap(d=>d.isDirectory()?files(path.join(directory,d.name)):[path.join(directory,d.name)]);}
verify('No drawings, logs, backups or preview pages in the release',()=>{
 assert(!files(root).some(f=>/\.(dwg|dxf|log|pid)$/i.test(f)||/preview|before-|smoke/i.test(path.basename(f))));
 assert.equal(fs.readdirSync(app).filter(n=>n.endsWith('.wasm')).length,1);
});
(async()=>{
 const origin=process.env.VERIFY_WEB_ORIGIN || 'http://127.0.0.1:8787';
 const livePage=await fetch(origin+'/app/',{cache:'no-store'});
 assert.equal(await livePage.text(),html,'Server is serving a different web package');
 checks.push('Served app page matches the verified package');
 for(const url of ['/app/','/app/'+info.mainWasm,'/app/worker_pkg/ocs_web_worker_bg.wasm?v=5','/app/ocs-parse-worker.js','/app/sw.js']){
  const res=await fetch(origin+url,{method:'HEAD'});
  assert.equal(res.status,200,url);
  assert.equal(res.headers.get('cross-origin-opener-policy'),'same-origin');
  assert.equal(res.headers.get('cross-origin-embedder-policy'),'require-corp');
  if(url.includes('.wasm'))assert.equal(res.headers.get('content-type'),'application/wasm');
 }
 checks.push('Packaged server serves app/worker assets with correct MIME and isolation headers');
 const report={passed:true,date:info.date,checks};
 fs.writeFileSync(path.join(project,'dist/web-package-verification.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1;});
