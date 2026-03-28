'use client'

import { motion } from 'framer-motion'

interface WizardNavButtonsProps {
  onNext: () => void
  onPrev: () => void
  canGoNext: boolean
  canGoPrev: boolean
  nextLabel?: string
  isLastStep?: boolean
}

export default function WizardNavButtons({
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  nextLabel = 'Próximo',
  isLastStep = false,
}: WizardNavButtonsProps) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev}
        className="rounded-lg px-6 py-3 text-sm font-medium text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground disabled:invisible"
      >
        Voltar
      </button>

      <motion.button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        whileTap={canGoNext ? { scale: 0.97 } : {}}
        className={`rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-md transition-all ${
          canGoNext
            ? 'bg-sus hover:bg-sus/90 hover:shadow-lg'
            : 'cursor-not-allowed bg-foreground/20'
        }`}
      >
        {nextLabel}
      </motion.button>
    </div>
  )
}
