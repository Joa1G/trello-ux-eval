interface FaceProps {
  className?: string
}

export default function CalmUnpleasant({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 120 150" fill="none" className={className} aria-label="Rosto calmo desagradável">
      {/* Head */}
      <ellipse cx="60" cy="75" rx="48" ry="58" stroke="#1a1a2e" strokeWidth="2.5" fill="#fefce8" />
      {/* Eyebrows - slightly furrowed, drooping */}
      <path d="M32 52 Q42 48 52 54" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M68 54 Q78 48 88 52" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Eyes - half-closed, sad */}
      <path d="M34 64 Q42 60 50 64" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M70 64 Q78 60 86 64" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Mouth - slight frown */}
      <path d="M44 100 Q60 92 76 100" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
