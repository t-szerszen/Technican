---
tytul: "Zadanie: galeria z kategoriami"
dzial: web-frontend
tagi: [react, zadanie, galeria, switch, form-switch, map, key, warunek, licznik pobrań, spread, Bootstrap]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2025 sty, część II, tabela 1 i plik dane.txt z archiwum pliki3.zip
  - Zasady oceniania INF.04 2025 sty (R.3.1-R.3.10)
  - https://react.dev/learn/rendering-lists
  - https://react.dev/learn/updating-arrays-in-state
  - https://getbootstrap.com/docs/5.3/forms/checks-radios/#switches
  - Rozwiązanie uruchomione w Vite 8 z React 19.3 i obrazami z archiwum; switche i licznik przeklikane w przeglądarce
arkusze: [2025 sty]
---

## Po co to jest

Typ zadania: galeria zdjęć z filtrem kategorii. Nagłówek, trzy przełączniki (Kwiaty, Zwierzęta, Samochody), wszystkie włączone na starcie, a pod nimi bloki zdjęć obok siebie: obraz, nagłówek z liczbą pobrań i przycisk „Pobierz”. Wyłączenie przełącznika chowa zdjęcia z tej kategorii. „Pobierz” zwiększa liczbę pobrań ==w tablicy obiektów==, więc zmianę od razu widać na stronie.

## Jak to działa

Plan rozwiązania:

1. Obrazy z archiwum do `public/assets`, obiekty z `dane.txt` do tablicy w stanie (R.3.1).
2. Trzy stany logiczne, po jednym na kategorię, na starcie `true` (R.3.8).
3. Trzy przełączniki z Bootstrapa: `checked` ze stanu, `onChange` zmienia stan (R.3.3, R.3.7).
4. Funkcja `pokazZdjecie` z warunkiem i `return` (R.3.5): zwraca blok albo `null`.
5. Pętla `map` po tablicy (R.3.4), bloki w `row` i `col-md-4`, czyli po trzy w wierszu.
6. „Pobierz” buduje nową tablicę z nowym obiektem (R.3.6, R.3.10).

Kiedy zdjęcie jest widoczne:

| Kategoria | Pokaż, gdy |
| --- | --- |
| 1 kwiaty | włączone Kwiaty |
| 2 zwierzęta | włączone Zwierzęta |
| 3 samochody | włączone Samochody |

Sprawdzone w przeglądarce: na starcie 12 zdjęć. Po wyłączeniu Zwierząt zostają Mak, Bukiet, Audi, Róża i Garbus. Trzy kliknięcia „Pobierz” przy Bukiecie: 43 → 46. Po ponownym włączeniu Zwierząt znowu 12 zdjęć, a Bukiet dalej ma 46.

## Składnia do zapamiętania

```jsx
function pokazZdjecie(zdjecie) {
  const widoczne =
    (zdjecie.category === 1 && kwiaty) ||
    (zdjecie.category === 2 && zwierzeta) ||
    (zdjecie.category === 3 && samochody)
  if (!widoczne) {
    return null
  }
  return <div key={zdjecie.id}>...</div>
}
```

## Przykład

Obiekty przepisane z `dane.txt` bez zmian, także literówka „Rotwailer” w polu `alt`.

```jsx App.jsx {4,18,22,25,29,33,38,41,46,49,58,59,64,65,89,90}
import { useState } from 'react'

function App() {
  const [zdjecia, setZdjecia] = useState([
    { id: 0, alt: 'Mak', filename: 'obraz1.jpg', category: 1, downloads: 35 },
    { id: 1, alt: 'Bukiet', filename: 'obraz2.jpg', category: 1, downloads: 43 },
    { id: 2, alt: 'Dalmatyńczyk', filename: 'obraz3.jpg', category: 2, downloads: 2 },
    { id: 3, alt: 'Świnka morska', filename: 'obraz4.jpg', category: 2, downloads: 53 },
    { id: 4, alt: 'Rotwailer', filename: 'obraz5.jpg', category: 2, downloads: 43 },
    { id: 5, alt: 'Audi', filename: 'obraz6.jpg', category: 3, downloads: 11 },
    { id: 6, alt: 'kotki', filename: 'obraz7.jpg', category: 2, downloads: 22 },
    { id: 7, alt: 'Róża', filename: 'obraz8.jpg', category: 1, downloads: 33 },
    { id: 8, alt: 'Świnka morska', filename: 'obraz9.jpg', category: 2, downloads: 123 },
    { id: 9, alt: 'Foksterier', filename: 'obraz10.jpg', category: 2, downloads: 22 },
    { id: 10, alt: 'Szczeniak', filename: 'obraz11.jpg', category: 2, downloads: 12 },
    { id: 11, alt: 'Garbus', filename: 'obraz12.jpg', category: 3, downloads: 321 },
  ])
  const [kwiaty, setKwiaty] = useState(true)
  const [zwierzeta, setZwierzeta] = useState(true)
  const [samochody, setSamochody] = useState(true)

  function pobierz(id) {
    const nowe = zdjecia.map((zdjecie) => {
      if (zdjecie.id === id) {
        return { ...zdjecie, downloads: zdjecie.downloads + 1 }
      }
      return zdjecie
    })
    setZdjecia(nowe)
  }

  function pokazZdjecie(zdjecie) {
    const widoczne =
      (zdjecie.category === 1 && kwiaty) ||
      (zdjecie.category === 2 && zwierzeta) ||
      (zdjecie.category === 3 && samochody)
    if (!widoczne) {
      return null
    }
    return (
      <div key={zdjecie.id} className="col-md-4">
        <img
          src={'assets/' + zdjecie.filename}
          alt={zdjecie.alt}
          className="rounded img-fluid"
          style={{ margin: '5px' }}
        />
        <h4>Pobrań: {zdjecie.downloads}</h4>
        <button type="button" className="btn btn-success" onClick={() => pobierz(zdjecie.id)}>
          Pobierz
        </button>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Kategorie zdjęć</h1>
      <div className="form-check form-switch form-check-inline">
        <input
          id="kwiaty"
          type="checkbox"
          className="form-check-input"
          checked={kwiaty}
          onChange={(e) => setKwiaty(e.target.checked)}
        />
        <label htmlFor="kwiaty" className="form-check-label">Kwiaty</label>
      </div>
      <div className="form-check form-switch form-check-inline">
        <input
          id="zwierzeta"
          type="checkbox"
          className="form-check-input"
          checked={zwierzeta}
          onChange={(e) => setZwierzeta(e.target.checked)}
        />
        <label htmlFor="zwierzeta" className="form-check-label">Zwierzęta</label>
      </div>
      <div className="form-check form-switch form-check-inline">
        <input
          id="samochody"
          type="checkbox"
          className="form-check-input"
          checked={samochody}
          onChange={(e) => setSamochody(e.target.checked)}
        />
        <label htmlFor="samochody" className="form-check-label">Samochody</label>
      </div>
      <div className="row">
        {zdjecia.map((zdjecie) => pokazZdjecie(zdjecie))}
      </div>
    </div>
  )
}

export default App
```

1. Tablica obiektów z `dane.txt` w stanie (R.3.1).
2. Stan przełącznika, na starcie włączony. Tak samo dwa kolejne.
3. Obsługa „Pobierz” dostaje `id` zdjęcia (R.3.6).
4. Nowy obiekt z liczbą pobrań większą o 1.
5. Nowa tablica w stanie: zmiana widoczna od razu (R.3.10).
6. Warunek: kategoria zdjęcia i stan jej przełącznika (R.3.5).
7. Niewidoczne zdjęcie: `null`, nic nie rysuj.
8. Blok zdjęcia: `key` i kolumna na 1/3 szerokości.
9. Margines 5px i zaokrąglone rogi z klasy `rounded` (R.3.2).
10. Przycisk `btn btn-success` (R.3.3) przekazuje `id` przez funkcję strzałkową.
11. Nagłówek `h1`.
12. Przełącznik według tabeli 1: `form-check form-switch`, obok siebie dzięki `form-check-inline`.
13. Stan przełącznika pokazany przez `checked`.
14. Operacja po zmianie przełącznika (R.3.7).
15. Wiersz siatki na bloki.
16. Pętla po wszystkich zdjęciach: działa dla każdej ich liczby (R.3.4).

## Pułapki

- Wpisane ręcznie bloki zamiast pętli: wygląd się zgadza, a R.3.4 przepada. Treść wymaga pętli i warunków, żeby kod działał „dla innej liczby zdjęć”.
- Licznik pobrań w osobnej zmiennej albo zmiana `zdjecie.downloads++` bez nowej tablicy: R.3.10 chce zmiany w tablicy i na ekranie.
- Przełącznik z `checked={true}` wpisanym na sztywno nie da się wyłączyć. `checked` zawsze ze stanu.
- Filtrowanie przez usuwanie zdjęć z tablicy (`filter` i `setZdjecia`) gubi je na zawsze: po ponownym włączeniu kategorii nie wrócą. Tablicy nie zmieniaj, tylko pomijaj zdjęcia przy rysowaniu.
- `class`, `for` i niedomknięte `<img>`/`<input>` z przykładu w tabeli 1 trzeba przerobić na JSX (R.3.3).
- Kategorie w `dane.txt` to liczby: porównuj z `1`, `2`, `3`, a nie z napisami.

## Powiązane

- [Lista z map, key i warunki](#/karta/web-frontend/04-lista-map-i-warunki)
- [Zmiana jednego obiektu w tablicy stanu](#/karta/web-frontend/05-zmiana-obiektu-w-tablicy)
- [Klasy Bootstrapa z tabeli pomocniczej](#/karta/web-frontend/07-klasy-bootstrapa)
- [Zakazane: DOM i onclick w napisie](#/karta/web-frontend/08-zakazane-dom-i-onclick)
