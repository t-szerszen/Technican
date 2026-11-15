import { useEffect, useLayoutEffect } from 'react'
import { ostatniKierunek, przejdz, useTrasa } from './hooki/useTrasa'
import PanelBoczny from './komponenty/PanelBoczny'
import DolnaNawigacja from './komponenty/DolnaNawigacja'
import StronaGlowna from './widoki/StronaGlowna'
import ListaTematow from './widoki/ListaTematow'
import WidokKarty from './widoki/WidokKarty'
import Szukaj from './widoki/Szukaj'
import Powtorki from './widoki/Powtorki'
import NieZnaleziono from './widoki/NieZnaleziono'
import './App.css'

function wybierzWidok({ czesci, parametry }) {
  const [rodzaj, ...reszta] = czesci
  if (!rodzaj) return { widok: <StronaGlowna />, zakladka: 'dzialy' }
  if (rodzaj === 'dzial' && reszta.length === 1) {
    return { widok: <ListaTematow idDzialu={reszta[0]} filtr={parametry.get('filtr')} />, zakladka: 'dzialy' }
  }
  if (rodzaj === 'karta' && reszta.length === 2) {
    return { widok: <WidokKarty idKarty={reszta.join('/')} />, zakladka: null }
  }
  if (rodzaj === 'szukaj') {
    return { widok: <Szukaj zapytanie={parametry.get('q') ?? ''} filtr={parametry.get('filtr')} />, zakladka: 'szukaj' }
  }
  if (rodzaj === 'powtorki') {
    return { widok: <Powtorki filtr={parametry.get('filtr')} />, zakladka: 'powtorki' }
  }
  return { widok: <NieZnaleziono />, zakladka: 'dzialy' }
}

// Ostatnie przewinięcie każdej strony, żeby po powrocie z karty lista była tam, gdzie była
const przewiniecia = new Map()

export default function App() {
  const trasa = useTrasa()
  const { widok, zakladka } = wybierzWidok(trasa)

  useLayoutEffect(() => {
    const powrot = ostatniKierunek() === 'wstecz'
    window.scrollTo(0, powrot ? (przewiniecia.get(trasa.sciezka) ?? 0) : 0)

    const zapamietaj = () => przewiniecia.set(trasa.sciezka, window.scrollY)
    window.addEventListener('scroll', zapamietaj, { passive: true })
    return () => window.removeEventListener('scroll', zapamietaj)
  }, [trasa.sciezka])

  useEffect(() => {
    function skrot(zdarzenie) {
      if ((zdarzenie.metaKey || zdarzenie.ctrlKey) && zdarzenie.key.toLowerCase() === 'k') {
        zdarzenie.preventDefault()
        przejdz('/szukaj')
      }
    }
    window.addEventListener('keydown', skrot)
    return () => window.removeEventListener('keydown', skrot)
  }, [])

  return (
    <div className="uklad">
      <PanelBoczny trasa={trasa} />
      <div className={zakladka ? 'uklad-glowny z-nawigacja' : 'uklad-glowny'}>{widok}</div>
      {zakladka && <DolnaNawigacja aktywna={zakladka} />}
    </div>
  )
}
