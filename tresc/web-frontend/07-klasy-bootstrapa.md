---
tytul: "Klasy Bootstrapa z tabeli pomocniczej"
dzial: web-frontend
tagi: [bootstrap, btn, btn-primary, btn-success, form-control, form-check, form-switch, m-, p-, lead, text-primary, rounded, row, col]
status: do-weryfikacji
zrodla:
  - https://getbootstrap.com/docs/5.3/components/buttons/
  - https://getbootstrap.com/docs/5.3/forms/checks-radios/#switches
  - https://getbootstrap.com/docs/5.3/forms/form-control/
  - https://getbootstrap.com/docs/5.3/utilities/spacing/
  - https://getbootstrap.com/docs/5.3/content/typography/#lead
  - https://getbootstrap.com/docs/5.3/utilities/borders/#border-radius
  - https://getbootstrap.com/docs/5.3/layout/grid/
  - Tabela 1 w arkuszach INF.04 2025 sty i 2026 cze
  - Wartości odczytane w przeglądarce z Bootstrapa 5.3.9 (getComputedStyle) i z pliku bootstrap.css
  - Zasady oceniania INF.04 2025 sty (R.3.2, R.3.3), 2026 cze (R.3.2, R.3.3)
arkusze: [2025 sty, 2026 cze]
---

## Po co to jest

Kryteria wyglądu w zadaniach webowych sprawdzają ==konkretne klasy==: `btn btn-success` i `form-check form-switch` w 2025 sty, `btn btn-primary`, `lead text-primary` i `form-control` w 2026 cze (R.3.2, R.3.3). Arkusz daje tabelę pomocniczą z przykładami po angielsku. Trzeba umieć szybko zamienić jej opis („padding .5rem”, „lead text”) na nazwę klasy i wpisać ją jako `className`.

## Jak to działa

Klasa Bootstrapa to gotowy zestaw stylów CSS. Dopisujesz kilka klas po spacji i każda dodaje swoje.

Odstępy mają wzór `{co}{strona}-{rozmiar}`:

```tekst Klasy odstępów
m-4    margines ze wszystkich stron, 1.5rem
p-2    padding ze wszystkich stron, .5rem
mt-3   margines tylko u góry (t)
ms-2   margines z lewej (start)
px-1   padding z lewej i prawej (x)
```

| Rozmiar | Wartość | W pikselach |
| --- | --- | --- |
| 0 | 0 | 0 |
| 1 | .25rem | 4 |
| 2 | .5rem | 8 |
| 3 | 1rem | 16 |
| 4 | 1.5rem | 24 |
| 5 | 3rem | 48 |

Strony: `t` góra, `b` dół, `s` lewa, `e` prawa, `x` lewa i prawa, `y` góra i dół. Bez litery: wszystkie cztery.

Z opisu w arkuszu na klasę:

| Opis | Klasa |
| --- | --- |
| zielony przycisk | `btn btn-success` |
| niebieski przycisk | `btn btn-primary` |
| pole tekstowe | `form-control` |
| przełącznik (switch) | `form-check form-switch` na `div` |
| obok siebie w wierszu | `form-check-inline` |
| tekst niebieski | `text-primary` |
| tekst wiodący | `lead` (20px, cieńsza czcionka) |
| zaokrąglone rogi | `rounded` (.375rem) |
| margines wewnętrzny .5rem | `p-2` |

Siatka: `row` to wiersz podzielony na 12 części, `col-md-4` zajmuje 4 z 12, czyli 1/3 szerokości na ekranach od 768px. Trzy `col-md-4` stoją obok siebie, na telefonie jeden pod drugim.

## Składnia do zapamiętania

```jsx
<button className="btn btn-success">Pobierz</button>
<div className="form-check form-switch">
  <input id="kwiaty" type="checkbox" className="form-check-input" />
  <label htmlFor="kwiaty" className="form-check-label">Kwiaty</label>
</div>
<input id="adres" className="form-control" />
<p className="lead text-primary p-2">Adres: ...</p>
<img src="assets/obraz1.jpg" alt="Mak" className="rounded" />
```

## Przykład

```jsx App.jsx {6,7,11,13,16,17,18,21,26}
function App() {
  return (
    <div className="container">
      <h1 className="m-4">Bootstrap na egzaminie</h1>

      <div className="form-check form-switch form-check-inline">
        <input id="kwiaty" type="checkbox" className="form-check-input" role="switch" defaultChecked />
        <label htmlFor="kwiaty" className="form-check-label">Kwiaty</label>
      </div>

      <div className="form-group m-4">
        <label htmlFor="adres">Adres WWW:</label>
        <input id="adres" type="text" className="form-control" placeholder="Adres strony WWW" />
      </div>

      <div className="row">
        <div className="col-md-4">
          <img src="assets/obraz1.jpg" alt="Mak" className="rounded img-fluid" />
        </div>
        <div className="col-md-4">
          <button type="button" className="btn btn-success">Pobierz</button>
          <button type="button" className="btn btn-primary ms-2">Zapisz</button>
        </div>
      </div>

      <p className="lead text-primary p-2">Adres: egzamin.pl</p>
    </div>
  )
}

export default App
```

1. Przełącznik: `div` z dwiema klasami, w środku `input` i `label`. `form-check-inline` stawia kolejne obok siebie.
2. `form-check-input` na polu. `role="switch"` doradza dokumentacja Bootstrapa dla czytników ekranu. `defaultChecked` tylko na tej karcie, w zadaniu stan trzyma React.
3. Wzór z zasad 2026 cze. `form-group` w Bootstrapie 5 nic nie robi, odstęp daje `m-4` (24px).
4. Pole tekstowe na całą szerokość.
5. Wiersz siatki.
6. Kolumna na 4 z 12 części (sprawdzone: 320px z 960px).
7. Zaokrąglone rogi (6px) i obraz nie szerszy niż kolumna.
8. Zielony przycisk z 2025 sty. `ms-2` przy drugim odsuwa go o 8px.
9. Trzy klasy naraz: większy tekst, kolor niebieski, padding .5rem (R.3.2 i opis w 2026 cze).

## Pułapki

- `class="btn"` zamiast `className` w JSX: zasady wymagają `className` (R.3.3). Przycisk wygląda dobrze, a punkt przepada.
- `btn-success` bez `btn` daje kolor, ale bez kształtu przycisku. Zasady wymieniają obie klasy.
- Switch bez `form-check` na `div` albo bez `form-check-input` na `input` wygląda jak zwykły checkbox albo się rozjeżdża. Zasady 2025 sty wymagały całego wzoru z `label` (R.3.3).
- Etykieta działa z polem tylko wtedy, gdy `htmlFor` ma tę samą wartość co `id` pola. Kliknięcie w etykietę zaznacza wtedy switch.
- Margines 5px na obrazie (2025 sty) to nie `m-1` (4px) ani `m-2` (8px). Zasady pisały „margin: 5px”, więc daj styl: `style={{ margin: '5px' }}`, a rogi przez `rounded`.
- Klasy z Bootstrapa 4 (`ml-2`, `mr-2`) w wersji 5 nic nie robią. Teraz `ms-2`, `me-2`.

## Powiązane

- [Projekt Vite z Reactem i Bootstrapem](#/karta/web-frontend/01-projekt-vite-i-bootstrap)
- [Formularz: pola sterowane, checkbox, onSubmit](#/karta/web-frontend/06-formularz-pola-sterowane)
- [Zadanie: galeria z kategoriami](#/karta/web-frontend/09-zadanie-galeria-z-kategoriami)
