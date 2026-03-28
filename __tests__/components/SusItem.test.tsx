import { describe, it, expect, beforeEach } from 'vitest'
import { useFormStore } from '@/lib/store'
import { SUS_ITENS } from '@/lib/constants'

describe('SUS store integration', () => {
  beforeEach(() => {
    useFormStore.getState().reset()
  })

  it('deve registrar resposta SUS com item e valor corretos', () => {
    useFormStore.getState().setSusResponse(1, 4)
    expect(useFormStore.getState().sus[1]).toBe(4)
  })

  it('deve permitir respostas de 1 a 5 para cada item', () => {
    SUS_ITENS.forEach((item) => {
      const valor = (item.numero % 5) + 1
      useFormStore.getState().setSusResponse(item.numero, valor)
    })

    SUS_ITENS.forEach((item) => {
      const expectedValue = (item.numero % 5) + 1
      expect(useFormStore.getState().sus[item.numero]).toBe(expectedValue)
    })
  })

  it('deve sobrescrever resposta anterior ao mudar seleção', () => {
    useFormStore.getState().setSusResponse(3, 2)
    useFormStore.getState().setSusResponse(3, 5)
    expect(useFormStore.getState().sus[3]).toBe(5)
  })

  it('deve manter respostas de outros itens ao atualizar um item', () => {
    useFormStore.getState().setSusResponse(1, 3)
    useFormStore.getState().setSusResponse(2, 4)
    useFormStore.getState().setSusResponse(1, 5)
    expect(useFormStore.getState().sus[1]).toBe(5)
    expect(useFormStore.getState().sus[2]).toBe(4)
  })

  it('todos os 10 itens SUS devem ter texto não vazio', () => {
    expect(SUS_ITENS).toHaveLength(10)
    SUS_ITENS.forEach((item) => {
      expect(item.texto.length).toBeGreaterThan(0)
    })
  })

  it('itens ímpares devem ser positivos e pares negativos', () => {
    SUS_ITENS.forEach((item) => {
      if (item.numero % 2 === 1) {
        expect(item.tipo).toBe('positivo')
      } else {
        expect(item.tipo).toBe('negativo')
      }
    })
  })
})
