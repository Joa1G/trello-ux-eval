'use client'

import { motion } from 'framer-motion'
import type { ParAttrakDiff, DimensaoAttrakDiff } from '@/lib/constants'
import { ATTRAKDIFF_DIMENSOES } from '@/lib/constants'

interface WordPairScaleProps {
  par: ParAttrakDiff
  value: number | undefined
  onChange: (valor: number) => void
  showMissing?: boolean
}

const SCALE_VALUES = [-3, -2, -1, 0, 1, 2, 3]

export default function WordPairScale({ par, value, onChange, showMissing }: WordPairScaleProps) {
  const dimColor = ATTRAKDIFF_DIMENSOES[par.dimensao].cor

  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
        showMissing && value === undefined ? 'bg-red-50/50 ring-1 ring-red-200' : ''
      }`}
    >
      <span className="w-28 text-right text-sm text-foreground/70 sm:w-36">
        {par.palavraEsquerda}
      </span>

      <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2" role="radiogroup" aria-label={`${par.palavraEsquerda} vs ${par.palavraDireita}`}>
        {SCALE_VALUES.map((v) => {
          const isSelected = value === v
          const isCenter = v === 0
          const size = isCenter ? 'h-8 w-8' : 'h-7 w-7'

          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${v}`}
              onClick={() => onChange(v)}
              className="group flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
                className={`${size} flex items-center justify-center rounded-full border-2 text-xs font-medium transition-all ${
                  isSelected
                    ? 'text-white shadow-md'
                    : isCenter
                      ? 'border-foreground/20 text-foreground/30 hover:border-foreground/40'
                      : 'border-foreground/10 text-foreground/20 hover:border-foreground/30'
                }`}
                style={
                  isSelected
                    ? { backgroundColor: dimColor, borderColor: dimColor, boxShadow: `0 4px 12px ${dimColor}40` }
                    : undefined
                }
              />
            </button>
          )
        })}
      </div>

      <span className="w-28 text-left text-sm text-foreground/70 sm:w-36">
        {par.palavraDireita}
      </span>
    </div>
  )
}
