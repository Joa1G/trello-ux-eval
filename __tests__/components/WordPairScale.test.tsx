import { describe, it, expect, beforeEach } from 'vitest'
import { useFormStore } from '@/lib/store'
import { ATTRAKDIFF_PARES, ATTRAKDIFF_DIMENSOES } from '@/lib/constants'

describe('AttrakDiff store integration', () => {
  beforeEach(() => {
    useFormStore.getState().reset()
  })

  it('deve registrar resposta com dimensão, item e valor corretos', () => {
    useFormStore.getState().setAttrakDiffResponse(1, -2)
    expect(useFormStore.getState().attrakdiff[1]).toBe(-2)

    const par = ATTRAKDIFF_PARES.find((p) => p.numero === 1)!
    expect(par.dimensao).toBe('PQ')
    expect(par.palavraEsquerda).toBe('Técnico')
    expect(par.palavraDireita).toBe('Humano')
  })

  it('deve aceitar valores de -3 a +3', () => {
    const values = [-3, -2, -1, 0, 1, 2, 3]
    values.forEach((v, i) => {
      useFormStore.getState().setAttrakDiffResponse(i + 1, v)
    })
    values.forEach((v, i) => {
      expect(useFormStore.getState().attrakdiff[i + 1]).toBe(v)
    })
  })

  it('deve ter 28 pares distribuídos em 4 dimensões de 7 cada', () => {
    expect(ATTRAKDIFF_PARES).toHaveLength(28)
    const dims = ['PQ', 'HQ-I', 'HQ-S', 'ATT'] as const
    dims.forEach((dim) => {
      const count = ATTRAKDIFF_PARES.filter((p) => p.dimensao === dim).length
      expect(count).toBe(7)
    })
  })

  it('cada dimensão deve ter cor e descrição definidas', () => {
    const dims = ['PQ', 'HQ-I', 'HQ-S', 'ATT'] as const
    dims.forEach((dim) => {
      expect(ATTRAKDIFF_DIMENSOES[dim].cor).toBeTruthy()
      expect(ATTRAKDIFF_DIMENSOES[dim].nome).toBeTruthy()
      expect(ATTRAKDIFF_DIMENSOES[dim].descricao).toBeTruthy()
    })
  })

  it('deve sobrescrever resposta anterior ao mudar seleção', () => {
    useFormStore.getState().setAttrakDiffResponse(15, 2)
    useFormStore.getState().setAttrakDiffResponse(15, -1)
    expect(useFormStore.getState().attrakdiff[15]).toBe(-1)
  })
})
