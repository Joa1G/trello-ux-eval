'use client'

import { motion } from 'framer-motion'
import type { ItemSUS } from '@/lib/constants'

interface SusItemProps {
  item: ItemSUS
  value: number | undefined
  onChange: (valor: number) => void
  showMissing?: boolean
}

const LABELS = ['Discordo totalmente', '', '', '', 'Concordo totalmente']

export default function SusItem({ item, value, onChange, showMissing }: SusItemProps) {
  return (
    <div
      className={`rounded-xl bg-card p-5 shadow-sm ring-1 transition-colors ${
        showMissing && value === undefined
          ? 'ring-red-300 bg-red-50/30'
          : 'ring-foreground/5'
      }`}
    >
      <p className="mb-4 text-sm leading-relaxed text-foreground">
        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sus/10 text-xs font-bold text-sus">
          {item.numero}
        </span>
        {item.texto}
      </p>

      <div className="flex items-center justify-between gap-2">
        <span className="hidden text-xs text-foreground/40 sm:block">Discordo totalmente</span>

        <div className="flex flex-1 items-center justify-center gap-3" role="radiogroup" aria-label={`Resposta item ${item.numero}`}>
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={value === v}
              aria-label={`${v} - ${LABELS[v - 1] || ''}`}
              onClick={() => onChange(v)}
              className="group flex flex-col items-center gap-1"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                  value === v
                    ? 'border-sus bg-sus text-white shadow-md shadow-sus/30'
                    : 'border-foreground/15 text-foreground/40 hover:border-sus/40 hover:text-sus'
                }`}
              >
                {v}
              </motion.div>
            </button>
          ))}
        </div>

        <span className="hidden text-xs text-foreground/40 sm:block">Concordo totalmente</span>
      </div>
    </div>
  )
}
