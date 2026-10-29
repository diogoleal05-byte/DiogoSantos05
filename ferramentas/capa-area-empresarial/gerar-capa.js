// Capa com foto do Diogo · carrossel área empresarial (29/10/2026)
// node gerar-capa.js <foto> <saida.jpg> [pos_y%] [altura_foto_px] [fonts_dir] [logo.png]
const { chromium } = require(process.env.PW || '/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const [FOTO, OUT, POSY='20', FH='900', FONTS='', LOGOF='/mnt/project-files/marca/logotipo-diogo-santos-branco.png'] = process.argv.slice(2);
const b64 = (f, t) => `data:${t};base64,` + fs.readFileSync(f).toString('base64');
const N = '#1e293f', G = '#bc8345', C = '#f4efe7';
const ff = FONTS ? ['Regular','SemiBold','Bold','ExtraBold','Black'].map((w,i)=>`@font-face{font-family:'Inter Display';font-weight:${[400,600,700,800,900][i]};src:url(${b64(`${FONTS}/InterDisplay-${w}.otf`,'font/otf')})}@font-face{font-family:Inter;font-weight:${[400,600,700,800,900][i]};src:url(${b64(`${FONTS}/Inter-${w}.otf`,'font/otf')})}`).join('') : '';
const html = `<html><head><meta charset="utf-8"><style>${ff}
*{margin:0;padding:0;box-sizing:border-box;font-variant-numeric:lining-nums}
body{width:1080px;height:1350px;background:${C};color:${N};font-family:Inter,sans-serif;overflow:hidden;position:relative}
.ph{position:absolute;left:0;right:0;top:0;height:${FH}px;background:url(${b64(FOTO,'image/jpeg')}) center ${POSY}%/cover no-repeat}
.fd{position:absolute;left:0;right:0;top:${FH-320}px;height:320px;background:linear-gradient(to bottom,rgba(244,239,231,0),${C})}
.prog{position:absolute;top:56px;left:72px;right:72px;display:flex;gap:10px}.prog i{flex:1;height:7px;border-radius:4px;background:rgba(255,255,255,.55)}.prog i.on{background:${G}}
.logo{position:absolute;top:96px;right:68px;height:104px;filter:drop-shadow(0 2px 10px rgba(0,0,0,.45))}
.txt{position:absolute;left:72px;right:72px;bottom:150px}
.kick{display:inline-block;background:${N};color:${C};font-weight:800;font-size:23px;letter-spacing:4px;text-transform:uppercase;padding:12px 20px;margin-bottom:28px}
h1{font-family:'Inter Display',Inter,sans-serif;font-weight:800;font-size:84px;line-height:1.02;letter-spacing:-3px}
.g{color:${G}}
.foot{position:absolute;left:72px;right:72px;bottom:56px;display:flex;justify-content:space-between;align-items:center;font-size:19px;letter-spacing:4px;text-transform:uppercase;font-weight:500}
.chip{background:${N};color:${C};font-weight:800;font-size:21px;letter-spacing:3px;padding:16px 26px;border-radius:40px}
</style></head><body><div class="ph"></div><div class="fd"></div>
<div class="prog"><i class="on"></i><i></i><i></i><i></i><i></i></div><img class="logo" src="${b64(LOGOF,'image/png')}">
<div class="txt"><span class="kick">Notícia de ontem</span><h1>Uma das <span class="g">6</span> maiores áreas empresariais do país pode nascer ao lado de Santarém.</h1></div>
<div class="foot"><span>@diogosantosrealestate</span><span class="chip">Desliza →</span></div></body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1080,height:1350}});
  await p.setContent(html, {waitUntil:'networkidle'}); await p.evaluate(async()=>{await document.fonts.ready});
  await p.screenshot({path:OUT, type:'jpeg', quality:92}); await b.close();
})();
