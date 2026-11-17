import Ikona from '../komponenty/Ikona'

// Dane z klawiatury to [[5]] na końcu linii, bez nawiasów kwadratowych w środku.
// Dzięki temu wypisana lista list, np. [[1, 2], [3, 4]], zostaje zwykłym wynikiem.
const WPISANE = /\[\[([^[\]]*)\]\]$/

// Wynik programu, zawsze ciemny jak terminal. Linia zaczynająca się od "$ " to polecenie uruchomienia.
export default function BlokWyniku({ tekst }: { tekst: string }) {
  const linie = tekst.split('\n')
  const zKlawiatury = linie.some((linia) => WPISANE.test(linia))
  return (
    <section className="wynik" aria-label="Wynik programu">
      <div className="wynik-pasek">
        <Ikona nazwa="terminal" rozmiar={14} />
        <span className="mono">{zKlawiatury ? 'WEJŚCIE I WYNIK' : 'WYNIK'}</span>
        {zKlawiatury && (
          <span className="wynik-legenda">
            <span className="kwadrat" />z klawiatury
          </span>
        )}
      </div>
      <div className="mono wynik-linie">
        {linie.map((linia, i) => {
          const wpisane = linia.match(WPISANE)
          return (
            <div key={i} className={linia.startsWith('$ ') ? 'tl tdim' : 'tl'}>
              {wpisane ? linia.slice(0, wpisane.index) : linia}
              {wpisane && <span className="tin">{wpisane[1]}</span>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
