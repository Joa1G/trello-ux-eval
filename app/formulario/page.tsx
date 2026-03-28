'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useFormStore, isStepComplete } from '@/lib/store'
import FormStepper from '@/components/stepper/FormStepper'
import WizardNavButtons from '@/components/ui/WizardNavButtons'
import ParticipantForm from '@/components/participant/ParticipantForm'
import EmoCardsSection from '@/components/emocards/EmoCardsSection'
import SusSection from '@/components/sus/SusSection'

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

function StepPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center rounded-2xl border border-dashed border-foreground/10 bg-card">
      <p className="text-foreground/40">{name} — em construção</p>
    </div>
  )
}

export default function FormularioPage() {
  const currentStep = useFormStore((s) => s.currentStep)
  const nextStep = useFormStore((s) => s.nextStep)
  const prevStep = useFormStore((s) => s.prevStep)
  const [direction, setDirection] = useState(0)
  const [validationError, setValidationError] = useState('')

  const canGoNext = isStepComplete(currentStep, useFormStore.getState())

  const handleNext = () => {
    if (!canGoNext) {
      setValidationError('Preencha todos os campos obrigatórios antes de avançar.')
      setTimeout(() => setValidationError(''), 3000)
      return
    }
    setValidationError('')
    setDirection(1)
    nextStep()
  }

  const handlePrev = () => {
    setValidationError('')
    setDirection(-1)
    prevStep()
  }

  const steps = [
    <ParticipantForm key="participante" />,
    <EmoCardsSection key="emocards" />,
    <SusSection key="sus" />,
    <StepPlaceholder key="attrakdiff" name="AttrakDiff" />,
    <StepPlaceholder key="journeymap" name="User Journey Map" />,
    <StepPlaceholder key="export" name="Download" />,
  ]

  return (
    <div className="mx-auto max-w-3xl">
      <FormStepper />

      {/* Validation toast */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {validationError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content with animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>

      <WizardNavButtons
        onNext={handleNext}
        onPrev={handlePrev}
        canGoNext={canGoNext}
        canGoPrev={currentStep > 0}
        isLastStep={currentStep === 5}
        nextLabel={currentStep === 5 ? 'Concluir' : 'Próximo'}
      />
    </div>
  )
}
