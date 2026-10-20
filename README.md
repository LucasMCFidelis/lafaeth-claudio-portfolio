# Lafaeth Claudio Portfolio

Portfólio do designer, ilustrador e quadrinista Lafaeth Claudio, com painel administrativo para gerenciar imagens, cores, flats e quadrinhos.

Feito com Next.js 16, React 19, Tailwind CSS 4 + shadcn/ui, Drizzle ORM (Postgres/Neon) e better-auth.

## Setup

```bash
nvm use            # Node 24
npm install
cp .env.example .env   # preencha as variáveis
npx drizzle-kit push   # aplica o schema no banco
npm run dev
```

Acesse http://localhost:3000. O painel fica em `/admin`.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos |

## Arquitetura e convenções

Ver [AGENTS.md](AGENTS.md), que também serve de contexto para agentes de IA (Claude Code, Copilot, Cursor).
