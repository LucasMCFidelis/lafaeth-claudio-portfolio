@AGENTS.md

## Claude Code

- Antes de concluir uma tarefa que altera código: `npm run typecheck` e `npm run lint` sem erros.
- Com o dev server rodando, verifique pelo MCP `next-devtools` (`get_errors`, `compile_route`) em vez de rodar `next build`.
- Não ler nem editar arquivos `.env*`; consulte `.env.example` para saber quais variáveis existem.
