const fs = require('fs');
const bytes = fs.readFileSync('D:/opencad-studio/web/app/OpenCADStudio-7256480aa17966fc_bg.wasm');
let p = 8;
function u() { let n=0,s=0,v; do {v=bytes[p++];n+=(v&127)*2**s;s+=7;}while(v&128);return n; }
function str(){const l=u();const s=bytes.subarray(p,p+l).toString();p+=l;return s;}
function leb(n){const a=[];do{let v=n&127;n>>>=7;if(n)v|=128;a.push(v);}while(n);return Buffer.from(a);}
function sleb(n){const a=[];for(;;){let v=n&127;n>>=7;const end=(n===0&&!(v&64))||(n===-1&&(v&64));a.push(end?v:v|128);if(end)return Buffer.from(a);}}
const sections=[]; const bodies=[]; let imports=0;
while(p<bytes.length){const start=p,id=bytes[p++],length=u(),payload=p,end=p+length;sections.push({id,start,payload,end});p=end;}
p=sections.find(s=>s.id===2).payload;
for(let count=u();count--;){str();str();const kind=bytes[p++];if(kind!==0)throw Error('Unexpected import');u();imports++;}
p=sections.find(s=>s.id===10).payload;
for(let count=u(),i=0; i<count;i++){const size=u(),start=p; bodies.push({index:imports+i,start,end:p+size});p+=size;}
const data=sections.find(s=>s.id===11);p=data.payload;
const segments=[];
for(let count=u();count--;){const flags=u();let addr=null;if(flags===2)u();if(flags!==1){if(bytes[p++]!==0x41)throw Error('offset');addr=u();if(bytes[p++]!==0x0b)throw Error('end');}const size=u();segments.push({start:p,end:p+size,addr});p+=size;}
const needles=process.env.WASM_NEEDLE?[process.env.WASM_NEEDLE]:process.argv.length>2?[]:['r/OpenCADStudio'];
const hits=[];
for(const text of needles){let pos=-1;while((pos=bytes.indexOf(text,pos+1))>=0){const seg=segments.find(s=>pos>=s.start&&pos<s.end&&s.addr!==null);if(!seg)continue;const addr=seg.addr+pos-seg.start,needle=Buffer.concat([Buffer.from([0x41]),sleb(addr)]);const refs=bodies.filter(f=>bytes.subarray(f.start,f.end).includes(needle));if(refs.length){console.log(JSON.stringify({text,addr,refs:refs.map(f=>({index:f.index,size:f.end-f.start}))}));hits.push(...refs.map(f=>f.index));}}}
const chosen=process.argv.slice(2).map(Number);
if(chosen.length){
 const code=Buffer.concat([leb(bodies.length),...bodies.map(f=>{const body=chosen.includes(f.index)?bytes.subarray(f.start,f.end):Buffer.from([0,0,11]);return Buffer.concat([leb(body.length),body]);})]);
 const out=Buffer.concat([bytes.subarray(0,8),...sections.filter(s=>s.id!==0).map(s=>s.id===10?Buffer.concat([Buffer.from([10]),leb(code.length),code]):bytes.subarray(s.start,s.end))]);
 fs.writeFileSync('D:/opencad/reference/selected.wasm',out);
 require('wabt')().then(w=>{const m=w.readWasm(out,{readDebugNames:false});fs.writeFileSync('D:/opencad/reference/selected.wat',m.toText({foldExprs:false,inlineExport:false}));m.destroy();});
}
fs.writeFileSync('D:/opencad/reference/wasm-index.json',JSON.stringify({imports,bodies,sections}));
module.exports={bytes,segments,imports,bodies,sections};

