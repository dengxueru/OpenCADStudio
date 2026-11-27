const { createHash } = require('node:crypto');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const startupPreferences = `<script>
// Set startup preferences for this packaged WebAssembly release.
try {
  const key = 'opencadstudio.settings';
  const config = JSON.parse(localStorage.getItem(key) || '{}');
  config.settings = config.settings || {};
  config.settings.donation_prompt_version = '2026.46';
  // The precompiled 2026.46 release predates the shared Rust ribbon defaults.
  const ribbon = config.ribbon ??= {};
  if (typeof ribbon === 'object' && !Array.isArray(ribbon)) {
    ribbon.minimize ??= 'PanelTitles';
    ribbon.minimize_pref ??= 'PanelTitles';
  }
  if (!config.theme?.name) {
    config.theme = {
      name: 'Light',
      palette: {
        background: [255, 255, 255],
        text: [0, 0, 0],
        primary: [107, 203, 242],
        success: [18, 102, 79],
        warning: [183, 126, 51],
        danger: [195, 66, 63],
      },
    };
  }
  localStorage.setItem(key, JSON.stringify(config));
} catch (error) { console.warn('Unable to persist startup preferences:', error); }
</script>`;

function applyStartupPreferences(html) {
  const original = /<script>\r?\n\/\/ (?:Local deployment: suppress the version-specific donation prompt only\.|Set startup preferences for this packaged WebAssembly release\.)\r?\n[\s\S]*?<\/script>/;
  if (original.test(html)) return html.replace(original, startupPreferences);

  const loader = '<script type="module">';
  if (!html.includes(loader)) throw Error('WebAssembly module loader not found');
  return html.replace(loader, `${startupPreferences}\n${loader}`);
}

function applyWebShellStyle(html) {
  const template = readFileSync(resolve(__dirname, '../web-app.html'), 'utf8');
  const style = template.match(/<style id="web-loading-style">[\s\S]*?<\/style>/)?.[0];
  const current = [...html.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/g)]
    .find(match => match[0].includes('#loading {'))?.[0];
  if (!style || !current) throw Error('Web loading stylesheet not found');
  const focus = template.match(/<script id="canvas-pointer-focus">[\s\S]*?<\/script>/)?.[0];
  if (!focus) throw Error('Canvas focus script not found');
  const previousFocus = /<script id="canvas-pointer-focus">[\s\S]*?<\/script>/;
  if (previousFocus.test(html)) {
    return html.replace(current, style).replace(previousFocus, focus);
  }
  return html.replace(current, `${style}\n    ${focus}`);
}

function webShellVersion(html, wasmDigest) {
  return createHash('sha256').update(wasmDigest).update(html).digest('hex').slice(0, 12);
}

function versionServiceWorker(worker, html, wasmDigest) {
  const version = webShellVersion(html, wasmDigest);
  const cacheVersion = /const CACHE_VERSION = "[^"]+";/;
  if (!cacheVersion.test(worker)) throw Error('Service worker cache version not found');
  return worker.replace(cacheVersion, `const CACHE_VERSION = "local-${version}";`);
}

module.exports = { applyStartupPreferences, applyWebShellStyle, webShellVersion, versionServiceWorker };
