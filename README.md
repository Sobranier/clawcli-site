# openclaw-cli.app — Website

Landing page for **openclaw-cli**.

## Domain

- Production: https://openclaw-cli.app

## Local Preview

```bash
cd clawcli-site
python3 -m http.server 8080
# open http://localhost:8080
```

## Routes

- `/` landing page
- `/api/stats` npm stats (Cloudflare Pages Functions)
- `/api/health` health check

## Redirects

- `/docs` -> https://docs.openclaw.ai
- `/github` -> https://github.com/Sobranier/openclaw-cli
- `/npm` -> https://www.npmjs.com/package/openclaw-cli
