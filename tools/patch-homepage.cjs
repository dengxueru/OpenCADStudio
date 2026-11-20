// Version-pinned patch for the deployed v2026.46 WebAssembly build.
// Removes owned widgets through their original Rust destructors.
const fs = require('fs');
const crypto = require('crypto');
const original = fs.readFileSync('D:/opencad-studio/web/app/OpenCADStudio-7256480aa17966fc_bg.wasm');
if (crypto.createHash('sha256').update(original).digest('hex') !== '5a31c1c467ea698cf4502bff1e3e30c6f694324a4fe0edaf06d1ffa9eaffdc0d') {
 throw Error('Unsupported original build: refusing to patch a different WASM version.');
}
const index = JSON.parse(fs.readFileSync('D:/opencad/reference/wasm-index.json'));
const dropIndex = index.imports + index.bodies.length;
const trimIndex = dropIndex + 1;
let wat = fs.readFileSync('D:/opencad/reference/selected.wat','utf8');
// Data is unchanged in the final artifact; omit it from the temporary compiler input.
wat = wat.split('\n').filter(line=>!/^  \(data /.test(line)).join('\n');
const start = wat.indexOf('  (func (;916;)');
const end = wat.indexOf('  (func (;917;)');
let home = wat.slice(start,end).split('\n').map(s=>s.trimStart()).join('\n');
home=home.replace('\nglobal.get 0\n','\n(local $patch_ptr i32)\nglobal.get 0\n');
function replaceOnce(before,after){const n=home.split(before).length-1;if(n!==1)throw Error(`Expected one match, got ${n}: ${before}`);home=home.replace(before,after);}
// WrapFlow owns a four-element vector: destroy Donate and set its length to three.
replaceOnce('local.get 23\ni32.const 4\ni32.store offset=8\nlocal.get 23\nlocal.get 30\ni32.store offset=4\nlocal.get 23\ni32.const 4\ni32.store',
`local.get 30\ni32.load offset=24\nlocal.get 30\ni32.load offset=28\ncall ${dropIndex}\nlocal.get 23\ni32.const 3\ni32.store offset=8\nlocal.get 23\nlocal.get 30\ni32.store offset=4\nlocal.get 23\ni32.const 4\ni32.store`);
// The welcome column has eleven children. Keep through the secondary actions.
replaceOnce('call 13737\n',`call 13737\nlocal.get 22\ni32.const 33380\ni32.add\ni32.const 6\ncall ${trimIndex}\n`);
// Remove the title and its following spacer from the retained welcome column.
replaceOnce(`i32.const 6\ncall ${trimIndex}\n`, `i32.const 6\ncall ${trimIndex}\nlocal.get 22\ni32.load offset=33384\nlocal.tee $patch_ptr\ni32.load offset=8\nlocal.get $patch_ptr\ni32.load offset=12\ncall ${dropIndex}\nlocal.get $patch_ptr\ni32.load offset=16\nlocal.get $patch_ptr\ni32.load offset=20\ncall ${dropIndex}\nlocal.get $patch_ptr\ni32.const 8\ni32.add\nlocal.get $patch_ptr\ni32.const 24\ni32.add\ni32.const 24\nmemory.copy\nlocal.get 22\ni32.const 4\ni32.store offset=33388\n`);
// Secondary actions: drop Desktop, then Feedback, retaining Options and Plugins.
replaceOnce('local.get 22\nlocal.get 22\ni32.load offset=19356\ni32.store offset=23984',
`local.get 22\ni32.const 19348\ni32.add\ni32.const 3\ncall ${trimIndex}\nlocal.get 22\ni32.load offset=19352\nlocal.tee $patch_ptr\ni32.load\nlocal.get $patch_ptr\ni32.load offset=4\ncall ${dropIndex}\nlocal.get $patch_ptr\nlocal.get $patch_ptr\ni32.const 8\ni32.add\ni32.const 16\nmemory.copy\nlocal.get 22\ni32.const 2\ni32.store offset=19356\nlocal.get 22\nlocal.get 22\ni32.load offset=19356\ni32.store offset=23984`);
// Remove Plugins from the compacted secondary row, leaving Options only.
replaceOnce('i32.const 2\ni32.store offset=19356\nlocal.get 22\nlocal.get 22\ni32.load offset=19356',
`i32.const 2\ni32.store offset=19356\nlocal.get 22\ni32.const 19348\ni32.add\ni32.const 1\ncall ${trimIndex}\nlocal.get 22\nlocal.get 22\ni32.load offset=19356`);
// Keep the existing responsive RecentAndWelcome / Compact branches.
replaceOnce('f32.const 0x1p+6 (;=64;)\nf32.add\nf32.ge\nlocal.tee 40', 'f32.const 0x1p+6 (;=64;)\nf32.add\nf32.ge\ndrop\ni32.const 0\nlocal.tee 40');
for(const width of ['0x1.8p+5 (;=48;)','0x1p+5 (;=32;)']) {
 replaceOnce(`f32.const ${width}\nf32.add\nf32.ge\nif`, `f32.const ${width}\nf32.add\nf32.ge\ndrop\ni32.const 0\nif`);
}
// Compact navigation: retain Recent and Welcome, dropping the other tabs.
replaceOnce('call 30161\n',`call 30161\nlocal.get 22\ni32.load offset=116772\nlocal.tee 2\ni32.load offset=8\nlocal.get 2\ni32.load offset=12\ncall ${dropIndex}\nlocal.get 2\nlocal.get 2\ni64.load offset=16 align=4\ni64.store offset=8 align=4\nlocal.get 2\ni64.const 0\ni64.store offset=16 align=4\nlocal.get 22\ni32.const 116768\ni32.add\ni32.const 2\ncall ${trimIndex}\n`);
// A previous compact selection may point to one of the removed sections.
replaceOnce('global.get 0\ni32.const 117696', 'local.get 19\ni32.const 2\ni32.ne\nif\ni32.const 0\nlocal.set 19\nend\nglobal.get 0\ni32.const 117696');
wat=wat.slice(0,start)+home+wat.slice(end);
// Keep the PosReport return representation expected by optimized callers, but
// replace its clickable logo child with a zero-size, non-interactive Space.
const logoStart=wat.indexOf('  (func (;20386;)');
const logoEnd=wat.indexOf('  (func (;20387;)');
if(logoStart<0 || logoEnd<0)throw Error('Missing logo function');
const logo=`  (func (;20386;) (type 2) (param i32 i32 i32) (local $space i32) (local $report i32)
 i32.const 32 i32.const 4 call 49826 local.tee $space
 i32.eqz if i32.const 4 i32.const 32 call 50318 unreachable end
 local.get $space i32.const 0 i32.const 32 memory.fill
 local.get $space i64.const 7 i64.store align=4
 local.get $space i64.const 7 i64.store offset=16 align=4
 i32.const 20 i32.const 4 call 49826 local.tee $report
 i32.eqz if i32.const 4 i32.const 20 call 50318 unreachable end
 local.get $report i32.const -1 i32.store
 local.get $report i32.const 9002960 i32.store offset=4
 local.get $report i32.const 8 i32.store offset=8
 local.get $report local.get $space i32.store offset=12
 local.get $report i32.const 9409132 i32.store offset=16
 local.get 0 local.get $report i32.store
 local.get 0 i32.const 9396744 i32.store offset=4)
`;
wat=wat.slice(0,logoStart)+logo+wat.slice(logoEnd);
const helpers=`
 (func (type 0) (param $ptr i32) (param $vt i32) (local $fn i32) (local $size i32)
   local.get $vt i32.eqz if return end
   local.get $vt i32.load local.tee $fn
   if local.get $ptr local.get $fn call_indirect (type 1) end
   local.get $vt i32.load offset=4 local.tee $size
   if local.get $ptr local.get $size call 42646 end)
 (func (type 0) (param $vec i32) (param $keep i32) (local $i i32) (local $ptr i32) (local $len i32)
   local.get $vec i32.load offset=4 local.set $ptr
   local.get $vec i32.load offset=8 local.set $len
   local.get $keep local.set $i
   block loop
     local.get $i local.get $len i32.ge_u br_if 1
     local.get $ptr local.get $i i32.const 3 i32.shl i32.add i32.load
     local.get $ptr local.get $i i32.const 3 i32.shl i32.add i32.load offset=4
     call ${dropIndex}
     local.get $i i32.const 1 i32.add local.set $i
     br 0
   end end
   local.get $vec local.get $keep i32.store offset=8)
`;
wat=wat.trimEnd()+helpers+'\n)';
fs.writeFileSync('D:/opencad/reference/homepage-patched.wat',home);
function leb(n){const a=[];do{let v=n&127;n>>>=7;if(n)v|=128;a.push(v);}while(n);return Buffer.from(a);}
function bodiesFrom(b){let p=8;function u(){let n=0,s=0,v;do{v=b[p++];n+=(v&127)*2**s;s+=7;}while(v&128);return n;}while(p<b.length){const id=b[p++],l=u(),end=p+l;if(id===10){const out=[];for(let c=u();c--;){const size=u();out.push(b.subarray(p,p+size));p+=size;}return out;}p=end;}throw Error('no code');}
require('wabt')().then(w=>{
 const m=w.parseWat('patched.wat',wat,{bulk_memory:true,reference_types:true,multi_value:true});
 m.validate();const compiled=Buffer.from(m.toBinary({}).buffer);m.destroy();
 const patchedBodies=bodiesFrom(compiled);
 const changedFunctions=[916,20386];
 const outputBodies=index.bodies.map(f=>changedFunctions.includes(f.index)?patchedBodies[f.index-index.imports]:original.subarray(f.start,f.end));
 outputBodies.push(...patchedBodies.slice(-2));
 const code=Buffer.concat([leb(outputBodies.length),...outputBodies.flatMap(b=>[leb(b.length),b])]);
 const fsec=index.sections.find(s=>s.id===3);
 let oldCountLength=0;while(original[fsec.payload+oldCountLength++]&128){}
 const funcs=Buffer.concat([leb(outputBodies.length),original.subarray(fsec.payload+oldCountLength,fsec.end),Buffer.from([0,0])]);
 const result=Buffer.concat([original.subarray(0,8),...index.sections.map(s=>{
   const payload=s.id===3?funcs:s.id===10?code:null;
   return payload?Buffer.concat([Buffer.from([s.id]),leb(payload.length),payload]):original.subarray(s.start,s.end);
 })]);
 // Fluent ignores trailing whitespace, so preserve data offsets while changing
 // both Simplified Chinese ready-message entries to the requested wording.
 const readyBefore=Buffer.from('Open CAD Studio 已就绪。');
 const readyAfter=Buffer.from('已就绪。');
 let readyCount=0,readyPos=-1;
 while((readyPos=result.indexOf(readyBefore,readyPos+1))>=0){
   result.fill(32,readyPos,readyPos+readyBefore.length);
   readyAfter.copy(result,readyPos);readyCount++;
 }
 if(readyCount!==2)throw Error('Unexpected ready-message match count: '+readyCount);
 if(!WebAssembly.validate(result))throw Error('Final WASM validation failed');
 fs.mkdirSync('D:/opencad/dist',{recursive:true});
 fs.writeFileSync('D:/opencad/dist/OpenCADStudio-local-homepage-v2.wasm',result);
 fs.writeFileSync('D:/opencad/dist/patch-manifest.json',JSON.stringify({version:'2026.46',revision:2,originalSha256:crypto.createHash('sha256').update(original).digest('hex'),patchedSha256:crypto.createHash('sha256').update(result).digest('hex'),functions:[916,20386],helpers:[dropIndex,trimIndex],valid:true},null,2));
 console.log('Validated patched WASM:',result.length,'bytes');
}).catch(e=>{console.error(e.message);process.exitCode=1;});
