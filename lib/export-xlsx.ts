import * as XLSX from 'xlsx'
import type { FormState } from './store'
import { SUS_ITENS, ATTRAKDIFF_PARES, COLETAS_IDS, TAREFAS, EMOCARDS_CATEGORIAS } from './constants'

export function generateXlsx(state: FormState): XLSX.WorkBook {
  const wb = XLSX.utils.book_new()

  // ===== Aba 1: Participante =====
  const participanteData = [
    ['Campo', 'Valor'],
    ['Identificador', state.participant.identificador],
    ['Perfil', state.participant.perfil],
    ['Data', state.participant.data],
    ['Idade', state.participant.idade || 'Não informado'],
    ['Gênero', state.participant.genero || 'Não informado'],
    ['Profissão/Ocupação', state.participant.profissao || 'Não informado'],
    ['Escolaridade', state.participant.escolaridade || 'Não informado'],
    ['Frequência de uso do Trello', state.participant.frequencia],
  ]
  const wsParticipante = XLSX.utils.aoa_to_sheet(participanteData)
  XLSX.utils.book_append_sheet(wb, wsParticipante, 'Participante')

  // ===== Aba 2: EmoCards =====
  const emocardsHeader = ['Tarefa', 'Categoria Número', 'Categoria Nome', 'Valência', 'Ativação', 'Comentário']
  const emocardsRows = COLETAS_IDS.map((id) => {
    const r = state.emocards[id]
    return [
      id,
      r?.categoriaNumero ?? '',
      r?.categoriaNome ?? '',
      r?.valencia ?? '',
      r?.ativacao ?? '',
      r?.comentario ?? '',
    ]
  })
  const wsEmocards = XLSX.utils.aoa_to_sheet([emocardsHeader, ...emocardsRows])
  XLSX.utils.book_append_sheet(wb, wsEmocards, 'EmoCards')

  // ===== Aba 3: SUS =====
  const susHeader = ['Item Número', 'Afirmação', 'Resposta (1-5)']
  const susRows = SUS_ITENS.map((item) => [
    item.numero,
    item.texto,
    state.sus[item.numero] ?? '',
  ])
  const wsSus = XLSX.utils.aoa_to_sheet([susHeader, ...susRows])
  XLSX.utils.book_append_sheet(wb, wsSus, 'SUS')

  // ===== Aba 4: AttrakDiff =====
  const attrakdiffHeader = ['Dimensão', 'Item Número', 'Palavra Esquerda', 'Palavra Direita', 'Resposta (-3 a +3)']
  const attrakdiffRows = ATTRAKDIFF_PARES.map((par) => [
    par.dimensao,
    par.numero,
    par.palavraEsquerda,
    par.palavraDireita,
    state.attrakdiff[par.numero] ?? '',
  ])
  const wsAttrakdiff = XLSX.utils.aoa_to_sheet([attrakdiffHeader, ...attrakdiffRows])
  XLSX.utils.book_append_sheet(wb, wsAttrakdiff, 'AttrakDiff')

  // ===== Aba 5: UserJourneyMap =====
  const journeyHeader = ['Tarefa', 'Sentimento', 'Nota (1-5)', 'Comentário']
  const journeyRows = COLETAS_IDS.map((id) => {
    const r = state.journeymap[id]
    return [
      id,
      r?.sentimento ?? '',
      r?.nota ?? '',
      r?.comentario ?? '',
    ]
  })
  journeyRows.push(['', '', '', ''])
  journeyRows.push(['Sugestão de mudança', state.sugestaoMudanca, '', ''])
  const wsJourney = XLSX.utils.aoa_to_sheet([journeyHeader, ...journeyRows])
  XLSX.utils.book_append_sheet(wb, wsJourney, 'UserJourneyMap')

  return wb
}

export function downloadXlsx(state: FormState): void {
  const wb = generateXlsx(state)
  const identificador = state.participant.identificador || 'participante'
  const data = state.participant.data || new Date().toISOString().split('T')[0]
  const filename = `respostas_trello_${identificador}_${data}.xlsx`
  XLSX.writeFile(wb, filename)
}

export function getFileName(state: FormState): string {
  const identificador = state.participant.identificador || 'participante'
  const data = state.participant.data || new Date().toISOString().split('T')[0]
  return `respostas_trello_${identificador}_${data}.xlsx`
}
