const fs=require('fs');
const crypto=require('crypto');
const { applyStartupPreferences, applyLoadingStyle } = require('./web-startup-preferences.cjs');
const base='D:/opencad-studio/web/app/';
const wasm=fs.readFileSync('D:/opencad/dist/OpenCADStudio-local-homepage-v2.wasm');
const name='OpenCADStudio-local-'+crypto.createHash('sha256').update(wasm).digest('hex').slice(0,12)+'.wasm';
fs.writeFileSync('D:/opencad/dist/'+name,wasm);
fs.writeFileSync('D:/opencad/dist/asset-name.txt',name);
let html=fs.readFileSync('D:/opencad/reference/index.original.html','utf8');
html=html.replace(/<title>[^<]*<\/title>/,'<title></title>');
html=html.replace(/<link rel="(?:icon|apple-touch-icon)"[^>]*\/>/g,'');
html=html.replace('document.title = labels[locale].title;', 'document.title = "";');
html=html.replace('<script type="module">',`<script>
// Keep the requested empty page title when the canvas runtime updates it.
(() => {
  const title = document.querySelector('title');
  new MutationObserver(() => { if (title.textContent !== '') title.textContent = ''; })
    .observe(title, {childList: true, characterData: true, subtree: true});
})();
</script>
<script type="module">`);
// Content-hashed metadata bypasses the existing service worker's older cache.
for (const resource of ['locale-labels.json','app.webmanifest']) {
  const content=fs.readFileSync('D:/opencad/web/'+resource);
  const hash=crypto.createHash('sha256').update(content).digest('hex').slice(0,12);
  const dot=resource.lastIndexOf('.');
  const asset=resource.slice(0,dot)+'-'+hash+resource.slice(dot);
  fs.writeFileSync('D:/opencad/dist/'+asset,content);
  html=html.replaceAll(resource,asset);
}
html=html.replace('      <div class="title">Open <span>CAD</span> Studio</div>\n','');
html=html.replaceAll('OpenCADStudio-7256480aa17966fc_bg.wasm',name);
html=html.replace('sha384-prkeN1cNPz3QsisOkKRqQMmdl4Bk1xvtF7s0sVWNdDJ4tonYrwz/o5+P5ramrh5H','sha384-'+crypto.createHash('sha384').update(wasm).digest('base64'));
html = applyLoadingStyle(applyStartupPreferences(html));
const webApp = fs.readFileSync('D:/opencad/web-app.html', 'utf8');
const ribbonDefaults = webApp.match(/<script id="ribbon-defaults">[\s\S]*?<\/script>/)?.[0];
if (!ribbonDefaults) throw Error('Ribbon defaults script not found in web-app.html');
html = html.replace('<script type="module">', `${ribbonDefaults}\n<script type="module">`);
fs.writeFileSync('D:/opencad/dist/index.html',html);
console.log('Prepared entry page with matching WASM integrity.');
