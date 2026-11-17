import { useSyncExternalStore } from 'react'
import type { Karta } from '../dane/karty'
import { wyslijOznaczenie } from '../chmura/zapis'
import { czytajZPamieci, zapiszWPamieci } from './pamiec'

export type Oznaczenie = 'umiem' | 'powtorka'
// { 'konsola/01-python-petle': 'umiem' }
export type Oznaczenia = Record<string, Oznaczenie>
export type Filtr = Oznaczenie | 'wszystkie' | 'brak'

// Pod spodem każde oznaczenie pamięta, kiedy je zmieniono, żeby przy scalaniu z kontem wygrywał
// nowszy zapis. Zdjęte oznaczenie zostaje jako stan null, bo to też jest zmiana do przeniesienia.
// zmieniono to milisekundy; 0 znaczy "nie wiadomo kiedy", tak mają oznaczenia sprzed kont.
export interface WpisOznaczenia {
  stan: Oznaczenie | null
  zmieniono: number
}
export type WpisyOznaczen = Record<string, WpisOznaczenia>

const KLUCZ = 'kratka:oznaczenia'

function jakoOznaczenie(wartosc: unknown): Oznaczenie | null {
  return wartosc === 'umiem' || wartosc === 'powtorka' ? wartosc : null
}

// Dawniej w pamięci był sam stan ('umiem'), teraz jest obiekt { stan, zmieniono }
function czytajWpisy(): WpisyOznaczen {
  const zapisane = czytajZPamieci(KLUCZ)
  const wynik: WpisyOznaczen = {}
  if (!zapisane || typeof zapisane !== 'object') return wynik
  for (const [id, wartosc] of Object.entries(zapisane)) {
    if (typeof wartosc === 'string') {
      const stan = jakoOznaczenie(wartosc)
      if (stan) wynik[id] = { stan, zmieniono: 0 }
    } else if (wartosc && typeof wartosc === 'object') {
      const { stan, zmieniono } = wartosc as Record<string, unknown>
      wynik[id] = { stan: jakoOznaczenie(stan), zmieniono: typeof zmieniono === 'number' ? zmieniono : 0 }
    }
  }
  return wynik
}

function tylkoStany(wpisy: WpisyOznaczen) {
  const wynik: Oznaczenia = {}
  for (const [id, wpis] of Object.entries(wpisy)) {
    if (wpis.stan) wynik[id] = wpis.stan
  }
  return wynik
}

let wpisy = czytajWpisy()
let oznaczenia = tylkoStany(wpisy)
const sluchacze = new Set<() => void>()

function ustaw(nowe: WpisyOznaczen) {
  wpisy = nowe
  oznaczenia = tylkoStany(wpisy)
  zapiszWPamieci(KLUCZ, wpisy)
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
  wpisy = czytajWpisy()
  oznaczenia = tylkoStany(wpisy)
  sluchacze.forEach((sluchacz) => sluchacz())
})

export function wpisyOznaczen() {
  return wpisy
}

// Dane z chmury nie wracają do chmury, tylko podmieniają lokalną kopię
export function przyjmijOznaczenia(nowe: WpisyOznaczen) {
  if (JSON.stringify(nowe) === JSON.stringify(wpisy)) return
  ustaw(nowe)
}

// Ponowne kliknięcie tego samego oznaczenia je zdejmuje.
export function przelaczOznaczenie(idKarty: string, oznaczenie: Oznaczenie) {
  const wpis: WpisOznaczenia = {
    stan: oznaczenia[idKarty] === oznaczenie ? null : oznaczenie,
    zmieniono: Date.now(),
  }
  ustaw({ ...wpisy, [idKarty]: wpis })
  wyslijOznaczenie(idKarty, wpis)
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
