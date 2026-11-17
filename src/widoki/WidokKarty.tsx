import { useEffect, useState } from 'react'
import { znajdzDzial } from '../dane/dzialy'
import { kartyDzialu, znajdzKarte } from '../dane/karty'
import { zapiszWPamieci } from '../hooki/pamiec'
import { przelaczOznaczenie, useOznaczenia } from '../hooki/useOznaczenia'
import { adresKarty } from '../hooki/useTrasa'
import Ikona from '../komponenty/Ikona'
import Naglowek from '../komponenty/Naglowek'
import TrescKarty from '../markdown/TrescKarty'
import NieZnaleziono from './NieZnaleziono'
import './WidokKarty.css'

function useCzytanie() {
  const [postep, ustawPostep] = useState(0)
  useEffect(() => {
    function przelicz() {
      const zakres = document.documentElement.scrollHeight - window.innerHeight
      ustawPostep(zakres > 0 ? Math.min(1, window.scrollY / zakres) : 1)
    }
    przelicz()
    window.addEventListener('scroll', przelicz, { passive: true })
    window.addEventListener('resize', przelicz)
    return () => {
      window.removeEventListener('scroll', przelicz)
      window.removeEventListener('resize', przelicz)
    }
  }, [])
  return postep
}

function przewinDoSekcji(indeks: number) {
  document.querySelectorAll('.tresc-karty h2')[indeks]?.scrollIntoView({ behavior: 'smooth' })
}

function linkZrodla(zrodlo: string) {
  return /^https?:\/\//.test(zrodlo) ? (
    <a href={zrodlo} target="_blank" rel="noreferrer">
      {zrodlo.replace(/^https?:\/\/(www\.)?/, '')}
    </a>
  ) : (
    zrodlo
  )
}

export default function WidokKarty({ idKarty }: { idKarty: string }) {
  const oznaczenia = useOznaczenia()
  const postep = useCzytanie()
  const karta = znajdzKarte(idKarty)

  useEffect(() => {
    if (karta) zapiszWPamieci('kratka:ostatnia', karta.id)
  }, [karta])

  if (!karta) return <NieZnaleziono />

  const dzial = znajdzDzial(karta.dzial)!
  const wDziale = kartyDzialu(karta.dzial)
  const indeks = wDziale.indexOf(karta)
  const poprzednia = wDziale[indeks - 1]
  const nastepna = wDziale[indeks + 1]
  const oznaczenie = oznaczenia[karta.id]
  const nrRozdzialu = parseInt(karta.numer, 10)

  return (
    <div className="karta-uklad">
      <Naglowek
        adresRodzica={`/dzial/${dzial.id}`}
        maly={`${dzial.nazwa} · ${karta.numer}`}
        tytul={karta.tytul}
        postep={postep}
        sciezka={[
          { nazwa: dzial.nazwa, adres: `#/dzial/${dzial.id}` },
          { nazwa: karta.tytul },
        ]}
      >
        <button
          type="button"
          className="przycisk-ikona karta-zakladka"
          aria-pressed={oznaczenie === 'powtorka'}
          aria-label="Do powtórki"
          title="Do powtórki"
          onClick={() => przelaczOznaczenie(karta.id, 'powtorka')}
        >
          <Ikona nazwa="zakladka" wypelniona={oznaczenie === 'powtorka'} />
        </button>
        <button
          type="button"
          className={oznaczenie === 'umiem' ? 'karta-umiem-gora umiem' : 'karta-umiem-gora'}
          aria-pressed={oznaczenie === 'umiem'}
          onClick={() => przelaczOznaczenie(karta.id, 'umiem')}
        >
          <Ikona nazwa="ok" rozmiar={16} />
          Umiem
        </button>
      </Naglowek>

      <div className="karta-tlo">
        <article className="karta">
          <div className="karta-plakietki">
            <a href={`#/dzial/${dzial.id}`} className="plakietka">
              <span className="kwadrat" style={{ background: dzial.kolor }} />
              {dzial.nazwa}
            </a>
            {karta.status === 'zweryfikowane' ? (
              <span className="plakietka plakietka-ok">
                <Ikona nazwa="ok" rozmiar={13} />
                zweryfikowana
              </span>
            ) : (
              <span className="plakietka plakietka-uwaga">
                <Ikona nazwa="ostrzezenie" rozmiar={13} />
                do weryfikacji
              </span>
            )}
            <span className="mono">Karta {karta.numer}</span>
          </div>

          <h1>{karta.tytul}</h1>

          <TrescKarty tresc={karta.tresc} numer={karta.numer} />

          {(karta.tagi.length > 0 || karta.zrodla.length > 0 || karta.arkusze.length > 0) && (
            <footer className="karta-stopka">
              {karta.tagi.length > 0 && (
                <div>
                  <span className="etykieta">Tagi</span>
                  <div className="karta-tagi">
                    {karta.tagi.map((tag) => (
                      <a key={tag} href={`#/szukaj?q=${encodeURIComponent(tag)}`} className="mono">
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {karta.arkusze.length > 0 && (
                <div>
                  <span className="etykieta">Arkusze</span>
                  <div className="karta-tagi">
                    {karta.arkusze.map((arkusz) => (
                      <span key={arkusz} className="mono">
                        {arkusz}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {karta.zrodla.length > 0 && (
                <div>
                  <span className="etykieta">Źródła</span>
                  <ul className="karta-zrodla">
                    {karta.zrodla.map((zrodlo) => (
                      <li key={zrodlo}>{linkZrodla(zrodlo)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </footer>
          )}

          <nav className="karta-sasiedzi" aria-label="Sąsiednie karty">
            {poprzednia ? (
              <a href={adresKarty(poprzednia)}>
                <small>
                  <Ikona nazwa="wstecz" rozmiar={14} />
                  Poprzednia
                </small>
                {poprzednia.numer} · {poprzednia.tytul}
              </a>
            ) : (
              <span />
            )}
            {nastepna && (
              <a href={adresKarty(nastepna)} className="nastepna">
                <small>
                  Następna
                  <Ikona nazwa="dalej" rozmiar={14} />
                </small>
                {nastepna.numer} · {nastepna.tytul}
              </a>
            )}
          </nav>
        </article>

        {karta.sekcje.length > 0 && (
          <aside className="karta-spis" aria-label="Na tej stronie">
            <span className="etykieta">Na tej stronie</span>
            {karta.sekcje.map((sekcja, i) => (
              <button key={i} type="button" onClick={() => przewinDoSekcji(i)}>
                <span className="mono">
                  {nrRozdzialu}.{i + 1}
                </span>
                {sekcja}
              </button>
            ))}
          </aside>
        )}
      </div>

      <nav className="karta-dol" aria-label="Karty">
        {poprzednia ? (
          <a href={adresKarty(poprzednia)} className="karta-strzalka" aria-label={`Poprzednia karta: ${poprzednia.tytul}`}>
            <Ikona nazwa="wstecz" />
          </a>
        ) : (
          <span className="karta-strzalka nieaktywna" aria-hidden="true">
            <Ikona nazwa="wstecz" />
          </span>
        )}
        <button
          type="button"
          className={oznaczenie === 'umiem' ? 'karta-umiem umiem' : 'karta-umiem'}
          aria-pressed={oznaczenie === 'umiem'}
          onClick={() => przelaczOznaczenie(karta.id, 'umiem')}
        >
          <Ikona nazwa="ok" rozmiar={18} />
          {oznaczenie === 'umiem' ? 'Umiem' : 'Oznacz: umiem'}
        </button>
        {nastepna ? (
          <a href={adresKarty(nastepna)} className="karta-strzalka" aria-label={`Następna karta: ${nastepna.tytul}`}>
            <Ikona nazwa="dalej" />
          </a>
        ) : (
          <span className="karta-strzalka nieaktywna" aria-hidden="true">
            <Ikona nazwa="dalej" />
          </span>
        )}
      </nav>
    </div>
  )
}
