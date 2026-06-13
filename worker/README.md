# hector-chat-proxy

Cloudflare Worker that powers the "Ask me about Hector" chat widget on
[hectorhernandez.dev](https://www.hectorhernandez.dev). It keeps the LLM API key
server-side and protects against abuse:

- **CORS** locked to the site's origins (plus `localhost:8000` for dev)
- **Per-IP limit:** 10 messages/minute
- **Global daily cap:** 300 messages/day (hard cost ceiling ≈ $0.35/day worst case)
- **Input caps:** 500-char messages, 8 turns of history, 400 output tokens
- System prompt is hardcoded server-side — visitors can't override it

Provider is GLM-5.1 via Z.AI by default (OpenAI-compatible). Any OpenAI-compatible
provider (DeepSeek, bigmodel.cn, etc.) works by editing the two `[vars]` in
`wrangler.toml` and re-setting the secret.

## Deploy (one time)

```sh
npm install -g wrangler
wrangler login                              # opens browser

cd worker
wrangler kv namespace create RATE_KV        # paste the printed id into wrangler.toml
wrangler secret put LLM_API_KEY             # paste your Z.AI (GLM) API key
wrangler deploy                             # prints the worker URL
```

Then paste the worker URL + `/chat` into `CHAT_API_URL` at the top of `js/chat.js`.

## Local dev

```sh
cd worker
echo 'LLM_API_KEY=sk-...' > .dev.vars       # gitignored; local secret
wrangler dev                                # serves http://localhost:8787 (KV simulated)
```

Point `CHAT_API_URL` in `js/chat.js` at `http://localhost:8787/chat`, then serve
the site with `python3 -m http.server 8000` from the repo root.

## Quick tests

```sh
W=https://hector-chat-proxy.<subdomain>.workers.dev

# CORS reject (expect 403)
curl -si -X POST $W/chat -H 'Origin: https://evil.example' -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"hi"}]}' | head -1

# Happy path (expect 200 + reply)
curl -s -X POST $W/chat -H 'Origin: https://www.hectorhernandez.dev' -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"What does Hector do?"}]}'
```
