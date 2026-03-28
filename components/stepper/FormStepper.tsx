'use client'

import { WIZARD_STEPS } from '@/lib/constants'
import { useFormStore, isStepComplete } from '@/lib/store'
import { motion } from 'framer-motion'

export default function FormStepper() {
  const currentStep = useFormStore((s) => s.currentStep)
  const state = useFormStore.getState()

  return (
    <nav aria-label="Progresso do formulário" className="mb-8">
      <ol className="flex items-center justify-between gap-1">
        {WIZARD_STEPS.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep && isStepComplete(index, state)
          const isPast = index < currentStep

          return (
            <li key={step.id} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      isPast ? 'bg-sus' : 'bg-foreground/10'
                    }`}
                  />
                )}
                <motion.div
                  className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'bg-sus text-white shadow-md shadow-sus/30'
                      : isPast
                        ? 'bg-sus/20 text-sus'
                        : 'bg-foreground/5 text-foreground/40'
                  }`}
                  animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-base">{step.icon}</span>
                  )}
                </motion.div>
                {index < WIZARD_STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      isPast ? 'bg-sus' : 'bg-foreground/10'
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  isActive ? 'text-sus' : isPast ? 'text-foreground/60' : 'text-foreground/30'
                }`}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>

      {/* Progress bar */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-foreground/5">
        <motion.div
          className="h-full rounded-full bg-sus"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (WIZARD_STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>
    </nav>
  )
}
