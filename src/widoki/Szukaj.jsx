import { useEffect, useRef, useState } from 'react'
import { karty, szukaj, wszystkieTagi } from '../dane/karty'
import { pasujeDoFiltra, useOznaczenia } from '../hooki/useOznaczenia'
import { podmienAdres } from '../hooki/useTrasa'
import FiltrOznaczen from '../komponenty/FiltrOznaczen'
import Ikona from '../komponenty/Ikona'
import WierszKarty from '../komponenty/WierszKarty'
import { liczbaKart } from '../komponenty/odmiana'
import './Szukaj.css'

function adres(zapytanie, filtr) {
  const parametry = new URLSearchParams()
  if (zapytanie) parametry.set('q', zapytanie)
  if (filtr && filtr !== 'wszystkie') parametry.set('filtr', filtr)
  const reszta = parametry.toString()
  return '/szukaj' + (reszta ? '?' + reszta : '')
}

export default function Szukaj({ zapytanie: zapytanieZAdresu, filtr }) {
  const oznaczenia = useOznaczenia()
  const pole = useRef(null)
  // Pole ma własny stan; adres aktualizujemy obok, żeby po powrocie z karty zapytanie zostało.
  const [zapytanie, ustawZapytanie] = useState(zapytanieZAdresu)
  const aktywnyFiltr = filtr ?? 'wszystkie'

  function zmienZapytanie(nowe) {
    ustawZapytanie(nowe)
    podmienAdres(adres(nowe, aktywnyFiltr))
  }

  // Klawiatura od razu, ale tylko przy pustym polu: po powrocie z karty nie zasłaniamy wyników.
  useEffect(() => {
    if (!pole.current.value) pole.current.focus()
  }, [])

  const wyniki = zapytanie.trim()
    ? szukaj(zapytanie)
    : aktywnyFiltr !== 'wszystkie'
      ? karty.map((karta) => ({ karta, wycinek: null }))
      : null
  const widoczne = wyniki?.filter((w) => pasujeDoFiltra(w.karta, aktywnyFiltr, oznaczenia))

  return (
    <main className="strona kratka">
      <h1 className="ukryte">Szukaj</h1>
      <form className="szukaj-pole" role="search" onSubmit={(e) => e.preventDefault()}>
        <Ikona nazwa="szukaj" rozmiar={19} />
        <input
          ref={pole}
          type="search"
          value={zapytanie}
          onChange={(e) => zmienZapytanie(e.target.value)}
          placeholder="range, input(), useState…"
          aria-label="Szukaj w tytułach, tagach i treści kart"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          enterKeyHint="search"
        />
        {zapytanie && (
          <button
            type="button"
            className="przycisk-ikona"
            onClick={() => {
              zmienZapytanie('')
              pole.current.focus()
            }}
            aria-label="Wyczyść"
          >
            <Ikona nazwa="zamknij" rozmiar={18} />
          </button>
        )}
      </form>

      <FiltrOznaczen
        aktywny={aktywnyFiltr}
        karty={wyniki ? wyniki.map((w) => w.karta) : karty}
        oznaczenia={oznaczenia}
        zmien={(nowy) => podmienAdres(adres(zapytanie, nowy))}
      />

      {widoczne ? (
        <>
          <p className="szukaj-licznik mono" aria-live="polite">
            {widoczne.length === 0 ? 'Nic nie znaleziono' : liczbaKart(widoczne.length)}
          </p>
          {widoczne.length > 0 && (
            <ul className="lista-kart">
              {widoczne.map((w) => (
                <WierszKarty key={w.karta.id} karta={w.karta} oznaczenie={oznaczenia[w.karta.id]} zDzialem wycinek={w.wycinek} />
              ))}
            </ul>
          )}
        </>
      ) : (
        wszystkieTagi.length > 0 && (
          <section className="szukaj-tagi" aria-label="Tagi">
            <span className="etykieta">Tagi</span>
            <div>
              {wszystkieTagi.map((tag) => (
                <button key={tag} type="button" className="mono" onClick={() => zmienZapytanie(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </section>
        )
      )}
    </main>
  )
}
