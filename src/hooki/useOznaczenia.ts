import { useSyncExternalStore } from 'react'
import type { Karta } from '../dane/karty'
import { czytajZPamieci, zapiszWPamieci } from './pamiec'

export type Oznaczenie = 'umiem' | 'powtorka'
// { 'konsola/01-python-petle': 'umiem' }
export type Oznaczenia = Record<string, Oznaczenie>
export type Filtr = Oznaczenie | 'wszystkie' | 'brak'

const KLUCZ = 'kratka:oznaczenia'

function czytajOznaczenia(): Oznaczenia {
  const zapisane = czytajZPamieci(KLUCZ)
  const wynik: Oznaczenia = {}
  if (zapisane && typeof zapisane === 'object') {
    for (const [id, wartosc] of Object.entries(zapisane)) {
      if (wartosc === 'umiem' || wartosc === 'powtorka') wynik[id] = wartosc
    }
  }
  return wynik
}

let oznaczenia = czytajOznaczenia()
const sluchacze = new Set<() => void>()

function powiadom() {
  sluchacze.forEach((sluchacz) => sluchacz())
}

function subskrybuj(sluchacz: () => void) {
  sluchacze.add(sluchacz)
  return () => {
    sluchacze.delete(sluchacz)
  }
}

// Zmiana w innej karcie przeglądarki
window.addEventListener('storage', (zdarzenie) => {
  if (zdarzenie.key !== KLUCZ) return
  oznaczenia = czytajOznaczenia()
  powiadom()
})

// Ponowne kliknięcie tego samego oznaczenia je zdejmuje.
export function przelaczOznaczenie(idKarty: string, oznaczenie: Oznaczenie) {
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

export const filtry: { id: Filtr; nazwa: string }[] = [
  { id: 'wszystkie', nazwa: 'Wszystkie' },
  { id: 'umiem', nazwa: 'Umiem' },
  { id: 'powtorka', nazwa: 'Do powtórki' },
  { id: 'brak', nazwa: 'Bez oznaczenia' },
]

export function pasujeDoFiltra(karta: Karta, filtr: string | null, oznaczenia: Oznaczenia) {
  if (!filtr || filtr === 'wszystkie') return true
  const oznaczenie = oznaczenia[karta.id]
  if (filtr === 'brak') return !oznaczenie
  return oznaczenie === filtr
}
