---
tytul: "Projekt Vite z Reactem i Bootstrapem"
dzial: web-frontend
tagi: [react, vite, npm, bootstrap, projekt, main.jsx, public, assets, npm run dev]
status: do-weryfikacji
zrodla:
  - https://vite.dev/guide/
  - https://vite.dev/guide/assets.html#the-public-directory
  - https://getbootstrap.com/docs/5.3/getting-started/download/
  - Tabela 1 w arkuszach INF.04 2025 sty i 2026 cze (import 'bootstrap/dist/css/bootstrap.css')
  - Projekt utworzony create-vite 9.3 (Vite 8.3, React 19.3) i zbudowany npm run build
  - Arkusz INF.04 2025 sty, część II (obrazy w egzamin/src/assets lub egzamin/public/assets)
  - Zasady oceniania INF.04 2025 sty (R.3.2), 2026 cze (R.3.2)
arkusze: [2025 sty, 2026 cze]
---

## Po co to jest

Oba zadania webowe (2025 sty, 2026 cze) wymagały aplikacji w React albo Angularze z ==dołączoną biblioteką Bootstrap== (R.3.2). Zanim napiszesz komponent, potrzebujesz projektu, który się uruchamia, z Bootstrapem i obrazami z archiwum na swoim miejscu.

## Jak to działa

Vite to narzędzie, które tworzy szkielet projektu i uruchamia serwer deweloperski. Pliki, które ruszasz:

```tekst Struktura projektu
egzamin/
├── public/
│   └── assets/
│       └── obraz1.jpg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── index.html
└── package.json
```

- `main.jsx`: punkt startowy. Tu dopisujesz import Bootstrapa.
- `App.jsx`: Twój komponent. Cały kod zadania.
- `public/assets/`: obrazy z archiwum. Arkusz 2025 sty dopuszczał `src/assets` albo `public/assets`.
- `App.css`, `index.css`: style z szablonu. Usuń ich importy, żeby nie zmieniały wyglądu Bootstrapa.

Co się dzieje po `npm run dev`:

1. Vite startuje serwer pod `http://localhost:5173`.
2. Przeglądarka dostaje `index.html` z pustym `<div id="root">`.
3. `main.jsx` każe Reactowi narysować w nim komponent `App`.
4. Plik z `public/` jest dostępny pod adresem od korzenia: `public/assets/obraz1.jpg` to `assets/obraz1.jpg`.
5. Zapis pliku w edytorze od razu odświeża stronę.

Import CSS w `main.jsx` dołącza Bootstrap do całej aplikacji. Od tej chwili klasy jak `btn btn-primary` działają w każdym komponencie.

## Składnia do zapamiętania

```tekst Polecenia w terminalu
npm create vite@latest egzamin -- --template react
cd egzamin
npm install
npm install bootstrap
npm run dev
```

```jsx main.jsx
import 'bootstrap/dist/css/bootstrap.css'
```

## Przykład

Pliki po przygotowaniu projektu. Obrazy z archiwum skopiowane do `public/assets`.

```jsx main.jsx {3}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

1. Bootstrap zamiast `import './index.css'` z szablonu. Ścieżkę podaje tabela 1 w arkuszu.

```jsx App.jsx {1,4,5,11}
function App() {
  return (
    <div className="container">
      <h1>Kategorie zdjęć</h1>
      <img src="assets/obraz1.jpg" alt="Mak" className="rounded" />
      <button type="button" className="btn btn-success">Pobierz</button>
    </div>
  )
}

export default App
```

1. Komponent to funkcja, która zwraca wygląd.
2. Nagłówek pierwszego stopnia, jak w treści.
3. Obraz z `public/assets`, zaokrąglone rogi klasą Bootstrapa.
4. `main.jsx` importuje ten komponent, więc eksport musi zostać.

```wynik
$ npm run dev
VITE v8.3.8  ready in 73 ms
➜  Local:   http://localhost:5173/
```

## Pułapki

- Bez importu w `main.jsx` klasy Bootstrapa nic nie robią i przepada R.3.2. Sprawdź w przeglądarce, czy przycisk ma kolor.
- `import './index.css'` z szablonu zostawiony obok Bootstrapa zmienia czcionki, tło i wyśrodkowanie. Usuń go razem z importem `App.css` w `App.jsx`.
- `document.getElementById('root')` w `main.jsx` jest z szablonu i jest w porządku. Zakaz metod DOM dotyczy Twojego kodu w komponencie.
- `npm create` i `npm install` pobierają pakiety z sieci. Jak to wygląda na stanowisku bez internetu, zależy od ośrodka: zapytaj w szkole, czy projekt i Bootstrap będą przygotowane.
- Obraz w `src/assets` nie jest dostępny pod adresem `assets/...`. Taki plik trzeba importować w kodzie. Najprościej trzymać obrazy w `public/assets`.
- Do archiwum `web.zip` pakujesz cały folder projektu, a modyfikowane pliki (`App.jsx`, `main.jsx`) kopiujesz obok.

## Powiązane

- [JSX i komponent funkcyjny](#/karta/web-frontend/02-jsx-i-komponent)
- [Klasy Bootstrapa z tabeli pomocniczej](#/karta/web-frontend/07-klasy-bootstrapa)
- [Foldery i pakowanie](#/karta/dokumentacja/04-foldery-i-pakowanie)
