import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  TAREFAS,
  EMOCARDS_CATEGORIAS,
  SUS_ITENS,
  ATTRAKDIFF_PARES,
  COLETAS_IDS,
  type Valencia,
  type Ativacao,
  type DimensaoAttrakDiff,
  type ColetaId,
} from './constants'

// ===== TIPOS =====

export interface ParticipantData {
  identificador: string
  perfil: 'novato' | 'experiente' | ''
  data: string
  idade: string
  genero: 'masculino' | 'feminino' | 'outro' | 'prefiro_nao_dizer' | ''
  profissao: string
  escolaridade: 'fundamental' | 'medio' | 'superior_incompleto' | 'superior_completo' | 'pos_graduacao' | ''
  frequencia: 'nunca' | 'raramente' | 'regularmente' | ''
}

export interface EmoCardResponse {
  categoriaNumero: number
  categoriaNome: string
  valencia: Valencia
  ativacao: Ativacao
  comentario: string
}

export interface JourneyResponse {
  sentimento: 'positiva' | 'neutra' | 'negativa' | ''
  nota: number | null
  comentario: string
}

export interface FormState {
  // Wizard
  currentStep: number

  // Participante
  participant: ParticipantData

  // EmoCards: uma resposta por coleta (T1-T5 + Geral)
  emocards: Partial<Record<ColetaId, EmoCardResponse>>
  emocardsCurrentTask: number // índice 0-5
  emocardsShowWalkthrough: boolean

  // SUS: resposta por item (1-10)
  sus: Partial<Record<number, number>>

  // AttrakDiff: resposta por item (1-28)
  attrakdiff: Partial<Record<number, number>>

  // Journey Map: resposta por coleta (T1-T5 + Geral)
  journeymap: Partial<Record<ColetaId, JourneyResponse>>
  sugestaoMudanca: string

  // Actions
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void

  setParticipant: (data: Partial<ParticipantData>) => void

  setEmoCardResponse: (tarefa: ColetaId, dados: EmoCardResponse) => void
  setEmocardsCurrentTask: (index: number) => void
  setEmocardsShowWalkthrough: (show: boolean) => void

  setSusResponse: (item: number, valor: number) => void

  setAttrakDiffResponse: (item: number, valor: number) => void

  setJourneyResponse: (tarefa: ColetaId, dados: Partial<JourneyResponse>) => void
  setSugestaoMudanca: (texto: string) => void

  reset: () => void
}

// ===== SELETORES DERIVADOS =====

export function isParticipantComplete(p: ParticipantData): boolean {
  return p.identificador.trim() !== '' && p.perfil !== '' && p.data !== '' && p.genero !== '' && p.escolaridade !== '' && p.frequencia !== ''
}

export function isEmocardsComplete(emocards: Partial<Record<ColetaId, EmoCardResponse>>): boolean {
  return COLETAS_IDS.every((id) => emocards[id] !== undefined)
}

export function isSusComplete(sus: Partial<Record<number, number>>): boolean {
  return SUS_ITENS.every((item) => sus[item.numero] !== undefined)
}

export function isAttrakDiffComplete(attrakdiff: Partial<Record<number, number>>): boolean {
  return ATTRAKDIFF_PARES.every((par) => attrakdiff[par.numero] !== undefined)
}

export function isJourneyMapComplete(
  journeymap: Partial<Record<ColetaId, JourneyResponse>>
): boolean {
  return COLETAS_IDS.every((id) => {
    const r = journeymap[id]
    return r !== undefined && r.sentimento !== '' && r.nota !== null
  })
}

export function isStepComplete(step: number, state: FormState): boolean {
  switch (step) {
    case 0:
      return isParticipantComplete(state.participant)
    case 1:
      return isEmocardsComplete(state.emocards)
    case 2:
      return isSusComplete(state.sus)
    case 3:
      return isAttrakDiffComplete(state.attrakdiff)
    case 4:
      return isJourneyMapComplete(state.journeymap)
    case 5:
      return true // export screen
    default:
      return false
  }
}

// ===== ESTADO INICIAL =====

const today = new Date().toISOString().split('T')[0]

const initialState = {
  currentStep: 0,
  participant: {
    identificador: '',
    perfil: '' as const,
    data: today,
    idade: '',
    genero: '' as const,
    profissao: '',
    escolaridade: '' as const,
    frequencia: '' as const,
  },
  emocards: {},
  emocardsCurrentTask: 0,
  emocardsShowWalkthrough: false,
  sus: {},
  attrakdiff: {},
  journeymap: {},
  sugestaoMudanca: '',
}

// ===== STORE =====

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

      setParticipant: (data) =>
        set((s) => ({ participant: { ...s.participant, ...data } })),

      setEmoCardResponse: (tarefa, dados) =>
        set((s) => ({ emocards: { ...s.emocards, [tarefa]: dados } })),
      setEmocardsCurrentTask: (index) => set({ emocardsCurrentTask: index }),
      setEmocardsShowWalkthrough: (show) => set({ emocardsShowWalkthrough: show }),

      setSusResponse: (item, valor) =>
        set((s) => ({ sus: { ...s.sus, [item]: valor } })),

      setAttrakDiffResponse: (item, valor) =>
        set((s) => ({ attrakdiff: { ...s.attrakdiff, [item]: valor } })),

      setJourneyResponse: (tarefa, dados) =>
        set((s) => ({
          journeymap: {
            ...s.journeymap,
            [tarefa]: { ...({ sentimento: '', nota: null, comentario: '' }), ...s.journeymap[tarefa], ...dados },
          },
        })),
      setSugestaoMudanca: (texto) => set({ sugestaoMudanca: texto }),

      reset: () => set({ ...initialState, participant: { ...initialState.participant, data: new Date().toISOString().split('T')[0] } }),
    }),
    {
      name: 'trello-ux-eval-storage',
    }
  )
)
