'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFormStore } from '@/lib/store'
import { ATTRAKDIFF_PARES, ATTRAKDIFF_DIMENSOES, type DimensaoAttrakDiff } from '@/lib/constants'
import WordPairScale from './WordPairScale'

const DIMENSOES_ORDER: DimensaoAttrakDiff[] = ['PQ', 'HQ-I', 'HQ-S', 'ATT']

export default function AttrakDiffSection() {
  const attrakdiff = useFormStore((s) => s.attrakdiff)
  const setAttrakDiffResponse = useFormStore((s) => s.setAttrakDiffResponse)
  const [showMissing, setShowMissing] = useState(false)

  const answeredCount = ATTRAKDIFF_PARES.filter((p) => attrakdiff[p.numero] !== undefined).length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">AttrakDiff</h2>
        <p className="text-sm text-foreground/50">
          Para cada par de palavras, selecione o ponto que melhor descreve sua percepção sobre o Trello. O ponto central indica uma posição neutra.
        </p>
        <p className="text-xs text-foreground/30">
          {answeredCount} de {ATTRAKDIFF_PARES.length} respondidos
        </p>
      </div>

      {DIMENSOES_ORDER.map((dim) => {
        const info = ATTRAKDIFF_DIMENSOES[dim]
        const pares = ATTRAKDIFF_PARES.filter((p) => p.dimensao === dim)
        const dimAnswered = pares.filter((p) => attrakdiff[p.numero] !== undefined).length

        return (
          <div key={dim} className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: info.cor }}
              />
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {dim} — {info.nome}
                </h3>
                <p className="text-xs text-foreground/40">
                  {info.descricao} ({dimAnswered}/{pares.length})
                </p>
              </div>
            </div>

            <div
              className="rounded-xl bg-card p-3 shadow-sm ring-1 ring-foreground/5"
            >
              <div className="space-y-1">
                {/* Scale header */}
                <div className="flex items-center gap-3 px-3 pb-2">
                  <span className="w-28 sm:w-36" />
                  <div className="flex flex-1 items-center justify-center gap-1.5 text-[10px] text-foreground/25 sm:gap-2">
                    <span>-3</span>
                    <span className="flex-1" />
                    <span>-2</span>
                    <span className="flex-1" />
                    <span>-1</span>
                    <span className="flex-1" />
                    <span>0</span>
                    <span className="flex-1" />
                    <span>+1</span>
                    <span className="flex-1" />
                    <span>+2</span>
                    <span className="flex-1" />
                    <span>+3</span>
                  </div>
                  <span className="w-28 sm:w-36" />
                </div>

                {pares.map((par) => (
                  <WordPairScale
                    key={par.numero}
                    par={par}
                    value={attrakdiff[par.numero]}
                    onChange={(v) => setAttrakDiffResponse(par.numero, v)}
                    showMissing={showMissing}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      })}

      {answeredCount < ATTRAKDIFF_PARES.length && (
        <button
          type="button"
          onClick={() => setShowMissing(true)}
          className="text-xs text-foreground/40 hover:text-foreground/60"
        >
          Destacar itens faltantes
        </button>
      )}
    </motion.div>
  )
}
