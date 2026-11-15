---
tytul: "useState i zdarzenia"
dzial: web-frontend
tagi: [react, useState, stan, onClick, zdarzenie, funkcja strzałkowa, ponowne renderowanie, licznik]
status: do-weryfikacji
zrodla:
  - https://react.dev/learn/state-a-components-memory
  - https://react.dev/learn/render-and-commit
  - https://react.dev/learn/state-as-a-snapshot
  - https://react.dev/learn/responding-to-events
  - Przykład uruchomiony w Vite 8 z React 19.3, przeklikany w przeglądarce (USUŃ przy 0, 2 x POLUB, USUŃ, ZERUJ)
  - Zasady oceniania INF.04 2025 sty (R.3.6, R.3.10), 2026 cze (R.3.5)
arkusze: [2025 sty, 2026 cze]
---

## Po co to jest

W obu zadaniach webowych kliknięcie coś zmienia na stronie: rośnie liczba pobrań (2025 sty, R.3.10), pojawia się podsumowanie formularza (2026 cze). Zwykła zmienna tego nie zrobi. W Reakcie zmianę na ekranie wywołuje ==stan== (`useState`) i obsługa zdarzenia przypięta przez `onClick={...}`.

## Jak to działa

`useState(0)` daje parę: aktualną wartość i funkcję, która ją zmienia.

```tekst Co się dzieje po kliknięciu
render 1: licznik = 0  → na ekranie „0 polubień”
       ↓ klik Polub
zwieksz() woła setLicznik(0 + 1)
       ↓ React planuje nowy render
render 2: licznik = 1  → na ekranie „1 polubień”
```

1. React wywołuje funkcję `App` i rysuje to, co zwróci.
2. Kliknięcie uruchamia funkcję przypiętą do `onClick`.
3. `setLicznik(...)` zapamiętuje nową wartość i każe Reactowi narysować komponent jeszcze raz.
4. W nowym wywołaniu `App` zmienna `licznik` ma już nową wartość, więc ekran się zmienia.

Zwykła zmienna `let licznik = 0` zmieniona w funkcji kliknięcia nie przerysuje strony, a przy następnym rysowaniu i tak wróci do 0.

Do `onClick` ==przekazujesz funkcję, nie wynik jej wywołania==:

| Zapis | Co się dzieje |
| --- | --- |
| `onClick={zwieksz}` | funkcja ruszy po kliknięciu |
| `onClick={() => pobierz(3)}` | nowa funkcja, która po kliknięciu woła `pobierz(3)` |
| `onClick={zwieksz()}` | wywołanie od razu przy rysowaniu, pętla i błąd |

## Składnia do zapamiętania

```jsx
import { useState } from 'react'

const [licznik, setLicznik] = useState(0)

function zwieksz() {
  setLicznik(licznik + 1)
}

<button onClick={zwieksz}>Polub</button>
<button onClick={() => setLicznik(0)}>Zeruj</button>
```

## Przykład

```jsx App.jsx {1,4,7,11,12,19,20,21}
import { useState } from 'react'

function App() {
  const [licznik, setLicznik] = useState(0)

  function zwieksz() {
    setLicznik(licznik + 1)
  }

  function zmniejsz() {
    if (licznik > 0) {
      setLicznik(licznik - 1)
    }
  }

  return (
    <div className="container">
      <h1>{licznik} polubień</h1>
      <button type="button" className="btn btn-primary" onClick={zwieksz}>Polub</button>
      <button type="button" className="btn btn-danger" onClick={zmniejsz}>Usuń</button>
      <button type="button" className="btn btn-secondary" onClick={() => setLicznik(0)}>Zeruj</button>
    </div>
  )
}

export default App
```

1. Import hooka z biblioteki React.
2. Stan: wartość startowa 0, nazwa i funkcja zmieniająca. Hook zawsze na górze komponentu.
3. Nowa wartość przez funkcję `set...`, nigdy przez `licznik++`.
4. Warunek przed zmianą: licznik nie zejdzie poniżej zera.
5. Zmiana stanu tylko pod warunkiem.
6. Funkcja przekazana bez nawiasów.
7. Druga funkcja, ten sam mechanizm.
8. Funkcja strzałkowa, gdy trzeba coś przekazać albo kod jest krótki.

Sprawdzone w przeglądarce:

| Kliknięcie | Nagłówek |
| --- | --- |
| start | 0 polubień |
| Usuń | 0 polubień |
| Polub | 1 polubień |
| Polub | 2 polubień |
| Usuń | 1 polubień |
| Zeruj | 0 polubień |

## Pułapki

- `onClick={zwieksz()}` wywołuje funkcję w trakcie rysowania. Sprawdzone: strona jest pusta, a w konsoli „Too many re-renders”. Aplikacja się nie uruchamia, więc przepadają kryteria sprawdzane w działaniu.
- `licznik++` albo `licznik = licznik + 1` przy `const` to błąd, a przy `let` zmiana bez przerysowania. Stan zmieniasz tylko przez `setLicznik`.
- Po `setLicznik(licznik + 1)` zmienna `licznik` w tej samej funkcji ma jeszcze starą wartość. Nowa jest dopiero w następnym rysowaniu.
- `useState` wolno wywołać tylko na najwyższym poziomie komponentu: nie w `if`, pętli ani funkcji kliknięcia. Pisz wszystkie na początku `App`.
- `onclick="zwieksz()"` (małe litery, w cudzysłowie) unieważnia cały rezultat. Zasady oceniania wymieniają to wprost.

## Powiązane

- [JSX i komponent funkcyjny](#/karta/web-frontend/02-jsx-i-komponent)
- [Lista z map, key i warunki](#/karta/web-frontend/04-lista-map-i-warunki)
- [Zmiana jednego obiektu w tablicy stanu](#/karta/web-frontend/05-zmiana-obiektu-w-tablicy)
- [Zakazane: DOM i onclick w napisie](#/karta/web-frontend/08-zakazane-dom-i-onclick)
