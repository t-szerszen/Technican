import { dzialy, znajdzDzial } from '../dane/dzialy'
import { karty, kartyDzialu, znajdzKarte, type Karta } from '../dane/karty'
import { chmura } from '../chmura/firebase'
import { useUzytkownik } from '../chmura/konto'
import { useOznaczenia, type Oznaczenia } from '../hooki/useOznaczenia'
import { useMotyw, przelaczMotyw } from '../hooki/useMotyw'
import { useOstatniaKarta } from '../hooki/useOstatniaKarta'
import { adresKarty } from '../hooki/useTrasa'
import Ikona from '../komponenty/Ikona'
import Logo from '../komponenty/Logo'
import StanSynchronizacji from '../komponenty/StanSynchronizacji'
import './StronaGlowna.css'

function Kontynuuj({ karta, oznaczenia }: { karta: Karta; oznaczenia: Oznaczenia }) {
  const dzial = znajdzDzial(karta.dzial)!
  const wDziale = kartyDzialu(karta.dzial)
  const umiem = wDziale.filter((k) => oznaczenia[k.id] === 'umiem').length

  function kolorPaska(k: Karta) {
    if (oznaczenia[k.id] === 'umiem') return 'var(--ok)'
    if (k.id === karta.id) return 'var(--ink)'
    return 'var(--line-2)'
  }

  return (
    <a href={adresKarty(karta)} className="kontynuuj">
      <div className="kontynuuj-gora">
        <span className="etykieta">Kontynuuj</span>
        <span className="plakietka">
          <span className="kwadrat" style={{ background: dzial.kolor }} />
          {dzial.nazwa}
        </span>
      </div>
      <div className="kontynuuj-tytul">
        <span className="disp">{karta.tytul}</span>
        <span>
          {karta.numer}
          {karta.sekcje[0] ? ` · ${karta.sekcje[0]}` : ''}
        </span>
      </div>
      <div className="kontynuuj-postep">
        <div className="paski" aria-hidden="true">
          {wDziale.map((k) => (
            <span key={k.id} style={{ background: kolorPaska(k) }} />
          ))}
        </div>
        <span className="mono">
          umiem {umiem}/{wDziale.length}
        </span>
      </div>
      <span className="kontynuuj-przycisk">
        Czytaj dalej
        <Ikona nazwa="strzalka" rozmiar={17} />
      </span>
    </a>
  )
}

export default function StronaGlowna() {
  const oznaczenia = useOznaczenia()
  const motyw = useMotyw()
  const uzytkownik = useUzytkownik()
  const ostatnia = znajdzKarte(useOstatniaKarta())
  const umiemWszystkie = karty.filter((k) => oznaczenia[k.id] === 'umiem').length

  return (
    <main className="strona kratka od-gory">
      <div className="glowna-gora">
        <Logo />
        <span className="disp glowna-nazwa">Technican</span>
        {chmura && (
          <a href="#/konto" className="przycisk-ikona z-ramka glowna-konto" aria-label={uzytkownik ? 'Konto' : 'Zaloguj się'}>
            <Ikona nazwa="osoba" rozmiar={19} />
            <StanSynchronizacji zOpisem={false} />
          </a>
        )}
        <button
          type="button"
          className="przycisk-ikona z-ramka"
          onClick={przelaczMotyw}
          aria-label={motyw === 'ciemny' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'}
        >
          <Ikona nazwa={motyw === 'ciemny' ? 'slonce' : 'ksiezyc'} rozmiar={19} />
        </button>
      </div>

      <div className="powitanie">
        <h1>Cześć, Tobiasz</h1>
        <div className="podtytul">
          <Ikona nazwa="lista" rozmiar={16} />
          Egzamin INF.04 · umiem {umiemWszystkie} z {karty.length} {karty.length === 1 ? 'karty' : 'kart'}
        </div>
      </div>

      {ostatnia && <Kontynuuj karta={ostatnia} oznaczenia={oznaczenia} />}

      <h2>Działy</h2>

      <div className="kafelki">
        {dzialy.map((dzial) => {
          const wDziale = kartyDzialu(dzial.id)
          const umiem = wDziale.filter((k) => oznaczenia[k.id] === 'umiem').length
          return (
            <a key={dzial.id} href={`#/dzial/${dzial.id}`} className="kafelek">
              <span className="kafelek-gora">
                <span className="kwadrat" style={{ background: dzial.kolor }} />
                <span className="mono">
                  {umiem}/{wDziale.length}
                </span>
              </span>
              <span className="kafelek-opis">
                <strong>{dzial.nazwa}</strong>
                <span>{dzial.opis}</span>
              </span>
            </a>
          )
        })}
      </div>
    </main>
  )
}
