# Plataforma Web de Formulários para Teste de Usabilidade — Trello (IHC 2026-1)

## Visão Geral do Projeto

Criar uma aplicação web moderna e visualmente polida para aplicar formulários de avaliação de UX durante testes de usabilidade do **Trello (Web)**. A plataforma será construída com **Next.js** e hospedada na **Vercel**.

A plataforma contém **4 formulários** que o participante preenche sequencialmente após realizar tarefas no Trello. As respostas são persistidas e exportadas como **arquivo .xlsx**.

---

## Arquitetura e Stack Tecnológica

### Stack Principal

- **Next.js 14+ (App Router)** — framework React com file-based routing, SSR/SSG
- **React 18+** — componentes, estado, hooks
- **Tailwind CSS** — estilização utility-first para UI limpa e responsiva
- **Framer Motion** — animações e transições suaves entre etapas
- **SheetJS (xlsx)** — geração de arquivo `.xlsx` no client-side
- **Vercel** — deploy automático via push no GitHub

### Persistência de Dados

- Respostas mantidas em **Zustand store** (estado global React) durante a sessão
- **localStorage** como fallback (resiliente a refresh acidental da página)
- No final, o participante **baixa o .xlsx** e envia ao avaliador
- Zero backend, zero configuração de servidor, zero custo

### Dependências npm

```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "tailwindcss": "^3",
    "framer-motion": "^11",
    "xlsx": "^0.18",
    "zustand": "^4"
  },
  "devDependencies": {
    "vitest": "^2",
    "@testing-library/react": "^16",
    "@testing-library/jest-dom": "^6",
    "@testing-library/user-event": "^14",
    "jsdom": "^25",
    "playwright": "^1",
    "@playwright/test": "^1"
  }
}
```

### Testes

A estratégia de testes combina **testes unitários/integração** (Vitest + Testing Library) com **testes E2E** (Playwright).

#### Vitest + React Testing Library (unitários e integração)

Testar comportamento dos componentes e lógica de negócio:

- **Componentes de formulário**: seleção de EmoCard atualiza o store, escala Likert do SUS registra valor correto, AttrakDiff salva -3 a +3, Journey Map salva sentimento + nota
- **Validação**: botão "Próximo" desabilitado até campos obrigatórios preenchidos, mensagens de erro exibidas
- **Zustand store**: estado atualiza corretamente ao preencher cada seção, `localStorage` sync funciona, dados persistem após simular refresh
- **Exportação .xlsx**: arquivo gerado contém as 5 abas corretas, dados batem com o que foi preenchido, nome do arquivo segue o padrão esperado
- **Navegação do wizard**: avanço e retorno entre etapas preservam dados

#### Playwright (E2E)

Testar o fluxo completo do participante no navegador real:

- **Fluxo feliz completo**: preencher dados → EmoCards (5 tarefas + geral) → SUS (10 itens) → AttrakDiff (28 pares) → Journey Map → download do .xlsx → verificar conteúdo do arquivo baixado
- **Persistência**: preencher parcialmente, recarregar página, verificar que dados foram restaurados do `localStorage`
- **Responsividade**: executar o fluxo em viewport desktop e tablet

#### Estrutura de arquivos de teste

```
__tests__/
├── components/
│   ├── EmoCard.test.tsx
│   ├── SusItem.test.tsx
│   ├── WordPairScale.test.tsx
│   └── TaskJourney.test.tsx
├── lib/
│   ├── store.test.ts
│   └── export-xlsx.test.ts
└── e2e/
    ├── full-flow.spec.ts
    └── persistence.spec.ts
```

#### Scripts npm

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:all": "vitest run && playwright test"
  }
}
```

---

## Estrutura dos Formulários

O fluxo do participante é:

```
[Tela Inicial: Dados do Participante]
        ↓
[1. EmoCards — após cada tarefa]
        ↓
[2. Questionário SUS — 10 itens]
        ↓
[3. AttrakDiff — 28 pares de palavras]
        ↓
[4. User Journey Map — experiência por tarefa]
        ↓
[Tela Final: Download do .xlsx com todas as respostas]
```

### Dados do Participante (tela inicial)

Campos a coletar antes de iniciar os formulários:

- **Identificador** (código ou iniciais — NÃO nome completo, para anonimato)
- **Perfil**: Novato / Experiente (radio button)
- **Data**: preenchida automaticamente (editável)
- **Idade** (opcional)
- **Frequência de uso do Trello**: Nunca usei / Uso raramente / Uso regularmente

---

## Definição das Tarefas do Teste de Usabilidade

As tarefas foram elaboradas como cenários realistas, sem terminologia específica da interface do Trello (Rubin & Chisnell, 2008). O cenário contínuo é: estudante universitário organizando atividades acadêmicas do semestre. Complexidade progressiva.

### T1 — Criar e organizar o espaço de trabalho (Média · 3 steps)

**Enunciado:**
> Imagine que você é um estudante universitário e precisa organizar suas atividades acadêmicas do semestre. Você decidiu experimentar o Trello para gerenciar suas tarefas e prazos de forma mais organizada.
>
> Para começar, você precisa:
> 1. Criar um espaço para organizar suas atividades acadêmicas. O nome pode ser "Minhas Atividades".
> 2. Dentro desse espaço, organizar como as atividades serão acompanhadas. A ideia é ter três etapas: as tarefas que ainda precisam ser feitas, as que já estão sendo realizadas e as que já foram concluídas.
> 3. Registrar a primeira atividade do semestre. Crie uma tarefa chamada "Escrever introdução do relatório" e coloque-a na etapa das atividades que precisam ser feitas.

**Funcionalidades testadas:** Quadro, listas, cartão

### T2 — Detalhar a atividade e configurar o acompanhamento de prazo (Alta · 3 steps)

**Enunciado:**
> Agora que a atividade "Escrever introdução do relatório" já foi registrada, você precisa completá-la com mais informações para não esquecer os detalhes.
>
> Faça o seguinte:
> 1. Acesse a atividade que você acabou de criar e adicione uma explicação sobre o que deve ser feito. A descrição é: "Redigir a introdução do relatório técnico com contextualização do tema e objetivos do trabalho."
> 2. O prazo de entrega dessa atividade é na próxima sexta-feira. Registre essa informação.
> 3. Para garantir que você não esqueça, configure um aviso para ser lembrado com 1 dia de antecedência da data de entrega.

**Funcionalidades testadas:** Edição de cartão, datas, lembrete

### T3 — Dividir a atividade em etapas e acompanhar o progresso (Alta · 3 steps)

**Enunciado:**
> A atividade "Escrever introdução do relatório" é composta por várias etapas menores. Para acompanhar o progresso de cada uma, você quer criar uma lista de verificação dentro dessa atividade.
>
> Faça o seguinte:
> 1. Acesse a atividade "Escrever introdução do relatório" e crie uma lista de verificação chamada "Etapas da introdução".
> 2. Adicione os seguintes itens à lista de verificação:
>    - "Pesquisar referências bibliográficas"
>    - "Escrever a contextualização do tema"
>    - "Definir os objetivos do trabalho"
>    - "Revisar e formatar o texto"
> 3. Imagine que você já concluiu a pesquisa de referências bibliográficas. Marque esse item como concluído.

**Funcionalidades testadas:** Checklist, progresso parcial

### T4 — Categorizar atividades com etiquetas e filtrar por categoria (Alta · 4 steps)

**Enunciado:**
> Conforme o semestre avança, você percebe que precisa categorizar suas atividades para distinguir as que são de uma matéria e as que são de outra. Para isso, você quer usar etiquetas coloridas.
>
> Faça o seguinte:
> 1. Primeiro, crie mais uma atividade na lista de tarefas a serem feitas. O nome é "Resolver lista de exercícios de Cálculo".
> 2. Agora, você quer diferenciar as atividades por matéria. Acesse o cartão "Escrever introdução do relatório" e atribua a ele uma etiqueta. Escolha a cor verde e nomeie a etiqueta como "IHC".
> 3. Em seguida, acesse o cartão "Resolver lista de exercícios de Cálculo" e atribua uma etiqueta de cor azul com o nome "Cálculo".
> 4. Por último, você quer visualizar apenas as atividades da matéria "IHC". Utilize o recurso de filtro do quadro para exibir somente os cartões que possuem a etiqueta "IHC".

**Funcionalidades testadas:** Etiquetas, personalização, filtro

### T5 — Atualizar o andamento e reorganizar as atividades (Média · 4 steps)

**Enunciado:**
> Algum tempo se passou e o andamento das suas atividades mudou. Você precisa atualizar o quadro para refletir a situação atual.
>
> Faça o seguinte:
> 1. Antes de tudo, se houver algum filtro ativo no quadro, remova-o para que todas as atividades voltem a aparecer.
> 2. A atividade "Escrever introdução do relatório" já foi iniciada. Mova esse cartão para a lista de atividades em andamento.
> 3. Agora, imagine que você terminou completamente a introdução do relatório. Mova o cartão para a lista de atividades concluídas.
> 4. Como a atividade já foi finalizada e você não precisa mais vê-la no quadro, arquive esse cartão para manter o quadro limpo e organizado.

**Funcionalidades testadas:** Filtro, drag-and-drop, arquivamento

### Resumo e Mapeamento

| Tarefa | Complexidade | Steps | Funcionalidades testadas                    |
|--------|-------------|-------|---------------------------------------------|
| T1     | Média       | 3     | Quadro, listas, cartão                      |
| T2     | Alta        | 3     | Edição de cartão, datas, lembrete           |
| T3     | Alta        | 3     | Checklist, progresso parcial                |
| T4     | Alta        | 4     | Etiquetas, personalização, filtro           |
| T5     | Média       | 4     | Filtro, drag-and-drop, arquivamento         |

---

## 1. EmoCards (Desmet et al., 2001)

### Fundamentação Teórica

O método EmoCards utiliza **16 cartões ilustrados** (8 expressões emocionais × 2 gêneros: masculino e feminino) baseados no **Circumplex de Russell (1980)**. As emoções variam em duas dimensões:

- **Eixo horizontal (Valência/Prazer)**: Desagradável ← → Agradável
- **Eixo vertical (Ativação/Arousal)**: Calmo ← → Excitado

### As 8 Categorias Emocionais (octantes do circumplex)

| # | Categoria (EN)      | Categoria (PT)            | Valência      | Ativação    |
|---|---------------------|---------------------------|---------------|-------------|
| 1 | Excited Neutral     | Excitado Neutro           | Neutra        | Alta        |
| 2 | Excited Pleasant    | Excitado Agradável        | Agradável     | Alta        |
| 3 | Average Pleasant    | Moderado Agradável        | Agradável     | Média       |
| 4 | Calm Pleasant       | Calmo Agradável           | Agradável     | Baixa       |
| 5 | Calm Neutral        | Calmo Neutro              | Neutra        | Baixa       |
| 6 | Calm Unpleasant     | Calmo Desagradável        | Desagradável  | Baixa       |
| 7 | Average Unpleasant  | Moderado Desagradável     | Desagradável  | Média       |
| 8 | Excited Unpleasant  | Excitado Desagradável     | Desagradável  | Alta        |

### Implementação Visual — ATENÇÃO ESPECIAL

**NÃO usar emojis.** Os cartões devem ser ilustrações estilo desenho/cartoon de rostos (tipo sketch/line-art), fiéis ao estilo original dos EmoCards de Desmet.

Referência visual: a imagem enviada mostra o layout circular com 8 posições, cada uma com 2 cartões (masculino/feminino). Na implementação web:

- Renderizar os rostos como **SVGs desenhados à mão** (estilo line-art/sketch com traços pretos sobre fundo claro)
- Cada rosto deve transmitir a emoção correspondente através de: posição das sobrancelhas, formato dos olhos, curvatura da boca, inclinação da cabeça
- Dispor os 8 cartões (ou 16, se incluir ambos gêneros) em layout **circular/radial** que reflita o circumplex, OU em **grade 2×4** com indicação clara dos eixos de valência e ativação
- Cada cartão deve ser **clicável/selecionável** com destaque visual ao selecionar
- Exibir o nome da categoria em português abaixo de cada cartão

### Fluxo de Aplicação dos EmoCards

Os EmoCards são aplicados **após cada tarefa** do teste de usabilidade. As 5 tarefas são:

| Tarefa | Descrição resumida                                  | Complexidade | Steps |
|--------|------------------------------------------------------|-------------|-------|
| T1     | Criar quadro + listas + primeiro cartão              | Média       | 3     |
| T2     | Descrição + data de entrega + lembrete               | Alta        | 3     |
| T3     | Criar checklist + adicionar itens + marcar concluído | Alta        | 3     |
| T4     | Criar cartão + etiquetas + nomear + filtrar          | Alta        | 4     |
| T5     | Remover filtro + mover cartões + arquivar            | Média       | 4     |

Mais uma coleta final:
- **Experiência geral** — após todas as tarefas

**Para cada tarefa**, o participante:
1. Vê o nome da tarefa e sua descrição
2. Seleciona **1 cartão** dentre os 8 (ou 16 se usar ambos gêneros)
3. Opcionalmente escreve um comentário
4. Avança para a próxima tarefa

### Dados a Armazenar (EmoCards)

Para cada tarefa + experiência geral:
- `tarefa`: identificador (T1–T5, Geral)
- `categoria_numero`: 1–8
- `categoria_nome`: nome em PT
- `valencia`: "agradável" | "neutra" | "desagradável"
- `ativacao`: "alta" | "média" | "baixa"
- `genero_cartao`: "masculino" | "feminino" (se aplicável)
- `comentario`: texto livre

---

## 2. Questionário SUS (System Usability Scale)

### Fundamentação

O SUS (Brooke, 1996) é composto por **10 afirmações** com escala Likert de 5 pontos (1 = Discordo totalmente, 5 = Concordo totalmente). Itens ímpares são positivos, pares são negativos.

### Os 10 Itens (tradução para PT-BR)

1. Eu acho que gostaria de usar o Trello com frequência.
2. Eu achei o Trello desnecessariamente complexo.
3. Eu achei o Trello fácil de usar.
4. Eu acho que precisaria de ajuda de uma pessoa técnica para usar o Trello.
5. Eu achei que as diversas funções do Trello estavam bem integradas.
6. Eu achei que havia muita inconsistência no Trello.
7. Eu imagino que a maioria das pessoas aprenderiam a usar o Trello rapidamente.
8. Eu achei o Trello muito complicado de usar.
9. Eu me senti muito confiante ao usar o Trello.
10. Eu precisei aprender muitas coisas antes de conseguir usar o Trello.

### Implementação Visual

- Cada item exibido com texto da afirmação
- Escala visual de 5 pontos: radio buttons estilizados ou slider discreto
- Labels nas extremidades: "Discordo totalmente" (1) e "Concordo totalmente" (5)
- Indicar claramente o número do item
- **NÃO calcular o score SUS na tela** (isso será feito na análise posterior)

### Dados a Armazenar (SUS)

Para cada item 1–10:
- `item_numero`: 1–10
- `resposta`: 1–5

---

## 3. AttrakDiff (Hassenzahl, Burmester & Koller, 2003)

### Fundamentação

O AttrakDiff é composto por **28 pares de palavras opostas** em escala de 7 pontos (-3 a +3), distribuídos em 4 dimensões:

- **PQ — Qualidade Pragmática** (7 itens): usabilidade e funcionalidade
- **HQ-I — Qualidade Hedônica – Identidade** (7 itens): identificação com o produto
- **HQ-S — Qualidade Hedônica – Estimulação** (7 itens): novidade e estímulo
- **ATT — Atratividade** (7 itens): valor global percebido

### Os 28 Pares de Palavras

**PQ (Qualidade Pragmática):**
1. Técnico ↔ Humano
2. Complicado ↔ Simples
3. Impraticável ↔ Prático
4. Imprevisível ↔ Previsível
5. Confuso ↔ Claro
6. Desordenado ↔ Organizado
7. Intimidante ↔ Acolhedor

**HQ-I (Qualidade Hedônica — Identidade):**
8. Isolador ↔ Integrador
9. Amador ↔ Profissional
10. Cafona ↔ Elegante
11. Barato ↔ Premium
12. Alienante ↔ Envolvente
13. Me afasta ↔ Me aproxima
14. Desvalorizante ↔ Valorizante

**HQ-S (Qualidade Hedônica — Estimulação):**
15. Convencional ↔ Original
16. Sem imaginação ↔ Criativo
17. Cauteloso ↔ Ousado
18. Entediante ↔ Cativante
19. Pouco exigente ↔ Desafiador
20. Comum ↔ Inovador
21. Conservador ↔ Inventivo

**ATT (Atratividade):**
22. Desagradável ↔ Agradável
23. Feio ↔ Bonito
24. Desanimador ↔ Motivador
25. Ruim ↔ Bom
26. Repulsivo ↔ Atraente
27. Desmotivante ↔ Estimulante
28. Rejeitável ↔ Desejável

### Implementação Visual

- Cada par exibido em uma linha com a palavra negativa à esquerda e positiva à direita
- 7 radio buttons (ou círculos clicáveis) entre os pares, representando -3, -2, -1, 0, +1, +2, +3
- O ponto central (0) deve ter destaque visual sutil (neutro)
- Agrupar por dimensão com título e cor diferenciada:
  - PQ: azul (#2563eb)
  - HQ-I: roxo (#7c3aed)
  - HQ-S: ciano (#0891b2)
  - ATT: verde (#059669)
- Incluir breve descrição de cada dimensão

### Dados a Armazenar (AttrakDiff)

Para cada par 1–28:
- `dimensao`: "PQ" | "HQ-I" | "HQ-S" | "ATT"
- `item_numero`: 1–28
- `palavra_esquerda`: texto
- `palavra_direita`: texto
- `resposta`: -3 a +3

---

## 4. User Journey Map

### Fundamentação

O Mapa de Jornada do Usuário captura a experiência emocional e qualitativa do participante ao longo das tarefas do teste.

### Implementação

Para cada tarefa (T1–T5) + Experiência Geral:
- **Sentimento**: Positiva / Neutra / Negativa (3 opções com ícones — aqui pode usar faces simples estilizadas, mas NÃO emojis Unicode)
- **Nota**: escala 1–5 (clicável)
- **Comentário**: campo de texto livre ("Por quê? Palavra ou frase curta")

Pergunta final aberta:
- "Se pudesse mudar uma coisa no Trello, o que mudaria?"

### Dados a Armazenar (User Journey Map)

Para cada tarefa + geral:
- `tarefa`: T1–T5, Geral
- `sentimento`: "positiva" | "neutra" | "negativa"
- `nota`: 1–5
- `comentario`: texto livre

Campo final:
- `sugestao_mudanca`: texto livre

---

## Exportação dos Dados

### Formato de Saída

Ao final de todos os formulários, gerar um **arquivo .xlsx** usando **SheetJS (xlsx.js)** com as seguintes abas/planilhas:

1. **Participante** — dados cadastrais (identificador, perfil, data, idade, frequência)
2. **EmoCards** — uma linha por tarefa (T1–T5 + Geral) com categoria, valência, ativação, comentário
3. **SUS** — uma linha por item (1–10) com resposta
4. **AttrakDiff** — uma linha por par (1–28) com dimensão, palavras, resposta
5. **UserJourneyMap** — uma linha por tarefa (T1–T5 + Geral) com sentimento, nota, comentário + linha extra para sugestão

### Nome do Arquivo

Formato: `respostas_trello_{identificador}_{data}.xlsx`

Exemplo: `respostas_trello_P01_2026-03-28.xlsx`

### Fluxo de Download

- Ao concluir o último formulário, exibir tela de agradecimento
- Botão "Revisar respostas" (opcional, permite voltar e corrigir)
- Botão principal: **"Baixar respostas (.xlsx)"** — gera o arquivo no navegador e inicia download
- Instruir o participante: "Envie este arquivo ao avaliador por e-mail ou WhatsApp"

---

## Design e UX da Plataforma

### Princípios Visuais

- **Clean e minimalista** — foco no conteúdo dos formulários, sem distrações
- **Tipografia**: Inter (via `next/font/google` — carregamento otimizado)
- **Cores neutras** com acentos por seção (cada formulário com cor temática)
- **Responsivo** — funcionar bem em desktop e tablet (mobile é secundário mas desejável)
- **Progresso visível** — stepper horizontal com ícones + barra de progresso animada
- **Transições suaves** — Framer Motion para entrada/saída de cada seção (slide + fade)
- **Micro-interações** — hover nos EmoCards com leve scale, seleção com ring animado, feedback visual ao selecionar opções no AttrakDiff/SUS

### Paleta de Cores Sugerida

- Background: `#f8fafc`
- Texto principal: `#1a1a2e`
- Cards/containers: `#ffffff` com sombra sutil
- EmoCards: verde/azul/amarelo/vermelho para os 4 quadrantes do circumplex
- SUS: `#6366f1` (indigo)
- AttrakDiff: conforme dimensões (azul, roxo, ciano, verde)
- User Journey Map: `#f59e0b` (amber)

### Navegação

- **Wizard/stepper** — uma seção por vez com transição animada, botões "Próximo" e "Voltar"
- Validação antes de avançar (todos os campos obrigatórios preenchidos) com toast/snackbar de erro
- Dados salvos no **Zustand store** em tempo real + sync com `localStorage` a cada avanço (resiliente a refresh)
- Ao retornar a uma seção, mostrar respostas já preenchidas
- Botão "Próximo" desabilitado até validação OK (com indicação visual do que falta)

---

## Estrutura de Arquivos do Projeto (Next.js App Router)

```
trello-ux-eval/
├── app/
│   ├── layout.tsx              # Layout raiz (fontes, metadata)
│   ├── page.tsx                # Landing page / tela de boas-vindas
│   └── formulario/
│       └── page.tsx            # Wizard principal (SPA com stepper)
├── components/
│   ├── ui/                     # Componentes genéricos (Button, Card, Progress, etc.)
│   ├── stepper/
│   │   └── FormStepper.tsx     # Navegação wizard entre etapas
│   ├── participant/
│   │   └── ParticipantForm.tsx # Dados do participante
│   ├── emocards/
│   │   ├── EmoCardsSection.tsx # Seção completa EmoCards
│   │   ├── EmoCard.tsx         # Componente individual de cartão
│   │   ├── CircumplexGrid.tsx  # Layout circular/grade dos cartões
│   │   └── faces/              # SVGs inline dos 8 (ou 16) rostos
│   │       ├── ExcitedNeutral.tsx
│   │       ├── ExcitedPleasant.tsx
│   │       ├── AveragePleasant.tsx
│   │       ├── CalmPleasant.tsx
│   │       ├── CalmNeutral.tsx
│   │       ├── CalmUnpleasant.tsx
│   │       ├── AverageUnpleasant.tsx
│   │       └── ExcitedUnpleasant.tsx
│   ├── sus/
│   │   ├── SusSection.tsx      # Seção completa SUS
│   │   └── SusItem.tsx         # Item individual com escala Likert
│   ├── attrakdiff/
│   │   ├── AttrakDiffSection.tsx
│   │   └── WordPairScale.tsx   # Par de palavras com escala -3 a +3
│   ├── journeymap/
│   │   ├── JourneyMapSection.tsx
│   │   └── TaskJourney.tsx     # Experiência por tarefa
│   └── export/
│       └── ExportScreen.tsx    # Tela final com download + agradecimento
├── lib/
│   ├── store.ts                # Zustand store (estado global das respostas)
│   ├── export-xlsx.ts          # Lógica de geração do .xlsx
│   └── constants.ts            # Tarefas, itens SUS, pares AttrakDiff, categorias EmoCards
├── public/
│   └── fonts/                  # Fontes locais (se não usar Google Fonts CDN)
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── README.md
```

---

## Notas Importantes

### Sobre os EmoCards — SVGs dos Rostos

Os rostos dos EmoCards devem ser desenhados como **SVGs estilo sketch/cartoon** (traço preto, fundo branco/creme), semelhantes à imagem de referência original de Desmet (2001). Cada rosto precisa:

- Ter **formato oval** para a cabeça
- Variar **sobrancelhas** (arqueadas para cima = surpresa/excitação, para baixo = raiva/frustração, retas = neutro)
- Variar **olhos** (arregalados = excitado, semicerrados = calmo, apertados = desagradável)
- Variar **boca** (sorriso = agradável, reta = neutro, curvada para baixo = desagradável, aberta = excitado)
- Não usar cores nos rostos — apenas **linhas pretas** sobre fundo claro
- Cada SVG deve ter no mínimo ~120×150px de viewBox

Se incluir versões masculino/feminino: adicionar diferenciadores sutis (ex: cabelo mais longo para feminino), mantendo as mesmas expressões emocionais.

### Sobre o SUS

- O questionário SUS é padronizado. Não alterar a redação dos itens.
- Não calcular o score na interface do participante.
- Os itens devem ser apresentados na ordem original (1 a 10).

### Sobre Acessibilidade

- Labels `aria-label` em todos os inputs
- Navegação por teclado (Tab + Enter para selecionar)
- Contraste de cores adequado (WCAG AA)
- Texto alternativo nos SVGs dos EmoCards

### Sobre Privacidade

- Nenhum dado é enviado a servidor — tudo roda localmente no navegador
- O arquivo .xlsx fica apenas no computador do participante
- Exibir aviso na tela inicial: "Seus dados são anônimos e serão utilizados exclusivamente para fins acadêmicos"

---

## Deploy na Vercel

### Setup Inicial

```bash
npx create-next-app@latest trello-ux-eval --typescript --tailwind --app --src-dir=false
cd trello-ux-eval
npm install framer-motion zustand xlsx
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom playwright @playwright/test
npx playwright install
```

### Deploy

1. Push do repositório para o GitHub
2. Conectar o repositório na Vercel (vercel.com → New Project → Import)
3. Deploy automático a cada push na `main`

### URL Final

A Vercel gera uma URL tipo: `trello-ux-eval.vercel.app`

---

## Referências Bibliográficas

- Desmet, P.M.A., Overbeeke, C.J., & Tax, S.J.E.T. (2001). Designing products with added emotional value: development and application of an approach for research through design. *The Design Journal*, 4(1), 32-47.
- Russell, J.A. (1980). A circumplex model of affect. *Journal of Personality and Social Psychology*, 39, 1161-1178.
- Brooke, J. (1996). SUS: A "quick and dirty" usability scale. In P.W. Jordan et al. (Eds.), *Usability Evaluation in Industry*, pp. 189-194.
- Hassenzahl, M., Burmester, M., & Koller, F. (2003). AttrakDiff: Ein Fragebogen zur Messung wahrgenommener hedonischer und pragmatischer Qualität. In *Mensch & Computer 2003*, pp. 187-196.
- Rubin, J., & Chisnell, D. (2008). *Handbook of Usability Testing: How to Plan, Design, and Conduct Effective Tests*. 2. ed. Indianapolis: Wiley Publishing.

---

## Contexto Acadêmico

- **Disciplina**: Interação Humano-Computador (IHC) — IFAM 2026-1
- **Professor**: Fabiann Matthaus
- **Produto avaliado**: Trello (versão Web)
- **Cenário**: Estudante universitário organizando tarefas acadêmicas do semestre
- **Tarefas**: 5 tarefas (T1–T5) com complexidade progressiva (Média → Alta → Alta → Alta → Média)
