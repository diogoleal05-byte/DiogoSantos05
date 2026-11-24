import { json, normalizarTelemovel, enviarCodigo } from './lib/comum.mjs';

export default async (req) => {
  if (req.method !== 'POST') return json(405, { erro: 'Método não permitido' });
  const b = await req.json().catch(() => ({}));
  if (b.website) return json(200, { ok: true });            // armadilha para robôs
  const tel = normalizarTelemovel(b.telemovel);
  if (!tel) return json(400, { erro: 'Indique um telemóvel português (9 dígitos, começa por 91, 92, 93 ou 96).' });
  if (b.consentimento !== true) return json(400, { erro: 'Precisa de aceitar a política de privacidade.' });
  try {
    const r = await enviarCodigo(tel);
    return r.ok ? json(200, { ok: true }) : json(429, { erro: r.erro });
  } catch (e) {
    console.error(e);
    return json(500, { erro: 'O envio de SMS está indisponível. Fale comigo pelo WhatsApp.' });
  }
};
