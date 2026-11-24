import { json, normalizarTelemovel, confirmarCodigo, modoTeste } from './lib/comum.mjs';
import { calcularEstimativa } from './lib/estimativa.mjs';
import { CONCELHOS } from './lib/precos.mjs';

const ESTADOS = { novo: 'Novo (até 5 anos)', renovado: 'Renovado', bom: 'Bom estado', obras_ligeiras: 'Precisa de obras ligeiras', obras_profundas: 'Precisa de obras profundas' };
const PRAZOS = { ja: 'Quer vender nos próximos 3 meses', meses: 'Pensa vender dentro de 3 a 12 meses', curiosidade: 'Só quer saber o valor' };
const euros = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €';
const limpar = (v, n = 200) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, n);

// Guarda o contacto como envio do formulário "estimativas" do Netlify.
// O Netlify manda-o por email ao Diogo (Forms → Form notifications).
async function guardarContacto(campos) {
  const base = process.env.URL;
  if (!base || modoTeste()) { console.log('Contacto (teste):', campos); return; }
  const res = await fetch(base + '/', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ 'form-name': 'estimativas', ...campos }),
  });
  if (!res.ok) console.error('Netlify Forms respondeu', res.status);
}

export default async (req) => {
  if (req.method !== 'POST') return json(405, { erro: 'Método não permitido' });
  const b = await req.json().catch(() => ({}));
  const tel = normalizarTelemovel(b.telemovel);
  const codigo = String(b.codigo || '').replace(/\D/g, '');
  if (!tel || codigo.length !== 6) return json(400, { erro: 'O código tem 6 dígitos.' });
  if (b.consentimento !== true) return json(400, { erro: 'Precisa de aceitar a política de privacidade.' });

  let valido = false;
  try { valido = await confirmarCodigo(tel, codigo); }
  catch (e) { console.error(e); return json(500, { erro: 'Não foi possível confirmar o código. Tente outra vez.' }); }
  if (!valido) return json(400, { erro: 'Código errado ou expirado. Confirme ou peça outro.' });

  const r = b.respostas || {};
  const est = calcularEstimativa(r);
  const concelho = CONCELHOS[r.concelho]?.nome || limpar(r.outroConcelho, 80) || 'Outro';

  try {
    await guardarContacto({
      nome: limpar(b.nome, 80),
      telemovel: tel,
      email: limpar(b.email, 120),
      concelho,
      freguesia: limpar(r.freguesia, 80),
      tipo: r.tipo === 'moradia' ? 'Moradia' : 'Apartamento',
      tipologia: limpar(r.tipologia, 10),
      area: limpar(r.area, 10) + ' m²',
      andar: r.tipo === 'apartamento' ? limpar(r.andar, 5) : '',
      estado: ESTADOS[r.estado] || '',
      extras: (Array.isArray(r.extras) ? r.extras : []).map(x => limpar(x, 20)).join(', '),
      prazo: PRAZOS[r.prazo] || '',
      estimativa: est ? `${euros(est.minimo)} a ${euros(est.maximo)}` : 'Sem estimativa (concelho fora da tabela)',
      consentimento: 'Sim, ' + new Date().toISOString(),
    });
  } catch (e) { console.error('Falhou guardar contacto', e); }

  return json(200, { ok: true, estimativa: est });
};
