interface FaceProps {
  className?: string
}

export default function AveragePleasant({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 120 150" fill="none" className={className} aria-label="Rosto moderado agradável">
      {/* Head */}
      <ellipse cx="60" cy="75" rx="48" ry="58" stroke="#1a1a2e" strokeWidth="2.5" fill="#fefce8" />
      {/* Eyebrows - slightly raised */}
      <path d="M32 46 Q42 40 52 44" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M68 44 Q78 40 88 46" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Eyes - normal, relaxed */}
      <ellipse cx="42" cy="62" rx="7" ry="8" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="42" cy="61" r="3.5" fill="#1a1a2e" />
      <ellipse cx="78" cy="62" rx="7" ry="8" stroke="#1a1a2e" strokeWidth="2" fill="none" />
      <circle cx="78" cy="61" r="3.5" fill="#1a1a2e" />
      {/* Mouth - gentle smile */}
      <path d="M42 94 Q60 108 78 94" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
