import { describe, it, expect, beforeEach } from 'vitest'
import { useFormStore } from '@/lib/store'
import { COLETAS_IDS } from '@/lib/constants'

describe('Journey Map store integration', () => {
  beforeEach(() => {
    useFormStore.getState().reset()
  })

  it('deve salvar sentimento e nota para uma tarefa', () => {
    useFormStore.getState().setJourneyResponse('T1', {
      sentimento: 'positiva',
      nota: 5,
    })

    const r = useFormStore.getState().journeymap.T1
    expect(r?.sentimento).toBe('positiva')
    expect(r?.nota).toBe(5)
  })

  it('deve atualizar parcialmente sem perder dados existentes', () => {
    useFormStore.getState().setJourneyResponse('T2', { sentimento: 'neutra' })
    useFormStore.getState().setJourneyResponse('T2', { nota: 3 })
    useFormStore.getState().setJourneyResponse('T2', { comentario: 'OK' })

    const r = useFormStore.getState().journeymap.T2
    expect(r?.sentimento).toBe('neutra')
    expect(r?.nota).toBe(3)
    expect(r?.comentario).toBe('OK')
  })

  it('deve salvar respostas independentes para cada coleta', () => {
    COLETAS_IDS.forEach((id, i) => {
      useFormStore.getState().setJourneyResponse(id, {
        sentimento: i % 2 === 0 ? 'positiva' : 'negativa',
        nota: (i % 5) + 1,
      })
    })

    expect(useFormStore.getState().journeymap.T1?.sentimento).toBe('positiva')
    expect(useFormStore.getState().journeymap.T2?.sentimento).toBe('negativa')
    expect(useFormStore.getState().journeymap.Geral?.nota).toBe(1)
  })

  it('deve salvar sugestão de mudança', () => {
    useFormStore.getState().setSugestaoMudanca('Melhorar a navegação lateral')
    expect(useFormStore.getState().sugestaoMudanca).toBe('Melhorar a navegação lateral')
  })

  it('deve trocar sentimento ao selecionar outro', () => {
    useFormStore.getState().setJourneyResponse('T3', { sentimento: 'positiva', nota: 4 })
    useFormStore.getState().setJourneyResponse('T3', { sentimento: 'negativa' })

    const r = useFormStore.getState().journeymap.T3
    expect(r?.sentimento).toBe('negativa')
    expect(r?.nota).toBe(4) // nota preservada
  })
})
