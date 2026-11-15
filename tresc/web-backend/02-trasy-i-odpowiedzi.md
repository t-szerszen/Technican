---
tytul: "Trasy Expressa: GET, POST, PUT, DELETE"
dzial: web-backend
tagi: [express, app.get, app.post, app.put, app.delete, req.params, req.query, req.body, express.json, res.status, 201, 400, 404, express.static]
status: do-weryfikacji
zrodla:
  - https://expressjs.com/en/guide/routing.html
  - https://expressjs.com/en/5x/api.html (express.json, req.params, req.query, req.body, res.status)
  - https://expressjs.com/en/starter/static-files.html
  - Przykład uruchomiony w Node 26.0 z Express 5.3; każda trasa wywołana curl, także bez nagłówka Content-Type
  - W arkuszach INF.04 z lat 2021-2026 nie było zadania z back-endem
arkusze: []
---

## Po co to jest

Serwer z danymi dla aplikacji webowej to zestaw tras: pobierz listę, pobierz jeden rekord, dodaj, zmień, usuń. Każda trasa czyta dane z innego miejsca żądania i odpowiada odpowiednim kodem. Na tym samym schemacie stoi potem wersja z bazą SQLite.

## Jak to działa

Ta sama ścieżka obsługuje różne operacje zależnie od metody HTTP:

| Żądanie | Co robi, kod |
| --- | --- |
| `GET /api/zdjecia` | lista, 200 |
| `GET /api/zdjecia/2` | jeden rekord, 200 albo 404 |
| `POST /api/zdjecia` | dodaj, 201 albo 400 |
| `PUT /api/zdjecia/2` | zmień, 200 albo 404 |
| `DELETE /api/zdjecia/2` | usuń, 200 |

Skąd trasa bierze dane:

```tekst Trzy miejsca w żądaniu
adres /api/zdjecia/2
→ req.params.id = "2"

adres /api/zdjecia?kategoria=3
→ req.query.kategoria = "3"

treść żądania (JSON)
→ req.body = { alt: ... }
```

- `:id` w ścieżce trasy to miejsce na zmienną. Wartość zawsze przychodzi jako ==napis==.
- `req.body` działa tylko z `app.use(express.json())` i tylko wtedy, gdy klient wyśle nagłówek `Content-Type: application/json`. Inaczej jest `undefined`.
- `res.status(404).json(...)` ustawia kod i wysyła odpowiedź w jednym ciągu.
- `return` przed odpowiedzią z błędem kończy funkcję, więc dalszy kod się nie wykona.
- `app.use(express.static('public'))` wystawia pliki z folderu `public` pod adresem bez nazwy folderu: `public/index.html` to `localhost:3000/`.

## Składnia do zapamiętania

```js
app.use(express.json());

app.get('/api/zdjecia/:id', (req, res) => {
  const zdjecie = zdjecia.find((z) => z.id === Number(req.params.id));
  if (!zdjecie) {
    return res.status(404).json({ blad: 'Nie ma takiego zdjęcia' });
  }
  res.json(zdjecie);
});

app.post('/api/zdjecia', (req, res) => {
  res.status(201).json(req.body);
});
```

## Przykład

Dane w tablicy w pamięci. Po restarcie serwera wracają do stanu z kodu.

```js index.js {4,5,14,23,25,31,33,38,41,50}
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static('public'));

let zdjecia = [
  { id: 1, alt: 'Mak', kategoria: 1, pobrania: 35 },
  { id: 2, alt: 'Audi', kategoria: 3, pobrania: 11 },
];
let nastepneId = 3;

app.get('/api/zdjecia', (req, res) => {
  const kategoria = req.query.kategoria;
  if (kategoria) {
    res.json(zdjecia.filter((z) => z.kategoria === Number(kategoria)));
  } else {
    res.json(zdjecia);
  }
});

app.get('/api/zdjecia/:id', (req, res) => {
  const zdjecie = zdjecia.find((z) => z.id === Number(req.params.id));
  if (!zdjecie) {
    return res.status(404).json({ blad: 'Nie ma takiego zdjęcia' });
  }
  res.json(zdjecie);
});

app.post('/api/zdjecia', (req, res) => {
  const { alt, kategoria } = req.body;
  if (!alt || !kategoria) {
    return res.status(400).json({ blad: 'Brak pola alt lub kategoria' });
  }
  const nowe = { id: nastepneId, alt: alt, kategoria: kategoria, pobrania: 0 };
  nastepneId++;
  zdjecia.push(nowe);
  res.status(201).json(nowe);
});

app.put('/api/zdjecia/:id', (req, res) => {
  const zdjecie = zdjecia.find((z) => z.id === Number(req.params.id));
  if (!zdjecie) {
    return res.status(404).json({ blad: 'Nie ma takiego zdjęcia' });
  }
  zdjecie.alt = req.body.alt;
  res.json(zdjecie);
});

app.delete('/api/zdjecia/:id', (req, res) => {
  const id = Number(req.params.id);
  zdjecia = zdjecia.filter((z) => z.id !== id);
  res.json({ usunieto: id });
});

app.listen(3000, () => {
  console.log('Serwer na http://localhost:3000');
});
```

1. Bez tego `req.body` jest `undefined`.
2. Pliki z folderu `public` pod głównym adresem.
3. Parametr z adresu po `?`.
4. Parametr ze ścieżki. `Number(...)`, bo przychodzi jako napis, a `id` w tablicy to liczba.
5. Brak rekordu: kod 404 i `return`.
6. Dane z treści żądania.
7. Brak wymaganego pola: 400.
8. Utworzono: 201 i nowy rekord w odpowiedzi.
9. Zmiana istniejącego rekordu.
10. Usunięcie.

```wynik
$ curl localhost:3000/api/zdjecia?kategoria=3
[{"id":2,"alt":"Audi","kategoria":3,"pobrania":11}]
$ curl localhost:3000/api/zdjecia/9
{"blad":"Nie ma takiego zdjęcia"}
$ curl -X POST -H "Content-Type: application/json" -d '{"alt":"Róża","kategoria":1}' localhost:3000/api/zdjecia
{"id":3,"alt":"Róża","kategoria":1,"pobrania":0}
$ curl -X POST -H "Content-Type: application/json" -d '{"alt":"Bez kategorii"}' localhost:3000/api/zdjecia
{"blad":"Brak pola alt lub kategoria"}
$ curl -X PUT -H "Content-Type: application/json" -d '{"alt":"Garbus"}' localhost:3000/api/zdjecia/2
{"id":2,"alt":"Garbus","kategoria":3,"pobrania":11}
```

## Pułapki

- POST bez nagłówka `Content-Type: application/json`: `req.body` jest `undefined`, a `const { alt } = req.body` wysypuje trasę błędem 500. Sprawdzone. W `fetch` nagłówek trzeba podać samemu.
- `z.id === req.params.id` porównuje liczbę z napisem i nigdy nie jest prawdą: każde zapytanie kończy się 404. Zamień `Number(...)`.
- Brak `return` przy odpowiedzi z błędem: kod idzie dalej i próbuje wysłać drugą odpowiedź (`ERR_HTTP_HEADERS_SENT`).
- `app.use(express.json())` pod trasami nie zadziała dla tras nad nim. Pośrednicy (`app.use`) muszą stać na górze.
- Przeglądarka z paska adresu wysyła tylko GET. POST, PUT i DELETE testujesz `curl`, rozszerzeniem do zapytań albo `fetch` z frontu.

## Powiązane

- [Projekt Node z Expressem](#/karta/web-backend/01-projekt-node-i-express)
- [API z bazą: Express i SQLite razem](#/karta/web-backend/04-api-z-baza)
- [fetch z Reacta do Expressa](#/karta/web-backend/05-fetch-z-reacta)
