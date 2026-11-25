// Mente em Foco: carrosséis de um lote. node gerar-carrosseis.js <pasta_lote> <pasta_fotos>
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [LOTE, FOTOS] = process.argv.slice(2);
const d = JSON.parse(fs.readFileSync(fs.existsSync(path.join(LOTE, 'carrosseis.json')) ? path.join(LOTE, 'carrosseis.json') : path.join(LOTE, 'conteudo.json')));
const F = (n) => { let p = path.join(FOTOS, n + '.png'); if (!fs.existsSync(p)) p = path.join(__dirname, '..', 'fotos-base', n + '.png'); return 'data:image/png;base64,' + fs.readFileSync(p).toString('base64'); };
const GOLD = '#d6a645';
const MOCK = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, '..', '..', 'ferramentas', 'mockup-livro.png')).toString('base64');
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Anton&family=Cinzel:wght@500;700&family=Inter:wght@500;700&display=swap" rel="stylesheet">`;
const LOGO = `<div class="logo"><svg viewBox="0 0 120 50" width="90"><circle cx="60" cy="22" r="11" fill="${GOLD}"/><path d="M8 48 L42 16 L54 28 L66 12 L112 48 Z" fill="#111" stroke="#eee" stroke-width="2.4" stroke-linejoin="round"/></svg><div class="lt">MENTE <span>EM FOCO</span></div></div>`;
const css = `*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;position:relative;background:radial-gradient(circle at 75% 40%,#1c1c1c 0,#0a0a0a 60%);color:#fff;font-family:Inter,sans-serif}
.ph{position:absolute;inset:0;background-position:center 70%;background-size:cover;background-repeat:no-repeat}
.sh{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.88) 0,rgba(0,0,0,.45) 45%,rgba(0,0,0,.1) 65%,rgba(0,0,0,.6) 100%)}
.top{position:absolute;top:70px;left:80px;right:300px;display:flex;align-items:center;gap:22px;font:700 24px Inter;letter-spacing:6px;color:#bbb}
.top:after{content:'';flex:1;height:1px;background:linear-gradient(90deg,${GOLD},transparent)}
.foot{position:absolute;bottom:50px;left:0;right:0;text-align:center;font:500 22px Inter;letter-spacing:4px;color:#aaa;text-shadow:0 2px 8px #000}
.foot b{display:block;color:${GOLD};margin-bottom:8px}
.h{font-family:Anton,sans-serif;text-transform:uppercase;line-height:1.03;letter-spacing:1px;text-shadow:0 4px 30px rgba(0,0,0,.7)}
.g{color:${GOLD}}
.logo{display:flex;flex-direction:column;align-items:center}
.lt{font:700 28px Cinzel,serif;letter-spacing:5px;margin-top:4px}.lt span{color:${GOLD}}
.dots{position:absolute;top:78px;right:80px;display:flex;gap:10px}.dots i{width:14px;height:14px;border-radius:50%;background:#444}.dots i.on{background:${GOLD};width:40px;border-radius:7px}
.big{position:absolute;right:40px;top:170px;font:400 520px Anton;color:transparent;-webkit-text-stroke:3px rgba(214,166,69,.22);line-height:1}
.p{font:500 40px/1.45 Inter;color:#d8d8d8;text-shadow:0 2px 12px #000}.p b{color:#fff;font-weight:700}
.swipe{position:absolute;bottom:130px;right:80px;font:700 28px Inter;letter-spacing:3px;color:${GOLD}}
.tag{display:inline-block;font:700 28px Inter;letter-spacing:5px;padding:10px 20px;border:2px solid #777;color:#aaa;margin-bottom:26px}
.tag.v{border-color:${GOLD};color:${GOLD}}
.mito{font:500 52px/1.35 Inter;color:#9a9a9a;text-decoration:line-through;text-decoration-color:rgba(214,166,69,.7);text-decoration-thickness:3px}`;
const foot = `<div class="foot"><b>◇</b>@_mente_emfoco_</div>`;
const page = (inner, foto) => `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${css}</style></head><body>${foto ? `<div class="ph" style="background-image:url(${F(foto)})"></div><div class="sh"></div>` : ''}${inner}${foot}</body></html>`;
const dots = (i, n) => `<div class="dots">${Array.from({ length: n }, (_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>`;
function slide(s, i, n) {
  const D = dots(i, n);
  if (s.tipo === 'capa') return page(`<div style="position:absolute;top:70px;left:80px">${LOGO}</div>${D}
    <div style="position:absolute;left:80px;right:80px;top:250px"><div class="h" style="font-size:${s.fs || 128}px">${s.t}</div>
    <div style="margin-top:40px;font:700 42px Inter;color:#eee;text-shadow:0 2px 12px #000">${s.sub}</div></div>
    <div class="swipe">DESLIZA →</div>`, s.foto);
  if (s.tipo === 'item') {
    const label = `${s.label || ''}${s.label ? ' ' : ''}${s.n}`;
    if (s.foto) return page(`<div class="top">${label}</div>${D}
      <div style="position:absolute;left:80px;right:80px;top:180px"><div class="h" style="font-size:108px">${s.t}</div><div class="p" style="margin-top:44px">${s.p}</div></div>`, s.foto);
    return page(`<div class="top">${label}</div>${D}<div class="big">${s.n}</div>
      <div style="position:absolute;left:80px;right:80px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center"><div class="h" style="font-size:114px">${s.t}</div><div class="p" style="margin-top:44px">${s.p}</div></div>`);
  }
  if (s.tipo === 'mito') return page(`<div class="top">MITO ${s.n}</div>${D}${s.foto ? '' : `<div class="big">${s.n}</div>`}
    <div style="position:absolute;left:80px;right:100px;${s.foto ? 'top:190px' : 'top:0;bottom:0;display:flex;flex-direction:column;justify-content:center'}"><div>
      <div class="tag">MITO</div><div class="mito">${s.mito}</div>
      <div style="height:70px"></div>
      <div class="tag v">VERDADE</div><div class="p" style="font-size:54px">${s.v}</div></div></div>`, s.foto);
  if (s.tipo === 'fim') return page(`${D}<div style="position:absolute;top:110px;left:0;right:0">${LOGO}</div>
    <div class="h" style="position:absolute;left:80px;right:80px;top:260px;font-size:104px">${s.t}</div>
    <div style="position:absolute;left:80px;right:80px;top:1040px;border:2px solid ${GOLD};background:rgba(0,0,0,.6);padding:26px 34px;font:700 34px/1.4 Inter">${s.box || 'Guarda para releres.<br><span class="g">Plano completo de 30 dias: link na bio.</span>'}</div>`, s.foto);
  if (s.tipo === 'produto') return page(`${D}<div style="position:absolute;left:80px;top:130px;width:560px">
      <div class="h" style="font-size:104px">${s.titulo || `30 dias<br><span class='g'>de foco</span>`}</div>
      <div style="font:500 34px/1.45 Inter;color:#ddd;margin-top:40px">${s.p || 'Um desafio por dia.<br>Registo e plano semanal.'}</div>
      <div class="h g" style="font-size:190px;line-height:1;margin-top:40px">11,97<span style="font-size:110px"> €</span></div>
      <div style="font:500 30px/1.5 Inter;color:#bbb;margin-top:24px">PDF de 47 páginas<br>recebes logo no email</div></div>
    <img src="${MOCK}" style="position:absolute;right:-150px;top:260px;width:700px;transform:rotate(7deg)">
    <div style="position:absolute;left:80px;right:80px;top:1040px;border:2px solid ${GOLD};background:${GOLD};color:#0a0a0a;padding:28px 34px;font:700 40px Inter;text-align:center;letter-spacing:2px">LINK NA BIO →</div>`);
}
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const c of d.carrosseis) {
    const dir = path.join(LOTE, 'carrosseis', `${c.data}-${c.nome}`); fs.mkdirSync(dir, { recursive: true });
    for (let i = 0; i < c.slides.length; i++) {
      await p.setContent(slide(c.slides[i], i, c.slides.length), { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
      await p.screenshot({ path: path.join(dir, `${c.nome}-${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 90 });
    }
    console.log('ok', dir);
  }
  await b.close();
})();
