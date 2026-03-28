'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFormStore } from '@/lib/store'
import { SUS_ITENS } from '@/lib/constants'
import SusItem from './SusItem'

export default function SusSection() {
  const sus = useFormStore((s) => s.sus)
  const setSusResponse = useFormStore((s) => s.setSusResponse)
  const [showMissing, setShowMissing] = useState(false)

  const answeredCount = SUS_ITENS.filter((item) => sus[item.numero] !== undefined).length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Questionário SUS
        </h2>
        <div className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
          <p className="font-medium">Sobre este formulário</p>
          <p className="mt-1 text-indigo-700">
            O <strong>System Usability Scale</strong> (Brooke, 1996) é um questionário padronizado com 10 afirmações que avalia a usabilidade percebida de um sistema.
            Algumas afirmações são positivas e outras negativas — isso é intencional. Responda com base na sua experiência real com o Trello.
          </p>
        </div>
        <p className="text-sm text-foreground/50">
          Para cada afirmação abaixo, marque o quanto você concorda ou discorda.
        </p>
        <p className="text-xs text-foreground/30">
          {answeredCount} de {SUS_ITENS.length} respondidos
        </p>
      </div>

      <div className="space-y-4">
        {SUS_ITENS.map((item) => (
          <SusItem
            key={item.numero}
            item={item}
            value={sus[item.numero]}
            onChange={(valor) => setSusResponse(item.numero, valor)}
            showMissing={showMissing}
          />
        ))}
      </div>

      {answeredCount < SUS_ITENS.length && (
        <button
          type="button"
          onClick={() => setShowMissing(true)}
          className="text-xs text-foreground/40 hover:text-foreground/60"
        >
          Destacar itens faltantes
        </button>
      )}
    </motion.div>
  )
}
