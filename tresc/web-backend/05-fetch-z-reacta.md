---
tytul: "fetch z Reacta do Expressa"
dzial: web-backend
tagi: [react, fetch, useEffect, GET, POST, JSON.stringify, Content-Type, response.ok, cors, async, await]
status: do-weryfikacji
zrodla:
  - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  - https://react.dev/reference/react/useEffect
  - https://react.dev/learn/synchronizing-with-effects
  - https://expressjs.com/en/resources/middleware/cors.html
  - Front w Vite 8 z React 19.3 połączony z serwerem z karty o API z bazą; pobranie listy, dodanie przez formularz i wersja bez cors sprawdzone w przeglądarce
  - W arkuszach INF.04 z lat 2021-2026 nie było zadania z back-endem
arkusze: []
---

## Po co to jest

Front z kart o Reakcie trzymał dane w `useState` na sztywno. Gdy dane są na serwerze, React musi je ==pobrać przy starcie== i ==wysłać nowe== przy zapisie formularza. Robi to `fetch`: GET po listę i POST z JSON-em.

## Jak to działa

Dwa programy na dwóch portach:

```tekst Front i serwer
przeglądarka: React na :5173
   │ fetch GET /api/zdjecia
   ▼
serwer: Express na :3000
   │ SELECT * FROM zdjecia
   ▼
odpowiedź JSON → setZdjecia(dane)
   → React rysuje listę
```

**Pobranie przy starcie.** `useEffect(funkcja, [])` uruchamia funkcję po pierwszym narysowaniu komponentu. Pusta tablica `[]` znaczy: tylko raz, nie po każdej zmianie stanu. Wynik trafia do stanu, a zmiana stanu rysuje listę.

**Wysłanie.** `fetch` z opcjami: `method: 'POST'`, nagłówek `Content-Type: application/json` i treść `JSON.stringify(obiekt)`. Serwer dzięki nagłówkowi zrobi z tekstu `req.body`.

**Odpowiedź.** `fetch` daje obiekt odpowiedzi, a `.json()` zamienia jej treść na dane. Kod 404 albo 400 ==nie jest błędem dla `fetch`==: trzeba samemu sprawdzić `odpowiedz.ok` (prawda dla kodów 200-299).

`await` czeka na wynik w funkcji oznaczonej `async`. To samo można zapisać łańcuchem `.then(...)`, jak w `useEffect` w przykładzie.

## Składnia do zapamiętania

```jsx
useEffect(() => {
  fetch('http://localhost:3000/api/zdjecia')
    .then((odpowiedz) => odpowiedz.json())
    .then((dane) => setZdjecia(dane))
}, [])

const odpowiedz = await fetch(ADRES, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ alt: nazwa }),
})
```

## Przykład

Serwer z karty o API z bazą działa na porcie 3000 z `app.use(cors())`.

```jsx App.jsx {1,9,12,13,15,18,19,20,22,27}
import { useEffect, useState } from 'react'

const ADRES = 'http://localhost:3000/api/zdjecia'

function App() {
  const [zdjecia, setZdjecia] = useState([])
  const [nazwa, setNazwa] = useState('')

  useEffect(() => {
    fetch(ADRES)
      .then((odpowiedz) => odpowiedz.json())
      .then((dane) => setZdjecia(dane))
  }, [])

  async function dodaj(e) {
    e.preventDefault()
    const odpowiedz = await fetch(ADRES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alt: nazwa }),
    })
    if (!odpowiedz.ok) {
      alert('Nie dodano zdjęcia')
      return
    }
    const nowe = await odpowiedz.json()
    setZdjecia([...zdjecia, nowe])
    setNazwa('')
  }

  return (
    <div className="container">
      <ul>
        {zdjecia.map((zdjecie) => (
          <li key={zdjecie.id}>{zdjecie.alt}: {zdjecie.pobrania}</li>
        ))}
      </ul>
      <form onSubmit={dodaj}>
        <input className="form-control" value={nazwa} onChange={(e) => setNazwa(e.target.value)} />
        <button type="submit" className="btn btn-primary">Dodaj</button>
      </form>
    </div>
  )
}

export default App
```

1. `useEffect` obok `useState`.
2. Efekt: kod po narysowaniu komponentu.
3. Pobrane dane w stanie, więc lista się narysuje.
4. `[]`: tylko raz, przy starcie.
5. `async`, żeby w środku móc użyć `await`.
6. Metoda POST.
7. Nagłówek, bez którego `req.body` na serwerze jest `undefined`.
8. Obiekt zamieniony na tekst JSON.
9. Kod 400 albo 404 trzeba wykryć samemu.
10. Nowy rekord z `id` od serwera dopisany do listy bez ponownego pobierania.

Sprawdzone w przeglądarce: na starcie lista z bazy („Garbus: 0”). Po wpisaniu „Róża” i kliknięciu „Dodaj” lista ma dwa elementy, pole jest puste, a `curl` na serwer pokazuje nowy wiersz w bazie.

## Pułapki

- Serwer bez `app.use(cors())`: lista jest pusta, a w konsoli przeglądarki „blocked by CORS policy: No 'Access-Control-Allow-Origin' header”. Sprawdzone.
- `fetch` bez `[]` w `useEffect`: efekt rusza po każdym rysowaniu, `setZdjecia` rysuje znowu i strona zasypuje serwer zapytaniami.
- W trybie deweloperskim React (`StrictMode` z szablonu Vite) uruchamia efekt dwa razy, więc w konsoli albo w zakładce sieci widać dwa zapytania. Sprawdzone. To normalne i znika w wersji produkcyjnej.
- `body: { alt: nazwa }` bez `JSON.stringify` wyśle tekst `[object Object]`, a serwer nie odczyta danych.
- Serwer musi działać w osobnym terminalu, zanim otworzysz front. Inaczej `fetch` kończy się błędem sieci.
- `fetch` w samym komponencie, poza `useEffect`, rusza przy każdym rysowaniu, tak samo jak przy braku `[]`.

## Powiązane

- [API z bazą: Express i SQLite razem](#/karta/web-backend/04-api-z-baza)
- [useState i zdarzenia](#/karta/web-frontend/03-usestate-i-zdarzenia)
- [Formularz: pola sterowane, checkbox, onSubmit](#/karta/web-frontend/06-formularz-pola-sterowane)
- [Zadanie wzorcowe: galeria z bazą](#/karta/web-backend/06-zadanie-wzorcowe-galeria)
