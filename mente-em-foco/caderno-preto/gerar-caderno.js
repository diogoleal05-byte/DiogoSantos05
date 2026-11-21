// Mente em Foco: carrosséis de promoção do guia. node gerar-promo.js <lote>
const fs0 = require('fs');
const { chromium } = require(fs0.existsSync('/opt/node-tools/node_modules/playwright')?'/opt/node-tools/node_modules/playwright':'/home/user/pw/node_modules/playwright');
const fs = require('fs'), path = require('path');
const LOTE = process.argv[2];
const d = JSON.parse(fs.readFileSync(path.join(LOTE, 'conteudo.json')));
const G = path.join(__dirname, 'guia-30-dias');
const b64 = (p, m) => `data:${m};base64,` + fs.readFileSync(p).toString('base64');
const CAMADA = !fs.existsSync(path.join(__dirname, 'fotos'));
const FOTO = (n) => b64(path.join(__dirname, 'fotos', n + '.png'), 'image/png');

const MOCK = b64(path.join(__dirname, 'mockup-livro.png'), 'image/png');
const GOLD = '#d6a645';
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Anton&family=Cinzel:wght@500;700&family=Inter:wght@500;700&display=swap" rel="stylesheet">`;
const LOGO = `<div class="logo"><svg viewBox="0 0 120 50" width="90"><circle cx="60" cy="22" r="11" fill="${GOLD}"/><path d="M8 48 L42 16 L54 28 L66 12 L112 48 Z" fill="#111" stroke="#eee" stroke-width="2.4" stroke-linejoin="round"/></svg><div class="lt">MENTE <span>EM FOCO</span></div></div>`;
const css = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;position:relative;background:radial-gradient(circle at 75% 40%,#1c1c1c 0,#0a0a0a 60%);color:#fff;font-family:Inter,sans-serif}
.ph{position:absolute;inset:0;background-position:center 70%;background-size:cover}
.sh{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.9) 0,rgba(0,0,0,.5) 45%,rgba(0,0,0,.15) 65%,rgba(0,0,0,.7) 100%)}
.top{position:absolute;top:70px;left:80px;right:300px;display:flex;align-items:center;gap:22px;font:700 24px Inter;letter-spacing:6px;color:#bbb}
.top:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,${GOLD},transparent)}
.foot{position:absolute;bottom:50px;left:0;right:0;text-align:center;font:500 22px Inter;letter-spacing:4px;color:#aaa;text-shadow:0 2px 8px #000}.foot b{display:block;color:${GOLD};margin-bottom:8px}
.h{font-family:Anton,sans-serif;text-transform:uppercase;line-height:1.03;letter-spacing:1px;text-shadow:0 4px 30px rgba(0,0,0,.7)}
.g{color:${GOLD}}
.logo{display:flex;flex-direction:column;align-items:center}.lt{font:700 28px Cinzel,serif;letter-spacing:5px;margin-top:4px}.lt span{color:${GOLD}}
.dots{position:absolute;top:78px;right:80px;display:flex;gap:10px}.dots i{width:14px;height:14px;border-radius:50%;background:#444}.dots i.on{background:${GOLD};width:40px;border-radius:7px}
.big{position:absolute;right:40px;top:170px;font:400 520px Anton;color:transparent;-webkit-text-stroke:3px rgba(214,166,69,.22);line-height:1}
.p{font:500 40px/1.45 Inter;color:#d8d8d8;text-shadow:0 2px 12px #000}.p b{color:#fff;font-weight:700}
.swipe{position:absolute;bottom:130px;right:80px;font:700 28px Inter;letter-spacing:3px;color:${GOLD}}
.li{display:flex;gap:26px;align-items:flex-start;font:500 40px/1.35 Inter;color:#d8d8d8;padding:26px 0;border-bottom:1px solid #2c2c2c}.li b{color:#fff}
.li i{flex:none;width:18px;height:18px;background:${GOLD};transform:rotate(45deg);margin-top:16px}
.li i.c{width:40px;height:40px;transform:none;background:none;border:3px solid ${GOLD};margin-top:2px;position:relative}.li i.c:after{content:'';position:absolute;left:10px;top:2px;width:12px;height:22px;border:solid ${GOLD};border-width:0 5px 5px 0;transform:rotate(45deg)}`;
const foot = `<div class="foot"><b>◇</b>@_mente_emfoco_</div>`;
const page = (inner, foto) => `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${css}</style></head><body${foto && CAMADA ? ' style="background:transparent"' : ''}>${foto ? (CAMADA ? '' : `<div class="ph" style="background-image:url(${FOTO(foto)})"></div>`) + '<div class="sh"></div>' : ''}${inner}${foot}</body></html>`;
const dots = (i, n) => `<div class="dots">${Array.from({ length: n }, (_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>`;
function slide(s, i, n) {
  const D = dots(i, n);
  if (s.tipo === 'capa') {
    if (s.mockup) return page(`<div style="position:absolute;top:70px;left:80px">${LOGO}</div>${D}
      <div style="position:absolute;left:80px;top:250px;width:520px"><div style="font:700 28px Inter;letter-spacing:6px;color:${GOLD};margin-bottom:20px">NOVO GUIA</div><div class="h" style="font-size:150px">${s.t}</div><div style="font:700 40px/1.4 Inter;color:#eee;margin-top:36px">${s.sub}</div></div>
      <img src="${MOCK}" style="position:absolute;right:-110px;top:300px;width:720px;transform:rotate(6deg)"><div class="swipe" style="bottom:130px;left:80px;right:auto">DESLIZA →</div>`);
    return page(`<div style="position:absolute;top:70px;left:80px">${LOGO}</div>${D}
      <div style="position:absolute;left:80px;right:80px;top:250px"><div class="h" style="font-size:128px">${s.t}</div><div style="font:700 42px/1.4 Inter;color:#eee;margin-top:40px;text-shadow:0 2px 12px #000">${s.sub}</div></div>
      <div class="swipe">DESLIZA →</div>`, s.foto);
  }
  if (s.tipo === 'item') {
    const label = `${s.label || ''}${s.label ? ' ' : ''}${s.n}`;
    if (s.foto) return page(`<div class="top">${label}</div>${D}<div style="position:absolute;left:80px;right:80px;top:180px"><div class="h" style="font-size:108px">${s.t}</div><div class="p" style="margin-top:44px">${s.p}</div></div>`, s.foto);
    return page(`<div class="top">${label}</div>${D}<div class="big">${s.n}</div>
      <div style="position:absolute;left:80px;right:80px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center"><div class="h" style="font-size:110px">${s.t}</div><div class="p" style="margin-top:44px">${s.p}</div></div>`);
  }
  if (s.tipo === 'lista') return page(`<div class="top">${s.label}</div>${D}
    <div style="position:absolute;left:80px;right:80px;top:0;bottom:60px;display:flex;flex-direction:column;justify-content:center"><div class="h" style="font-size:100px;margin-bottom:40px">${s.t}</div>
    ${s.itens.map((x) => `<div class="li"><i class="${s.check ? 'c' : ''}"></i><span>${x}</span></div>`).join('')}</div>`);
  if (s.tipo === 'pagina') {
    const imgs = s.pag.map((p, k) => `<img src="${PAG(p)}" style="position:absolute;width:${s.pag.length > 1 ? 440 : 520}px;left:${s.pag.length > 1 ? 90 + k * 420 : 280}px;top:${s.pag.length > 1 ? 470 + k * 40 : 430}px;transform:rotate(${s.pag.length > 1 ? (k ? 5 : -5) : -3}deg);box-shadow:0 30px 60px rgba(0,0,0,.8);border:2px solid #333;border-radius:6px">`).join('');
    return page(`<div class="top">${s.label}</div>${D}<div style="position:absolute;left:80px;right:80px;top:160px"><div class="h" style="font-size:84px">${s.t}</div><div class="p" style="font-size:34px;margin-top:22px">${s.p}</div></div>${imgs}`);
  }
  if (s.tipo === 'produto') return page(`${D}<div style="position:absolute;left:80px;top:130px;width:560px">
      <div class="h" style="font-size:104px">${s.titulo || `30 dias<br><span class='g'>de foco</span>`}</div>
      <div style="font:700 26px Inter;letter-spacing:5px;color:#aaa;margin-top:60px">PREÇO DE LANÇAMENTO</div>
      <div class="h g" style="font-size:190px;line-height:1;margin-top:10px">${d.preco.replace(' €', '<span style="font-size:110px"> €</span>')}</div>
      <div style="font:700 34px/1.45 Inter;color:#eee;margin-top:16px">Até ${d.ate}. Depois, ${d.preco_depois}.</div>
      <div style="font:500 30px/1.5 Inter;color:#bbb;margin-top:30px">PDF de 47 páginas · recebes logo no email</div></div>
    <img src="${MOCK}" style="position:absolute;right:-150px;top:260px;width:700px;transform:rotate(7deg)">
    <div style="position:absolute;left:80px;right:80px;top:1040px;border:2px solid ${GOLD};background:${GOLD};color:#0a0a0a;padding:28px 34px;font:700 40px Inter;text-align:center;letter-spacing:2px">LINK NA BIO →</div>`);
  if (s.tipo === 'cta') return page(`${D}<div style="position:absolute;top:70px;left:80px">${LOGO}</div>
    <div style="position:absolute;left:80px;right:80px;top:0;bottom:80px;display:flex;flex-direction:column;justify-content:center">
    <div style="font:500 40px/1.45 Inter;color:#bbb;margin-bottom:40px">${s.pre}</div>
    <div class="h" style="font-size:120px">${s.t}</div>
    <div class="p" style="margin-top:44px">${s.p}</div>
    <div style="margin-top:70px;border:2px solid ${GOLD};background:${GOLD};color:#0a0a0a;padding:28px 34px;font:700 40px Inter;text-align:center;letter-spacing:2px">${s.btn}</div></div>`, s.foto);
}
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const c of d.carrosseis) {
    const dir = path.join(LOTE, 'carrosseis', `${c.data}-${c.nome}`); fs.mkdirSync(dir, { recursive: true });
    for (let i = 0; i < c.slides.length; i++) {
      await p.setContent(slide(c.slides[i], i, c.slides.length), { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(100);
      const sl = c.slides[i], nm = `${c.nome}-${String(i + 1).padStart(2, '0')}`;
      if (sl.foto && CAMADA) await p.screenshot({ path: path.join(dir, `${nm}__${sl.foto}.png`), omitBackground: true });
      else await p.screenshot({ path: path.join(dir, `${nm}.jpg`), type: 'jpeg', quality: 90 });
    }
    console.log('ok', c.nome);
  }
  await b.close();
})();
