# Site Diogo Santos

Site pessoal (HTML e CSS simples, sem dependências).

- `index.html`: página principal.
- `quanto-vale/`: página "Quanto vale a sua casa?" (perguntas, código SMS, estimativa).
- `privacidade/`: política de privacidade (RGPD).
- `img/`: fotos e logotipos.

## Alojamento: Netlify

O site está preparado para o Netlify (ver `netlify.toml` na raiz do repositório).
A pasta publicada continua a ser `docs/`. As funções estão em `netlify/functions/`:

- `enviar-codigo`: envia o código SMS pelo Twilio Verify (só telemóveis portugueses).
- `verificar-codigo`: confirma o código, calcula a estimativa e guarda o contacto
  no formulário `estimativas` do Netlify (que o envia por email).
- `lib/precos.mjs`: tabela de €/m² por concelho (INE, vendas). Atualizar a cada trimestre.
- `lib/estimativa.mjs`: ajustes por estado, extras e área.

Variáveis de ambiente no Netlify (Site configuration → Environment variables):
`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID`.

Teste local sem Twilio: `MODO_TESTE=1 netlify dev` (o código aceite é `000000`).
