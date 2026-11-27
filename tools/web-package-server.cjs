const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, 'web');
const portArg = process.argv.indexOf('--port');
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || 8780);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Invalid port. Example: node server.cjs --port 8780'); process.exit(1);
}
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.wasm':'application/wasm','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.webmanifest':'application/manifest+json','.css':'text/css; charset=utf-8'};
const server = http.createServer((req,res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,{Allow:'GET, HEAD'}).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
  catch { res.writeHead(400).end('Invalid URL'); return; }
  if (pathname==='/' || pathname==='/app') { res.writeHead(302,{Location:'/app/'}).end(); return; }
  if (pathname==='/healthz') { res.writeHead(200,{'Content-Type':'text/plain'}).end('web-client-ready'); return; }
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = path.resolve(root,'.'+pathname);
  if (!file.startsWith(root+path.sep)) { res.writeHead(403).end(); return; }
  fs.stat(file,(error,stat) => {
    if (error || !stat.isFile()) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream',
      'Content-Length':stat.size,'Cache-Control':'no-cache',
      'Cross-Origin-Opener-Policy':'same-origin','Cross-Origin-Embedder-Policy':'require-corp',
      'X-Content-Type-Options':'nosniff'});
    if(req.method==='HEAD') { res.end(); return; }
    const stream=fs.createReadStream(file);
    stream.on('error',()=>res.destroy()); stream.pipe(res);
  });
});
server.on('error',error=>{ console.error(error.code==='EADDRINUSE' ? `Port ${port} is occupied. Try: node server.cjs --port ${port+1}` : error.message); process.exitCode=1; });
server.listen(port,'127.0.0.1',()=>console.log(`Web client ready: http://127.0.0.1:${port}/app/\nPress Ctrl+C to stop.`));
