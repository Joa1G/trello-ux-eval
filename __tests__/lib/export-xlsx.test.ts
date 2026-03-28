import { describe, it, expect } from 'vitest'
import { generateXlsx, getFileName } from '@/lib/export-xlsx'
import type { FormState } from '@/lib/store'
import * as XLSX from 'xlsx'

function createMockState(): FormState {
  return {
    currentStep: 5,
    participant: {
      identificador: 'P01',
      perfil: 'novato',
      data: '2026-03-28',
      idade: '22',
      frequencia: 'nunca',
    },
    emocards: {
      T1: { categoriaNumero: 2, categoriaNome: 'Excitado Agradável', valencia: 'agradável', ativacao: 'alta', comentario: 'Legal!' },
      T2: { categoriaNumero: 3, categoriaNome: 'Moderado Agradável', valencia: 'agradável', ativacao: 'média', comentario: '' },
      T3: { categoriaNumero: 7, categoriaNome: 'Moderado Desagradável', valencia: 'desagradável', ativacao: 'média', comentario: 'Difícil' },
      T4: { categoriaNumero: 1, categoriaNome: 'Excitado Neutro', valencia: 'neutra', ativacao: 'alta', comentario: '' },
      T5: { categoriaNumero: 4, categoriaNome: 'Calmo Agradável', valencia: 'agradável', ativacao: 'baixa', comentario: '' },
      Geral: { categoriaNumero: 3, categoriaNome: 'Moderado Agradável', valencia: 'agradável', ativacao: 'média', comentario: 'Bom' },
    },
    emocardsCurrentTask: 0,
    sus: { 1: 4, 2: 2, 3: 5, 4: 1, 5: 4, 6: 2, 7: 5, 8: 1, 9: 4, 10: 2 },
    attrakdiff: Object.fromEntries(Array.from({ length: 28 }, (_, i) => [i + 1, i % 7 - 3])),
    journeymap: {
      T1: { sentimento: 'positiva', nota: 5, comentario: 'Fácil' },
      T2: { sentimento: 'neutra', nota: 3, comentario: '' },
      T3: { sentimento: 'negativa', nota: 2, comentario: 'Confuso' },
      T4: { sentimento: 'positiva', nota: 4, comentario: '' },
      T5: { sentimento: 'positiva', nota: 4, comentario: '' },
      Geral: { sentimento: 'positiva', nota: 4, comentario: 'Bom no geral' },
    },
    sugestaoMudanca: 'Melhorar filtros',
    // Actions (not used in export, but required by type)
    setCurrentStep: () => {},
    nextStep: () => {},
    prevStep: () => {},
    setParticipant: () => {},
    setEmoCardResponse: () => {},
    setEmocardsCurrentTask: () => {},
    setSusResponse: () => {},
    setAttrakDiffResponse: () => {},
    setJourneyResponse: () => {},
    setSugestaoMudanca: () => {},
    reset: () => {},
  }
}

describe('Exportação .xlsx', () => {
  const mockState = createMockState()

  it('deve gerar workbook com 5 abas', () => {
    const wb = generateXlsx(mockState)
    expect(wb.SheetNames).toHaveLength(5)
    expect(wb.SheetNames).toEqual([
      'Participante',
      'EmoCards',
      'SUS',
      'AttrakDiff',
      'UserJourneyMap',
    ])
  })

  it('aba Participante deve conter os dados cadastrais', () => {
    const wb = generateXlsx(mockState)
    const ws = wb.Sheets['Participante']
    const data = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 })

    expect(data[0]).toEqual(['Campo', 'Valor'])
    expect(data[1]).toEqual(['Identificador', 'P01'])
    expect(data[2]).toEqual(['Perfil', 'novato'])
    expect(data[3]).toEqual(['Data', '2026-03-28'])
    expect(data[4]).toEqual(['Idade', '22'])
    expect(data[5]).toEqual(['Frequência de uso do Trello', 'nunca'])
  })

  it('aba EmoCards deve ter 6 linhas de dados (T1-T5 + Geral)', () => {
    const wb = generateXlsx(mockState)
    const ws = wb.Sheets['EmoCards']
    const data = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 })

    expect(data).toHaveLength(7) // header + 6 rows
    expect(data[1][0]).toBe('T1')
    expect(data[1][1]).toBe(2) // categoriaNumero
    expect(data[1][2]).toBe('Excitado Agradável')
    expect(data[6][0]).toBe('Geral')
  })

  it('aba SUS deve ter 10 linhas de dados', () => {
    const wb = generateXlsx(mockState)
    const ws = wb.Sheets['SUS']
    const data = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 })

    expect(data).toHaveLength(11) // header + 10 rows
    expect(data[1][0]).toBe(1) // item 1
    expect(data[1][2]).toBe(4) // resposta
  })

  it('aba AttrakDiff deve ter 28 linhas de dados', () => {
    const wb = generateXlsx(mockState)
    const ws = wb.Sheets['AttrakDiff']
    const data = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 })

    expect(data).toHaveLength(29) // header + 28 rows
    expect(data[1][0]).toBe('PQ') // dimensão
    expect(data[1][2]).toBe('Técnico') // palavra esquerda
    expect(data[1][3]).toBe('Humano') // palavra direita
  })

  it('aba UserJourneyMap deve ter 6 linhas + sugestão', () => {
    const wb = generateXlsx(mockState)
    const ws = wb.Sheets['UserJourneyMap']
    const data = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 })

    // header + 6 rows + blank row + sugestão row
    expect(data[1][0]).toBe('T1')
    expect(data[1][1]).toBe('positiva')
    expect(data[1][2]).toBe(5)
    // Sugestão
    const lastRow = data[data.length - 1]
    expect(lastRow[0]).toBe('Sugestão de mudança')
    expect(lastRow[1]).toBe('Melhorar filtros')
  })

  it('nome do arquivo deve seguir o padrão correto', () => {
    const filename = getFileName(mockState)
    expect(filename).toBe('respostas_trello_P01_2026-03-28.xlsx')
  })
})
