import { useSyncExternalStore } from 'react'
import { czytajZPamieci, zapiszWPamieci } from './pamiec'

export type Motyw = 'jasny' | 'ciemny'

const KLUCZ = 'kratka:motyw'
const KOLOR_PASKA: Record<Motyw, string> = { jasny: '#F3F3EF', ciemny: '#101114' }

function jakoMotyw(wartosc: unknown): Motyw | null {
  return wartosc === 'jasny' || wartosc === 'ciemny' ? wartosc : null
}

const media = window.matchMedia('(prefers-color-scheme: dark)')
// null znaczy "tak jak system"; zapisujemy wybór tylko wtedy, gdy różni się od systemu
let wybrany = jakoMotyw(czytajZPamieci(KLUCZ))
const sluchacze = new Set<() => void>()

function czyCiemny() {
  return wybrany ? wybrany === 'ciemny' : media.matches
}

function zastosuj() {
  const ciemny = czyCiemny()
  document.documentElement.classList.toggle('ciemny', ciemny)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', ciemny ? KOLOR_PASKA.ciemny : KOLOR_PASKA.jasny)
  sluchacze.forEach((sluchacz) => sluchacz())
}

media.addEventListener('change', zastosuj)
zastosuj()

function subskrybuj(sluchacz: () => void) {
  sluchacze.add(sluchacz)
  return () => {
    sluchacze.delete(sluchacz)
  }
}

export function ustawMotyw(motyw: Motyw) {
  const zgodnyZSystemem = (motyw === 'ciemny') === media.matches
  wybrany = zgodnyZSystemem ? null : motyw
  zapiszWPamieci(KLUCZ, wybrany)
  zastosuj()
}

export function przelaczMotyw() {
  ustawMotyw(czyCiemny() ? 'jasny' : 'ciemny')
}

export function useMotyw(): Motyw {
  return useSyncExternalStore(subskrybuj, czyCiemny) ? 'ciemny' : 'jasny'
}
