// Mediana do valor de venda por m² (€/m²) de alojamentos familiares, por concelho.
// Fonte: INE, Estatísticas de Preços da Habitação ao nível local,
// 2.º trimestre de 2026 (vendas dos últimos 12 meses, julho 2025 a junho 2026).
// Só valores de VENDA (INE). Nunca misturar com preços pedidos (idealista).
// Para atualizar: trocar os números e a data em FONTE quando o INE publicar o trimestre seguinte.

export const FONTE = 'INE, mediana das vendas por m², 12 meses até junho de 2026';

// existentes = casas usadas; novos = construção nova. null = INE não publica.
export const CONCELHOS = {
  // Ribatejo
  almeirim:            { nome: 'Almeirim',            zona: 'ribatejo', existentes: 1529, novos: 1835 },
  santarem:            { nome: 'Santarém',            zona: 'ribatejo', existentes: 1597, novos: 1572 },
  alpiarca:            { nome: 'Alpiarça',            zona: 'ribatejo', existentes: 1356, novos: null },
  cartaxo:             { nome: 'Cartaxo',             zona: 'ribatejo', existentes: 1623, novos: 1508 },
  salvaterra:          { nome: 'Salvaterra de Magos', zona: 'ribatejo', existentes: 1847, novos: 1888 },
  coruche:             { nome: 'Coruche',             zona: 'ribatejo', existentes: 1333, novos: 1450 },
  chamusca:            { nome: 'Chamusca',            zona: 'ribatejo', existentes: 836,  novos: null },
  benavente:           { nome: 'Benavente',           zona: 'ribatejo', existentes: 2170, novos: 2211 },
  'rio-maior':         { nome: 'Rio Maior',           zona: 'ribatejo', existentes: 1371, novos: 1230 },
  golega:              { nome: 'Golegã',              zona: 'ribatejo', existentes: 1294, novos: null },
  alenquer:            { nome: 'Alenquer',            zona: 'ribatejo', existentes: 2077, novos: 1748 },
  azambuja:            { nome: 'Azambuja',            zona: 'ribatejo', existentes: 2011, novos: 2082 },
  // Lisboa e Sintra
  lisboa:              { nome: 'Lisboa',              zona: 'lisboa',   existentes: 5030, novos: 6434 },
  sintra:              { nome: 'Sintra',              zona: 'lisboa',   existentes: 3058, novos: 3226 },
  cascais:             { nome: 'Cascais',             zona: 'lisboa',   existentes: 4854, novos: 5260 },
  oeiras:              { nome: 'Oeiras',              zona: 'lisboa',   existentes: 4306, novos: 4819 },
  amadora:             { nome: 'Amadora',             zona: 'lisboa',   existentes: 3360, novos: 2784 },
  odivelas:            { nome: 'Odivelas',            zona: 'lisboa',   existentes: 3562, novos: 3712 },
  loures:              { nome: 'Loures',              zona: 'lisboa',   existentes: 3330, novos: 3733 },
  mafra:               { nome: 'Mafra',               zona: 'lisboa',   existentes: 3004, novos: 3017 },
  'vila-franca':       { nome: 'Vila Franca de Xira', zona: 'lisboa',   existentes: 2952, novos: 3155 },
};
