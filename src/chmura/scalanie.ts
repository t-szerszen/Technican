import type { Oznaczenie, WpisyOznaczen } from '../hooki/useOznaczenia'

export interface SpornaKarta {
  id: string
  tutaj: Oznaczenie | null
  naKoncie: Oznaczenie | null
}

export type Wybor = 'konto' | 'urzadzenie'

// Suma oznaczeń z urządzenia i z konta. Gdy ta sama karta ma różne stany, wygrywa nowszy zapis.
// Jeśli któraś strona nie zna czasu zmiany (oznaczenia sprzed kont), nie zgadujemy:
// karta trafia do spornych i decyduje użytkownik.
export function scal(tutaj: WpisyOznaczen, naKoncie: WpisyOznaczen, wybor: Wybor | null) {
  const wynik: WpisyOznaczen = { ...naKoncie }
  const doWyslania: string[] = []
  const sporne: SpornaKarta[] = []

  for (const [id, lokalny] of Object.entries(tutaj)) {
    const zdalny = naKoncie[id]
    let bierzemyLokalny: boolean
    if (!zdalny) bierzemyLokalny = lokalny.stan !== null
    else if (zdalny.stan === lokalny.stan) bierzemyLokalny = false
    else if (lokalny.zmieniono === 0 || zdalny.zmieniono === 0) {
      if (!wybor) {
        sporne.push({ id, tutaj: lokalny.stan, naKoncie: zdalny.stan })
        continue
      }
      bierzemyLokalny = wybor === 'urzadzenie'
    } else bierzemyLokalny = lokalny.zmieniono > zdalny.zmieniono

    if (bierzemyLokalny) {
      wynik[id] = lokalny
      doWyslania.push(id)
    }
  }
  return { wynik, doWyslania, sporne }
}
