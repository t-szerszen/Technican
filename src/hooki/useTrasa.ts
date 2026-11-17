import { useSyncExternalStore } from 'react'
import type { Karta } from '../dane/karty'

export interface Trasa {
  sciezka: string
  czesci: string[]
  parametry: URLSearchParams
}

type Kierunek = 'naprzod' | 'wstecz' | 'podmiana'

// Trasy w hashu (#/dzial/konsola), bo aplikacja ma działać z dowolnego hostingu
// i z dowolnego podfolderu, bez przekierowań po stronie serwera.

// Każdy wpis historii dostaje swoją głębokość. Dzięki temu "Wróć" wie, czy jest
// dokąd się cofnąć w obrębie aplikacji, a widok wie, czy przyszliśmy wstecz.
let glebokosc: number = window.history.state?.glebokosc ?? 0
let podmiana = false
let kierunek: Kierunek = 'naprzod'

if (window.history.state?.glebokosc === undefined) {
  window.history.replaceState({ glebokosc }, '')
}

window.addEventListener('hashchange', () => {
  const zapisana = window.history.state?.glebokosc
  if (zapisana === undefined) {
    // Nowy wpis: z linku albo z podmienAdres (który zastępuje bieżący wpis)
    const nowa = podmiana ? glebokosc : glebokosc + 1
    window.history.replaceState({ glebokosc: nowa }, '')
    kierunek = podmiana ? 'podmiana' : 'naprzod'
  } else {
    kierunek = zapisana < glebokosc ? 'wstecz' : 'naprzod'
  }
  podmiana = false
  glebokosc = window.history.state.glebokosc
})

function subskrybuj(sluchacz: () => void) {
  window.addEventListener('hashchange', sluchacz)
  return () => window.removeEventListener('hashchange', sluchacz)
}

export function useTrasa(): Trasa {
  const hash = useSyncExternalStore(subskrybuj, () => window.location.hash)
  const [sciezka, zapytanie = ''] = hash.replace(/^#/, '').split('?')
  return {
    sciezka: sciezka || '/',
    czesci: sciezka.split('/').filter(Boolean).map(decodeURIComponent),
    parametry: new URLSearchParams(zapytanie),
  }
}

export function ostatniKierunek() {
  return kierunek
}

export function przejdz(adres: string) {
  window.location.hash = adres
}

// Zmienia adres bez dokładania wpisu do historii, np. przy pisaniu w wyszukiwarce.
export function podmienAdres(adres: string) {
  if (window.location.hash === '#' + adres) return
  podmiana = true
  window.location.replace('#' + adres)
}

export function wroc(adresRodzica: string) {
  if (glebokosc > 0) window.history.back()
  else podmienAdres(adresRodzica)
}

export function adresKarty(karta: Karta) {
  return `#/karta/${karta.id}`
}
