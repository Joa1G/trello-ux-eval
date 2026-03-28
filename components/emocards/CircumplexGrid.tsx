'use client'

import { EMOCARDS_CATEGORIAS } from '@/lib/constants'
import EmoCard from './EmoCard'

interface CircumplexGridProps {
  selectedCategoria: number | null
  onSelect: (categoriaNumero: number) => void
}

export default function CircumplexGrid({ selectedCategoria, onSelect }: CircumplexGridProps) {
  return (
    <div className="space-y-4">
      {/* Axis labels */}
      <div className="flex items-center justify-between px-2 text-[10px] font-medium uppercase tracking-wider text-foreground/30">
        <span>Desagradável</span>
        <span>Valência</span>
        <span>Agradável</span>
      </div>

      <div className="relative">
        {/* Side label */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-medium uppercase tracking-wider text-foreground/30">
          Ativação
        </div>

        {/* Grid: 3 rows × 3 cols (left=unpleasant, center=neutral, right=pleasant) */}
        {/* Row 1: Alta ativação */}
        {/* Row 2: Média ativação */}
        {/* Row 3: Baixa ativação */}
        <div className="ml-2 grid grid-cols-3 gap-3">
          {/* Alta ativação */}
          <div className="flex justify-center">
            <EmoCard
              categoria={EMOCARDS_CATEGORIAS[7]} // 8: Excited Unpleasant
              isSelected={selectedCategoria === 8}
              onSelect={() => onSelect(8)}
            />
          </div>
          <div className="flex justify-center">
            <EmoCard
              categoria={EMOCARDS_CATEGORIAS[0]} // 1: Excited Neutral
              isSelected={selectedCategoria === 1}
              onSelect={() => onSelect(1)}
            />
          </div>
          <div className="flex justify-center">
            <EmoCard
              categoria={EMOCARDS_CATEGORIAS[1]} // 2: Excited Pleasant
              isSelected={selectedCategoria === 2}
              onSelect={() => onSelect(2)}
            />
          </div>

          {/* Média ativação */}
          <div className="flex justify-center">
            <EmoCard
              categoria={EMOCARDS_CATEGORIAS[6]} // 7: Average Unpleasant
              isSelected={selectedCategoria === 7}
              onSelect={() => onSelect(7)}
            />
          </div>
          <div /> {/* Centro vazio */}
          <div className="flex justify-center">
            <EmoCard
              categoria={EMOCARDS_CATEGORIAS[2]} // 3: Average Pleasant
              isSelected={selectedCategoria === 3}
              onSelect={() => onSelect(3)}
            />
          </div>

          {/* Baixa ativação */}
          <div className="flex justify-center">
            <EmoCard
              categoria={EMOCARDS_CATEGORIAS[5]} // 6: Calm Unpleasant
              isSelected={selectedCategoria === 6}
              onSelect={() => onSelect(6)}
            />
          </div>
          <div className="flex justify-center">
            <EmoCard
              categoria={EMOCARDS_CATEGORIAS[4]} // 5: Calm Neutral
              isSelected={selectedCategoria === 5}
              onSelect={() => onSelect(5)}
            />
          </div>
          <div className="flex justify-center">
            <EmoCard
              categoria={EMOCARDS_CATEGORIAS[3]} // 4: Calm Pleasant
              isSelected={selectedCategoria === 4}
              onSelect={() => onSelect(4)}
            />
          </div>
        </div>

        {/* Side labels for activation */}
        <div className="absolute -right-4 top-2 text-[10px] text-foreground/30">Alta</div>
        <div className="absolute -right-4 bottom-2 text-[10px] text-foreground/30">Baixa</div>
      </div>
    </div>
  )
}
