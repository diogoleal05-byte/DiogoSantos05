// Capas IA do lote de novembro 2026 (mesmo estilo de gerar-carrosseis.js)
// node capa-ia.js <slug> <imagem> <saida_sem_ext> [pos_y%] [zoom%] [pos_x%]
const { chromium } = require(process.env.PW || 'playwright');
const fs = require('fs');
const b64 = (f, t) => `data:${t};base64,` + fs.readFileSync(f).toString('base64');
const LOGO = b64(__dirname+'/logotipo-diogo-santos-branco.png','image/png');
const LOGO_W = b64(__dirname+'/logotipo-diogo-santos-branco.png','image/png');
const PF = fs.readFileSync(__dirname+'/playfair-inline.css','utf8');
const N = '#1e293f', G = '#bc8345', C = '#f4efe7';

const css = (dark) => `${PF}
*{margin:0;padding:0;box-sizing:border-box;font-variant-numeric:lining-nums}
body{width:1080px;height:1350px;background:${dark?N:C};color:${dark?C:N};font-family:Inter,sans-serif;overflow:hidden;position:relative}
.wrap{position:absolute;inset:0;padding:56px 72px 52px;display:flex;flex-direction:column;z-index:2}
.prog{display:flex;gap:10px}.prog i{flex:1;height:7px;border-radius:4px;background:${dark?'rgba(244,239,231,.22)':'rgba(30,41,63,.15)'}}.prog i.on{background:${G}}
.hdr{display:flex;justify-content:space-between;margin-top:22px;font-size:19px;letter-spacing:4px;text-transform:uppercase;font-weight:600;opacity:.85}
.main{flex:1;display:flex;flex-direction:column;justify-content:center;position:relative}
.foot{display:flex;justify-content:space-between;align-items:center}
.foot img{height:84px}.foot .h{font-size:19px;letter-spacing:4px;text-transform:uppercase;font-weight:500}
.chip{background:${G};color:${N};font-weight:800;font-size:22px;letter-spacing:3px;text-transform:uppercase;padding:16px 26px;border-radius:40px}
.kick{display:inline-block;align-self:flex-start;background:${dark?C:N};color:${dark?N:C};font-weight:800;font-size:24px;letter-spacing:4px;text-transform:uppercase;padding:12px 20px;margin-bottom:34px}
.kick.gold{background:${G};color:${N};transform:rotate(-2deg)}
h1{font-family:'Inter Display',Inter,sans-serif;font-weight:800;font-size:112px;line-height:.98;letter-spacing:-4px}
h2{font-family:'Inter Display',Inter,sans-serif;font-weight:800;font-size:82px;line-height:1.02;letter-spacing:-2.5px}
mark{background:linear-gradient(transparent 52%, ${G} 52%, ${G} 92%, transparent 92%);color:inherit;padding:0 6px;margin:0 -6px;-webkit-box-decoration-break:clone}
.g{color:${G}}
p.b{font-size:38px;line-height:1.38;margin-top:36px;max-width:900px}
p.b strong{font-weight:800}
.ghost{position:absolute;right:-30px;top:120px;font-family:'Inter Display',Inter,sans-serif;font-weight:900;font-size:620px;line-height:1;letter-spacing:-30px;color:transparent;-webkit-text-stroke:3px rgba(188,131,69,.27);z-index:1}
.paper{background:#fff;color:${N};border-radius:14px;padding:38px 42px;box-shadow:0 30px 60px rgba(0,0,0,.25);transform:rotate(-2.5deg);margin-top:44px}
.paper .t{font-size:20px;letter-spacing:4px;text-transform:uppercase;font-weight:700;opacity:.55;margin-bottom:18px}
.paper .ln{height:14px;background:rgba(30,41,63,.12);border-radius:7px;margin:14px 0}
.paper .hl{background:rgba(188,131,69,.22);border-left:6px solid ${G};padding:18px 22px;font-size:32px;line-height:1.35;font-weight:600;margin:18px 0}
.vs{display:flex;gap:22px;margin-top:44px}.vs>div{flex:1;border-radius:18px;padding:34px 30px}
.vs .a{background:${dark?'rgba(244,239,231,.08)':'#fff'}}.vs .z{background:${G};color:${N}}
.vs .l{font-size:22px;letter-spacing:3px;text-transform:uppercase;font-weight:800;margin-bottom:18px}
.vs .n{font-family:'Inter Display',Inter,sans-serif;font-weight:900;font-size:84px;letter-spacing:-3px;line-height:1}
.vs .c{font-size:28px;line-height:1.35;margin-top:14px;font-weight:500}
.chk{display:flex;align-items:center;gap:26px;font-size:38px;font-weight:600;padding:24px 0;border-bottom:2px solid ${dark?'rgba(244,239,231,.14)':'rgba(30,41,63,.12)'}}
.chk:last-child{border:none}.chk b{width:58px;height:58px;border-radius:12px;background:${G};color:${N};display:flex;align-items:center;justify-content:center;font-size:36px;flex:none}
.chk.sm{font-size:33px;padding:19px 0}.chk.sm b{width:50px;height:50px;font-size:30px}
.note{font-size:21px;line-height:1.45;opacity:.75;margin-top:34px;max-width:900px}
.src{font-size:19px;letter-spacing:1px;opacity:.65;margin-top:30px}
.btn{display:inline-block;align-self:flex-start;background:${G};color:${N};padding:26px 38px;font-size:27px;letter-spacing:2px;font-weight:800;text-transform:uppercase;margin-top:36px;border-radius:8px}
.big{font-family:'Inter Display',Inter,sans-serif;font-weight:900;font-size:300px;line-height:.9;letter-spacing:-12px;color:${G}}
.bigl{font-size:40px;font-weight:700;line-height:1.25;margin-top:18px;max-width:860px}
.tags{display:flex;flex-wrap:wrap;gap:18px;margin-top:44px}
.tags span{background:${dark?'rgba(244,239,231,.1)':'#fff'};border:2px solid ${G};border-radius:60px;padding:18px 30px;font-size:36px;font-weight:700}
.tags span.more{background:${G};color:${N}}
.road{display:flex;gap:26px;margin-top:46px}
.road div{background:#1f4e9a;color:#fff;border:6px solid #fff;outline:3px solid #1f4e9a;border-radius:16px;padding:22px 44px;font-family:'Inter Display',Inter,sans-serif;font-weight:900;font-size:96px;letter-spacing:-2px;line-height:1}
.bridge{display:flex;align-items:center;margin-top:50px;gap:0}
.bridge .side{flex:1;border-radius:18px;padding:40px 30px;text-align:center;font-family:'Inter Display',Inter,sans-serif;font-weight:800;font-size:52px;letter-spacing:-1px}
.bridge .side.a{background:${dark?'rgba(244,239,231,.1)':'#fff'}}.bridge .side.z{background:${G};color:${N}}
.bridge .rio{width:170px;text-align:center;font-size:20px;letter-spacing:3px;text-transform:uppercase;font-weight:800;color:${G}}
.bridge .rio i{display:block;height:8px;background:${G};margin:12px 10px;border-radius:4px}
.xl h2{font-size:104px;letter-spacing:-3.5px}.xl p.b{font-size:46px}
.ai{position:absolute;top:96px;right:72px;font-size:16px;letter-spacing:2px;text-transform:uppercase;background:rgba(30,41,63,.7);color:${C};padding:8px 14px;border-radius:6px;z-index:3}
`;

function page(s, n, total, serie) {
  const dark = !!s.dark || !!s.foto;
  const prog = Array.from({length:total},(_,i)=>`<i class="${i<n?'on':''}"></i>`).join('');
  const f = s.foto;
  const bg = f ? `<div style="position:absolute;inset:0;background:url(${f.bg}) ${f.pos}/${f.size} no-repeat;z-index:0"></div><div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(30,41,63,.35) 0%,rgba(30,41,63,0) 18%,rgba(30,41,63,0) ${s.fade||36}%,rgba(30,41,63,.9) ${(s.fade||36)+22}%,${N} ${(s.fade||36)+36}%);z-index:0"></div>` : '';
  const right = s.btnfoot || (n===total ? 'Guarda e partilha' : 'Desliza →');
  return `<html><head><meta charset="utf-8"><style>${css(dark)}</style></head><body>${bg}${s.ghost?`<div class="ghost">${s.ghost}</div>`:''}<div class="wrap">
<div class="prog">${prog}</div><div class="hdr"${f?' style="visibility:hidden"':''}><span>Diogo Santos Real Estate</span><span>${serie}</span></div>
<div class="main${s.xl?' xl':''}"${f?' style="justify-content:flex-end;padding-bottom:52px"':''}>${s.html}</div>
<div class="foot"><img src="${dark?LOGO_W:LOGO}"><span class="h">@diogosantosrealestate</span><span class="chip">${right}</span></div>
</div></body></html>`;
}

const CAPAS = {
 'hospital-ribatejo': ['Santarém e região', `<span class="kick gold">Novo no Ribatejo</span><h1 style="font-size:110px">Abriu um hospital novo no <mark>Ribatejo.</mark></h1><p class="b" style="margin-top:26px;font-size:42px;font-weight:700">O que muda para quem vive cá?</p>`],
 'documentos-antes-de-anunciar': ['Vender sem sustos', `<span class="kick gold">Antes de anunciar</span><h1 style="font-size:100px">Vais vender casa? Tem isto pronto <mark>antes de anunciar.</mark></h1>`],
 'sopa-da-pedra': ['Viver em Almeirim', `<span class="kick gold">Dia de São Martinho</span><h1 style="font-size:106px">Porque é que Almeirim é a capital da <mark>sopa da pedra?</mark></h1>`],
 'visita-amanha': ['Vender sem sustos', `<span class="kick gold">Checklist de véspera</span><h1 style="font-size:108px">A tua casa tem visita amanhã? <mark>Faz isto hoje.</mark></h1>`],
 'almeirim-santarem': ['Santarém e região', `<span class="kick gold">Dois lados do Tejo</span><h1 style="font-size:116px">Viver em Almeirim, ter <mark>Santarém ao lado.</mark></h1>`],
 'almeirim-10-anos': ['Viver em Almeirim', `<span class="kick gold">O futuro da vila</span><h1 style="font-size:104px">Almeirim daqui a 10 anos: <mark>o que já está planeado.</mark></h1>`],
 'custos-de-vender': ['Vender sem sustos', `<span class="kick gold">Antes de pôr o preço</span><h1 style="font-size:100px">Quanto custa vender uma casa? <mark>Os custos de que ninguém fala.</mark></h1>`],
};

(async () => {
  const [slug, img, out, posY='0', zoom='100', posX='50'] = process.argv.slice(2);
  const [serie, html] = CAPAS[slug];
  const foto = {bg:b64(img, img.endsWith('.png')?'image/png':'image/jpeg'), pos:`${posX}% ${posY}%`, size:`${zoom}% auto`};
  const ai = `<div class="ai">Imagem criada com IA</div>`;
  const b = await chromium.launch();
  const p = await b.newPage({viewport:{width:1080,height:1350}});
  await p.setContent(page({foto, html}, 1, 7, serie).replace('<div class="wrap">', ai+'<div class="wrap">'), {waitUntil:'networkidle'});
  await p.evaluate(async () => { await document.fonts.ready; });
  await p.screenshot({path:`${out}.jpg`, type:'jpeg', quality:92});
  await b.close();
})();
