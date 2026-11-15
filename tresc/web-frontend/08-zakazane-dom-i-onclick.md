---
tytul: "Zakazane: DOM i onclick w napisie"
dzial: web-frontend
tagi: [react, zakazane, getElementById, querySelector, innerHTML, onclick, onClick, DOM, unieważnienie]
status: do-weryfikacji
zrodla:
  - Zasady oceniania INF.04 2025 sty i 2026 cze, uwaga do rezultatu R.3
  - https://react.dev/learn/responding-to-events
  - https://react.dev/learn/manipulating-the-dom-with-refs
  - Wersje błędne uruchomione w Vite 8 z React 19.3; zachowanie i komunikaty konsoli odczytane w przeglądarce
arkusze: [2025 sty, 2026 cze]
---

## Po co to jest

To jedyna karta o tym, czego ==nie pisać==. W zasadach oceniania 2025 sty i 2026 cze stoi zdanie, które zeruje ==cały rezultat aplikacji webowej==, a nie jedno kryterium: rezultat nie jest spełniony, gdy zdający użył metod DOM (np. `getElementById`) albo przypisał metody do zdarzeń jak w HTML (`onclick="fun()"` zamiast `onClick={fun}`). Działająca aplikacja nic tu nie pomoże.

## Jak to działa

W Reakcie to nie Ty zmieniasz stronę, tylko React. Ty zmieniasz stan, a React sam przerysowuje znaczniki.

```tekst Kto zmienia stronę
Zakazane:
klik → kod szuka elementu w DOM
     → kod zmienia go ręcznie

Dozwolone:
klik → funkcja zmienia stan
     → React rysuje stronę od nowa
```

Co zastępuje zakazane konstrukcje:

| Zakazane | Zamiast tego |
| --- | --- |
| `getElementById(...).value` | stan pola: `value` i `onChange` |
| `el.innerHTML = ...` | stan i `{powitanie}` w JSX |
| `el.style.display = ...` | warunek `{widoczny && ...}` |
| `onclick="powitaj()"` | `onClick={powitaj}` |
| `addEventListener(...)` | `onClick={...}` w JSX |

Sprawdzone w przeglądarce, co React robi z wersjami w napisie:

- `onclick="zwieksz()"`: kliknięcie nic nie robi, a w konsoli „Invalid event handler property `onclick`. Did you mean `onClick`?”.
- `onClick="zwieksz()"`: w konsoli „Expected `onClick` listener to be a function, instead got a value of `string` type”.

Nawet gdyby taki kod działał, zasady oceniania i tak by go nie uznały.

## Składnia do zapamiętania

```jsx
const [imie, setImie] = useState('')
<input value={imie} onChange={(e) => setImie(e.target.value)} />
<button onClick={powitaj}>Powitaj</button>
<p>{powitanie}</p>
```

## Przykład

Wersja zakazana, ==nie pisz tak==:

```jsx Zle.jsx
function powitaj() {
  const imie = document.getElementById('imie').value
  document.getElementById('wynik').innerHTML = 'Witaj ' + imie
}

<input id="imie" />
<button onclick="powitaj()">Powitaj</button>
<p id="wynik"></p>
```

Ta sama funkcja zgodnie z zasadami:

```jsx App.jsx {4,5,8,15,16,18,19}
import { useState } from 'react'

function App() {
  const [imie, setImie] = useState('')
  const [powitanie, setPowitanie] = useState('')

  function powitaj() {
    setPowitanie('Witaj ' + imie)
  }

  return (
    <div className="container">
      <input
        className="form-control"
        value={imie}
        onChange={(e) => setImie(e.target.value)}
      />
      <button type="button" className="btn btn-primary" onClick={powitaj}>Powitaj</button>
      <p>{powitanie}</p>
    </div>
  )
}

export default App
```

1. Wpisany tekst trzymany w stanie zamiast w elemencie DOM.
2. Komunikat też w stanie.
3. Funkcja kliknięcia zmienia tylko stan.
4. Pole pokazuje wartość ze stanu.
5. Każdy wpisany znak trafia do stanu.
6. `onClick` z wielką literą, w klamrach, funkcja bez nawiasów.
7. React sam wstawia aktualny komunikat. Po wpisaniu „Ola” i kliknięciu: „Witaj Ola”.

## Pułapki

- Jedno `getElementById` w komponencie wystarczy, żeby przepadł cały rezultat, łącznie z punktami za wygląd.
- `document.querySelector`, `innerHTML`, `textContent`, `style.` na elemencie i `addEventListener` to też metody DOM. Zasady piszą „getElementById i inne podobne”.
- `document.getElementById('root')` w `main.jsx` pochodzi z szablonu Vite. To nie Twój kod komponentu i tak ma zostać.
- `onclick` małymi literami nie działa w ogóle. W JSX wszystkie zdarzenia są w camelCase: `onClick`, `onChange`, `onSubmit`.
- Kod skopiowany z `szablon.html` (2026 cze) trzeba przerobić: `class` na `className`, `for` na `htmlFor`, domknąć `<input />`, a zdarzenia zapisać po reactowemu.

## Powiązane

- [useState i zdarzenia](#/karta/web-frontend/03-usestate-i-zdarzenia)
- [Formularz: pola sterowane, checkbox, onSubmit](#/karta/web-frontend/06-formularz-pola-sterowane)
- [JSX i komponent funkcyjny](#/karta/web-frontend/02-jsx-i-komponent)
