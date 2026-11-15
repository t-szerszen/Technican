import { useSyncExternalStore } from 'react'
import { czytajZPamieci, zapiszWPamieci } from './pamiec'

const KLUCZ = 'kratka:motyw'
const KOLOR_PASKA = { jasny: '#F3F3EF', ciemny: '#101114' }

const media = window.matchMedia('(prefers-color-scheme: dark)')
// null znaczy "tak jak system"; zapisujemy wybór tylko wtedy, gdy różni się od systemu
let wybrany = czytajZPamieci(KLUCZ)
const sluchacze = new Set()

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

function subskrybuj(sluchacz) {
  sluchacze.add(sluchacz)
  return () => sluchacze.delete(sluchacz)
}

export function ustawMotyw(motyw) {
  const zgodnyZSystemem = (motyw === 'ciemny') === media.matches
  wybrany = zgodnyZSystemem ? null : motyw
  zapiszWPamieci(KLUCZ, wybrany)
  zastosuj()
}

export function przelaczMotyw() {
  ustawMotyw(czyCiemny() ? 'jasny' : 'ciemny')
}

export function useMotyw() {
  return useSyncExternalStore(subskrybuj, czyCiemny) ? 'ciemny' : 'jasny'
}
