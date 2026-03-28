interface FaceProps {
  className?: string
}

export default function ExcitedNeutral({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 120 150" fill="none" className={className} aria-label="Rosto excitado neutro">
      {/* Head */}
      <ellipse cx="60" cy="75" rx="48" ry="58" stroke="#1a1a2e" strokeWidth="2.5" fill="#fefce8" />
      {/* Eyebrows - raised high */}
      <path d="M30 42 Q40 32 52 38" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M68 38 Q80 32 90 42" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Eyes - wide open */}
      <ellipse cx="42" cy="60" rx="8" ry="10" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="42" cy="58" r="4" fill="#1a1a2e" />
      <ellipse cx="78" cy="60" rx="8" ry="10" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="78" cy="58" r="4" fill="#1a1a2e" />
      {/* Mouth - straight/slightly open */}
      <ellipse cx="60" cy="98" rx="12" ry="6" stroke="#1a1a2e" strokeWidth="2.5" fill="none" />
    </svg>
  )
}
