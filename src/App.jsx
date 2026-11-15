import { useEffect, useLayoutEffect } from 'react'
import { przejdz, useTrasa } from './hooki/useTrasa'
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

export default function App() {
  const trasa = useTrasa()
  const { widok, zakladka } = wybierzWidok(trasa)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
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
