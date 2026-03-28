'use client'

import { motion } from 'framer-motion'
import { useFormStore } from '@/lib/store'
import { TAREFAS, COLETAS_IDS, type ColetaId } from '@/lib/constants'
import TaskJourney from './TaskJourney'

export default function JourneyMapSection() {
  const journeymap = useFormStore((s) => s.journeymap)
  const setJourneyResponse = useFormStore((s) => s.setJourneyResponse)
  const sugestaoMudanca = useFormStore((s) => s.sugestaoMudanca)
  const setSugestaoMudanca = useFormStore((s) => s.setSugestaoMudanca)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Mapa de Jornada do Usuário</h2>
        <p className="text-sm text-foreground/50">
          Para cada tarefa, avalie como foi sua experiência: selecione um sentimento, dê uma nota de 1 a 5 e, se quiser, deixe um comentário.
        </p>
      </div>

      <div className="space-y-4">
        {COLETAS_IDS.map((id) => {
          const isGeral = id === 'Geral'
          const tarefa = !isGeral ? TAREFAS.find((t) => t.id === id) ?? null : null

          return (
            <TaskJourney
              key={id}
              coletaId={id}
              tarefa={tarefa}
              isGeral={isGeral}
              response={journeymap[id]}
              onUpdate={(dados) => setJourneyResponse(id, dados)}
            />
          )
        })}
      </div>

      {/* Pergunta aberta final */}
      <div className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-foreground/5">
        <label htmlFor="sugestao-mudanca" className="block text-sm font-medium text-foreground/70">
          Se pudesse mudar uma coisa no Trello, o que mudaria?{' '}
          <span className="text-foreground/30">(opcional)</span>
        </label>
        <textarea
          id="sugestao-mudanca"
          aria-label="Sugestão de mudança para o Trello"
          placeholder="Sua sugestão..."
          rows={3}
          value={sugestaoMudanca}
          onChange={(e) => setSugestaoMudanca(e.target.value)}
          className="mt-2 w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-journeymap focus:outline-none focus:ring-2 focus:ring-journeymap/20"
        />
      </div>
    </motion.div>
  )
}
