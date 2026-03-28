# Plataforma de Formulários — Teste de Usabilidade do Trello

Aplicação web para aplicar formulários de avaliação de UX durante testes de usabilidade do **Trello (Web)**, desenvolvida para a disciplina de Interação Humano-Computador (IHC) — IFAM 2026-1.

## Sobre o Projeto

A plataforma guia o participante por **4 formulários** sequenciais após a realização de 5 tarefas no Trello. As respostas são mantidas localmente no navegador e exportadas como arquivo `.xlsx` ao final.

### Formulários

1. **EmoCards** — Avaliação emocional após cada tarefa (baseado no Circumplex de Russell)
2. **SUS (System Usability Scale)** — 10 itens com escala Likert de 5 pontos
3. **AttrakDiff** — 28 pares de palavras opostas em 4 dimensões (PQ, HQ-I, HQ-S, ATT)
4. **User Journey Map** — Sentimento, nota e comentário por tarefa

### Fluxo do Participante

```
Dados do Participante → EmoCards (5 tarefas + geral) → SUS → AttrakDiff → Journey Map → Download .xlsx
```

## Stack Tecnológica

- **Next.js 14** (App Router) — Framework React
- **React 18** — Componentes e estado
- **Tailwind CSS** — Estilização
- **Framer Motion** — Animações e transições
- **Zustand** — Estado global + sync com localStorage
- **SheetJS (xlsx)** — Geração do arquivo .xlsx no client-side

## Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servir build de produção |
| `npm run lint` | Lint com ESLint |
| `npm test` | Testes unitários (Vitest, watch mode) |
| `npm run test:run` | Testes unitários (execução única) |
| `npm run test:e2e` | Testes E2E (Playwright) |
| `npm run test:all` | Todos os testes |

## Privacidade

- Nenhum dado é enviado a servidor — tudo roda localmente no navegador
- O arquivo `.xlsx` fica apenas no computador do participante
- Dados anônimos, utilizados exclusivamente para fins acadêmicos

## Contexto Acadêmico

- **Disciplina**: Interação Humano-Computador (IHC) — IFAM 2026-1
- **Professor**: Fabiann Matthaus
- **Produto avaliado**: Trello (versão Web)
