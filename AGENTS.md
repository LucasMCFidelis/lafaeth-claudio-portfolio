<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Lafaeth Claudio Portfolio

Portfólio do designer, ilustrador e quadrinista Lafaeth Claudio, com painel administrativo para o dono gerenciar o conteúdo.

- **Área pública** (`src/app/(layout)`): `/` (sobre + imagens em destaque), `/cores`, `/flat`, `/quadrinhos`, `/ilustracoes`.
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
   - `get-visible-colors.ts`: leitura pública em cache (`"use cache"` + `cacheLife` + `cacheTag`), só os itens visíveis na ordem salva (`displayOrder`)
   - `colors-dto.ts` + `map-to-color.ts`: converte a linha do banco no DTO exposto ao resto do app
   - Helpers comuns: `where-condition.ts`, `order-by-condition.ts` (tipos, seguros para o cliente), `query-builders.ts` (`buildWhere`/`buildOrderBy`, só servidor), `update-display-order-items.ts`
3. **Validação**: `src/app/data/schemas/cadastre-color-schema.ts`, `update-color-schema.ts` (Zod)
4. **Server Actions**: `src/actions/<verbo>-<entidade>/index.ts` com `"use server"` (ex.: `post-color`, `update-color`, `update-colors-order`). Leitura pública: `get-visible-colors` (filtro fixo, sem parâmetros). Leitura de admin: `get-colors`, `get-color` (exigem login).
5. **Contratos de query**: `src/queries/<entidade>.ts` (ex.: `colorsQueries`) com as keys hierárquicas (`["colors"]`, `["colors", "visible"]`, `["colors", "list", filtros]`, `["colors", "detail", id]`) e os `queryOptions`. Sem diretiva e sem imports `server-only`, para servidor e cliente usarem a mesma identidade. Tags de cache do servidor em `src/queries/tags.ts`.
6. **Hooks cliente**: `src/hooks/queries/use-<entidades>.ts` (finos, `useSuspenseQuery(colorsQueries.visible())`) e `src/hooks/mutations/use-*.ts`, que invalidam a key raiz da entidade no `onSuccess`.
7. **UI**: páginas em `src/app/**/page.tsx` (Server Components), componentes de rota em `src/app/**/components/`, compartilhados em `src/components/common/`, primitivas shadcn em `src/components/ui/`

### Carregamento de dados (Cache Components)

`cacheComponents` está ativo no `next.config.ts`. A página entrega os dados ao React Query com o `PrefetchBoundary` (`src/components/common/prefetch-boundary.tsx`), sempre dentro de `<Suspense>`:

```tsx
<Suspense fallback={<GridSkeleton />}>
  <PrefetchBoundary
    tags={[cacheTags.colors, cacheTags.images]} // só quando os fetchers são "use cache"
    queries={[{ queryKey: colorsQueries.keys.visible(), fetcher: getVisibleColorsCached }]}
  >
    <ColorsList variant="visible" />
  </PrefetchBoundary>
</Suspense>
```

- Páginas públicas usam leituras em cache e passam `tags`; assim entram no shell estático e o cliente não refaz a busca.
- Páginas do admin envolvem o conteúdo em `<AdminOnly>` (checa a sessão) e não passam `tags` (dados lidos na hora).
- Ler sessão, `headers()`, `cookies()` ou `searchParams` só dentro de `<Suspense>` (ex.: `ShowWhenLogged` no Header). Fora disso o Next acusa "blocking route" (ver `get_errors` do MCP).

Autenticação: `src/lib/auth.ts` (servidor), `src/lib/auth-client.ts` (cliente), rota `src/app/api/auth/[...all]/route.ts`. O `src/proxy.ts` (antigo middleware) redireciona `/admin` para o login quando não há cookie de sessão.

## Regras

- **Toda Server Action que altera dados** valida a entrada com o schema Zod **e** chama `verifyUserLogged()` (`src/app/data/user/verify-user.ts`) antes de tocar no banco. Server Actions são endpoints públicos; o proxy só checa se o cookie existe, então não serve como proteção.
- Toda Server Action de **leitura** que aceita filtros ou devolve itens ocultos também chama `verifyUserLogged()`. Leituras públicas têm filtro fixo.
- Páginas do admin envolvem o conteúdo em `<AdminOnly>` (`src/app/(no-layout)/admin/components/admin-only.tsx`), que chama `requireAdmin()` e redireciona para `/admin/auth`.
- **Toda Server Action que altera dados** chama `updateTag(cacheTags.<entidade>)` antes de retornar; ações sobre imagens usam `cacheTags.images` (todas as listas públicas também têm essa tag).
- Componentes cliente nunca importam `@/db` nem `src/app/data/*` com acesso ao banco; usam actions e DTOs.
- Query keys vêm dos contratos em `src/queries/` e incluem os filtros usados (`where`, `orderBy`). A invalidação após mutation fica no hook da mutation, pela key raiz da entidade.
- **Banco de dados:** mudanças no schema são aplicadas com `npx drizzle-kit push`, rodado pelo dono do projeto. Não usar `drizzle-kit generate`/`migrate` e não criar a pasta `drizzle/`.
- `src/components/ui/*` é código gerado pelo shadcn: editar só o mínimo necessário.
- Imagens remotas vêm do Google Drive (`next.config.ts` → `images.remotePatterns`); usar `next/image`. Toda `<Image fill>` recebe `sizes` (padrões em `src/helpers/image-sizes.ts`) e só as imagens da primeira dobra usam `imageLoadingProps(true)` (`loading="eager"` + `fetchPriority="high"`).
- Telas de toque não têm hover: o que aparece no hover precisa da variante `touch:` (`@media (hover: none)`, definida em `globals.css`).

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
- **Todo trabalho entra por pull request, nunca por merge local.** `feature/*` e `bugfix/*` abrem PR com **`--base develop`** (o padrão do GitHub neste repositório é a `main`). `release/*` e `hotfix/*` abrem um PR para a `main` e outro para a `develop`. O merge é feito no GitHub, com merge commit, para preservar o histórico da branch.
- O tipo do commit (`feat:`, `fix:`, `chore:`...) segue o conventional commits, independente do prefixo da branch. Ex.: `feature/upgrade-next-16` pode ter commits `chore:` e `fix:`.
- Antes de abrir o PR, a branch deve passar em `npm run typecheck` e `npm run lint`.
- Para abrir um PR: `git push -u origin <branch>` e `gh pr create --base develop --title "<tipo>: <resumo>" --body "<descrição>"`. O título segue o conventional commits, em inglês. A descrição traz o que mudou, o porquê e como testar.
- O agente só faz push da branch de apoio e abre o PR quando o dono do projeto pedir. Nunca faz merge de PR, nunca faz push em `main`/`develop` e nunca cria tags.

## Estado atual

- Páginas em andamento ficam com o link comentado em `src/components/common/menu-items-list.tsx`. Confira esse arquivo na branch atual: o conteúdo muda entre `main` e `develop`.
