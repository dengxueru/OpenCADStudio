const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const app = process.argv[2];
const staged = process.argv[3];
const html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
const name = html.match(/module_or_path:\s*'\/app\/([^']+)'/)[1];
const wasm = fs.readFileSync(path.join(app, name));
const hash = (algorithm, bytes, encoding = 'hex') => crypto.createHash(algorithm).update(bytes).digest(encoding);
if (hash('sha256', wasm) !== '47dd4c5e680c1ac12f4fa6f068e1926d3c6b92b70be9f5ba208a3ef365478633') throw Error('Unexpected input WASM');
function uleb(value) {
  const bytes = [];
  do {
    bytes.push((value & 127) | (value >= 128 ? 128 : 0));
    value >>>= 7;
  } while (value);
  return bytes;
}
let cursor = 8;
function readUleb() {
  let value = 0, shift = 0, byte;
  do {
    byte = wasm[cursor++];
    value += (byte & 127) * 2 ** shift;
    shift += 7;
  } while (byte & 128);
  return value;
}
while (wasm[cursor++] !== 10) {
  const size = readUleb();
  cursor += size;
}
readUleb();
const count = readUleb();
const { imports } = require('../reference/wasm-index.json');
const index = 46492 - imports;
if (index >= count) throw Error('App initializer not found');
let start, size;
for (let i = 0; i <= index; i++) {
  size = readUleb();
  start = cursor;
  cursor += size;
}
// App::new initializes the properties palette visibility byte at stack offset 87809.
const original = Buffer.from([0x20, 1, 0x41, 1, 0x36, 0, ...uleb(87809)]);
const body = wasm.subarray(start, start + size);
const offset = body.indexOf(original);
if (offset < 0 || body.indexOf(original, offset + 1) >= 0) throw Error('Initializer pattern is not unique');
body[offset + 3] = 0;
if (!WebAssembly.validate(wasm)) throw Error('Patched WASM is invalid');
const nextHash = hash('sha256', wasm);
const next = 'OpenCADStudio-local-' + nextHash.slice(0, 12) + '.wasm';
fs.cpSync(app, staged, {recursive: true, force: false, errorOnExist: true, filter: f => path.basename(f) !== name});
fs.writeFileSync(path.join(staged, next), wasm);
const previous = fs.readFileSync(path.join(app, name));
const integrity = 'sha384-' + hash('sha384', previous, 'base64');
if (!html.includes(integrity)) throw Error('Missing original integrity');
fs.writeFileSync(path.join(staged, 'index.html'), html.replaceAll(name, next).replace(integrity, 'sha384-' + hash('sha384', wasm, 'base64')));
console.log(JSON.stringify({next, nextHash}));
