const fs = require('fs');
const path = require('path');
const { parse } = require('@fluent/syntax');
const root = 'D:/opencad';
const changes = [];
function write(relative, transform) {
  const file = path.join(root, relative);
  const before = fs.readFileSync(file, 'utf8');
  const after = transform(before);
  if (before !== after) { fs.writeFileSync(file, after); changes.push(relative); }
}
// URLs remain valid; only human-readable product-name text is cleared.
function clearName(text) {
  const urls = [];
  text = text.replace(/https?:\/\/[^\s<>"']+/g, value => `\u0001${urls.push(value)-1}\u0002`);
  text = text.replace(/Open\s?CAD\s?Studio/gi, '');
  return text.replace(/\u0001(\d+)\u0002/g, (_, i) => urls[Number(i)]);
}
for (const locale of fs.readdirSync(path.join(root, 'locales'))) {
  const relative = `locales/${locale}/opencadstudio.ftl`;
  if (!fs.existsSync(path.join(root, relative))) continue;
  write(relative, before => {
    const after = before.split('\n').map(line => {
      if (line.trimStart().startsWith('#')) return line;
      const assignment = line.match(/^(\s*(?:\.[\w-]+|[\w-]+)\s*=)(.*)$/);
      if (assignment) {
        if (!/Open\s?CAD\s?Studio/i.test(assignment[2])) return line;
        const value = clearName(assignment[2]).trim();
        return assignment[1] + ' ' + (value || '{ "" }');
      }
      return /^\s+/.test(line) ? clearName(line) : line;
    }).join('\n');
    const oldAst = parse(before), newAst = parse(after);
    const junk = ast => ast.body.filter(e=>e.type==='Junk').length;
    if (junk(newAst) > junk(oldAst)) throw Error('Invalid Fluent syntax: '+relative);
    const identity = ast => ast.body.filter(e=>e.type==='Message'||e.type==='Term')
      .map(e=>[e.id.name,e.attributes.map(a=>a.id.name)]);
    if (JSON.stringify(identity(oldAst))!==JSON.stringify(identity(newAst))) throw Error('Changed translation keys: '+relative);
    return after;
  });
}
write('web/locale-labels.json', text => {
  const data = JSON.parse(text); for (const entry of Object.values(data)) entry.title = '';
  return JSON.stringify(data,null,2)+'\n';
});
write('web/app.webmanifest', text => {
  const data = JSON.parse(text); data.name=''; data.short_name=''; data.icons=[];
  return JSON.stringify(data,null,2)+'\n';
});
write('web-app.html', text => text.replace(/<title>[^<]*<\/title>/,'<title></title>')
  .replace(/^.*<div class="title">.*\r?\n/gm,'')
  .replace(/^.*<link data-trunk rel="icon"[^>]*>\r?\n/gm,'')
  .replace('document.title = labels[locale].title;', 'document.title = "";'));
write('src/app/view/mod.rs', text => text.replace('text("Open CAD Studio")','text("")'));
write('src/ui/window/about.rs', text => text.replaceAll('Open CAD Studio',''));
write('src/app/mod.rs', text => text
  .replace('"{}Open CAD Studio {} - {}",','"{}{} - {}",')
  .replaceAll('concat!("Open CAD Studio ", env!("OCS_APP_VERSION")).to_string()', 'String::new()'));
write('src/mcp.rs', text => text.replace('"title":"Open CAD Studio"','"title":""'));
fs.writeFileSync(path.join(root,'dist/display-name-source-changes.json'),JSON.stringify(changes,null,2));
console.log(JSON.stringify({changedFiles:changes.length,files:changes}));
