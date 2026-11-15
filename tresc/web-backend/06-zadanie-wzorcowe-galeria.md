---
tytul: "Zadanie wzorcowe: galeria z bazą"
dzial: web-backend
tagi: [zadanie wzorcowe, express, sqlite, react, fetch, useEffect, licznik pobrań, dodawanie, lista, cors]
status: do-weryfikacji
zrodla:
  - To NIE jest zadanie z arkusza. W arkuszach INF.04 z lat 2021-2026 nie było back-endu.
  - Logika wzięta z zadania webowego z arkusza INF.04 2025 sty (galeria, licznik pobrań, plik dane.txt) i przeniesiona na serwer z bazą
  - https://expressjs.com/en/5x/api.html
  - https://nodejs.org/api/sqlite.html
  - https://react.dev/reference/react/useEffect
  - Serwer (Node 26.0, Express 5.3) i front (Vite 8, React 19.3) uruchomione razem; pobieranie, licznik, dodawanie i stan po przeładowaniu strony sprawdzone w przeglądarce i curl
arkusze: []
---

## Po co to jest

==To nie jest zadanie z arkusza.== Żaden arkusz z lat 2021-2026 nie miał back-endu, więc to ćwiczenie złożone z tego, co było we froncie (galeria z licznikiem pobrań z 2025 sty), przeniesione na serwer: lista rekordów z bazy, dodawanie nowego rekordu i licznik, który ==zapisuje się w bazie==, a nie tylko w stanie Reacta. Jeśli back-end pojawi się na egzaminie, będzie to prawdopodobnie podobny układ: kilka tras i front, który z nich korzysta.

## Jak to działa

Dwa programy w dwóch terminalach: serwer na porcie 3000, front Vite na 5173. Obrazy leżą we froncie w `public/assets`, a baza zna tylko ich nazwy.

Trzy operacje i ich drogi:

```tekst Kliknięcie Pobierz przy id 3
React: fetch POST /api/zdjecia/3/pobierz
        ↓
Express: UPDATE ... pobrania + 1 WHERE id = 3
         SELECT ... WHERE id = 3
        ↓ JSON zmienionego zdjęcia
React: podmiana jednego obiektu w tablicy
        ↓
na ekranie Pobrań: 4
```

| Trasa | Działanie |
| --- | --- |
| `GET /api/zdjecia` | lista z bazy, przy starcie strony |
| `POST /api/zdjecia` | nowe zdjęcie z formularza, 201 albo 400 |
| `POST /api/zdjecia/:id/pobierz` | licznik o 1 w bazie, 200 albo 404 |

Przy pierwszym uruchomieniu serwer sprawdza, czy tabela jest pusta, i wtedy wpisuje trzy zdjęcia startowe. Przy kolejnych nic nie dopisuje, więc dane się nie dublują.

Sprawdzone: na starcie Mak 35, Bukiet 43 (44 po teście curl), Dalmatyńczyk 2. Dwa kliknięcia „Pobierz” przy Dalmatyńczyku: 4. Dodane „Świnka morska” z plikiem `obraz4.jpg`: nowy blok z obrazem i 0 pobrań. Po przeładowaniu strony te same liczby, bo pochodzą z bazy.

## Składnia do zapamiętania

```js
app.post('/api/zdjecia/:id/pobierz', (req, res) => {
  const wynik = db.prepare('UPDATE zdjecia SET pobrania = pobrania + 1 WHERE id = ?').run(req.params.id);
  if (wynik.changes === 0) {
    return res.status(404).json({ blad: 'Nie ma takiego zdjęcia' });
  }
  res.json(db.prepare('SELECT * FROM zdjecia WHERE id = ?').get(req.params.id));
});
```

## Przykład

Serwer: folder `serwer`, `npm init -y`, `npm install express cors`, uruchomienie `node index.js`.

```js index.js {19,20,27,31,34,37,41,42,43}
const express = require('express');
const cors = require('cors');
const { DatabaseSync } = require('node:sqlite');

const app = express();
app.use(cors());
app.use(express.json());

const db = new DatabaseSync('galeria.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS zdjecia (
    id INTEGER PRIMARY KEY,
    alt TEXT NOT NULL,
    plik TEXT NOT NULL,
    pobrania INTEGER DEFAULT 0
  )
`);

const ile = db.prepare('SELECT COUNT(*) AS liczba FROM zdjecia').get();
if (ile.liczba === 0) {
  const dodaj = db.prepare('INSERT INTO zdjecia (alt, plik, pobrania) VALUES (?, ?, ?)');
  dodaj.run('Mak', 'obraz1.jpg', 35);
  dodaj.run('Bukiet', 'obraz2.jpg', 43);
  dodaj.run('Dalmatyńczyk', 'obraz3.jpg', 2);
}

app.get('/api/zdjecia', (req, res) => {
  res.json(db.prepare('SELECT * FROM zdjecia').all());
});

app.post('/api/zdjecia', (req, res) => {
  const { alt, plik } = req.body;
  if (!alt || !plik) {
    return res.status(400).json({ blad: 'Podaj opis i nazwę pliku' });
  }
  const wynik = db.prepare('INSERT INTO zdjecia (alt, plik) VALUES (?, ?)').run(alt, plik);
  const nowe = db.prepare('SELECT * FROM zdjecia WHERE id = ?').get(wynik.lastInsertRowid);
  res.status(201).json(nowe);
});

app.post('/api/zdjecia/:id/pobierz', (req, res) => {
  const wynik = db.prepare('UPDATE zdjecia SET pobrania = pobrania + 1 WHERE id = ?').run(req.params.id);
  if (wynik.changes === 0) {
    return res.status(404).json({ blad: 'Nie ma takiego zdjęcia' });
  }
  res.json(db.prepare('SELECT * FROM zdjecia WHERE id = ?').get(req.params.id));
});

app.listen(3000, () => {
  console.log('Serwer na http://localhost:3000');
});
```

1. Ile wierszy jest w tabeli.
2. Tylko pusta tabela dostaje dane startowe.
3. Lista dla frontu.
4. Dodawanie z formularza.
5. Brak opisu albo pliku: 400.
6. Nowy wiersz odczytany z bazy razem z `id` i `pobrania` 0.
7. Osobna trasa na licznik.
8. Zwiększenie w samym SQL.
9. Nieistniejące `id`: 404.

Front: projekt Vite z Bootstrapem, obrazy z archiwum 2025 sty w `public/assets`.

```jsx App.jsx {10,14,16,17,19,22,27,29,33,57}
import { useEffect, useState } from 'react'

const ADRES = 'http://localhost:3000/api/zdjecia'

function App() {
  const [zdjecia, setZdjecia] = useState([])
  const [alt, setAlt] = useState('')
  const [plik, setPlik] = useState('')

  useEffect(() => {
    fetch(ADRES)
      .then((odpowiedz) => odpowiedz.json())
      .then((dane) => setZdjecia(dane))
  }, [])

  async function pobierz(id) {
    const odpowiedz = await fetch(ADRES + '/' + id + '/pobierz', { method: 'POST' })
    const zmienione = await odpowiedz.json()
    setZdjecia(zdjecia.map((zdjecie) => (zdjecie.id === id ? zmienione : zdjecie)))
  }

  async function dodaj(e) {
    e.preventDefault()
    const odpowiedz = await fetch(ADRES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alt: alt, plik: plik }),
    })
    if (!odpowiedz.ok) {
      return
    }
    const nowe = await odpowiedz.json()
    setZdjecia([...zdjecia, nowe])
    setAlt('')
    setPlik('')
  }

  return (
    <div className="container">
      <h1>Galeria</h1>
      <form className="row g-2 mb-3" onSubmit={dodaj}>
        <div className="col">
          <input className="form-control" placeholder="Opis" value={alt} onChange={(e) => setAlt(e.target.value)} />
        </div>
        <div className="col">
          <input className="form-control" placeholder="obraz4.jpg" value={plik} onChange={(e) => setPlik(e.target.value)} />
        </div>
        <div className="col">
          <button type="submit" className="btn btn-primary">Dodaj</button>
        </div>
      </form>
      <div className="row">
        {zdjecia.map((zdjecie) => (
          <div key={zdjecie.id} className="col-md-4">
            <img src={'assets/' + zdjecie.plik} alt={zdjecie.alt} className="rounded img-fluid" />
            <h4>Pobrań: {zdjecie.pobrania}</h4>
            <button type="button" className="btn btn-success" onClick={() => pobierz(zdjecie.id)}>
              Pobierz
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
```

1. Pobranie listy po pierwszym narysowaniu.
2. Tylko raz.
3. Obsługa „Pobierz”.
4. POST na trasę licznika danego zdjęcia.
5. Zmienione zdjęcie z serwera podmienia stary obiekt w tablicy.
6. Obsługa formularza.
7. Dane formularza jako JSON.
8. Serwer odrzucił dane (400): nic nie dopisuj.
9. Nowe zdjęcie na końcu listy.
10. Przycisk przekazuje `id` przez funkcję strzałkową.

## Pułapki

- Licznik zwiększany tylko w stanie Reacta, bez zapytania do serwera: po przeładowaniu strony wraca stara liczba.
- Dane startowe dopisywane bez sprawdzenia `COUNT(*)`: każdy restart serwera dubluje zdjęcia.
- Front uruchomiony bez działającego serwera: pusta lista i błąd sieci w konsoli. Najpierw serwer, potem front.
- `zdjecia.map(...)` w `pobierz` z porównaniem `zdjecie.id === id`: `id` przychodzi z bazy jako liczba i z przycisku jako ta sama liczba, więc działa. Gdyby `id` szło z adresu (`req.params`), byłoby napisem.
- Do archiwum pakujesz oba foldery (serwer i front) bez `node_modules`, które odtwarza `npm install`. Plik `galeria.db` dołącz, jeśli ma zawierać dane.

## Powiązane

- [API z bazą: Express i SQLite razem](#/karta/web-backend/04-api-z-baza)
- [fetch z Reacta do Expressa](#/karta/web-backend/05-fetch-z-reacta)
- [Zadanie: galeria z kategoriami](#/karta/web-frontend/09-zadanie-galeria-z-kategoriami)
- [Zmiana jednego obiektu w tablicy stanu](#/karta/web-frontend/05-zmiana-obiektu-w-tablicy)
