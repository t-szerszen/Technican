export default function Logo({ rozmiar = 26 }: { rozmiar?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={rozmiar} height={rozmiar} aria-hidden="true" style={{ flex: '0 0 auto' }}>
      <rect x="2" y="2" width="9" height="9" rx="2" style={{ fill: 'var(--ink)' }} />
      <rect x="13.5" y="2.5" width="8" height="8" rx="2" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6 }} />
      <rect x="2.5" y="13.5" width="8" height="8" rx="2" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6 }} />
      <rect x="13" y="13" width="9" height="9" rx="2" style={{ fill: 'var(--mark-solid)' }} />
    </svg>
  )
}
