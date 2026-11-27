// Package the verified local Web release; this does not compile Rust sources.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { applyStartupPreferences, applyWebShellStyle, webShellVersion, versionServiceWorker } = require('./web-startup-preferences.cjs');
const project = path.resolve(__dirname, '..');
const deployed = process.env.DEPLOY_WEB_ROOT || 'D:/opencad-studio/web/app';
const html = applyWebShellStyle(applyStartupPreferences(fs.readFileSync(path.join(deployed, 'index.html'), 'utf8')));
const wasmName = html.match(/module_or_path:\s*'\/app\/([^']+)'/)?.[1];
if (!wasmName) throw Error('Active WASM entry not found');
const wasm = fs.readFileSync(path.join(deployed, wasmName));
const digest = crypto.createHash('sha256').update(wasm).digest('hex');
if (!WebAssembly.validate(wasm)) throw Error('Active WASM is invalid');
const date = new Date().toISOString().slice(0, 10);
const packageName = 'web-client-' + date.replaceAll('-', '') + '-' + webShellVersion(html, digest);
const output = path.join(project, 'dist', 'releases', packageName);
if (fs.existsSync(output)) throw Error('Release directory already exists: ' + output);
const app = path.join(output, 'web', 'app');
fs.mkdirSync(app, {recursive:true});
const files = new Set([wasmName, 'ocs-control.js', 'ocs-parse-worker.js', 'app.webmanifest', 'locale-labels.json', 'release.json']);
for (const match of html.matchAll(/(?:src|href)="([^"?#]+)"|from '([^']+)'|fetch\("([^"?#]+)"\)/g)) {
  const url = match[1] || match[2] || match[3];
  if (/^(https?:|data:)/.test(url)) continue;
  const relative = url.replace(/^\/app\//, '');
  if (relative.startsWith('/') || relative.includes('..')) throw Error('Unexpected resource: ' + url);
  files.add(relative);
}
for (const relative of files) {
  const target = path.join(app, relative);
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.copyFileSync(path.join(deployed, relative), target);
}
fs.writeFileSync(path.join(app, 'index.html'), html);
for (const directory of ['fonts', 'snippets', 'worker_pkg']) {
  fs.cpSync(path.join(deployed, directory), path.join(app, directory), {recursive:true});
}
// Each package gets its own cache version. Updating never interrupts an editor.
const sw = versionServiceWorker(fs.readFileSync(path.join(deployed, 'sw.js'), 'utf8'), html, digest);
fs.writeFileSync(path.join(app, 'sw.js'), sw);
for (const relative of ['LICENSE', 'THIRD_PARTY.md']) fs.copyFileSync(path.join(project, relative), path.join(output, relative));
fs.writeFileSync(path.join(output, 'server.cjs'), fs.readFileSync(path.join(__dirname, 'web-package-server.cjs')));
fs.writeFileSync(path.join(output, 'start.cmd'), '@echo off\r\nsetlocal\r\ncd /d "%~dp0"\r\nwhere node.exe >nul 2>nul\r\nif errorlevel 1 (\r\n  echo Node.js is required. Install Node.js and run this file again.\r\n  pause\r\n  exit /b 1\r\n)\r\nnode.exe server.cjs %*\r\nif errorlevel 1 pause\r\n');
fs.writeFileSync(path.join(output, 'start.sh'), '#!/usr/bin/env sh\nset -eu\ncd "$(dirname "$0")"\nexec node server.cjs "$@"\n');
fs.writeFileSync(path.join(output, 'README.txt'), `网页端发布包

Windows 使用：
1. 解压整个压缩包，保持目录结构。
2. 需要安装 Node.js 18 或更高版本，并让 node 在 PATH 中可用。
3. 双击 start.cmd，保持服务窗口开启。
4. 浏览器访问 http://127.0.0.1:8780/app/ 。
5. 在服务窗口按 Ctrl+C 停止服务。

其他系统：运行 node server.cjs，或 sh start.sh。
更改端口：node server.cjs --port 8781。
不需要 npm install。Node.js 运行时未包含在本包中。

服务器部署：
- 将 web 目录作为静态站点根目录；应用必须位于 /app/ 路径。
- WebAssembly MIME 类型必须为 application/wasm。
- 建议设置以下响应头（自带 server.cjs 已设置）：
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
- 非 localhost 使用 HTTPS。不要通过 file:// 直接双击 index.html。
- 自带服务器默认只监听本机 127.0.0.1。

内容：
web/app：浏览器应用、解析/保存 Worker、字体、离线缓存脚本。
server.cjs / start.cmd / start.sh：不依赖 npm 包的本地静态服务器。
package-info.json：版本来源和构建方式。
SHA256SUMS.json：逐文件校验信息。
LICENSE / THIRD_PARTY.md：原有许可与来源信息。

本包保留当前界面精简与显示名称清空的全部修改。
技术标识、存储键、资源路径和来源记录保留，保障运行和兼容性。
不包含个人图纸、浏览器数据、预览页面、备份文件或旧版主 WASM。

构建说明：
这是从本地已验证的 WebAssembly 2026.46 发布版本制作的部署包，
并非从当前 Rust 源码重新编译。源码、补丁和打包脚本在 D:\\opencad。
原发布提交：3976af345b0f244e59f5c5e8c40c0e42805a72d2。
原项目来源：https://github.com/HakanSeven12/OpenCADStudio
`);
fs.writeFileSync(path.join(output, 'package-info.json'), JSON.stringify({
  format:1, package:packageName, date, mode:'verified-release-repackage',
  upstreamVersion:'2026.46', upstreamCommit:'3976af345b0f244e59f5c5e8c40c0e42805a72d2',
  entry:'/app/', defaultPort:8780, nodeRuntimeIncluded:false, mainWasm:wasmName,
  mainWasmSha256:digest, displayName:'', sourceRecompiled:false
},null,2)+'\n');
fs.writeFileSync(path.join(project,'dist','web-package-path.txt'), output);
console.log(JSON.stringify({output,mainWasm:wasmName,sha256:digest}));
