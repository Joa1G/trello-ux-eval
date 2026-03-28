interface FaceProps {
  className?: string
}

export default function CalmNeutral({ className }: FaceProps) {
  return (
    <svg viewBox="0 0 120 150" fill="none" className={className} aria-label="Rosto calmo neutro">
      {/* Head */}
      <ellipse cx="60" cy="75" rx="48" ry="58" stroke="#1a1a2e" strokeWidth="2.5" fill="#fefce8" />
      {/* Eyebrows - flat */}
      <path d="M32 52 L52 52" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
      <path d="M68 52 L88 52" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes - half-closed, sleepy */}
      <path d="M34 64 Q42 58 50 64" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M70 64 Q78 58 86 64" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Mouth - straight line */}
      <path d="M44 96 L76 96" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
