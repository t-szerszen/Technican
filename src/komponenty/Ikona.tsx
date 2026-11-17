import type { SVGProps } from 'react'

// Ikony przerysowane z designu (siatka 24x24, kreska 1.75).
const ksztalty = {
  wstecz: <path d="m15 6-6 6 6 6" />,
  dalej: <path d="m9 6 6 6-6 6" />,
  'w-dol': <path d="m6 9 6 6 6-6" />,
  strzalka: <path d="M5 12h14M13 6l6 6-6 6" />,
  ksiezyc: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />,
  slonce: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  zakladka: <path d="M6.5 3.5h11v17l-5.5-4-5.5 4z" />,
  szukaj: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  dzialy: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  lista: (
    <>
      <path d="M10 6h10M10 12h10M10 18h10" />
      <path d="m3.5 6 1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17" />
    </>
  ),
  kopiuj: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  ok: <path d="M5 12.5 10 17 19 7" />,
  zamknij: <path d="M6 6l12 12M18 6 6 18" />,
  terminal: <path d="m5 8 4 4-4 4M12 16h7" />,
  ostrzezenie: (
    <>
      <path d="M12 3.5 21.5 20h-19z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  flaga: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h12l-2.5 4.5L17 13H5" />
    </>
  ),
  zarowka: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
    </>
  ),
  osoba: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
    </>
  ),
  oko: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  'oko-zamkniete': (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <path d="M4 4l16 16" />
    </>
  ),
  wyloguj: <path d="M9.5 20.5h-4A1.5 1.5 0 0 1 4 19V5a1.5 1.5 0 0 1 1.5-1.5h4M15.5 16.5 20 12l-4.5-4.5M20 12H9" />,
  chmura: <path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 17.8 8a5.3 5.3 0 0 1-.3 10.5Z" />,
}

export type NazwaIkony = keyof typeof ksztalty

interface Wlasciwosci extends SVGProps<SVGSVGElement> {
  nazwa: NazwaIkony
  rozmiar?: number
  wypelniona?: boolean
}

export default function Ikona({ nazwa, rozmiar = 20, wypelniona = false, ...reszta }: Wlasciwosci) {
  return (
    <svg
      className="ic"
      viewBox="0 0 24 24"
      width={rozmiar}
      height={rozmiar}
      aria-hidden="true"
      style={wypelniona ? { fill: 'currentColor' } : undefined}
      {...reszta}
    >
      {ksztalty[nazwa]}
    </svg>
  )
}
