interface FaceProps {
  className?: string
}

export default function ExcitedUnpleasant({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 120 150" fill="none" className={className} aria-label="Rosto excitado desagradável">
      {/* Head */}
      <ellipse cx="60" cy="75" rx="48" ry="58" stroke="#1a1a2e" strokeWidth="2.5" fill="#fefce8" />
      {/* Eyebrows - angled inward aggressively */}
      <path d="M28 44 Q38 38 52 50" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M68 50 Q82 38 92 44" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Eyes - wide, tense */}
      <ellipse cx="42" cy="60" rx="8" ry="9" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="42" cy="60" r="4" fill="#1a1a2e" />
      <ellipse cx="78" cy="60" rx="8" ry="9" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="78" cy="60" r="4" fill="#1a1a2e" />
      {/* Mouth - open frown / grimace */}
      <ellipse cx="60" cy="100" rx="14" ry="8" stroke="#1a1a2e" strokeWidth="2.5" fill="none" />
      <path d="M46 98 Q60 92 74 98" stroke="#1a1a2e" strokeWidth="1.5" fill="none" />
    </svg>
  )
}
