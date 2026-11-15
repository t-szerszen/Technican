import { useSyncExternalStore } from 'react'
import { czytajZPamieci, zapiszWPamieci } from './pamiec'

const KLUCZ = 'kratka:oznaczenia'

// { 'konsola/01-python-petle': 'umiem' | 'powtorka' }
let oznaczenia = czytajZPamieci(KLUCZ, {})
const sluchacze = new Set()

function powiadom() {
  sluchacze.forEach((sluchacz) => sluchacz())
}

function subskrybuj(sluchacz) {
  sluchacze.add(sluchacz)
  return () => sluchacze.delete(sluchacz)
}

// Zmiana w innej karcie przeglądarki
window.addEventListener('storage', (zdarzenie) => {
  if (zdarzenie.key !== KLUCZ) return
  oznaczenia = czytajZPamieci(KLUCZ, {})
  powiadom()
})

// Ponowne kliknięcie tego samego oznaczenia je zdejmuje.
export function przelaczOznaczenie(idKarty, oznaczenie) {
  const nowe = { ...oznaczenia }
  if (nowe[idKarty] === oznaczenie) delete nowe[idKarty]
  else nowe[idKarty] = oznaczenie
  oznaczenia = nowe
  zapiszWPamieci(KLUCZ, oznaczenia)
  powiadom()
}

export function useOznaczenia() {
  return useSyncExternalStore(subskrybuj, () => oznaczenia)
}

export const filtry = [
  { id: 'wszystkie', nazwa: 'Wszystkie' },
  { id: 'umiem', nazwa: 'Umiem' },
  { id: 'powtorka', nazwa: 'Do powtórki' },
  { id: 'brak', nazwa: 'Bez oznaczenia' },
]

export function pasujeDoFiltra(karta, filtr, oznaczenia) {
  if (!filtr || filtr === 'wszystkie') return true
  const oznaczenie = oznaczenia[karta.id]
  if (filtr === 'brak') return !oznaczenie
  return oznaczenie === filtr
}
