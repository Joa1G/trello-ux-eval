interface FaceProps {
  className?: string
}

export default function ExcitedPleasant({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 120 150" fill="none" className={className} aria-label="Rosto excitado agradável">
      {/* Head */}
      <ellipse cx="60" cy="75" rx="48" ry="58" stroke="#1a1a2e" strokeWidth="2.5" fill="#fefce8" />
      {/* Eyebrows - raised high, curved up */}
      <path d="M28 40 Q40 28 54 36" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M66 36 Q80 28 92 40" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Eyes - wide, happy */}
      <ellipse cx="42" cy="58" rx="8" ry="10" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="42" cy="56" r="4.5" fill="#1a1a2e" />
      <circle cx="44" cy="54" r="1.5" fill="white" />
      <ellipse cx="78" cy="58" rx="8" ry="10" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="78" cy="56" r="4.5" fill="#1a1a2e" />
      <circle cx="80" cy="54" r="1.5" fill="white" />
      {/* Mouth - big smile, open */}
      <path d="M40 92 Q60 116 80 92" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M40 92 Q60 100 80 92" stroke="#1a1a2e" strokeWidth="1.5" fill="none" />
    </svg>
  )
}
