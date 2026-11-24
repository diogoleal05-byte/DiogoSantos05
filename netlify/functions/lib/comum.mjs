// Funções partilhadas: validação, resposta JSON e chamadas ao Twilio Verify.

export const json = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

// Só telemóveis portugueses (91, 92, 93, 96). Devolve +3519XXXXXXXX ou null.
export function normalizarTelemovel(v) {
  const d = String(v || '').replace(/[^\d+]/g, '').replace(/^(\+?351|00351)/, '');
  return /^9[1236]\d{7}$/.test(d) ? '+351' + d : null;
}

// Modo de teste local: só quando MODO_TESTE=1 e sem Twilio configurado. O código é 000000.
export const modoTeste = () => process.env.MODO_TESTE === '1' && !process.env.TWILIO_ACCOUNT_SID;

async function twilio(caminho, campos) {
  const { TWILIO_ACCOUNT_SID: sid, TWILIO_AUTH_TOKEN: token, TWILIO_VERIFY_SERVICE_SID: svc } = process.env;
  if (!sid || !token || !svc) throw new Error('Twilio não configurado');
  const res = await fetch(`https://verify.twilio.com/v2/Services/${svc}/${caminho}`, {
    method: 'POST',
    headers: {
      authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(campos),
  });
  const dados = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, dados };
}

export async function enviarCodigo(tel) {
  if (modoTeste()) return { ok: true };
  const r = await twilio('Verifications', { To: tel, Channel: 'sms', Locale: 'pt' });
  // 60203: demasiadas tentativas para este número.
  if (r.dados?.code === 60203) return { ok: false, erro: 'Pediu demasiados códigos. Tente daqui a 10 minutos.' };
  return r.ok ? { ok: true } : { ok: false, erro: 'Não foi possível enviar o SMS. Confirme o número.' };
}

export async function confirmarCodigo(tel, codigo) {
  if (modoTeste()) return codigo === '000000';
  const r = await twilio('VerificationCheck', { To: tel, Code: codigo });
  return r.ok && r.dados?.status === 'approved';
}
