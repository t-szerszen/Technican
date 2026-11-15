---
tytul: "Zmiana jednego obiektu w tablicy stanu"
dzial: web-frontend
tagi: [react, useState, tablica obiektów, map, spread, "...", niemutowalność, licznik pobrań]
status: do-weryfikacji
zrodla:
  - https://react.dev/learn/updating-arrays-in-state
  - https://react.dev/learn/updating-objects-in-state
  - Przykład uruchomiony w Vite 8 z React 19.3; wersja poprawna i wersja z mutacją przeklikane w przeglądarce
  - Arkusz INF.04 2025 sty, część II (licznik pobrań zapisywany w tablicy obiektów)
  - Zasady oceniania INF.04 2025 sty (R.3.6, R.3.10)
arkusze: [2025 sty]
---

## Po co to jest

W 2025 sty przycisk „Pobierz” przy zdjęciu zwiększał jego liczbę pobrań o 1, a treść mówiła wprost: liczba ==jest zapisywana w tablicy z obiektami zdjęć== i od razu widać ją na ekranie (R.3.10). Trzeba więc zmienić jedno pole jednego obiektu w tablicy, która jest stanem. To najczęstsze miejsce, gdzie kod „działa w danych, a nie na ekranie”.

## Jak to działa

React przerysowuje komponent, gdy `setZdjecia` dostanie ==inną tablicę niż poprzednio==. Porównuje tylko to, czy to ten sam obiekt w pamięci, a nie zawartość.

Dlatego tworzysz nową tablicę z nowym obiektem w miejscu zmienionego:

```tekst Kliknięcie „Pobierz” przy id 2
stara tablica          nowa tablica
{ id 0, 35 }  ──────→  ten sam
{ id 1, 43 }  ──────→  ten sam
{ id 2,  2 }           { id 2, 3 }  nowy
```

1. `zdjecia.map(...)` przechodzi po starej tablicy i buduje nową.
2. Dla zdjęcia o klikniętym `id` zwraca nowy obiekt: `{ ...zdjecie, downloads: zdjecie.downloads + 1 }`.
3. `...zdjecie` kopiuje wszystkie pola starego obiektu, a `downloads:` po nim nadpisuje jedno.
4. Dla pozostałych zdjęć zwraca stary obiekt bez zmian.
5. `setZdjecia(nowe)` dostaje inną tablicę, więc React rysuje stronę jeszcze raz.

Sprawdzone w przeglądarce, wersja błędna: `zdjecie.downloads++` i `setZdjecia(zdjecia)`. Po trzech kliknięciach ekran dalej pokazywał „Mak: 35”, bo tablica była ta sama.

## Składnia do zapamiętania

```jsx
function pobierz(id) {
  const nowe = zdjecia.map((zdjecie) => {
    if (zdjecie.id === id) {
      return { ...zdjecie, downloads: zdjecie.downloads + 1 }
    }
    return zdjecie
  })
  setZdjecia(nowe)
}
```

## Przykład

```jsx App.jsx {4,10,11,13,15,17,25}
import { useState } from 'react'

function App() {
  const [zdjecia, setZdjecia] = useState([
    { id: 0, alt: 'Mak', filename: 'obraz1.jpg', downloads: 35 },
    { id: 1, alt: 'Bukiet', filename: 'obraz2.jpg', downloads: 43 },
    { id: 2, alt: 'Dalmatyńczyk', filename: 'obraz3.jpg', downloads: 2 },
  ])

  function pobierz(id) {
    const nowe = zdjecia.map((zdjecie) => {
      if (zdjecie.id === id) {
        return { ...zdjecie, downloads: zdjecie.downloads + 1 }
      }
      return zdjecie
    })
    setZdjecia(nowe)
  }

  return (
    <div className="container">
      {zdjecia.map((zdjecie) => (
        <div key={zdjecie.id}>
          <h4>{zdjecie.alt}: {zdjecie.downloads}</h4>
          <button type="button" className="btn btn-success" onClick={() => pobierz(zdjecie.id)}>
            Pobierz
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
```

1. Tablica obiektów w stanie, razem z funkcją, która ją podmienia.
2. Funkcja dostaje `id` klikniętego zdjęcia.
3. `map` buduje nową tablicę.
4. Nowy obiekt: kopia pól i liczba pobrań większa o 1.
5. Reszta zdjęć bez zmian.
6. Nowa tablica w stanie, więc strona się przerysuje.
7. Każdy przycisk przekazuje `id` swojego zdjęcia przez funkcję strzałkową.

Sprawdzone w przeglądarce: dwa kliknięcia przy Dalmatyńczyku dały 2 → 3 → 4, kliknięcie przy Bukiecie 43 → 44. Pozostałe liczby bez zmian.

## Pułapki

- `zdjecie.downloads++` i `setZdjecia(zdjecia)`: dane się zmieniają, ekran nie. R.3.10 wymaga zmiany ==widocznej na stronie==.
- Osobny stan na liczbę pobrań (`const [pobrania, setPobrania]`) nie spełnia R.3.10: zmiana ma być w tablicy obiektów, dla właściwego obiektu.
- `onClick={pobierz(zdjecie.id)}` wywoła funkcję w trakcie rysowania i zapętli stronę. Gdy przekazujesz argument, zawsze `() => pobierz(...)`.
- Szukaj po `id`, nie po pozycji z tablicy po filtrowaniu: gdy część zdjęć jest ukryta, indeks widocznego przycisku nie zgadza się z indeksem w pełnej tablicy.
- W `{ ...zdjecie, downloads: ... }` kolejność ma znaczenie. `{ downloads: ..., ...zdjecie }` nadpisze nową wartość starą.

## Powiązane

- [useState i zdarzenia](#/karta/web-frontend/03-usestate-i-zdarzenia)
- [Lista z map, key i warunki](#/karta/web-frontend/04-lista-map-i-warunki)
- [Zadanie: galeria z kategoriami](#/karta/web-frontend/09-zadanie-galeria-z-kategoriami)
