// Mente em Foco: Reel frase animada. node gerar-reel.js <saida_dir> <foto> "<linha1>" "<linha2>"
// Gera PNG transparentes (camadas) 1080x1920; a montagem é feita com ffmpeg (montar-reel.sh)
const { chromium } = require('playwright');
const [OUT, , L1, L2, MODO] = process.argv.slice(2);
const LISTA = MODO === 'lista';
const S1 = LISTA ? 104 : (L1.length > 40 ? 112 : 132), S2 = LISTA ? 74 : S1, GAP = LISTA ? 60 : 90;
const GOLD = '#d6a645';
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Anton&family=Cinzel:wght@500;700&family=Inter:wght@500;700&display=swap" rel="stylesheet">`;
const css = `*{margin:0;padding:0;box-sizing:border-box}body{width:1080px;height:1920px;background:transparent;color:#fff;font-family:Inter}
.h{font-family:Anton;text-transform:uppercase;line-height:1.03;letter-spacing:1px;text-shadow:0 4px 30px rgba(0,0,0,.7),0 2px 6px rgba(0,0,0,.6)}
.g{color:${GOLD}}
.top{position:absolute;top:250px;left:90px;right:90px;display:flex;align-items:center;gap:22px;font:700 28px Inter;letter-spacing:7px;color:#ccc;text-shadow:0 2px 8px #000}
.top:after{content:'';flex:1;height:2px;background:linear-gradient(90deg,${GOLD},transparent)}
.foot{position:absolute;top:1430px;left:0;right:0;text-align:center;font:500 28px Inter;letter-spacing:5px;color:#bbb;text-shadow:0 2px 8px #000}
.foot b{display:block;color:${GOLD};margin-bottom:10px}
.logo{position:absolute;top:760px;left:0;right:0;display:flex;flex-direction:column;align-items:center}
.lt{font:700 50px Cinzel,serif;letter-spacing:8px;margin-top:10px}.lt span{color:${GOLD}}
.sub{font:500 30px Inter;letter-spacing:6px;color:#bbb;margin-top:18px}`;
const page = (inner) => `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${css}</style></head><body>${inner}</body></html>`;
const layers = {
  base: page(`<div class="foot"><b>◇</b>@_mente_emfoco_</div>`),
  l1: page(`<div class="h" style="position:absolute;left:90px;right:90px;top:340px;font-size:${S1}px">${L1}</div>`),
  l2: page(`<div style="position:absolute;left:90px;right:90px;top:340px"><div class="h" style="font-size:${S1}px;visibility:hidden">${L1}</div><div class="h g" style="font-size:${S2}px;line-height:1.25;margin-top:${GAP}px">${L2}</div></div>`),
  end: page(`<div class="logo"><svg viewBox="0 0 120 50" width="220"><circle cx="60" cy="22" r="11" fill="${GOLD}"/><path d="M8 48 L42 16 L54 28 L66 12 L112 48 Z" fill="#111" stroke="#eee" stroke-width="2.4" stroke-linejoin="round"/></svg><div class="lt">MENTE <span>EM FOCO</span></div><div class="sub">UMA FRASE POR DIA</div></div><div class="foot" style="top:1180px"><b>◇</b>SEGUE PARA MAIS</div>`),
};
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [k, h] of Object.entries(layers)) {
    await p.setContent(h, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
    await p.screenshot({ path: `${OUT}/${k}.png`, omitBackground: true });
  }
  await b.close();
})();
