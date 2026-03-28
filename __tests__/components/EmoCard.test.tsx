import { describe, it, expect, beforeEach } from 'vitest'
import { useFormStore } from '@/lib/store'
import { EMOCARDS_CATEGORIAS, COLETAS_IDS } from '@/lib/constants'

describe('EmoCards store integration', () => {
  beforeEach(() => {
    useFormStore.getState().reset()
  })

  it('deve salvar seleção de EmoCard com categoria, valência e ativação corretos', () => {
    const cat = EMOCARDS_CATEGORIAS[1] // Excited Pleasant (#2)
    useFormStore.getState().setEmoCardResponse('T1', {
      categoriaNumero: cat.numero,
      categoriaNome: cat.nomePT,
      valencia: cat.valencia,
      ativacao: cat.ativacao,
      comentario: '',
    })

    const response = useFormStore.getState().emocards.T1
    expect(response).toBeDefined()
    expect(response!.categoriaNumero).toBe(2)
    expect(response!.categoriaNome).toBe('Excitado Agradável')
    expect(response!.valencia).toBe('agradável')
    expect(response!.ativacao).toBe('alta')
  })

  it('deve trocar seleção ao clicar em outro cartão', () => {
    const cat1 = EMOCARDS_CATEGORIAS[0] // #1 Excited Neutral
    const cat2 = EMOCARDS_CATEGORIAS[4] // #5 Calm Neutral

    useFormStore.getState().setEmoCardResponse('T2', {
      categoriaNumero: cat1.numero,
      categoriaNome: cat1.nomePT,
      valencia: cat1.valencia,
      ativacao: cat1.ativacao,
      comentario: '',
    })

    useFormStore.getState().setEmoCardResponse('T2', {
      categoriaNumero: cat2.numero,
      categoriaNome: cat2.nomePT,
      valencia: cat2.valencia,
      ativacao: cat2.ativacao,
      comentario: '',
    })

    expect(useFormStore.getState().emocards.T2!.categoriaNumero).toBe(5)
    expect(useFormStore.getState().emocards.T2!.valencia).toBe('neutra')
    expect(useFormStore.getState().emocards.T2!.ativacao).toBe('baixa')
  })

  it('deve preservar comentário ao trocar seleção', () => {
    const cat = EMOCARDS_CATEGORIAS[2] // Average Pleasant (#3)
    useFormStore.getState().setEmoCardResponse('T3', {
      categoriaNumero: cat.numero,
      categoriaNome: cat.nomePT,
      valencia: cat.valencia,
      ativacao: cat.ativacao,
      comentario: 'Achei legal',
    })

    expect(useFormStore.getState().emocards.T3!.comentario).toBe('Achei legal')
  })

  it('deve salvar respostas independentes para cada tarefa', () => {
    COLETAS_IDS.forEach((id, index) => {
      const catIndex = index % EMOCARDS_CATEGORIAS.length
      const cat = EMOCARDS_CATEGORIAS[catIndex]
      useFormStore.getState().setEmoCardResponse(id, {
        categoriaNumero: cat.numero,
        categoriaNome: cat.nomePT,
        valencia: cat.valencia,
        ativacao: cat.ativacao,
        comentario: '',
      })
    })

    const emocards = useFormStore.getState().emocards
    expect(Object.keys(emocards)).toHaveLength(6)
    expect(emocards.T1!.categoriaNumero).toBe(1)
    expect(emocards.Geral!.categoriaNumero).toBe(6) // index 5 % 8 = 5 → cat[5] = #6
  })

  it('cada categoria deve ter valência e ativação coerentes com o Circumplex', () => {
    // Agradáveis: 2, 3, 4
    expect(EMOCARDS_CATEGORIAS.find((c) => c.numero === 2)!.valencia).toBe('agradável')
    expect(EMOCARDS_CATEGORIAS.find((c) => c.numero === 3)!.valencia).toBe('agradável')
    expect(EMOCARDS_CATEGORIAS.find((c) => c.numero === 4)!.valencia).toBe('agradável')
    // Desagradáveis: 6, 7, 8
    expect(EMOCARDS_CATEGORIAS.find((c) => c.numero === 6)!.valencia).toBe('desagradável')
    expect(EMOCARDS_CATEGORIAS.find((c) => c.numero === 7)!.valencia).toBe('desagradável')
    expect(EMOCARDS_CATEGORIAS.find((c) => c.numero === 8)!.valencia).toBe('desagradável')
    // Neutras: 1, 5
    expect(EMOCARDS_CATEGORIAS.find((c) => c.numero === 1)!.valencia).toBe('neutra')
    expect(EMOCARDS_CATEGORIAS.find((c) => c.numero === 5)!.valencia).toBe('neutra')
  })
})
