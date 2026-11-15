---
tytul: "Formularz: pola sterowane, checkbox, onSubmit"
dzial: web-frontend
tagi: [react, formularz, input, value, onChange, checkbox, checked, disabled, placeholder, password, onSubmit, preventDefault]
status: do-weryfikacji
zrodla:
  - https://react.dev/reference/react-dom/components/input
  - https://react.dev/reference/react-dom/components/form
  - https://getbootstrap.com/docs/5.3/forms/form-control/
  - Przykład uruchomiony w Vite 8 z React 19.3; wpisywanie, zaznaczanie i wysyłka sprawdzone w przeglądarce, także bez preventDefault
  - Arkusz INF.04 2026 cze, część II
  - Zasady oceniania INF.04 2026 cze (R.3.1, R.3.4, R.3.5, R.3.7)
arkusze: [2026 cze]
---

## Po co to jest

W 2026 cze był formularz: trzy pola, checkbox i przycisk „Zapisz”. Checkbox ==blokował pole hasła== (R.3.4, R.3.7), a po wysłaniu pod formularzem pojawiało się podsumowanie wpisanych danych (R.3.5, R.3.8, R.3.9). Do tego w Reakcie potrzebujesz pól sterowanych stanem i obsługi `onSubmit`.

## Jak to działa

Pole sterowane to pole, którego wartość ==trzyma stan==, a nie sama przeglądarka:

```tekst Wpisanie litery w pole sterowane
użytkownik wpisuje „o”
        ↓
onChange: e.target.value = "o"
        ↓
setEmail("o")
        ↓
nowy render: value={email} = "o"
        ↓
w polu widać „o”
```

Dzięki temu w każdej chwili masz wpisany tekst w zmiennej `email`. Nie trzeba go nigdzie odczytywać przez DOM.

| Kontrolka | Wartość | Zdarzenie |
| --- | --- | --- |
| pole tekstowe | `value={tekst}` | `e.target.value` |
| checkbox | `checked={zaznaczone}` | `e.target.checked` |

`disabled={warunek}` wyłącza kontrolkę, gdy warunek jest prawdziwy. Wiążąc go ze stanem checkboxa, łączysz dwie kontrolki: zmiana jednej od razu blokuje albo odblokowuje drugą.

Wysłanie formularza (przycisk `type="submit"` albo Enter w polu) wywołuje `onSubmit` na `<form>`. Przeglądarka domyślnie przeładowałaby wtedy stronę. `e.preventDefault()` to zatrzymuje, więc stan i komunikat zostają.

## Składnia do zapamiętania

```jsx
const [email, setEmail] = useState('')
const [zgoda, setZgoda] = useState(false)

<form onSubmit={zapisz}>
  <input value={email} onChange={(e) => setEmail(e.target.value)} />
  <input type="checkbox" checked={zgoda} onChange={(e) => setZgoda(e.target.checked)} />
  <input type="password" disabled={zgoda} />
  <button type="submit">Zapisz</button>
</form>
```

## Przykład

```jsx App.jsx {4,5,9,14,22,23,31,32,36}
import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [zgoda, setZgoda] = useState(false)
  const [komunikat, setKomunikat] = useState('')

  function zapisz(e) {
    e.preventDefault()
    setKomunikat('Zapisano: ' + email)
  }

  return (
    <form className="container" onSubmit={zapisz}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">E-mail:</label>
        <input
          id="email"
          type="email"
          className="form-control"
          placeholder="adres@domena.pl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-check mb-3">
        <input
          id="zgoda"
          type="checkbox"
          className="form-check-input"
          checked={zgoda}
          onChange={(e) => setZgoda(e.target.checked)}
        />
        <label htmlFor="zgoda" className="form-check-label">Zgadzam się na newsletter</label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={!zgoda}>Zapisz</button>
      <p className="mt-3">{komunikat}</p>
    </form>
  )
}

export default App
```

1. Stan pola tekstowego, na starcie pusty napis.
2. Stan checkboxa, na starcie niezaznaczony. W 2026 cze miał być zaznaczony: `useState(true)`.
3. Zatrzymanie przeładowania strony.
4. Obsługa wysłania podpięta do formularza (R.3.5 w 2026 cze).
5. Wartość pola brana ze stanu.
6. Każda zmiana w polu trafia do stanu.
7. Checkbox: `checked`, nie `value`.
8. Odczyt zaznaczenia przez `e.target.checked`.
9. Przycisk nieaktywny, dopóki zgoda nie jest zaznaczona.

Sprawdzone w przeglądarce: na starcie przycisk wyłączony. Po wpisaniu `ola@szkola.pl` i zaznaczeniu zgody przycisk działa, a po kliknięciu pod nim jest „Zapisano: ola@szkola.pl”.

## Pułapki

- Bez `e.preventDefault()` strona się przeładowuje: sprawdzone, adres zmienił się na `/?`, a pola i komunikat zniknęły. Podsumowanie z R.3.8-R.3.9 nigdy się nie pokaże.
- `value` bez `onChange` daje pole, w które nie da się pisać, i ostrzeżenie w konsoli o polu tylko do odczytu.
- Checkbox z `value` zamiast `checked` i odczyt `e.target.value` zamiast `e.target.checked`: stan dostaje napis `"on"`, a nie `true`/`false`.
- Pole hasła ma `type="password"` (R.3.1 w 2026 cze). Bez tego znaki są widoczne.
- `placeholder` to podpowiedź w pustym polu, a nie wartość. Treść podpowiedzi przepisuj z arkusza: „Adres strony WWW”, „Twój login”.
- Odczyt pól przez `document.getElementById(...).value` unieważnia cały rezultat. Wartości są w stanie.

## Powiązane

- [useState i zdarzenia](#/karta/web-frontend/03-usestate-i-zdarzenia)
- [Klasy Bootstrapa z tabeli pomocniczej](#/karta/web-frontend/07-klasy-bootstrapa)
- [Zadanie: menedżer haseł](#/karta/web-frontend/10-zadanie-menedzer-hasel)
- [Zakazane: DOM i onclick w napisie](#/karta/web-frontend/08-zakazane-dom-i-onclick)
