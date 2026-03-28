import ExcitedNeutral from './ExcitedNeutral'
import ExcitedPleasant from './ExcitedPleasant'
import AveragePleasant from './AveragePleasant'
import CalmPleasant from './CalmPleasant'
import CalmNeutral from './CalmNeutral'
import CalmUnpleasant from './CalmUnpleasant'
import AverageUnpleasant from './AverageUnpleasant'
import ExcitedUnpleasant from './ExcitedUnpleasant'
import type { ComponentType } from 'react'

interface FaceProps {
  className?: string
}

export const FACE_COMPONENTS: Record<number, ComponentType<FaceProps>> = {
  1: ExcitedNeutral,
  2: ExcitedPleasant,
  3: AveragePleasant,
  4: CalmPleasant,
  5: CalmNeutral,
  6: CalmUnpleasant,
  7: AverageUnpleasant,
  8: ExcitedUnpleasant,
}
