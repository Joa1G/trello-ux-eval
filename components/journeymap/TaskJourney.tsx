'use client'

import { motion } from 'framer-motion'
import { PositiveFace, NeutralFace, NegativeFace } from './SentimentFaces'
import type { Tarefa, ColetaId } from '@/lib/constants'
import type { JourneyResponse } from '@/lib/store'

interface TaskJourneyProps {
  coletaId: ColetaId
  tarefa: Tarefa | null
  isGeral: boolean
  response: JourneyResponse | undefined
  onUpdate: (dados: Partial<JourneyResponse>) => void
}

const SENTIMENTOS = [
  { value: 'positiva' as const, label: 'Positiva', Face: PositiveFace, color: 'text-green-600 border-green-400 bg-green-50' },
  { value: 'neutra' as const, label: 'Neutra', Face: NeutralFace, color: 'text-amber-600 border-amber-400 bg-amber-50' },
  { value: 'negativa' as const, label: 'Negativa', Face: NegativeFace, color: 'text-red-600 border-red-400 bg-red-50' },
]

export default function TaskJourney({ coletaId, tarefa, isGeral, response, onUpdate }: TaskJourneyProps) {
  const sentimento = response?.sentimento || ''
  const nota = response?.nota ?? null

  return (
    <div className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-foreground/5">
      {/* Header */}
      <div className="mb-4">
        {isGeral ? (
          <h3 className="font-semibold text-foreground">Experiência Geral</h3>
        ) : tarefa ? (
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-journeymap/10 px-2 py-0.5 text-xs font-semibold text-journeymap">
              {tarefa.id}
            </span>
            <span className="text-xs text-foreground/40">{tarefa.complexidade}</span>
            <span className="font-medium text-foreground">{tarefa.nome}</span>
          </div>
        ) : null}
      </div>

      {/* Sentimento */}
      <div className="mb-4 space-y-2">
        <p className="text-sm font-medium text-foreground/70">
          Como foi sua experiência? <span className="text-red-400">*</span>
        </p>
        <div className="flex gap-3">
          {SENTIMENTOS.map((s) => (
            <motion.button
              key={s.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Sentimento ${s.label}`}
              aria-pressed={sentimento === s.value}
              onClick={() => onUpdate({ sentimento: s.value })}
              className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-4 py-3 transition-all ${
                sentimento === s.value
                  ? s.color
                  : 'border-foreground/10 hover:border-foreground/20'
              }`}
            >
              <s.Face className="h-10 w-10" />
              <span className="text-xs font-medium">{s.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Nota 1-5 */}
      <div className="mb-4 space-y-2">
        <p className="text-sm font-medium text-foreground/70">
          Nota (1–5) <span className="text-red-400">*</span>
        </p>
        <div className="flex gap-2" role="radiogroup" aria-label={`Nota para ${coletaId}`}>
          {[1, 2, 3, 4, 5].map((v) => (
            <motion.button
              key={v}
              type="button"
              role="radio"
              aria-checked={nota === v}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdate({ nota: v })}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                nota === v
                  ? 'border-journeymap bg-journeymap text-white shadow-md'
                  : 'border-foreground/15 text-foreground/40 hover:border-journeymap/40'
              }`}
            >
              {v}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Comentário */}
      <div className="space-y-1">
        <label htmlFor={`journey-comment-${coletaId}`} className="text-sm text-foreground/50">
          Por quê? Palavra ou frase curta <span className="text-red-400">*</span>
        </label>
        <input
          id={`journey-comment-${coletaId}`}
          type="text"
          aria-label={`Comentário jornada ${coletaId}`}
          placeholder="Ex: Foi intuitivo, achei confuso..."
          value={response?.comentario ?? ''}
          onChange={(e) => onUpdate({ comentario: e.target.value })}
          className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-journeymap focus:outline-none focus:ring-2 focus:ring-journeymap/20"
        />
      </div>
    </div>
  )
}
