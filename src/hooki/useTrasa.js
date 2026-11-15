import { useSyncExternalStore } from 'react'

// Trasy w hashu (#/dzial/konsola), bo aplikacja ma działać z dowolnego hostingu
// i z dowolnego podfolderu, bez przekierowań po stronie serwera.

let bylaNawigacja = false

function subskrybuj(sluchacz) {
  const przyZmianie = () => {
    bylaNawigacja = true
    sluchacz()
  }
  window.addEventListener('hashchange', przyZmianie)
  return () => window.removeEventListener('hashchange', przyZmianie)
}

export function useTrasa() {
  const hash = useSyncExternalStore(subskrybuj, () => window.location.hash)
  const [sciezka, zapytanie = ''] = hash.replace(/^#/, '').split('?')
  return {
    sciezka: sciezka || '/',
    czesci: sciezka.split('/').filter(Boolean).map(decodeURIComponent),
    parametry: new URLSearchParams(zapytanie),
  }
}

export function przejdz(adres) {
  window.location.hash = adres
}

// Zmienia adres bez dokładania wpisu do historii, np. przy pisaniu w wyszukiwarce.
export function podmienAdres(adres) {
  window.location.replace('#' + adres)
}

export function wroc(adresRodzica) {
  if (bylaNawigacja) window.history.back()
  else przejdz(adresRodzica)
}

export function adresKarty(karta) {
  return `#/karta/${karta.id}`
}
