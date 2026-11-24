import { CONCELHOS, FONTE } from './precos.mjs';

// Ajustes simples sobre a mediana do concelho. São regras do Diogo, não do INE:
// mudar aqui se a experiência no terreno disser outra coisa.
const ESTADO = { novo: 0, renovado: 0.06, bom: 0, obras_ligeiras: -0.10, obras_profundas: -0.25 };

export function calcularEstimativa(r) {
  const c = CONCELHOS[r.concelho];
  if (!c) return null;
  const area = Number(r.area);
  if (!(area >= 20 && area <= 2000)) return null;

  const novo = r.estado === 'novo';
  let m2 = novo && c.novos ? c.novos : c.existentes;
  let ajuste = ESTADO[r.estado] ?? 0;

  const extras = Array.isArray(r.extras) ? r.extras : [];
  if (extras.includes('garagem')) ajuste += 0.03;
  if (extras.includes('exterior')) ajuste += 0.03;          // varanda, terraço ou quintal
  if (r.tipo === 'moradia' && extras.includes('piscina')) ajuste += 0.05;
  if (r.tipo === 'apartamento' && extras.includes('sem_elevador') && Number(r.andar) >= 3) ajuste -= 0.05;

  // Casas grandes vendem-se a menos por m²; casas pequenas a mais.
  if (area < 50) ajuste += 0.05;
  else if (area > 300) ajuste -= 0.15;
  else if (area > 200) ajuste -= 0.08;

  m2 = m2 * (1 + ajuste);
  const centro = m2 * area;
  const arred = v => Math.round(v / 5000) * 5000;
  return {
    concelho: c.nome,
    m2Concelho: novo && c.novos ? c.novos : c.existentes,
    m2Ajustado: Math.round(m2),
    minimo: arred(centro * 0.9),
    maximo: arred(centro * 1.1),
    fonte: FONTE,
  };
}
