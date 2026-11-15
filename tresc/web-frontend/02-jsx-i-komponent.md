---
tytul: "JSX i komponent funkcyjny"
dzial: web-frontend
tagi: [react, jsx, komponent, className, htmlFor, style, wyrażenie, domknięte tagi, fragment]
status: do-weryfikacji
zrodla:
  - https://react.dev/learn/your-first-component
  - https://react.dev/learn/writing-markup-with-jsx
  - https://react.dev/learn/javascript-in-jsx-with-curly-braces
  - https://react.dev/reference/react-dom/components/common
  - Przykład uruchomiony w Vite 8 z React 19.3; HTML odczytany z przeglądarki
  - Zasady oceniania INF.04 2025 sty (R.3.1, R.3.3), 2026 cze (R.3.1, R.3.3)
arkusze: [2025 sty, 2026 cze]
---

## Po co to jest

Oba zadania webowe wymagały ==jednego komponentu== z nagłówkiem `h1`, kontrolkami i obrazami (R.3.1). W zasadach oceniania jest też osobne zdanie o Reakcie: `className` zamiast `class`, `htmlFor` zamiast `for` i ==domknięte wszystkie znaczniki== (R.3.3). To trzy różnice między JSX a HTML, które kosztują punkty.

## Jak to działa

Komponent to zwykła funkcja JavaScript, której nazwa zaczyna się wielką literą. Zwraca JSX: zapis wyglądający jak HTML, który React zamienia na prawdziwe znaczniki w przeglądarce.

Co dostała przeglądarka z przykładu niżej (odczytane z konsoli):

```tekst JSX → HTML w przeglądarce
className="text-primary"  → class="text-primary"
htmlFor="login"           → for="login"
{'assets/' + plik}        → src="assets/obraz1.jpg"
{liczbaPobran + 10}       → 45
style={{ margin: '5px' }} → style="margin: 5px;"
<Naglowek />              → <h1 class=...>...</h1>
```

Zasady JSX:

1. `class` i `for` to w JavaScripcie słowa zarezerwowane, więc piszesz `className` i `htmlFor`.
2. Każdy znacznik musi być zamknięty: `<img ... />`, `<input ... />`, `<br />`.
3. Funkcja zwraca ==jeden== element główny. Kilka obok siebie owiń w `<div>` albo w pusty znacznik `<>...</>`.
4. W klamrach `{ }` wstawiasz wartość z JavaScriptu: zmienną, działanie, wywołanie funkcji.
5. `style` przyjmuje obiekt, stąd podwójne klamry. Nazwy właściwości w camelCase: `borderRadius`, nie `border-radius`.

Własny komponent (`Naglowek`) wstawiasz jak znacznik: `<Naglowek />`. W zadaniach z arkuszy wystarczał jeden komponent `App`.

## Składnia do zapamiętania

```jsx
function App() {
  const login = 'ola'
  return (
    <div className="container">
      <h1>Witaj {login}</h1>
      <label htmlFor="pole" className="form-label">Login:</label>
      <input id="pole" className="form-control" />
      <img src="assets/obraz1.jpg" alt="Mak" style={{ margin: '5px' }} />
    </div>
  )
}
export default App
```

## Przykład

```jsx App.jsx {1,2,11,12,13,15,16}
function Naglowek() {
  return <h1 className="text-primary">Menedżer haseł - wykonał 00000000000</h1>
}

function App() {
  const liczbaPobran = 35
  const plik = 'obraz1.jpg'

  return (
    <div className="container">
      <Naglowek />
      <img src={'assets/' + plik} alt="Mak" style={{ margin: '5px', borderRadius: '8px' }} />
      <h4>Pobrań: {liczbaPobran}</h4>
      <p>Za tydzień może być: {liczbaPobran + 10}</p>
      <label htmlFor="login" className="form-label">Login:</label>
      <input id="login" type="text" className="form-control" placeholder="Twój login" />
    </div>
  )
}

export default App
```

1. Komponent: funkcja z nazwą od wielkiej litery.
2. `className` zamiast `class`.
3. Własny komponent użyty jak znacznik, domknięty `/>`.
4. Atrybut z wartością z JavaScriptu i styl jako obiekt. `<img>` domknięty.
5. Zmienna wstawiona w tekst klamrami: na stronie „Pobrań: 35”.
6. `htmlFor` łączy etykietę z polem o `id="login"`.
7. `placeholder` jak w HTML. `<input>` domknięty.

## Pułapki

- `class="btn"` w JSX działa w przeglądarce, ale React wypisuje w konsoli błąd „Invalid DOM property `class`. Did you mean `className`?”. Zasady wprost wymagają `className` (R.3.3).
- `<img src="...">` albo `<input>` bez `/` to błąd kompilacji („Expected corresponding JSX closing tag”). Kryteria R.3.8-R.3.10 przepadają, bo aplikacja się nie uruchomi.
- `return` z dwoma elementami obok siebie bez wspólnego rodzica to błąd kompilacji.
- `style="margin: 5px"` jako napis kompiluje się, ale strona jest pusta, a w konsoli błąd „The `style` prop expects a mapping”. W JSX `style` to obiekt: `style={{ margin: '5px' }}`.
- `src="assets/{plik}"` w cudzysłowie wstawi dosłownie `{plik}`. Klamry działają tylko bez cudzysłowu: `src={'assets/' + plik}`.
- Komponent z małej litery (`function app()`) użyty jako `<app />` React potraktuje jak nieznany znacznik HTML.

## Powiązane

- [Projekt Vite z Reactem i Bootstrapem](#/karta/web-frontend/01-projekt-vite-i-bootstrap)
- [useState i zdarzenia](#/karta/web-frontend/03-usestate-i-zdarzenia)
- [Zakazane: DOM i onclick w napisie](#/karta/web-frontend/08-zakazane-dom-i-onclick)
