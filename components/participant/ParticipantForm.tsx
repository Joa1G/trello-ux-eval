'use client'

import { useFormStore } from '@/lib/store'
import { motion } from 'framer-motion'

export default function ParticipantForm() {
  const participant = useFormStore((s) => s.participant)
  const setParticipant = useFormStore((s) => s.setParticipant)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Dados do Participante</h2>
        <p className="text-sm text-foreground/50">
          Preencha seus dados antes de iniciar a avaliação.
        </p>
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/5">
        <div className="space-y-6">
          {/* Identificador */}
          <div className="space-y-2">
            <label htmlFor="identificador" className="block text-sm font-medium text-foreground">
              Identificador <span className="text-red-400">*</span>
            </label>
            <input
              id="identificador"
              type="text"
              aria-label="Identificador do participante"
              placeholder="Ex: P01 ou suas iniciais"
              value={participant.identificador}
              onChange={(e) => setParticipant({ identificador: e.target.value })}
              className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-sus focus:outline-none focus:ring-2 focus:ring-sus/20"
            />
          </div>

          {/* Perfil */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">
              Perfil <span className="text-red-400">*</span>
            </legend>
            <div className="flex gap-4">
              {(['novato', 'experiente'] as const).map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-all ${
                    participant.perfil === option
                      ? 'border-sus bg-sus/5 text-sus'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="perfil"
                    aria-label={`Perfil ${option}`}
                    value={option}
                    checked={participant.perfil === option}
                    onChange={() => setParticipant({ perfil: option })}
                    className="sr-only"
                  />
                  <div
                    className={`h-4 w-4 rounded-full border-2 transition-colors ${
                      participant.perfil === option
                        ? 'border-sus bg-sus'
                        : 'border-foreground/20'
                    }`}
                  >
                    {participant.perfil === option && (
                      <div className="flex h-full items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                  {option === 'novato' ? 'Novato' : 'Experiente'}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Data */}
          <div className="space-y-2">
            <label htmlFor="data" className="block text-sm font-medium text-foreground">
              Data <span className="text-red-400">*</span>
            </label>
            <input
              id="data"
              type="date"
              aria-label="Data da avaliação"
              value={participant.data}
              onChange={(e) => setParticipant({ data: e.target.value })}
              className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground focus:border-sus focus:outline-none focus:ring-2 focus:ring-sus/20"
            />
          </div>

          {/* Idade (opcional) */}
          <div className="space-y-2">
            <label htmlFor="idade" className="block text-sm font-medium text-foreground">
              Idade <span className="text-foreground/30">(opcional)</span>
            </label>
            <input
              id="idade"
              type="number"
              aria-label="Idade do participante"
              placeholder="Ex: 22"
              min={1}
              max={120}
              value={participant.idade}
              onChange={(e) => setParticipant({ idade: e.target.value })}
              className="w-48 rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-sus focus:outline-none focus:ring-2 focus:ring-sus/20"
            />
          </div>

          {/* Frequência de uso */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">
              Frequência de uso do Trello <span className="text-red-400">*</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {([
                { value: 'nunca' as const, label: 'Nunca usei' },
                { value: 'raramente' as const, label: 'Uso raramente' },
                { value: 'regularmente' as const, label: 'Uso regularmente' },
              ]).map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-all ${
                    participant.frequencia === option.value
                      ? 'border-sus bg-sus/5 text-sus'
                      : 'border-foreground/10 text-foreground/60 hover:border-foreground/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="frequencia"
                    aria-label={`Frequência: ${option.label}`}
                    value={option.value}
                    checked={participant.frequencia === option.value}
                    onChange={() => setParticipant({ frequencia: option.value })}
                    className="sr-only"
                  />
                  <div
                    className={`h-4 w-4 rounded-full border-2 transition-colors ${
                      participant.frequencia === option.value
                        ? 'border-sus bg-sus'
                        : 'border-foreground/20'
                    }`}
                  >
                    {participant.frequencia === option.value && (
                      <div className="flex h-full items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Aviso de privacidade */}
      <div className="rounded-lg bg-sus/5 px-4 py-3 text-center text-xs text-foreground/50">
        Seus dados são anônimos e serão utilizados exclusivamente para fins acadêmicos.
      </div>
    </motion.div>
  )
}
