'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useFormStore } from '@/lib/store'
import { TAREFAS, EMOCARDS_CATEGORIAS, COLETAS_IDS, type ColetaId } from '@/lib/constants'
import CircumplexGrid from './CircumplexGrid'

export default function EmoCardsSection() {
  const emocards = useFormStore((s) => s.emocards)
  const emocardsCurrentTask = useFormStore((s) => s.emocardsCurrentTask)
  const setEmoCardResponse = useFormStore((s) => s.setEmoCardResponse)
  const setEmocardsCurrentTask = useFormStore((s) => s.setEmocardsCurrentTask)

  const coletaId = COLETAS_IDS[emocardsCurrentTask]
  const isGeral = coletaId === 'Geral'
  const tarefa = !isGeral ? TAREFAS.find((t) => t.id === coletaId) : null
  const currentResponse = emocards[coletaId]

  const handleSelect = (categoriaNumero: number) => {
    const cat = EMOCARDS_CATEGORIAS.find((c) => c.numero === categoriaNumero)!
    setEmoCardResponse(coletaId, {
      categoriaNumero: cat.numero,
      categoriaNome: cat.nomePT,
      valencia: cat.valencia,
      ativacao: cat.ativacao,
      comentario: currentResponse?.comentario ?? '',
    })
  }

  const handleCommentChange = (text: string) => {
    if (currentResponse) {
      setEmoCardResponse(coletaId, { ...currentResponse, comentario: text })
    }
  }

  const canAdvance = currentResponse !== undefined
  const isLastTask = emocardsCurrentTask === COLETAS_IDS.length - 1

  const handleNextTask = () => {
    if (canAdvance && !isLastTask) {
      setEmocardsCurrentTask(emocardsCurrentTask + 1)
    }
  }

  const handlePrevTask = () => {
    if (emocardsCurrentTask > 0) {
      setEmocardsCurrentTask(emocardsCurrentTask - 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">EmoCards</h2>
        <p className="text-sm text-foreground/50">
          Para cada tarefa, selecione o cartão que melhor representa como você se sentiu ao realizá-la.
        </p>
      </div>

      {/* Sub-progress */}
      <div className="flex items-center gap-2">
        {COLETAS_IDS.map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => setEmocardsCurrentTask(index)}
            className={`flex h-8 items-center justify-center rounded-full px-3 text-xs font-medium transition-all ${
              index === emocardsCurrentTask
                ? 'bg-sus text-white'
                : emocards[id]
                  ? 'bg-sus/20 text-sus'
                  : 'bg-foreground/5 text-foreground/40'
            }`}
          >
            {id}
          </button>
        ))}
        <span className="ml-auto text-xs text-foreground/40">
          {emocardsCurrentTask + 1} de {COLETAS_IDS.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={coletaId}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Task info */}
          <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-foreground/5">
            {isGeral ? (
              <div>
                <h3 className="font-semibold text-foreground">Experiência Geral</h3>
                <p className="mt-1 text-sm text-foreground/60">
                  Considerando todas as tarefas realizadas, como você se sentiu ao usar o Trello de forma geral?
                </p>
              </div>
            ) : tarefa ? (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-sus/10 px-2 py-0.5 text-xs font-semibold text-sus">
                    {tarefa.id}
                  </span>
                  <span className="text-xs text-foreground/40">
                    {tarefa.complexidade} — {tarefa.steps} passos
                  </span>
                </div>
                <h3 className="mt-1 font-semibold text-foreground">{tarefa.nome}</h3>
                <p className="mt-1 text-sm text-foreground/60">{tarefa.descricaoResumida}</p>
              </div>
            ) : null}
          </div>

          {/* Circumplex Grid */}
          <CircumplexGrid
            selectedCategoria={currentResponse?.categoriaNumero ?? null}
            onSelect={handleSelect}
          />

          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor={`comment-${coletaId}`} className="block text-sm font-medium text-foreground/60">
              Comentário <span className="text-foreground/30">(opcional)</span>
            </label>
            <textarea
              id={`comment-${coletaId}`}
              aria-label={`Comentário para ${coletaId}`}
              placeholder="Alguma observação sobre esta tarefa?"
              rows={2}
              value={currentResponse?.comentario ?? ''}
              onChange={(e) => handleCommentChange(e.target.value)}
              className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-sus focus:outline-none focus:ring-2 focus:ring-sus/20"
            />
          </div>

          {/* Sub-navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevTask}
              disabled={emocardsCurrentTask === 0}
              className="rounded-lg px-4 py-2 text-sm text-foreground/50 hover:bg-foreground/5 disabled:invisible"
            >
              Tarefa anterior
            </button>
            {!isLastTask && (
              <button
                type="button"
                onClick={handleNextTask}
                disabled={!canAdvance}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  canAdvance
                    ? 'bg-sus/10 text-sus hover:bg-sus/20'
                    : 'cursor-not-allowed text-foreground/20'
                }`}
              >
                Próxima tarefa
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
