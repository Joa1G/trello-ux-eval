'use client'

import { motion } from 'framer-motion'
import { FACE_IMAGES } from './faces'
import type { CategoriaEmoCard } from '@/lib/constants'

interface EmoCardProps {
  categoria: CategoriaEmoCard
  isSelected: boolean
  onSelect: () => void
}

export default function EmoCard({ categoria, isSelected, onSelect }: EmoCardProps) {
  const imageSrc = FACE_IMAGES[categoria.numero]

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`EmoCard: ${categoria.nomePT}`}
      aria-pressed={isSelected}
      className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
        isSelected
          ? 'border-sus bg-sus/5 shadow-md shadow-sus/20 ring-2 ring-sus/30'
          : 'border-foreground/10 bg-card hover:border-foreground/20 hover:shadow-sm'
      }`}
    >
      <div className="h-20 w-16">
        <img
          src={imageSrc}
          alt={`Rosto ${categoria.nomePT}`}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
      <div className="space-y-0.5 text-center">
        <p className={`text-xs font-semibold ${isSelected ? 'text-sus' : 'text-foreground/80'}`}>
          {categoria.nomePT}
        </p>
        <p className="text-[10px] text-foreground/40">
          {categoria.valencia} / {categoria.ativacao}
        </p>
      </div>
    </motion.button>
  )
}
