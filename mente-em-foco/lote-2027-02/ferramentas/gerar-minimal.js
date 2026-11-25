// Camadas do Reel minimal: frase pequena em minúsculas (centro) e @ no fim. node gerar-minimal.js <saida> "<frase>"
const { chromium } = require('playwright');
const [OUT, FR] = process.argv.slice(2);
const F = `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap" rel="stylesheet">`;
const css = `*{margin:0;padding:0}body{width:1080px;height:1920px;background:transparent;font-family:Inter}
.t{position:absolute;left:90px;right:90px;top:0;bottom:0;display:flex;align-items:center;justify-content:center;text-align:center;font:500 54px/1.35 Inter;color:#f2f2f2;text-shadow:0 2px 14px rgba(0,0,0,.9)}
.h{position:absolute;left:0;right:0;top:1640px;text-align:center;font:600 40px Inter;color:#f2f2f2;text-shadow:0 2px 10px #000}.h span{color:#d6a645}`;
const page = (b) => `<!doctype html><html><head><meta charset="utf-8">${F}<style>${css}</style></head><body>${b}</body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [k, h] of [['texto', `<div class="t">${FR}</div>`], ['handle', `<div class="h">@_mente_emfoco<span>_</span></div>`]]) {
    await p.setContent(page(h), { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    await p.screenshot({ path: `${OUT}/${k}.png`, omitBackground: true });
  }
  await b.close();
})();
