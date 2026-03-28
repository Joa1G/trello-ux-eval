interface FaceProps {
  className?: string
}

export default function AverageUnpleasant({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 120 150" fill="none" className={className} aria-label="Rosto moderado desagradável">
      {/* Head */}
      <ellipse cx="60" cy="75" rx="48" ry="58" stroke="#1a1a2e" strokeWidth="2.5" fill="#fefce8" />
      {/* Eyebrows - furrowed inward */}
      <path d="M30 48 Q40 44 52 52" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M68 52 Q80 44 90 48" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Eyes - tense */}
      <ellipse cx="42" cy="62" rx="7" ry="7" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="42" cy="63" r="3.5" fill="#1a1a2e" />
      <ellipse cx="78" cy="62" rx="7" ry="7" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="78" cy="63" r="3.5" fill="#1a1a2e" />
      {/* Mouth - frown */}
      <path d="M42 102 Q60 90 78 102" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
