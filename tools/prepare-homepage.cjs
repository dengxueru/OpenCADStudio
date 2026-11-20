const fs=require('fs');
const crypto=require('crypto');
const base='D:/opencad-studio/web/app/';
const wasm=fs.readFileSync('D:/opencad/dist/OpenCADStudio-local-homepage-v2.wasm');
const name='OpenCADStudio-local-'+crypto.createHash('sha256').update(wasm).digest('hex').slice(0,12)+'.wasm';
fs.writeFileSync('D:/opencad/dist/'+name,wasm);
fs.writeFileSync('D:/opencad/dist/asset-name.txt',name);
let html=fs.readFileSync('D:/opencad/reference/index.original.html','utf8');
html=html.replace('      <div class="title">Open <span>CAD</span> Studio</div>\n','');
html=html.replaceAll('OpenCADStudio-7256480aa17966fc_bg.wasm',name);
html=html.replace('sha384-prkeN1cNPz3QsisOkKRqQMmdl4Bk1xvtF7s0sVWNdDJ4tonYrwz/o5+P5ramrh5H','sha384-'+crypto.createHash('sha384').update(wasm).digest('base64'));
html=html.replace('<script type="module">',`<script>
// Local deployment: suppress the version-specific donation prompt only.
try {
  const key = 'opencadstudio.settings';
  const config = JSON.parse(localStorage.getItem(key) || '{}');
  config.settings = config.settings || {};
  config.settings.donation_prompt_version = '2026.46';
  localStorage.setItem(key, JSON.stringify(config));
} catch (error) { console.warn('Unable to persist donation preference:', error); }
</script>
<script type="module">`);
fs.writeFileSync('D:/opencad/dist/index.html',html);
console.log('Prepared entry page with matching WASM integrity.');
