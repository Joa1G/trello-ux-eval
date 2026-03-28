# Features & Tasks — Plataforma de Teste de Usabilidade Trello

> Cada feature representa uma entrega funcional independente.
> Tasks dentro de cada feature estão em ordem de execução sugerida.
> Prioridade: 🔴 Crítica · 🟡 Importante · 🟢 Desejável

---

## Feature 1 — Setup do Projeto e Infraestrutura

> Fundação técnica: criar o projeto Next.js, configurar ferramentas, preparar estrutura de pastas e deploy.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 1.1 | Criar projeto Next.js 14 com App Router, TypeScript e Tailwind CSS   | 🔴         |
| 1.2 | Instalar dependências: `framer-motion`, `zustand`, `xlsx`            | 🔴         |
| 1.3 | Instalar devDependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `playwright`, `@playwright/test` | 🔴 |
| 1.4 | Configurar Vitest (`vitest.config.ts`) com jsdom e path aliases      | 🔴         |
| 1.5 | Configurar Playwright (`playwright.config.ts`) com projeto Next.js   | 🟡         |
| 1.6 | Criar estrutura de pastas: `components/`, `lib/`, `__tests__/`       | 🔴         |
| 1.7 | Configurar fonte Inter via `next/font/google` no layout raiz         | 🟡         |
| 1.8 | Configurar Tailwind com paleta de cores customizada do projeto       | 🟡         |
| 1.9 | Criar `layout.tsx` raiz com metadata, fonte e container global       | 🔴         |
| 1.10 | Conectar repositório ao GitHub e fazer primeiro deploy na Vercel    | 🟡         |

**Critério de conclusão:** `npm run dev` funciona, `npm test` roda sem erro, deploy na Vercel responde com página em branco estilizada.

---

## Feature 2 — Zustand Store e Persistência com localStorage

> Gerenciamento de estado global: toda a lógica de armazenamento de respostas, sync com localStorage e reset.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 2.1 | Criar `lib/constants.ts` com todas as constantes: tarefas (T1–T5 com enunciados, complexidade, steps), itens SUS (10), pares AttrakDiff (28 com dimensões), categorias EmoCards (8) | 🔴 |
| 2.2 | Criar `lib/store.ts` com Zustand store contendo slices: `participant`, `emocards`, `sus`, `attrakdiff`, `journeymap`, `currentStep` | 🔴 |
| 2.3 | Implementar actions no store: `setParticipant()`, `setEmoCardResponse(tarefa, dados)`, `setSusResponse(item, valor)`, `setAttrakDiffResponse(item, valor)`, `setJourneyResponse(tarefa, dados)`, `nextStep()`, `prevStep()`, `reset()` | 🔴 |
| 2.4 | Implementar middleware Zustand `persist` para sync automático com localStorage | 🔴 |
| 2.5 | Implementar seletores derivados: `isStepComplete(step)` para validação por seção | 🟡 |
| 2.6 | Escrever testes unitários do store: atualização de estado, persistência, reset | 🔴 |

**Critério de conclusão:** store funciona isoladamente, testes passam, dados sobrevivem a refresh da página.

---

## Feature 3 — Wizard/Stepper de Navegação

> Estrutura de navegação entre as 6 etapas do formulário (Participante → EmoCards → SUS → AttrakDiff → Journey Map → Download).

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 3.1 | Criar página `app/formulario/page.tsx` como container do wizard      | 🔴         |
| 3.2 | Criar componente `FormStepper.tsx` com indicador visual de progresso (6 etapas com ícones e labels) | 🔴 |
| 3.3 | Implementar lógica de navegação: botões "Próximo" e "Voltar" controlados pelo `currentStep` do store | 🔴 |
| 3.4 | Implementar validação por etapa: "Próximo" desabilitado se campos obrigatórios incompletos | 🔴 |
| 3.5 | Adicionar transições animadas entre etapas com Framer Motion (slide + fade) | 🟡 |
| 3.6 | Exibir toast/mensagem de erro quando tentativa de avançar sem completar campos | 🟡 |
| 3.7 | Testar navegação: avanço, retorno, dados preservados ao voltar      | 🟡         |

**Critério de conclusão:** navegar entre todas as etapas (mesmo com conteúdo placeholder), barra de progresso atualiza, transições funcionam.

---

## Feature 4 — Tela Inicial: Dados do Participante

> Formulário de cadastro do participante com validação.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 4.1 | Criar componente `ParticipantForm.tsx`                               | 🔴         |
| 4.2 | Implementar campo "Identificador" (input texto, obrigatório)         | 🔴         |
| 4.3 | Implementar campo "Perfil" (radio: Novato / Experiente, obrigatório) | 🔴         |
| 4.4 | Implementar campo "Data" (preenchido automaticamente, editável)      | 🔴         |
| 4.5 | Implementar campo "Idade" (input numérico, opcional)                 | 🟢         |
| 4.6 | Implementar campo "Frequência de uso do Trello" (radio: Nunca usei / Uso raramente / Uso regularmente, obrigatório) | 🔴 |
| 4.7 | Adicionar aviso de privacidade: "Seus dados são anônimos e serão utilizados exclusivamente para fins acadêmicos" | 🟡 |
| 4.8 | Conectar campos ao Zustand store (`setParticipant`)                  | 🔴         |
| 4.9 | Estilizar com Tailwind: layout limpo, espaçamento, labels claros     | 🟡         |
| 4.10 | Escrever teste: preencher todos os campos → store atualizado → botão "Próximo" habilitado | 🟡 |

**Critério de conclusão:** formulário funcional e estilizado, dados salvos no store, validação impede avanço sem campos obrigatórios.

---

## Feature 5 — Formulário EmoCards

> Seção mais complexa visualmente: 8 cartões SVG estilo sketch, aplicados para cada tarefa (T1–T5) + experiência geral.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 5.1 | Criar os 8 SVGs de rostos emocionais estilo line-art/sketch (traço preto, fundo claro, sem emoji, sem cor nos rostos) seguindo o Circumplex de Russell | 🔴 |
| 5.2 | Criar componentes React para cada SVG (`faces/ExcitedNeutral.tsx`, etc.) com props de tamanho e seleção | 🔴 |
| 5.3 | Criar componente `EmoCard.tsx`: cartão individual com SVG + nome da categoria em PT + indicação do quadrante + estado selecionado/não-selecionado | 🔴 |
| 5.4 | Criar componente `CircumplexGrid.tsx`: layout dos 8 cartões em grade com indicação visual dos eixos (valência horizontal, ativação vertical) e cores por quadrante | 🔴 |
| 5.5 | Implementar seleção: clique em um cartão seleciona (com ring/borda animada), desseleciona o anterior | 🔴 |
| 5.6 | Adicionar micro-interações: hover com leve scale, transição suave na seleção | 🟡 |
| 5.7 | Criar componente `EmoCardsSection.tsx`: fluxo por tarefa — exibir nome + descrição da tarefa atual, grid de EmoCards, campo de comentário opcional, botão "Próxima tarefa" | 🔴 |
| 5.8 | Implementar sub-navegação interna: T1 → T2 → T3 → T4 → T5 → Geral, com indicador de progresso (ex: "Tarefa 3 de 5") | 🔴 |
| 5.9 | Exibir o enunciado resumido de cada tarefa (não o enunciado completo — apenas nome e descrição curta) para o participante saber qual tarefa está avaliando | 🟡 |
| 5.10 | Conectar seleções ao Zustand store (`setEmoCardResponse`) | 🔴 |
| 5.11 | Validação: não avançar de tarefa sem selecionar um cartão | 🔴 |
| 5.12 | Escrever testes: selecionar cartão → store atualiza com categoria, valência, ativação corretos | 🟡 |

**Critério de conclusão:** 8 SVGs renderizam corretamente, seleção funciona para as 6 coletas (5 tarefas + geral), dados salvos no store.

---

## Feature 6 — Formulário SUS (System Usability Scale)

> 10 afirmações com escala Likert de 5 pontos.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 6.1 | Criar componente `SusItem.tsx`: texto da afirmação + escala de 5 pontos com radio buttons estilizados | 🔴 |
| 6.2 | Estilizar escala: labels "Discordo totalmente" (1) e "Concordo totalmente" (5) nas extremidades, círculos clicáveis com feedback visual ao selecionar | 🔴 |
| 6.3 | Criar componente `SusSection.tsx`: renderizar os 10 itens em sequência com instruções no topo | 🔴 |
| 6.4 | Adicionar texto de instrução: "Para cada afirmação abaixo, marque o quanto você concorda ou discorda com base na sua experiência com o Trello" | 🟡 |
| 6.5 | Conectar respostas ao Zustand store (`setSusResponse`)               | 🔴         |
| 6.6 | Validação: todos os 10 itens devem ser respondidos para avançar      | 🔴         |
| 6.7 | Indicar visualmente quais itens ainda faltam responder               | 🟡         |
| 6.8 | Escrever testes: selecionar valor → store registra item e resposta corretos | 🟡 |

**Critério de conclusão:** 10 itens renderizados com escala funcional, validação impede avanço incompleto, dados no store.

---

## Feature 7 — Formulário AttrakDiff

> 28 pares de palavras opostas em escala -3 a +3, agrupados em 4 dimensões.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 7.1 | Criar componente `WordPairScale.tsx`: palavra esquerda + 7 círculos clicáveis (-3 a +3) + palavra direita, com ponto central (0) diferenciado | 🔴 |
| 7.2 | Estilizar escala: labels -3 a +3, hover nos círculos, estado selecionado com cor da dimensão | 🔴 |
| 7.3 | Criar componente `AttrakDiffSection.tsx`: renderizar os 28 pares agrupados por dimensão | 🔴 |
| 7.4 | Implementar headers de dimensão com cor e descrição: PQ (azul, #2563eb), HQ-I (roxo, #7c3aed), HQ-S (ciano, #0891b2), ATT (verde, #059669) | 🟡 |
| 7.5 | Adicionar texto de instrução no topo da seção                        | 🟡         |
| 7.6 | Conectar respostas ao Zustand store (`setAttrakDiffResponse`)        | 🔴         |
| 7.7 | Validação: todos os 28 pares devem ser respondidos para avançar      | 🔴         |
| 7.8 | Indicar visualmente quantos itens faltam por dimensão                | 🟢         |
| 7.9 | Escrever testes: selecionar valor no par → store registra dimensão, item e valor corretos | 🟡 |

**Critério de conclusão:** 28 pares renderizados em 4 grupos, escala funcional, validação completa, dados no store.

---

## Feature 8 — Formulário User Journey Map

> Experiência emocional e qualitativa por tarefa (sentimento, nota 1–5, comentário).

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 8.1 | Criar 3 SVGs simples de faces para sentimento: positiva (sorriso), neutra (reta), negativa (triste) — estilo line-art consistente com os EmoCards, sem emojis | 🔴 |
| 8.2 | Criar componente `TaskJourney.tsx`: nome da tarefa + badge de complexidade + 3 faces clicáveis + escala 1–5 + campo de comentário | 🔴 |
| 8.3 | Estilizar escala 1–5: círculos numerados clicáveis com cor ao selecionar | 🔴 |
| 8.4 | Criar componente `JourneyMapSection.tsx`: renderizar T1–T5 + Experiência Geral em sequência vertical | 🔴 |
| 8.5 | Adicionar campo final aberto: "Se pudesse mudar uma coisa no Trello, o que mudaria?" | 🔴 |
| 8.6 | Adicionar instrução no topo da seção                                 | 🟡         |
| 8.7 | Conectar respostas ao Zustand store (`setJourneyResponse`)           | 🔴         |
| 8.8 | Validação: sentimento e nota obrigatórios para cada tarefa; comentário e sugestão opcionais | 🔴 |
| 8.9 | Escrever testes: selecionar face + nota → store registra tarefa, sentimento e nota corretos | 🟡 |

**Critério de conclusão:** 6 blocos de tarefa renderizados, seleções funcionais, campo aberto presente, dados no store.

---

## Feature 9 — Exportação .xlsx e Tela Final

> Geração do arquivo Excel no navegador e tela de agradecimento com download.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 9.1 | Criar `lib/export-xlsx.ts`: função que lê todo o Zustand store e gera workbook com SheetJS | 🔴 |
| 9.2 | Implementar aba "Participante": identificador, perfil, data, idade, frequência | 🔴 |
| 9.3 | Implementar aba "EmoCards": uma linha por tarefa (T1–T5 + Geral) com categoria_numero, categoria_nome, valencia, ativacao, comentario | 🔴 |
| 9.4 | Implementar aba "SUS": uma linha por item (1–10) com item_numero, texto_afirmacao, resposta | 🔴 |
| 9.5 | Implementar aba "AttrakDiff": uma linha por par (1–28) com dimensao, item_numero, palavra_esquerda, palavra_direita, resposta | 🔴 |
| 9.6 | Implementar aba "UserJourneyMap": uma linha por tarefa (T1–T5 + Geral) com sentimento, nota, comentario + linha para sugestao_mudanca | 🔴 |
| 9.7 | Gerar nome do arquivo no padrão: `respostas_trello_{identificador}_{data}.xlsx` | 🟡 |
| 9.8 | Criar componente `ExportScreen.tsx`: mensagem de agradecimento + botão "Baixar respostas (.xlsx)" + instrução para enviar ao avaliador | 🔴 |
| 9.9 | Implementar botão "Revisar respostas" que permite voltar às seções anteriores | 🟡 |
| 9.10 | Adicionar animação de sucesso ao clicar em download (confetti ou checkmark) | 🟢 |
| 9.11 | Escrever testes: gerar .xlsx com dados mock → verificar que arquivo tem 5 abas, colunas corretas e dados batem | 🔴 |

**Critério de conclusão:** .xlsx gerado com 5 abas, dados corretos, download funciona, tela final estilizada.

---

## Feature 10 — Landing Page

> Tela de boas-vindas antes de iniciar o formulário.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 10.1 | Criar `app/page.tsx` como landing page                              | 🔴         |
| 10.2 | Exibir título do estudo, breve explicação do propósito e tempo estimado | 🔴      |
| 10.3 | Exibir contexto: "Avaliação de UX — Trello (Web) · IHC 2026-1"     | 🟡         |
| 10.4 | Botão CTA: "Iniciar Avaliação" → redireciona para `/formulario`     | 🔴         |
| 10.5 | Incluir aviso de anonimato e uso acadêmico dos dados                 | 🟡         |
| 10.6 | Estilizar com identidade visual do projeto: clean, profissional      | 🟡         |

**Critério de conclusão:** página bonita e informativa, botão leva ao formulário.

---

## Feature 11 — Polish Visual e Responsividade

> Refinamento visual, animações e garantia de funcionamento em diferentes telas.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 11.1 | Revisar espaçamentos, tipografia e hierarquia visual em todas as seções | 🟡      |
| 11.2 | Garantir responsividade em desktop (1280px+) e tablet (768px+)       | 🟡         |
| 11.3 | Testar e ajustar EmoCards grid em telas menores (pode mudar de circular para grade) | 🟡 |
| 11.4 | Garantir que AttrakDiff (28 pares) é scrollável e legível em telas menores | 🟡 |
| 11.5 | Adicionar transições Framer Motion em todos os componentes interativos | 🟢       |
| 11.6 | Adicionar skeleton/loading states se necessário                      | 🟢         |
| 11.7 | Revisar acessibilidade: `aria-label` em inputs, navegação por teclado (Tab + Enter), contraste WCAG AA | 🟡 |
| 11.8 | Testar fluxo completo em Chrome, Firefox e Safari                    | 🟡         |

**Critério de conclusão:** UI polida e consistente, funciona em desktop e tablet, acessível por teclado.

---

## Feature 12 — Testes E2E

> Testes end-to-end com Playwright para validar o fluxo completo do participante.

| #   | Task                                                                 | Prioridade |
|-----|----------------------------------------------------------------------|------------|
| 12.1 | Criar `e2e/full-flow.spec.ts`: fluxo feliz completo — preencher dados → EmoCards (6 coletas) → SUS (10 itens) → AttrakDiff (28 pares) → Journey Map (6 coletas) → download .xlsx | 🟡 |
| 12.2 | Verificar conteúdo do .xlsx baixado no teste E2E (abrir arquivo e checar abas/dados) | 🟢 |
| 12.3 | Criar `e2e/persistence.spec.ts`: preencher parcialmente → recarregar página → verificar dados restaurados | 🟡 |
| 12.4 | Criar `e2e/validation.spec.ts`: tentar avançar sem preencher → verificar que botão está desabilitado e mensagem de erro aparece | 🟢 |
| 12.5 | Rodar testes em viewport desktop (1280×720) e tablet (768×1024)      | 🟢         |

**Critério de conclusão:** todos os testes E2E passam, fluxo completo validado automaticamente.

---

## Ordem de Implementação Sugerida

```
Feature 1  → Setup do Projeto
Feature 2  → Zustand Store
Feature 10 → Landing Page (rápida, dá uma "cara" pro projeto)
Feature 3  → Wizard/Stepper
Feature 4  → Dados do Participante
Feature 5  → EmoCards (mais complexa — começar cedo)
Feature 6  → SUS
Feature 7  → AttrakDiff
Feature 8  → User Journey Map
Feature 9  → Exportação .xlsx + Tela Final
Feature 11 → Polish Visual
Feature 12 → Testes E2E
```

---

## Métricas do Projeto

| Métrica              | Valor          |
|----------------------|----------------|
| Total de features    | 12             |
| Total de tasks       | 93             |
| Tasks 🔴 Críticas    | 52             |
| Tasks 🟡 Importantes | 30             |
| Tasks 🟢 Desejáveis  | 11             |
