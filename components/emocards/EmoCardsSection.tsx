'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useFormStore } from '@/lib/store'
import { TAREFAS, EMOCARDS_CATEGORIAS, COLETAS_IDS, type ColetaId } from '@/lib/constants'
import CircumplexGrid from './CircumplexGrid'

export default function EmoCardsSection() {
  const emocards = useFormStore((s) => s.emocards)
  const emocardsCurrentTask = useFormStore((s) => s.emocardsCurrentTask)
  const emocardsShowWalkthrough = useFormStore((s) => s.emocardsShowWalkthrough)
  const setEmoCardResponse = useFormStore((s) => s.setEmoCardResponse)
  const setEmocardsCurrentTask = useFormStore((s) => s.setEmocardsCurrentTask)
  const setEmocardsShowWalkthrough = useFormStore((s) => s.setEmocardsShowWalkthrough)

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
    if (!canAdvance) return

    // After an EmoCard for T1-T5, show walkthrough first
    if (!isGeral && !emocardsShowWalkthrough) {
      setEmocardsShowWalkthrough(true)
      return
    }

    // After walkthrough (or if it's Geral), advance to next task
    if (!isLastTask) {
      setEmocardsShowWalkthrough(false)
      setEmocardsCurrentTask(emocardsCurrentTask + 1)
    }
  }

  const handlePrevTask = () => {
    if (emocardsShowWalkthrough) {
      // Go back from walkthrough to the EmoCard of same task
      setEmocardsShowWalkthrough(false)
      return
    }
    if (emocardsCurrentTask > 0) {
      // Go back to the walkthrough of the previous task (if it's T1-T5)
      const prevIndex = emocardsCurrentTask - 1
      const prevId = COLETAS_IDS[prevIndex]
      if (prevId !== 'Geral') {
        setEmocardsCurrentTask(prevIndex)
        setEmocardsShowWalkthrough(true)
      } else {
        setEmocardsCurrentTask(prevIndex)
      }
    }
  }

  const handleSubStepClick = (index: number) => {
    setEmocardsShowWalkthrough(false)
    setEmocardsCurrentTask(index)
  }

  // Compute visual step for the counter
  const totalVisualSteps = COLETAS_IDS.length + 5 // 6 emocards + 5 walkthroughs = 11
  const currentVisualStep = (() => {
    let step = 0
    for (let i = 0; i < emocardsCurrentTask; i++) {
      step++ // emocard
      if (COLETAS_IDS[i] !== 'Geral') step++ // walkthrough
    }
    step++ // current emocard
    if (emocardsShowWalkthrough) step++ // current walkthrough
    return step
  })()

  const animationKey = `${coletaId}-${emocardsShowWalkthrough ? 'walk' : 'emo'}`

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">EmoCards</h2>
        <div className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
          <p className="font-medium">Sobre este formulario</p>
          <p className="mt-1 text-indigo-700">
            Os EmoCards (Desmet et al., 2001) sao baseados no Modelo Circumplexo de Russell (1980) e capturam sua reacao emocional apos cada tarefa.
            Cada cartao representa uma combinacao de <strong>valencia</strong> (agradavel/desagradavel) e <strong>ativacao</strong> (calmo/excitado).
            Selecione o cartao que melhor representa como voce se sentiu.
          </p>
        </div>
      </div>

      {/* Sub-progress */}
      <div className="flex items-center gap-2">
        {COLETAS_IDS.map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => handleSubStepClick(index)}
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
          {currentVisualStep} de {totalVisualSteps}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {emocardsShowWalkthrough && tarefa ? (
            /* Walkthrough Screen */
            <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-foreground/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg">
                  <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Momento Walkthrough Pos-tarefa {tarefa.id.replace('T', '')}
                  </h3>
                  <span className="text-xs text-foreground/40">
                    {tarefa.id} — {tarefa.nome}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <p className="font-medium mb-1">Instruções</p>
                <p>
                  Este é o momento para realizar o <strong>walkthrough</strong>.
                  Discuta a experiencia na tarefa que acabou de ser realizada,
                  explorando dificuldades encontradas, caminhos percorridos e impressoes gerais.
                </p>
              </div>

              <div className="mt-4 rounded-lg bg-foreground/[0.02] p-4 ring-1 ring-foreground/5">
                <p className="text-xs font-medium text-foreground/50 mb-1">Tarefa realizada:</p>
                <p className="text-sm text-foreground/70">{tarefa.descricaoCompleta}</p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-foreground/40">
                    {tarefa.complexidade}
                  </span>
                  <span className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-foreground/40">
                    {tarefa.steps} passos
                  </span>
                  <span className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs text-foreground/40">
                    {tarefa.funcionalidades}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Task info */}
              <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-foreground/5">
                {isGeral ? (
                  <div>
                    <h3 className="font-semibold text-foreground">Experiencia Geral</h3>
                    <p className="mt-1 text-sm text-foreground/60">
                      Considerando todas as tarefas realizadas, como voce se sentiu ao usar o Trello de forma geral?
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
                  Comentario <span className="text-foreground/30">(opcional)</span>
                </label>
                <textarea
                  id={`comment-${coletaId}`}
                  aria-label={`Comentario para ${coletaId}`}
                  placeholder="Alguma observacao sobre esta tarefa?"
                  rows={2}
                  value={currentResponse?.comentario ?? ''}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-sus focus:outline-none focus:ring-2 focus:ring-sus/20"
                />
              </div>
            </>
          )}

          {/* Sub-navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevTask}
              disabled={emocardsCurrentTask === 0 && !emocardsShowWalkthrough}
              className="rounded-lg px-4 py-2 text-sm text-foreground/50 hover:bg-foreground/5 disabled:invisible"
            >
              {emocardsShowWalkthrough ? 'Voltar ao EmoCard' : 'Tarefa anterior'}
            </button>
            {(!isLastTask || !emocardsShowWalkthrough) && !(isLastTask && isGeral) && (
              <button
                type="button"
                onClick={handleNextTask}
                disabled={!canAdvance && !emocardsShowWalkthrough}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  (canAdvance || emocardsShowWalkthrough)
                    ? 'bg-sus/10 text-sus hover:bg-sus/20'
                    : 'cursor-not-allowed text-foreground/20'
                }`}
              >
                {emocardsShowWalkthrough ? 'Continuar' : 'Proxima tarefa'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
