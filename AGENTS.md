<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Lafaeth Claudio Portfolio

Portfólio do designer, ilustrador e quadrinista Lafaeth Claudio, com painel administrativo para o dono gerenciar o conteúdo.

- **Área pública** (`src/app/(layout)`): `/` (sobre + imagens em destaque), `/cores`, `/flat`, `/quadrinhos`.
- **Galeria** (`src/app/(no-layout)/gallery`): visualização das imagens em tela cheia.
- **Admin** (`src/app/(no-layout)/admin`): login em `/admin/auth`; cadastro, edição e ordenação (drag and drop) de imagens, cores, flats e quadrinhos; edição do perfil.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 + shadcn/ui (`new-york`, ícones lucide) · Drizzle ORM + Postgres (Neon) · better-auth (email e senha) · TanStack Query · nuqs · react-hook-form + Zod 4 · dnd-kit · sonner.

## Comandos

- `npm run dev`: servidor de desenvolvimento
- `npm run build`: build de produção (precisa do `.env`)
- `npm run lint`: ESLint (`eslint .`; o `next lint` não existe mais no Next 16)
- `npm run typecheck`: `tsc --noEmit`

Node 24 ou superior (campo `engines` do `package.json`). Variáveis de ambiente em `.env.example`.

## Arquitetura

Cada recurso (cores, quadrinhos, flats, imagens, usuário) segue as mesmas camadas. Exemplo com cores:

1. **Schema**: `src/db/schema.ts` (`colorizationTable`). Conexão em `src/db/index.ts`.
2. **Dados** (só servidor): `src/app/data/colorization/`
   - `get-many-colors.ts`, `get-one-color.ts`: consultas Drizzle com `import "server-only"`
   - `colors-dto.ts` + `map-to-color.ts`: converte a linha do banco no DTO exposto ao resto do app
   - Helpers comuns: `where-condition.ts`, `order-by-condition.ts`, `update-display-order-items.ts`
3. **Validação**: `src/app/data/schemas/cadastre-color-schema.ts`, `update-color-schema.ts` (Zod)
4. **Server Actions**: `src/actions/<verbo>-<entidade>/index.ts` com `"use server"` (ex.: `post-color`, `update-color`, `update-colors-order`, `get-colors`)
5. **Hooks cliente**: `src/hooks/queries/use-*.ts` e `src/hooks/mutations/use-*.ts` (React Query), cada um exportando sua função `get*QueryKey`
6. **UI**: páginas em `src/app/**/page.tsx` (Server Components que buscam os dados iniciais), componentes de rota em `src/app/**/components/`, compartilhados em `src/components/common/`, primitivas shadcn em `src/components/ui/`

Autenticação: `src/lib/auth.ts` (servidor), `src/lib/auth-client.ts` (cliente), rota `src/app/api/auth/[...all]/route.ts`. O `src/proxy.ts` (antigo middleware) redireciona `/admin` para o login quando não há cookie de sessão.

## Regras

- **Toda Server Action que altera dados** valida a entrada com o schema Zod **e** chama `verifyUserLogged()` (`src/app/data/user/verify-user.ts`) antes de tocar no banco. Server Actions são endpoints públicos; o proxy só checa se o cookie existe, então não serve como proteção.
- Páginas do admin também chamam `verifyUserLogged()` e redirecionam para `/admin/auth`.
- Componentes cliente nunca importam `@/db` nem `src/app/data/*` com acesso ao banco; usam actions e DTOs.
- Query keys são únicas por entidade e incluem os filtros usados (`where`, `orderBy`). Após uma mutation, invalidar as keys afetadas.
- **Banco de dados:** mudanças no schema são aplicadas com `npx drizzle-kit push`, rodado pelo dono do projeto. Não usar `drizzle-kit generate`/`migrate` e não criar a pasta `drizzle/`.
- `src/components/ui/*` é código gerado pelo shadcn: editar só o mínimo necessário.
- Imagens remotas vêm do Google Drive (`next.config.ts` → `images.remotePatterns`); usar `next/image`.

## Convenções

- Arquivos e pastas em kebab-case; componentes React em PascalCase.
- Textos da interface, rotas e mensagens de validação em português (pt-BR); nomes no código em inglês.
- Imports ordenados pelo `simple-import-sort` (`npm run lint -- --fix` corrige).
- Commits em inglês no padrão conventional commits: `feat:`, `fix:`, `chore:`, `style:`, `docs:`, `refactor:`.

## Fluxo de trabalho (git flow)

O projeto segue o git flow, com duas branches permanentes:

- `main`: código em produção. Só recebe merge de `release/*` e `hotfix/*`, sempre com tag de versão.
- `develop`: integração do que está em desenvolvimento. É a base de todo trabalho novo.

Branches de apoio, sempre em kebab-case e com o prefixo do tipo:

| Prefixo | Sai de | Volta para | Uso |
| --- | --- | --- | --- |
| `feature/<nome>` | `develop` | `develop` | Funcionalidade nova, refatoração, estilo, dependências, docs |
| `bugfix/<nome>` | `develop` | `develop` | Correção de bug ainda não publicado |
| `release/<versão>` | `develop` | `main` e `develop` | Preparar uma publicação (ajustes finais e versão) |
| `hotfix/<nome>` | `main` | `main` e `develop` | Correção urgente em produção |

Regras:

- Nunca commitar direto em `main` nem em `develop`: criar a branch de apoio a partir da `develop` (ou da `main`, no caso de `hotfix`).
- Uma branch por assunto. Misturar tarefas diferentes na mesma branch dificulta revisar e desfazer.
- Merge na `develop` por pull request, com **`--base develop`** (o padrão do GitHub neste repositório é a `main`) e merge commit (`--no-ff`) para preservar o histórico da branch.
- O tipo do commit (`feat:`, `fix:`, `chore:`...) segue o conventional commits, independente do prefixo da branch. Ex.: `feature/upgrade-next-16` pode ter commits `chore:` e `fix:`.
- Antes de abrir o PR, a branch deve passar em `npm run typecheck` e `npm run lint`.
- O agente não faz push, não faz merge em `main`/`develop` e não cria tags sem o pedido explícito do dono do projeto.

## Estado atual

- Páginas em andamento ficam com o link comentado em `src/components/common/menu-items-list.tsx`. Confira esse arquivo na branch atual: o conteúdo muda entre `main` e `develop`.
