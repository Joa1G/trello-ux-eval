interface FaceProps {
  className?: string
}

export function PositiveFace({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-label="Sentimento positivo">
      <circle cx="24" cy="24" r="20" stroke="#1a1a2e" strokeWidth="2" fill="#fefce8" />
      {/* Eyes - happy */}
      <path d="M15 19 Q17 15 19 19" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M29 19 Q31 15 33 19" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Mouth - smile */}
      <path d="M15 28 Q24 36 33 28" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function NeutralFace({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-label="Sentimento neutro">
      <circle cx="24" cy="24" r="20" stroke="#1a1a2e" strokeWidth="2" fill="#fefce8" />
      {/* Eyes - dots */}
      <circle cx="17" cy="20" r="2" fill="#1a1a2e" />
      <circle cx="31" cy="20" r="2" fill="#1a1a2e" />
      {/* Mouth - straight */}
      <path d="M17 30 L31 30" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function NegativeFace({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-label="Sentimento negativo">
      <circle cx="24" cy="24" r="20" stroke="#1a1a2e" strokeWidth="2" fill="#fefce8" />
      {/* Eyes - sad */}
      <circle cx="17" cy="20" r="2" fill="#1a1a2e" />
      <circle cx="31" cy="20" r="2" fill="#1a1a2e" />
      {/* Eyebrows - sad */}
      <path d="M13 16 Q17 14 21 17" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M27 17 Q31 14 35 16" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Mouth - frown */}
      <path d="M16 33 Q24 26 32 33" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}
