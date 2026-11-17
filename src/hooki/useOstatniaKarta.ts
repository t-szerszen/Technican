import { useSyncExternalStore } from 'react'
import { wyslijOstatnia } from '../chmura/zapis'
import { czytajZPamieci, zapiszWPamieci } from './pamiec'

const KLUCZ = 'kratka:ostatnia'

function czytajOstatnia() {
  const zapisana = czytajZPamieci(KLUCZ)
  return typeof zapisana === 'string' ? zapisana : null
}

let ostatnia = czytajOstatnia()
const sluchacze = new Set<() => void>()

// Karta otwarta w innej karcie przeglądarki
window.addEventListener('storage', (zdarzenie) => {
  if (zdarzenie.key !== KLUCZ) return
  ostatnia = czytajOstatnia()
  sluchacze.forEach((sluchacz) => sluchacz())
})

function ustaw(idKarty: string | null) {
  ostatnia = idKarty
  zapiszWPamieci(KLUCZ, ostatnia)
  sluchacze.forEach((sluchacz) => sluchacz())
}

function subskrybuj(sluchacz: () => void) {
  sluchacze.add(sluchacz)
  return () => {
    sluchacze.delete(sluchacz)
  }
}

export function ostatniaKarta() {
  return ostatnia
}

export function zapamietajOstatnia(idKarty: string) {
  if (idKarty === ostatnia) return
  ustaw(idKarty)
  wyslijOstatnia(idKarty)
}

export function przyjmijOstatnia(idKarty: string | null) {
  if (idKarty !== ostatnia) ustaw(idKarty)
}

export function useOstatniaKarta() {
  return useSyncExternalStore(subskrybuj, () => ostatnia)
}
