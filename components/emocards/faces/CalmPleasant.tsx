interface FaceProps {
  className?: string
}

export default function CalmPleasant({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 120 150" fill="none" className={className} aria-label="Rosto calmo agradável">
      {/* Head */}
      <ellipse cx="60" cy="75" rx="48" ry="58" stroke="#1a1a2e" strokeWidth="2.5" fill="#fefce8" />
      {/* Eyebrows - flat, relaxed */}
      <path d="M32 50 Q42 47 52 50" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M68 50 Q78 47 88 50" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Eyes - half-closed, content */}
      <path d="M34 62 Q42 56 50 62" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M70 62 Q78 56 86 62" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Mouth - soft smile */}
      <path d="M46 94 Q60 104 74 94" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
