---
tytul: "Lista z map, key i warunki"
dzial: web-frontend
tagi: [react, map, key, tablica obiektów, renderowanie warunkowe, "&&", operator trójargumentowy, return null]
status: do-weryfikacji
zrodla:
  - https://react.dev/learn/rendering-lists
  - https://react.dev/learn/conditional-rendering
  - Przykład uruchomiony w Vite 8 z React 19.3, przeklikany w przeglądarce; brak key sprawdzony w konsoli
  - Arkusz INF.04 2025 sty, część II (dane.txt z tablicą obiektów zdjęć)
  - Zasady oceniania INF.04 2025 sty (R.3.4, R.3.5, R.3.9)
arkusze: [2025 sty, 2026 cze]
---

## Po co to jest

W 2025 sty galeria miała być generowana ==pętlą z tablicy obiektów== (R.3.4) i pokazywać zdjęcie tylko wtedy, gdy jego kategoria jest włączona (R.3.5, R.3.9). Treść dodawała, że aplikacja ma działać „dla innej liczby zdjęć”, więc dwanaście ręcznie wpisanych `<img>` nie przejdzie. W JSX pętlą jest `.map`, a warunkiem `if` z `return null`, `&&` albo `? :`.

## Jak to działa

`.map` przechodzi po tablicy i dla każdego elementu zwraca kawałek JSX. Powstaje tablica elementów, którą React wstawia na stronę jeden po drugim:

```tekst map: obiekt → element
tablica            wynik .map
{ id: 0, Mak }  →  <div key=0>
{ id: 2, Dalm } →  <div key=2>
{ id: 5, Audi } →  <div key=5>
```

Każdy `<div>` ma w środku obraz i nagłówek z liczbą pobrań tego jednego obiektu.

`key` to unikalny identyfikator elementu listy. React po nim rozpoznaje, który element się zmienił. Bierz pole `id` z danych.

Trzy sposoby na warunek:

| Zapis | Kiedy |
| --- | --- |
| `if (...) return null` w funkcji | pomiń element (jak R.3.5 w 2025 sty) |
| `{warunek && <p>...</p>}` | pokaż albo nic |
| `{warunek ? 'A' : 'B'}` | pokaż jedno z dwóch |

`null` w JSX niczego nie rysuje, więc funkcja, która dla niepasującego zdjęcia zwraca `null`, po prostu je pomija.

Zasady 2025 sty opisywały rozwiązanie w Reakcie tak: „funkcja renderująca, w której znajduje się warunek i instrukcja return”. Tak wygląda `pokazZdjecie` w przykładzie.

## Składnia do zapamiętania

```jsx
function pokazZdjecie(zdjecie) {
  if (zdjecie.category !== 1) {
    return null
  }
  return <img key={zdjecie.id} src={'assets/' + zdjecie.filename} alt={zdjecie.alt} />
}

{zdjecia.map((zdjecie) => pokazZdjecie(zdjecie))}
{tylkoKwiaty && <p>Widać tylko kwiaty.</p>}
```

## Przykład

Cztery zdjęcia z `dane.txt` (2025 sty). Przycisk przełącza widok „tylko kwiaty”.

```jsx App.jsx {4,13,14,17,18,27,29,30}
import { useState } from 'react'

function App() {
  const [zdjecia] = useState([
    { id: 0, alt: 'Mak', filename: 'obraz1.jpg', category: 1, downloads: 35 },
    { id: 2, alt: 'Dalmatyńczyk', filename: 'obraz3.jpg', category: 2, downloads: 2 },
    { id: 5, alt: 'Audi', filename: 'obraz6.jpg', category: 3, downloads: 11 },
    { id: 7, alt: 'Róża', filename: 'obraz8.jpg', category: 1, downloads: 33 },
  ])
  const [tylkoKwiaty, setTylkoKwiaty] = useState(false)

  function pokazZdjecie(zdjecie) {
    if (tylkoKwiaty && zdjecie.category !== 1) {
      return null
    }
    return (
      <div key={zdjecie.id}>
        <img src={'assets/' + zdjecie.filename} alt={zdjecie.alt} width="150" />
        <h4>Pobrań: {zdjecie.downloads}</h4>
      </div>
    )
  }

  return (
    <div className="container">
      <button type="button" className="btn btn-primary" onClick={() => setTylkoKwiaty(!tylkoKwiaty)}>
        {tylkoKwiaty ? 'Pokaż wszystkie' : 'Tylko kwiaty'}
      </button>
      {tylkoKwiaty && <p>Widać tylko kwiaty.</p>}
      {zdjecia.map((zdjecie) => pokazZdjecie(zdjecie))}
    </div>
  )
}

export default App
```

1. Tablica obiektów w stanie. Obiekty przepisane z `dane.txt`.
2. Warunek: włączony filtr i kategoria inna niż kwiaty (1).
3. `null`: tego zdjęcia nie rysuj.
4. `key` z pola `id` na najbardziej zewnętrznym elemencie zwracanym dla zdjęcia.
5. Pola obiektu w atrybutach: plik i tekst alternatywny.
6. Napis przycisku z operatora `? :`.
7. Akapit tylko przy włączonym filtrze.
8. Pętla po wszystkich zdjęciach. Działa dla dowolnej liczby obiektów.

Sprawdzone w przeglądarce: na starcie Mak, Dalmatyńczyk, Audi, Róża. Po kliknięciu tylko Mak i Róża i akapit „Widać tylko kwiaty.”. Po drugim kliknięciu znowu cztery.

## Pułapki

- Brak `key` nie psuje wyglądu, ale React wypisuje w konsoli „Each child in a list should have a unique "key" prop”. Sprawdzone. Dawaj `key={zdjecie.id}`.
- `key` musi być na elemencie zwracanym bezpośrednio z pętli (tu `<div>`), a nie na `<img>` w środku.
- Ręcznie wpisane obrazy zamiast pętli nie spełniają R.3.4, nawet jeśli wygląd się zgadza.
- `{zdjecia.length && <p>...</p>}` przy pustej tablicy wypisze na stronie `0`. Po lewej stronie `&&` dawaj warunek logiczny, np. `zdjecia.length > 0`.
- Porównanie kategorii: w `dane.txt` to liczby (`category: 1`), więc `=== 1`, a nie `=== '1'`.

## Powiązane

- [useState i zdarzenia](#/karta/web-frontend/03-usestate-i-zdarzenia)
- [Zmiana jednego obiektu w tablicy stanu](#/karta/web-frontend/05-zmiana-obiektu-w-tablicy)
- [Zadanie: galeria z kategoriami](#/karta/web-frontend/09-zadanie-galeria-z-kategoriami)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
