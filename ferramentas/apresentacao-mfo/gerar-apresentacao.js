// Apresentação pessoal para proprietários MFO (PDF vertical para telemóvel + PNG por página)
// Uso: node gerar-apresentacao.js <ribatejo|lisboa> <pasta_saida>
const { chromium } = require(process.env.PW || '/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const ZONA = process.argv[2] || 'ribatejo';
const OUT = process.argv[3] || path.join(__dirname, ZONA);
fs.mkdirSync(OUT, { recursive: true });

const img = (p, t = 'jpeg') => `data:image/${t};base64,` + fs.readFileSync(p).toString('base64');
const M = process.env.ASSETS || '/mnt/project-files/marca';
const F = process.env.ASSETS ? (n, d) => `${M}/${n}` : (n, d) => `${d}/${n}`;
const LOGO = img(`${M}/logotipo-diogo-santos-dourado.png`, 'png');
const LOGO_W = img(`${M}/logotipo-diogo-santos-branco.png`, 'png');
const CAPA = img(process.env.CAPA || path.join(__dirname, 'capa-ia.jpg'));
const NAVY = img(F('diogo-fato-navy-fundo-claro.jpg', `${M}/fotos`));
const RETRATO = img(F('diogo-retrato.jpg', '/mnt/project-files/conteudo/relatorios-proprietarios'));
const REL = img(path.join(__dirname, 'relatorio-amostra.jpg'));
const QR = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(__dirname, 'qr-whatsapp.svg')).toString('base64');
const PLAYFAIR = fs.readFileSync(F('playfair-inline.css', `${M}/template`), 'utf8');

const zona = {
  ribatejo: 'Estou a mudar-me para o Ribatejo. É aqui que quero viver e trabalhar.',
  lisboa: 'Ajudo cada vez mais pessoas a mudar-se de Lisboa para o Ribatejo. Conheço os dois lados.',
}[ZONA];

const legal = 'RE/MAX G4 New Cycle · New Cycle - Mediação Imobiliária, Lda. · AMI n.º 7095 · Cada agência é jurídica e financeiramente independente.';
const ft = (n, dark) => `<div class="ft ${dark ? 'dk' : ''}"><img src="${dark ? LOGO_W : LOGO}"><span>${n} / 6</span></div>`;

const pages = [
  // 1. Capa
  `<section class="p capa">
    <div class="bg" style="background-image:url(${CAPA})"></div><div class="grad"></div>
    <div class="txt">
      <div class="eb">Consultor imobiliário RE/MAX</div>
      <h1>A tua casa está à venda.<br><em>Porque é que ainda não vendeu?</em></h1>
      <p>Antes de baixares o preço ou mudares de agência, dá-me 1 minuto.</p>
    </div>
    ${ft(1, true)}
  </section>`,

  // 2. Quem sou
  `<section class="p quem">
    <div class="foto" style="background-image:url(${NAVY})"></div>
    <div class="col">
      <div class="eb">Quem sou</div>
      <h2>Olá, sou o <em>Diogo.</em></h2>
      <p>Trabalho no imobiliário há 6 anos, numa equipa com 20 anos de experiência.</p>
      <p>Sou focado em <b>encontrar a solução</b> e em ajudar as pessoas. Não te digo o que queres ouvir. Digo-te o que está a travar a venda e o que fazemos a seguir.</p>
      <p class="z">${zona}</p>
    </div>
    <div class="kpis">
      <div><b>6</b><span>anos no imobiliário</span></div>
      <div><b>20</b><span>anos de experiência da equipa</span></div>
      <div><b>45</b><span>dias, a minha média de venda</span></div>
    </div>
    ${ft(2)}
  </section>`,

  // 3. Porque não vende
  `<section class="p navy">
    <div class="eb">O que costuma acontecer</div>
    <h2>Quase nunca é a casa.<br><em>É a forma como está a ser vendida.</em></h2>
    <ol class="lista">
      <li><b>Preço</b><span>Foi definido há meses. O mercado mexeu, o anúncio não.</span></li>
      <li><b>Fotos e anúncio</b><span>Iguais a tantos outros. Ninguém pára para ver.</span></li>
      <li><b>Visitas</b><span>Acontecem, mas ninguém te diz o que os compradores acharam.</span></li>
      <li><b>Acompanhamento</b><span>Passam semanas sem saberes em que ponto está.</span></li>
    </ol>
    <p class="nota">Se te revês em pelo menos um destes pontos, há margem para mudar o resultado.</p>
    ${ft(3, true)}
  </section>`,

  // 4. Como trabalho
  `<section class="p metodo">
    <div class="eb">Como trabalho</div>
    <h2>Quatro passos. <em>Sem surpresas.</em></h2>
    <div class="passos">
      <div><i>01</i><b>Ouvir</b><span>O que aconteceu até agora e o que precisas.</span></div>
      <div><i>02</i><b>Analisar</b><span>Preço, concorrência e o que os compradores estão a ver.</span></div>
      <div><i>03</i><b>Ajustar</b><span>Anúncio, fotos, estratégia. Com números, não com palpites.</span></div>
      <div><i>04</i><b>Acompanhar</b><span>Um relatório de 15 em 15 dias. Sabes sempre o que se passa.</span></div>
    </div>
    <div class="rel">
      <img src="${REL}">
      <div class="cap"><b>O relatório que recebes</b>Visualizações, contactos, visitas, o que disseram os compradores e o próximo passo.</div>
    </div>
    ${ft(4)}
  </section>`,

  // 5. Prova
  `<section class="p caso">
    <div class="eb">Um caso recente</div>
    <h2>Mais de um ano à venda.<br><em>Vendida em 40 dias.</em></h2>
    <div class="antes">
      <div><small>Antes</small><b>+1 ano</b><span>no mercado</span></div>
      <div><small>Antes</small><b>3</b><span>agências diferentes</span></div>
    </div>
    <div class="depois"><small>Connosco</small><b>40 dias</b><span>até à venda</span></div>
    <p>Uma moradia que já tinha passado por três agências. Olhámos para tudo de novo, mudámos o que estava a falhar e vendemo-la em 40 dias.</p>
    ${ft(5)}
  </section>`,

  // 6. Fecho
  `<section class="p navy fecho">
    <img class="ret" src="${RETRATO}">
    <h2>Vamos falar<br><em>15 minutos?</em></h2>
    <p>Contas-me o que aconteceu até agora. Eu digo-te, com franqueza, o que faria. Se fizer sentido, avançamos. Se não, ficas com uma segunda opinião.</p>
    <div class="ct">
      <img class="qr" src="${QR}">
      <div><b>Diogo Santos</b>Consultor imobiliário RE/MAX<br>916 945 324<br>dglsantos@remax.pt<br>@diogosantosrealestate<small>Aponta a câmara para falar comigo no WhatsApp</small></div>
    </div>
    <div class="legal">${legal}</div>
    ${ft(6, true)}
  </section>`,
];

const css = `${PLAYFAIR}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@page{size:1080px 1350px;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
:root{--n:#1e293f;--g:#bc8345;--c:#f6f2ec;--l:rgba(30,41,63,.16)}
body{font-family:Inter,sans-serif;color:var(--n);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.p{width:1080px;height:1350px;position:relative;overflow:hidden;padding:96px 88px;background:var(--c);page-break-after:always}
.p:last-child{page-break-after:auto}
.eb{color:var(--g);font-size:21px;letter-spacing:4px;text-transform:uppercase;font-weight:600;margin-bottom:26px}
h1,h2{font-family:'Playfair Display',serif;font-weight:500;line-height:1.08}
h1 em,h2 em{font-style:italic;color:var(--g)}
h2{font-size:76px;margin-bottom:44px}
p{font-size:31px;line-height:1.5}
.ft{position:absolute;left:88px;right:88px;bottom:52px;display:flex;justify-content:space-between;align-items:center;font-size:20px;letter-spacing:3px;border-top:1px solid var(--l);padding-top:22px}
.ft img{height:74px}
.ft.dk{border-color:rgba(246,242,236,.25);color:var(--c)}
.navy{background:var(--n);color:var(--c)}
/* capa */
.capa{padding:0;background:var(--n)}
.capa .bg{position:absolute;inset:-40px 0 260px 0;background-size:cover;background-position:center top}
.capa .grad{position:absolute;inset:0;background:linear-gradient(180deg,rgba(30,41,63,0) 30%,rgba(30,41,63,.85) 58%,var(--n) 72%)}
.capa .txt{position:absolute;left:88px;right:88px;bottom:170px;color:var(--c)}
.capa h1{font-size:88px;margin-bottom:30px}
.capa p{font-size:32px;opacity:.9}
/* quem */
.quem .foto{position:absolute;right:0;top:0;width:430px;height:1010px;background-size:cover;background-position:center 8%}
.quem .col{width:520px}
.quem h2{font-size:80px}
.quem p{font-size:29px;margin-bottom:24px}
.quem p.z{border-left:4px solid var(--g);padding-left:22px;font-style:italic;font-family:'Playfair Display',serif;font-size:30px}
.kpis{position:absolute;left:88px;right:88px;bottom:175px;display:grid;grid-template-columns:repeat(3,1fr);border-top:2px solid var(--n);border-bottom:2px solid var(--n);background:var(--c)}
.kpis div{padding:26px 20px 26px 0}
.kpis div+div{border-left:1px solid var(--l);padding-left:26px}
.kpis b{font-family:'Playfair Display',serif;font-size:72px;font-weight:600;line-height:1;display:block}
.kpis div:last-child b{color:var(--g)}
.kpis span{font-size:19px;letter-spacing:2px;text-transform:uppercase;font-weight:600;display:block;margin-top:10px;line-height:1.35}
/* lista */
.lista{list-style:none;counter-reset:a}
.lista li{counter-increment:a;display:grid;grid-template-columns:80px 1fr;row-gap:6px;padding:30px 0;border-top:1px solid rgba(246,242,236,.2)}
.lista li::before{content:"0" counter(a);grid-row:span 2;font-family:'Playfair Display',serif;color:var(--g);font-size:44px;line-height:1}
.lista b{font-size:34px;font-weight:600}
.lista span{font-size:28px;opacity:.82;line-height:1.4}
.nota{margin-top:36px;font-family:'Playfair Display',serif;font-style:italic;font-size:33px;color:var(--g)}
/* metodo */
.passos{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.passos div{background:#fff;padding:28px 30px;border-left:4px solid var(--g)}
.passos i{font-style:normal;font-family:'Playfair Display',serif;color:var(--g);font-size:30px}
.passos b{display:block;font-size:32px;margin:6px 0 8px}
.passos span{font-size:24px;line-height:1.4;opacity:.85}
.rel{display:flex;gap:40px;align-items:center;margin-top:40px}
.rel img{width:290px;margin-left:14px;box-shadow:0 18px 40px rgba(30,41,63,.25);transform:rotate(-3deg);border:1px solid var(--l)}
.rel .cap{font-size:26px;line-height:1.45}
.rel .cap b{display:block;font-family:'Playfair Display',serif;font-size:36px;font-weight:500;margin-bottom:10px;color:var(--g)}
/* caso */
.antes{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.antes div,.depois{padding:30px 34px}
.antes div{background:#fff;opacity:.85}
.caso small{display:block;font-size:19px;letter-spacing:4px;text-transform:uppercase;font-weight:600;color:var(--g);margin-bottom:8px}
.caso b{font-family:'Playfair Display',serif;font-size:80px;font-weight:600;line-height:1;display:block}
.caso .antes b{opacity:.55}
.caso span{font-size:26px}
.depois{background:var(--n);color:var(--c);margin:22px 0 44px}
.depois b{font-size:130px;color:var(--g)}
/* fecho */
.fecho{text-align:left}
.fecho .ret{width:190px;height:190px;border-radius:50%;border:4px solid var(--g);object-fit:cover;margin-bottom:40px}
.fecho h2{font-size:86px}
.fecho p{opacity:.9}
.ct{display:flex;gap:40px;align-items:center;margin-top:50px;background:var(--c);color:var(--n);padding:34px}
.qr{width:210px;height:210px}
.ct div{font-size:26px;line-height:1.5}
.ct b{display:block;font-family:'Playfair Display',serif;font-size:40px;font-weight:500}
.ct small{display:block;font-size:19px;color:var(--g);margin-top:10px;font-weight:600}
.legal{position:absolute;left:88px;right:88px;bottom:150px;font-size:16px;opacity:.6;line-height:1.4}
`;

(async () => {
  const html = `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><style>${css}</style></head><body>${pages.join('')}</body></html>`;
  fs.writeFileSync(path.join(OUT, 'pagina.html'), html);
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await pg.setContent(html, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: path.join(OUT, `diogo-santos-apresentacao-${ZONA}.pdf`), width: '1080px', height: '1350px', printBackground: true });
  const secs = await pg.$$('section');
  for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: path.join(OUT, `slide-${i + 1}.png`) });
  await b.close();
  fs.unlinkSync(path.join(OUT, 'pagina.html'));
  console.log('ok', OUT);
})();
