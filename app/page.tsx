'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl space-y-8"
      >
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wider text-foreground/50">
            Interação Humano-Computador — IFAM 2026-1
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Teste de Usabilidade
          </h1>
          <h2 className="text-2xl font-semibold text-sus sm:text-3xl">
            Trello (Web)
          </h2>
        </div>

        <p className="mx-auto max-w-lg text-lg leading-relaxed text-foreground/70">
          Você participará de um teste de usabilidade do Trello.
          Após realizar as tarefas propostas, preencha os formulários de
          avaliação a seguir.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-foreground/40">
            Seus dados são anônimos e serão utilizados exclusivamente para fins
            acadêmicos.
          </p>

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-foreground/50">
              4 formulários: EmoCards, SUS, AttrakDiff e Mapa de Jornada
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/formulario"
            className="inline-flex items-center gap-2 rounded-xl bg-sus px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-sus/90 hover:shadow-xl active:scale-[0.98]"
          >
            Iniciar Avaliação
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
