import { describe, it, expect, beforeEach } from 'vitest'
import { useFormStore, isParticipantComplete, isEmocardsComplete, isSusComplete, isAttrakDiffComplete, isJourneyMapComplete, isStepComplete } from '@/lib/store'
import type { ParticipantData, EmoCardResponse, JourneyResponse, FormState } from '@/lib/store'
import { COLETAS_IDS, SUS_ITENS, ATTRAKDIFF_PARES } from '@/lib/constants'

describe('Zustand Store', () => {
  beforeEach(() => {
    useFormStore.getState().reset()
  })

  describe('Navegação (currentStep)', () => {
    it('deve iniciar no step 0', () => {
      expect(useFormStore.getState().currentStep).toBe(0)
    })

    it('nextStep deve avançar o step', () => {
      useFormStore.getState().nextStep()
      expect(useFormStore.getState().currentStep).toBe(1)
    })

    it('prevStep deve voltar o step', () => {
      useFormStore.getState().setCurrentStep(3)
      useFormStore.getState().prevStep()
      expect(useFormStore.getState().currentStep).toBe(2)
    })

    it('nextStep não deve ultrapassar o step 5', () => {
      useFormStore.getState().setCurrentStep(5)
      useFormStore.getState().nextStep()
      expect(useFormStore.getState().currentStep).toBe(5)
    })

    it('prevStep não deve ficar abaixo de 0', () => {
      useFormStore.getState().prevStep()
      expect(useFormStore.getState().currentStep).toBe(0)
    })
  })

  describe('Participant', () => {
    it('deve atualizar dados do participante parcialmente', () => {
      useFormStore.getState().setParticipant({ identificador: 'P01' })
      expect(useFormStore.getState().participant.identificador).toBe('P01')
      expect(useFormStore.getState().participant.perfil).toBe('')
    })

    it('deve atualizar múltiplos campos', () => {
      useFormStore.getState().setParticipant({
        identificador: 'P02',
        perfil: 'novato',
        frequencia: 'nunca',
      })
      const p = useFormStore.getState().participant
      expect(p.identificador).toBe('P02')
      expect(p.perfil).toBe('novato')
      expect(p.frequencia).toBe('nunca')
    })

    it('deve ter data preenchida automaticamente', () => {
      const today = new Date().toISOString().split('T')[0]
      expect(useFormStore.getState().participant.data).toBe(today)
    })
  })

  describe('EmoCards', () => {
    it('deve salvar resposta do EmoCard para uma tarefa', () => {
      const resposta: EmoCardResponse = {
        categoriaNumero: 2,
        categoriaNome: 'Excitado Agradável',
        valencia: 'agradável',
        ativacao: 'alta',
        comentario: 'Gostei!',
      }
      useFormStore.getState().setEmoCardResponse('T1', resposta)
      expect(useFormStore.getState().emocards.T1).toEqual(resposta)
    })

    it('deve sobrescrever resposta anterior', () => {
      const r1: EmoCardResponse = {
        categoriaNumero: 2,
        categoriaNome: 'Excitado Agradável',
        valencia: 'agradável',
        ativacao: 'alta',
        comentario: '',
      }
      const r2: EmoCardResponse = {
        categoriaNumero: 7,
        categoriaNome: 'Moderado Desagradável',
        valencia: 'desagradável',
        ativacao: 'média',
        comentario: 'Mudei de ideia',
      }
      useFormStore.getState().setEmoCardResponse('T1', r1)
      useFormStore.getState().setEmoCardResponse('T1', r2)
      expect(useFormStore.getState().emocards.T1).toEqual(r2)
    })

    it('deve atualizar emocardsCurrentTask', () => {
      useFormStore.getState().setEmocardsCurrentTask(3)
      expect(useFormStore.getState().emocardsCurrentTask).toBe(3)
    })
  })

  describe('SUS', () => {
    it('deve salvar resposta SUS para um item', () => {
      useFormStore.getState().setSusResponse(1, 4)
      expect(useFormStore.getState().sus[1]).toBe(4)
    })

    it('deve permitir respostas de 1 a 5', () => {
      useFormStore.getState().setSusResponse(3, 1)
      useFormStore.getState().setSusResponse(5, 5)
      expect(useFormStore.getState().sus[3]).toBe(1)
      expect(useFormStore.getState().sus[5]).toBe(5)
    })
  })

  describe('AttrakDiff', () => {
    it('deve salvar resposta AttrakDiff para um par', () => {
      useFormStore.getState().setAttrakDiffResponse(1, -2)
      expect(useFormStore.getState().attrakdiff[1]).toBe(-2)
    })

    it('deve permitir valores de -3 a +3', () => {
      useFormStore.getState().setAttrakDiffResponse(10, -3)
      useFormStore.getState().setAttrakDiffResponse(20, 3)
      useFormStore.getState().setAttrakDiffResponse(15, 0)
      expect(useFormStore.getState().attrakdiff[10]).toBe(-3)
      expect(useFormStore.getState().attrakdiff[20]).toBe(3)
      expect(useFormStore.getState().attrakdiff[15]).toBe(0)
    })
  })

  describe('Journey Map', () => {
    it('deve salvar resposta de jornada para uma tarefa', () => {
      useFormStore.getState().setJourneyResponse('T1', {
        sentimento: 'positiva',
        nota: 4,
        comentario: 'Bem intuitivo',
      })
      const j = useFormStore.getState().journeymap.T1
      expect(j?.sentimento).toBe('positiva')
      expect(j?.nota).toBe(4)
      expect(j?.comentario).toBe('Bem intuitivo')
    })

    it('deve atualizar parcialmente uma resposta de jornada', () => {
      useFormStore.getState().setJourneyResponse('T2', { sentimento: 'neutra' })
      useFormStore.getState().setJourneyResponse('T2', { nota: 3 })
      const j = useFormStore.getState().journeymap.T2
      expect(j?.sentimento).toBe('neutra')
      expect(j?.nota).toBe(3)
    })

    it('deve salvar sugestão de mudança', () => {
      useFormStore.getState().setSugestaoMudanca('Melhorar a busca')
      expect(useFormStore.getState().sugestaoMudanca).toBe('Melhorar a busca')
    })
  })

  describe('Reset', () => {
    it('deve limpar todo o estado', () => {
      useFormStore.getState().setParticipant({ identificador: 'P99', perfil: 'experiente' })
      useFormStore.getState().setSusResponse(1, 5)
      useFormStore.getState().setCurrentStep(3)
      useFormStore.getState().reset()

      const s = useFormStore.getState()
      expect(s.currentStep).toBe(0)
      expect(s.participant.identificador).toBe('')
      expect(s.sus).toEqual({})
      expect(s.emocards).toEqual({})
    })
  })

  describe('Seletores de validação', () => {
    it('isParticipantComplete deve retornar false se campos obrigatórios vazios', () => {
      expect(isParticipantComplete(useFormStore.getState().participant)).toBe(false)
    })

    it('isParticipantComplete deve retornar true com campos preenchidos', () => {
      const p: ParticipantData = {
        identificador: 'P01',
        perfil: 'novato',
        data: '2026-03-27',
        idade: '',
        frequencia: 'nunca',
      }
      expect(isParticipantComplete(p)).toBe(true)
    })

    it('isEmocardsComplete deve retornar false sem todas as coletas', () => {
      expect(isEmocardsComplete(useFormStore.getState().emocards)).toBe(false)
    })

    it('isEmocardsComplete deve retornar true com todas as 6 coletas', () => {
      const resposta: EmoCardResponse = {
        categoriaNumero: 1,
        categoriaNome: 'Excitado Neutro',
        valencia: 'neutra',
        ativacao: 'alta',
        comentario: '',
      }
      COLETAS_IDS.forEach((id) => {
        useFormStore.getState().setEmoCardResponse(id, resposta)
      })
      expect(isEmocardsComplete(useFormStore.getState().emocards)).toBe(true)
    })

    it('isSusComplete deve retornar true com todos os 10 itens', () => {
      SUS_ITENS.forEach((item) => {
        useFormStore.getState().setSusResponse(item.numero, 3)
      })
      expect(isSusComplete(useFormStore.getState().sus)).toBe(true)
    })

    it('isAttrakDiffComplete deve retornar true com todos os 28 pares', () => {
      ATTRAKDIFF_PARES.forEach((par) => {
        useFormStore.getState().setAttrakDiffResponse(par.numero, 0)
      })
      expect(isAttrakDiffComplete(useFormStore.getState().attrakdiff)).toBe(true)
    })

    it('isJourneyMapComplete deve retornar true com todas as coletas preenchidas', () => {
      COLETAS_IDS.forEach((id) => {
        useFormStore.getState().setJourneyResponse(id, {
          sentimento: 'positiva',
          nota: 4,
          comentario: '',
        })
      })
      expect(isJourneyMapComplete(useFormStore.getState().journeymap)).toBe(true)
    })

    it('isStepComplete deve funcionar para cada step', () => {
      const state = useFormStore.getState()
      expect(isStepComplete(0, state)).toBe(false)
      expect(isStepComplete(5, state)).toBe(true)
    })
  })
})
