---
tytul: "API z bazą: Express i SQLite razem"
dzial: web-backend
tagi: [express, sqlite, node:sqlite, CRUD, API, cors, changes, lastInsertRowid, 404, 201, 400]
status: do-weryfikacji
zrodla:
  - https://expressjs.com/en/5x/api.html
  - https://nodejs.org/api/sqlite.html
  - https://expressjs.com/en/resources/middleware/cors.html
  - Przykład uruchomiony w Node 26.0 z Express 5.3 i cors 2.8; każda trasa wywołana curl, dane sprawdzone po restarcie serwera
  - W arkuszach INF.04 z lat 2021-2026 nie było zadania z back-endem
arkusze: []
---

## Po co to jest

To złożenie dwóch poprzednich kart: trasy Expressa zamiast tablicy w pamięci czytają i zmieniają tabelę SQLite. Dane przeżywają restart serwera, a front w React może je pobierać `fetch`. To pełny szkielet back-endu z wyposażenia stanowisk (Node, Express, SQLite).

## Jak to działa

Każda trasa to ten sam schemat w trzech krokach:

```tekst Trasa z bazą
1. odczytaj dane z żądania
   req.params.id, req.body.alt
2. zapytanie SQL z ?
   db.prepare(...).run / all / get
3. odpowiedz kodem i JSON-em
   res.status(...).json(...)
```

Skąd wiadomo, że rekordu nie ma:

| Operacja | Brak rekordu to |
| --- | --- |
| `get(id)` | wynik `undefined` |
| `run` z `UPDATE` | `changes === 0` |
| `run` z `DELETE` | `changes === 0` |

Wtedy odpowiadasz 404. Przy dodawaniu `lastInsertRowid` daje `id` nowego wiersza, który odsyłasz w odpowiedzi z kodem 201.

`req.params.id` jest napisem, ale SQLite sam dopasowuje go do kolumny `INTEGER`. Sprawdzone: `get('2')` znajduje wiersz o `id` 2. Zamiana `Number(...)` jest potrzebna dopiero przy porównaniu w JavaScripcie.

`app.use(cors())` dodaje do odpowiedzi nagłówek `Access-Control-Allow-Origin: *`. Bez niego przeglądarka zablokuje odpowiedź dla frontu z innego portu (Vite na 5173, serwer na 3000).

Sprawdzone curl: dwa POST-y dały `id` 1 i 2 (kod 201), pusty POST dał 400, PUT zmienił nazwę, drugi DELETE tego samego `id` dał 404, a po restarcie serwera lista dalej zawierała zmienione zdjęcie.

## Składnia do zapamiętania

```js
app.put('/api/zdjecia/:id', (req, res) => {
  const wynik = db.prepare('UPDATE zdjecia SET alt = ? WHERE id = ?').run(req.body.alt, req.params.id);
  if (wynik.changes === 0) {
    return res.status(404).json({ blad: 'Nie ma takiego zdjęcia' });
  }
  res.json({ id: Number(req.params.id), alt: req.body.alt });
});
```

## Przykład

Najpierw `npm install express cors`.

```js index.js {6,9,19,24,25,33,37,42,50}
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
    pobrania INTEGER DEFAULT 0
  )
`);

app.get('/api/zdjecia', (req, res) => {
  const zdjecia = db.prepare('SELECT * FROM zdjecia').all();
  res.json(zdjecia);
});

app.get('/api/zdjecia/:id', (req, res) => {
  const zdjecie = db.prepare('SELECT * FROM zdjecia WHERE id = ?').get(req.params.id);
  if (!zdjecie) {
    return res.status(404).json({ blad: 'Nie ma takiego zdjęcia' });
  }
  res.json(zdjecie);
});

app.post('/api/zdjecia', (req, res) => {
  const alt = req.body.alt;
  if (!alt) {
    return res.status(400).json({ blad: 'Podaj pole alt' });
  }
  const wynik = db.prepare('INSERT INTO zdjecia (alt) VALUES (?)').run(alt);
  res.status(201).json({ id: wynik.lastInsertRowid, alt: alt, pobrania: 0 });
});

app.put('/api/zdjecia/:id', (req, res) => {
  const wynik = db.prepare('UPDATE zdjecia SET alt = ? WHERE id = ?').run(req.body.alt, req.params.id);
  if (wynik.changes === 0) {
    return res.status(404).json({ blad: 'Nie ma takiego zdjęcia' });
  }
  res.json({ id: Number(req.params.id), alt: req.body.alt });
});

app.delete('/api/zdjecia/:id', (req, res) => {
  const wynik = db.prepare('DELETE FROM zdjecia WHERE id = ?').run(req.params.id);
  if (wynik.changes === 0) {
    return res.status(404).json({ blad: 'Nie ma takiego zdjęcia' });
  }
  res.json({ usunieto: Number(req.params.id) });
});

app.listen(3000, () => {
  console.log('Serwer na http://localhost:3000');
});
```

1. Zgoda na zapytania z innego portu (front Vite).
2. Baza otwierana raz, przy starcie serwera.
3. Lista: wszystkie wiersze.
4. Jeden wiersz, `id` prosto z adresu.
5. Brak wiersza: 404.
6. Walidacja: bez nazwy nie dodajemy (400).
7. Nowy rekord z numerem nadanym przez bazę, kod 201.
8. `UPDATE` nie trafił w żaden wiersz: 404.
9. To samo dla `DELETE`.

## Pułapki

- `const zdjecie = db.prepare(...).get(...)` bez sprawdzenia `if (!zdjecie)`: `res.json(undefined)` wyśle pustą odpowiedź z kodem 200 zamiast 404.
- Kolejność argumentów w `run` musi odpowiadać kolejności `?`: w `UPDATE ... SET alt = ? WHERE id = ?` najpierw nowa nazwa, potem `id`.
- `db` otwierane w każdej trasie od nowa działa, ale jest zbędne. Raz na górze pliku wystarczy.
- Bez `cors()` curl i przeglądarka z paska adresu działają, a `fetch` z frontu na innym porcie dostaje błąd CORS w konsoli. Tylko przeglądarka pilnuje tego nagłówka.
- `galeria.db` powstaje w folderze, z którego uruchamiasz `node`. Uruchamiaj serwer zawsze z folderu projektu.

## Powiązane

- [SQLite: tabela i zapytania z parametrami](#/karta/web-backend/03-sqlite-tabela-i-zapytania)
- [Trasy Expressa: GET, POST, PUT, DELETE](#/karta/web-backend/02-trasy-i-odpowiedzi)
- [fetch z Reacta do Expressa](#/karta/web-backend/05-fetch-z-reacta)
