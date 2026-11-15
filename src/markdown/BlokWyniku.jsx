import Ikona from '../komponenty/Ikona'

// Wynik programu, zawsze ciemny jak terminal. [[5]] to dane wpisane z klawiatury,
// a linia zaczynająca się od "$ " to polecenie uruchomienia.
export default function BlokWyniku({ tekst }) {
  const zKlawiatury = tekst.includes('[[')
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
        {tekst.split('\n').map((linia, i) => (
          <div key={i} className={linia.startsWith('$ ') ? 'tl tdim' : 'tl'}>
            {linia.split(/\[\[(.*?)\]\]/).map((kawalek, j) =>
              j % 2 === 1 ? (
                <span key={j} className="tin">
                  {kawalek}
                </span>
              ) : (
                kawalek
              ),
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
