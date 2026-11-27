// Patch the Light palette in the verified WebAssembly release.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

const [app, staged] = process.argv.slice(2);
const html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
const name = html.match(/module_or_path:\s*'\/app\/([^']+)'/)?.[1];
if (!name) throw Error('WebAssembly loader not found');
const wasm = fs.readFileSync(path.join(app, name));
const hash = (algorithm, data, format = 'hex') => createHash(algorithm).update(data).digest(format);
if (hash('sha256', wasm) !== '322f8c36586460e1571a52b42a3f59258ab8426d5c8229cfd5f0d58323e01607') {
  throw Error('Unexpected source WebAssembly release');
}
const previousIntegrity = 'sha384-' + hash('sha384', wasm, 'base64');
if (!html.includes(previousIntegrity)) throw Error('WebAssembly preload integrity not found');

function color(rgb) {
  const bytes = Buffer.alloc(16);
  rgb.forEach((component, index) => bytes.writeFloatLE(component / 255, index * 4));
  bytes.writeFloatLE(1, 12);
  return bytes;
}
const oldPrimary = color([88, 101, 242]);
// Main fill sampled from the reference support-modeling icon.
const newPrimary = color([107, 203, 242]);
// Three copies of the Light seed. Dark uses the same original primary but
// has a different background and warning color, so its copies stay untouched.
for (const offset of [74242884, 105008299, 106473726]) {
  if (!wasm.subarray(offset, offset + 16).equals(oldPrimary) ||
      !wasm.subarray(offset + 32, offset + 48).equals(color([183, 126, 51]))) {
    throw Error('Light palette signature mismatch at ' + offset);
  }
  newPrimary.copy(wasm, offset);
}

if (!WebAssembly.validate(wasm)) throw Error('Patched WebAssembly is invalid');
const next = 'OpenCADStudio-local-' + hash('sha256', wasm).slice(0, 12) + '.wasm';
fs.cpSync(app, staged, {recursive: true, force: false, errorOnExist: true, filter: file => path.basename(file) !== name});
fs.writeFileSync(path.join(staged, next), wasm);
fs.writeFileSync(path.join(staged, 'index.html'), html.replaceAll(name, next)
  .replace(previousIntegrity, 'sha384-' + hash('sha384', wasm, 'base64')));
console.log(next);
