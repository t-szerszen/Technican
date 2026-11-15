---
tytul: "Zadanie: menedżer haseł"
dzial: web-frontend
tagi: [react, zadanie, formularz, checkbox, disabled, password, placeholder, onSubmit, preventDefault, lead, text-primary, Bootstrap]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2026 cze, część II i tabela 1 (ilustracje 1-3)
  - Zasady oceniania INF.04 2026 cze (R.3.1-R.3.9)
  - https://react.dev/reference/react-dom/components/input
  - https://react.dev/reference/react-dom/components/form
  - Rozwiązanie uruchomione w Vite 8 z React 19.3; oba warianty zapisu i przełączanie blokady hasła sprawdzone w przeglądarce
  - Pliku szablon.html z archiwum 2026 cze nie było w materiałach; klasy formularza wzięte z zasad oceniania (R.3.3) i tabeli 1
arkusze: [2026 cze]
---

## Po co to jest

Typ zadania: formularz z podsumowaniem. Nagłówek z numerem zdającego, trzy pola (adres, login, hasło), pole wyboru „Wygeneruj hasło”, które ==blokuje pole hasła==, i niebieski przycisk „Zapisz”. Pod formularzem trzy akapity, wypełniane dopiero po zapisaniu: adres, login i hasło albo napis „Hasło automatycznie generowane”.

## Jak to działa

Plan rozwiązania:

1. Stan dla każdego pola i dla checkboxa (`useState(true)`: zaznaczony na starcie).
2. Pola sterowane: `value` i `onChange`. Pole hasła z `type="password"` i `disabled={generuj}` (R.3.1, R.3.4).
3. Etykiety z `htmlFor`, pola z `form-control`, przycisk `btn btn-primary` (R.3.2, R.3.3).
4. `onSubmit` na formularzu z `e.preventDefault()` (R.3.5).
5. Przy wysłaniu kopia wartości do stanu `zapisane`. Akapity czytają tylko z niego.
6. Trzeci akapit zależnie od tego, czy checkbox był zaznaczony w chwili zapisu (R.3.8, R.3.9).

Po co osobny stan `zapisane`? Treść mówi, że akapity wypełniają się ==po zatwierdzeniu==. Gdyby czytały prosto z pól, zmieniałyby się przy każdej wpisanej literze.

```tekst Przepływ danych
pola formularza
→ adres, login, haslo, generuj
  (zmieniają się przy wpisywaniu)
        ↓ klik Zapisz
setZapisane({ wartości z tej chwili })
        ↓
akapity czytają zapisane.adres,
zapisane.login, zapisane.haslo
```

Sprawdzone w przeglądarce:

| Krok | Wynik |
| --- | --- |
| start | checkbox zaznaczony, hasło zablokowane |
| poczta.pl, Tomek, Zapisz | Adres: poczta.pl, Login: Tomek, Hasło automatycznie generowane |
| odznaczenie | pole hasła aktywne |
| hasło tajne123, Zapisz | Hasło: tajne123 |
| ponowne zaznaczenie | pole hasła znowu zablokowane |

## Składnia do zapamiętania

```jsx
const [generuj, setGeneruj] = useState(true)
<input type="checkbox" checked={generuj} onChange={(e) => setGeneruj(e.target.checked)} />
<input type="password" value={haslo} disabled={generuj} onChange={(e) => setHaslo(e.target.value)} />

function zapisz(e) {
  e.preventDefault()
  setZapisane({ adres: adres, login: login, haslo: haslo, generuj: generuj })
}
{zapisane.generuj ? 'Hasło automatycznie generowane' : 'Hasło: ' + zapisane.haslo}
```

## Przykład

Zamiast zer wpisz swój numer zdającego.

```jsx App.jsx {7,8,11,12,18,20,25,47,55,58,62,65,68}
import { useState } from 'react'

function App() {
  const [adres, setAdres] = useState('')
  const [login, setLogin] = useState('')
  const [haslo, setHaslo] = useState('')
  const [generuj, setGeneruj] = useState(true)
  const [zapisane, setZapisane] = useState({ adres: '', login: '', haslo: '', generuj: true })

  function zapisz(e) {
    e.preventDefault()
    setZapisane({ adres: adres, login: login, haslo: haslo, generuj: generuj })
  }

  return (
    <div className="container">
      <h1>Menedżer haseł - wykonał 00000000000</h1>
      <form onSubmit={zapisz}>
        <div className="m-4">
          <label htmlFor="adres">Adres WWW:</label>
          <input
            id="adres"
            type="text"
            className="form-control"
            placeholder="Adres strony WWW"
            value={adres}
            onChange={(e) => setAdres(e.target.value)}
          />
        </div>
        <div className="m-4">
          <label htmlFor="login">Login:</label>
          <input
            id="login"
            type="text"
            className="form-control"
            placeholder="Twój login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="m-4">
          <div className="form-check">
            <input
              id="generuj"
              type="checkbox"
              className="form-check-input"
              checked={generuj}
              onChange={(e) => setGeneruj(e.target.checked)}
            />
            <label htmlFor="generuj" className="form-check-label">Wygeneruj hasło</label>
          </div>
          <label htmlFor="haslo">Hasło:</label>
          <input
            id="haslo"
            type="password"
            className="form-control"
            value={haslo}
            disabled={generuj}
            onChange={(e) => setHaslo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary m-4">Zapisz</button>
      </form>
      <div>
        <p className="lead text-primary p-2">Adres: {zapisane.adres}</p>
        <p className="p-2">Login: {zapisane.login}</p>
        <p className="p-2">
          {zapisane.generuj ? 'Hasło automatycznie generowane' : 'Hasło: ' + zapisane.haslo}
        </p>
      </div>
    </div>
  )
}

export default App
```

1. Checkbox zaznaczony na starcie (R.3.7).
2. Dane do akapitów. Na starcie puste, a `generuj: true` daje napis jak na ilustracji 1.
3. Bez przeładowania strony.
4. Kopia wartości z chwili kliknięcia.
5. Zatwierdzenie podpięte zdarzeniem `onSubmit` (R.3.5).
6. Etykieta powiązana z polem przez `htmlFor` (R.3.3).
7. Podpowiedź w pustym polu (R.3.1). Login ma swoją: „Twój login”.
8. Checkbox sterowany stanem.
9. Ukrywanie wpisywanych znaków (R.3.1).
10. Powiązanie checkboxa z polem hasła (R.3.4): zaznaczony blokuje pole.
11. Niebieski przycisk (R.3.2), `type="submit"` uruchamia `onSubmit`.
12. Pierwszy akapit: tekst wiodący, niebieski, padding .5rem (R.3.2).
13. Trzeci akapit zależnie od zapisanego stanu checkboxa (R.3.8, R.3.9).

## Pułapki

- Bez `e.preventDefault()` strona się przeładowuje i akapity od razu znikają: R.3.8 i R.3.9 nie do spełnienia.
- `disabled={!generuj}` odwraca logikę: zaznaczony checkbox ma ==blokować== hasło.
- `useState(false)` dla checkboxa: na starcie pole hasła byłoby aktywne, a R.3.7 wymaga zaznaczenia i blokady.
- Odczyt pól przez `document.getElementById(...).value` przy zapisie unieważnia cały rezultat.
- Napisy przepisuj co do znaku: „Hasło automatycznie generowane”, „Adres: ”, „Login: ”, „Hasło: ”, nagłówek „Menedżer haseł - wykonał” z numerem.
- Klasy z `szablon.html` przenoś jako `className`, `for` zmień na `htmlFor`, a każdy `<input>` domknij (R.3.3).

## Powiązane

- [Formularz: pola sterowane, checkbox, onSubmit](#/karta/web-frontend/06-formularz-pola-sterowane)
- [Klasy Bootstrapa z tabeli pomocniczej](#/karta/web-frontend/07-klasy-bootstrapa)
- [Zakazane: DOM i onclick w napisie](#/karta/web-frontend/08-zakazane-dom-i-onclick)
- [useState i zdarzenia](#/karta/web-frontend/03-usestate-i-zdarzenia)
