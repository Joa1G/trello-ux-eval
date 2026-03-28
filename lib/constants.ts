// ===== TAREFAS DO TESTE DE USABILIDADE =====

export interface Tarefa {
  id: string
  nome: string
  descricaoResumida: string
  descricaoCompleta: string
  complexidade: 'Média' | 'Alta'
  steps: number
  funcionalidades: string
}

export const TAREFAS: Tarefa[] = [
  {
    id: 'T1',
    nome: 'Criar e organizar o espaço de trabalho',
    descricaoResumida: 'Criar quadro, listas e primeiro cartão',
    descricaoCompleta:
      'Criar um espaço para organizar atividades acadêmicas ("Minhas Atividades"), organizar em três etapas (a fazer, em andamento, concluídas) e criar a primeira tarefa.',
    complexidade: 'Média',
    steps: 3,
    funcionalidades: 'Quadro, listas, cartão',
  },
  {
    id: 'T2',
    nome: 'Detalhar a atividade e configurar prazo',
    descricaoResumida: 'Descrição, data de entrega e lembrete',
    descricaoCompleta:
      'Acessar o cartão criado, adicionar descrição, definir prazo de entrega para a próxima sexta-feira e configurar lembrete de 1 dia antes.',
    complexidade: 'Alta',
    steps: 3,
    funcionalidades: 'Edição de cartão, datas, lembrete',
  },
  {
    id: 'T3',
    nome: 'Dividir a atividade em etapas',
    descricaoResumida: 'Criar checklist, adicionar itens e marcar concluído',
    descricaoCompleta:
      'Criar checklist "Etapas da introdução" com 4 itens e marcar o primeiro como concluído.',
    complexidade: 'Alta',
    steps: 3,
    funcionalidades: 'Checklist, progresso parcial',
  },
  {
    id: 'T4',
    nome: 'Categorizar atividades com etiquetas',
    descricaoResumida: 'Criar cartão, etiquetas, nomear e filtrar',
    descricaoCompleta:
      'Criar novo cartão, atribuir etiquetas coloridas por matéria (IHC verde, Cálculo azul) e usar filtro para exibir apenas atividades de IHC.',
    complexidade: 'Alta',
    steps: 4,
    funcionalidades: 'Etiquetas, personalização, filtro',
  },
  {
    id: 'T5',
    nome: 'Atualizar andamento e reorganizar',
    descricaoResumida: 'Remover filtro, mover cartões e arquivar',
    descricaoCompleta:
      'Remover filtro ativo, mover cartão para "em andamento", depois para "concluídas" e arquivar o cartão finalizado.',
    complexidade: 'Média',
    steps: 4,
    funcionalidades: 'Filtro, drag-and-drop, arquivamento',
  },
]

// ===== EMOCARDS — CATEGORIAS DO CIRCUMPLEX DE RUSSELL =====

export type Valencia = 'agradável' | 'neutra' | 'desagradável'
export type Ativacao = 'alta' | 'média' | 'baixa'

export interface CategoriaEmoCard {
  numero: number
  nomeEN: string
  nomePT: string
  valencia: Valencia
  ativacao: Ativacao
}

export const EMOCARDS_CATEGORIAS: CategoriaEmoCard[] = [
  { numero: 1, nomeEN: 'Excited Neutral', nomePT: 'Excitado Neutro', valencia: 'neutra', ativacao: 'alta' },
  { numero: 2, nomeEN: 'Excited Pleasant', nomePT: 'Excitado Agradável', valencia: 'agradável', ativacao: 'alta' },
  { numero: 3, nomeEN: 'Average Pleasant', nomePT: 'Moderado Agradável', valencia: 'agradável', ativacao: 'média' },
  { numero: 4, nomeEN: 'Calm Pleasant', nomePT: 'Calmo Agradável', valencia: 'agradável', ativacao: 'baixa' },
  { numero: 5, nomeEN: 'Calm Neutral', nomePT: 'Calmo Neutro', valencia: 'neutra', ativacao: 'baixa' },
  { numero: 6, nomeEN: 'Calm Unpleasant', nomePT: 'Calmo Desagradável', valencia: 'desagradável', ativacao: 'baixa' },
  { numero: 7, nomeEN: 'Average Unpleasant', nomePT: 'Moderado Desagradável', valencia: 'desagradável', ativacao: 'média' },
  { numero: 8, nomeEN: 'Excited Unpleasant', nomePT: 'Excitado Desagradável', valencia: 'desagradável', ativacao: 'alta' },
]

// ===== SUS — 10 ITENS =====

export interface ItemSUS {
  numero: number
  texto: string
  tipo: 'positivo' | 'negativo'
}

export const SUS_ITENS: ItemSUS[] = [
  { numero: 1, texto: 'Eu acho que gostaria de usar o Trello com frequência.', tipo: 'positivo' },
  { numero: 2, texto: 'Eu achei o Trello desnecessariamente complexo.', tipo: 'negativo' },
  { numero: 3, texto: 'Eu achei o Trello fácil de usar.', tipo: 'positivo' },
  { numero: 4, texto: 'Eu acho que precisaria de ajuda de uma pessoa técnica para usar o Trello.', tipo: 'negativo' },
  { numero: 5, texto: 'Eu achei que as diversas funções do Trello estavam bem integradas.', tipo: 'positivo' },
  { numero: 6, texto: 'Eu achei que havia muita inconsistência no Trello.', tipo: 'negativo' },
  { numero: 7, texto: 'Eu imagino que a maioria das pessoas aprenderiam a usar o Trello rapidamente.', tipo: 'positivo' },
  { numero: 8, texto: 'Eu achei o Trello muito complicado de usar.', tipo: 'negativo' },
  { numero: 9, texto: 'Eu me senti muito confiante ao usar o Trello.', tipo: 'positivo' },
  { numero: 10, texto: 'Eu precisei aprender muitas coisas antes de conseguir usar o Trello.', tipo: 'negativo' },
]

// ===== ATTRAKDIFF — 28 PARES DE PALAVRAS =====

export type DimensaoAttrakDiff = 'PQ' | 'HQ-I' | 'HQ-S' | 'ATT'

export interface ParAttrakDiff {
  numero: number
  dimensao: DimensaoAttrakDiff
  palavraEsquerda: string
  palavraDireita: string
}

export const ATTRAKDIFF_DIMENSOES: Record<DimensaoAttrakDiff, { nome: string; cor: string; descricao: string }> = {
  PQ: { nome: 'Qualidade Pragmática', cor: '#2563eb', descricao: 'Usabilidade e funcionalidade do produto' },
  'HQ-I': { nome: 'Qualidade Hedônica — Identidade', cor: '#7c3aed', descricao: 'Identificação pessoal com o produto' },
  'HQ-S': { nome: 'Qualidade Hedônica — Estimulação', cor: '#0891b2', descricao: 'Novidade e estímulo proporcionados' },
  ATT: { nome: 'Atratividade', cor: '#059669', descricao: 'Valor global percebido do produto' },
}

export const ATTRAKDIFF_PARES: ParAttrakDiff[] = [
  // PQ — Qualidade Pragmática
  { numero: 1, dimensao: 'PQ', palavraEsquerda: 'Técnico', palavraDireita: 'Humano' },
  { numero: 2, dimensao: 'PQ', palavraEsquerda: 'Complicado', palavraDireita: 'Simples' },
  { numero: 3, dimensao: 'PQ', palavraEsquerda: 'Impraticável', palavraDireita: 'Prático' },
  { numero: 4, dimensao: 'PQ', palavraEsquerda: 'Imprevisível', palavraDireita: 'Previsível' },
  { numero: 5, dimensao: 'PQ', palavraEsquerda: 'Confuso', palavraDireita: 'Claro' },
  { numero: 6, dimensao: 'PQ', palavraEsquerda: 'Desordenado', palavraDireita: 'Organizado' },
  { numero: 7, dimensao: 'PQ', palavraEsquerda: 'Intimidante', palavraDireita: 'Acolhedor' },
  // HQ-I — Qualidade Hedônica — Identidade
  { numero: 8, dimensao: 'HQ-I', palavraEsquerda: 'Isolador', palavraDireita: 'Integrador' },
  { numero: 9, dimensao: 'HQ-I', palavraEsquerda: 'Amador', palavraDireita: 'Profissional' },
  { numero: 10, dimensao: 'HQ-I', palavraEsquerda: 'Cafona', palavraDireita: 'Elegante' },
  { numero: 11, dimensao: 'HQ-I', palavraEsquerda: 'Barato', palavraDireita: 'Premium' },
  { numero: 12, dimensao: 'HQ-I', palavraEsquerda: 'Alienante', palavraDireita: 'Envolvente' },
  { numero: 13, dimensao: 'HQ-I', palavraEsquerda: 'Me afasta', palavraDireita: 'Me aproxima' },
  { numero: 14, dimensao: 'HQ-I', palavraEsquerda: 'Desvalorizante', palavraDireita: 'Valorizante' },
  // HQ-S — Qualidade Hedônica — Estimulação
  { numero: 15, dimensao: 'HQ-S', palavraEsquerda: 'Convencional', palavraDireita: 'Original' },
  { numero: 16, dimensao: 'HQ-S', palavraEsquerda: 'Sem imaginação', palavraDireita: 'Criativo' },
  { numero: 17, dimensao: 'HQ-S', palavraEsquerda: 'Cauteloso', palavraDireita: 'Ousado' },
  { numero: 18, dimensao: 'HQ-S', palavraEsquerda: 'Entediante', palavraDireita: 'Cativante' },
  { numero: 19, dimensao: 'HQ-S', palavraEsquerda: 'Pouco exigente', palavraDireita: 'Desafiador' },
  { numero: 20, dimensao: 'HQ-S', palavraEsquerda: 'Comum', palavraDireita: 'Inovador' },
  { numero: 21, dimensao: 'HQ-S', palavraEsquerda: 'Conservador', palavraDireita: 'Inventivo' },
  // ATT — Atratividade
  { numero: 22, dimensao: 'ATT', palavraEsquerda: 'Desagradável', palavraDireita: 'Agradável' },
  { numero: 23, dimensao: 'ATT', palavraEsquerda: 'Feio', palavraDireita: 'Bonito' },
  { numero: 24, dimensao: 'ATT', palavraEsquerda: 'Desanimador', palavraDireita: 'Motivador' },
  { numero: 25, dimensao: 'ATT', palavraEsquerda: 'Ruim', palavraDireita: 'Bom' },
  { numero: 26, dimensao: 'ATT', palavraEsquerda: 'Repulsivo', palavraDireita: 'Atraente' },
  { numero: 27, dimensao: 'ATT', palavraEsquerda: 'Desmotivante', palavraDireita: 'Estimulante' },
  { numero: 28, dimensao: 'ATT', palavraEsquerda: 'Rejeitável', palavraDireita: 'Desejável' },
]

// ===== WIZARD STEPS =====

export const WIZARD_STEPS = [
  { id: 'participante', label: 'Participante', icon: '👤' },
  { id: 'emocards', label: 'EmoCards', icon: '🎭' },
  { id: 'sus', label: 'SUS', icon: '📋' },
  { id: 'attrakdiff', label: 'AttrakDiff', icon: '⚖️' },
  { id: 'journeymap', label: 'Jornada', icon: '🗺️' },
  { id: 'export', label: 'Download', icon: '📥' },
] as const

export type WizardStepId = (typeof WIZARD_STEPS)[number]['id']

// ===== TAREFAS + GERAL (para EmoCards e Journey Map) =====

export const COLETAS_IDS = ['T1', 'T2', 'T3', 'T4', 'T5', 'Geral'] as const
export type ColetaId = (typeof COLETAS_IDS)[number]
