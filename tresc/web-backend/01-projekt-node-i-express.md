---
tytul: "Projekt Node z Expressem"
dzial: web-backend
tagi: [node, npm, express, package.json, require, app.listen, serwer, port, node --watch]
status: do-weryfikacji
zrodla:
  - https://expressjs.com/en/starter/installing.html
  - https://expressjs.com/en/starter/hello-world.html
  - https://expressjs.com/en/5x/api.html (app.listen, res.send, res.json)
  - https://docs.npmjs.com/cli/commands/npm-init
  - Przykład uruchomiony w Node 26.0 z Express 5.3, odpowiedzi sprawdzone curl
  - W arkuszach INF.04 z lat 2021-2026 nie było zadania z back-endem. Karta przygotowuje na wariant z wyposażenia stanowisk (Node, Express, SQLite).
arkusze: []
---

## Po co to jest

Żaden arkusz z lat 2021-2026 nie miał części back-end, więc nie ma tu kryteriów z zasad oceniania. Jeśli taki wariant się pojawi, pierwszy krok jest zawsze ten sam: projekt Node, Express i serwer, który odpowiada na adres w przeglądarce. Ta karta to ten szkielet.

## Jak to działa

Node uruchamia JavaScript poza przeglądarką. Express to biblioteka, która z kilku linii robi serwer HTTP.

```tekst Przygotowanie projektu
npm init -y            → package.json
npm install express    → node_modules/ i wpis w package.json
node index.js          → serwer startuje i czeka
```

Co się dzieje, gdy wpiszesz w przeglądarce `localhost:3000/api/powitanie`:

```tekst Żądanie i odpowiedź
przeglądarka: GET /api/powitanie
        ↓
Express szuka trasy: app.get('/api/powitanie', ...)
        ↓
wywołuje funkcję (req, res)
        ↓
res.json({...}) → odpowiedź 200, JSON
```

- `req` (request) to żądanie: adres, parametry, dane od klienta.
- `res` (response) to odpowiedź, którą budujesz.
- `res.send('tekst')` wysyła tekst (jako HTML), `res.json(obiekt)` wysyła JSON.
- Adres bez trasy Express obsługuje sam: odpowiedź 404 „Cannot GET /brak”.

`app.listen(3000, ...)` zajmuje port i nie kończy programu. Serwer działa, dopóki nie zatrzymasz go Ctrl+C. Po zmianie kodu trzeba go uruchomić od nowa albo od razu używać `node --watch index.js`, który restartuje serwer po zapisie pliku.

## Składnia do zapamiętania

```js
const express = require('express');
const app = express();

app.get('/api/powitanie', (req, res) => {
  res.json({ tekst: 'Witaj' });
});

app.listen(3000, () => {
  console.log('Serwer na http://localhost:3000');
});
```

## Przykład

```js index.js {1,3,6,7,10,11,14}
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Serwer działa');
});

app.get('/api/powitanie', (req, res) => {
  res.json({ tekst: 'Witaj', rok: 2027 });
});

app.listen(PORT, () => {
  console.log(`Serwer na http://localhost:${PORT}`);
});
```

1. Import Expressa. `npm init -y` ustawia w `package.json` `"type": "commonjs"`, więc działa `require`.
2. Obiekt aplikacji: do niego dopisujesz trasy.
3. Trasa: metoda GET pod adresem `/`.
4. Tekst w odpowiedzi.
5. Druga trasa, pod `/api`, bo zwraca dane.
6. Obiekt zamieniony na JSON.
7. Start serwera na porcie 3000.

```wynik
$ node index.js
Serwer na http://localhost:3000
$ curl localhost:3000/
Serwer działa
$ curl localhost:3000/api/powitanie
{"tekst":"Witaj","rok":2027}
$ curl localhost:3000/brak
<pre>Cannot GET /brak</pre>
```

## Pułapki

- `Cannot find module 'express'`: zabrakło `npm install express` albo serwer uruchomiono z innego folderu niż ten z `package.json`.
- Port zajęty przez poprzednią kopię serwera: w Expressie 5 program ==nie przerywa się==. Błąd `EADDRINUSE` trafia do funkcji w `listen`, więc „Serwer na…” i tak się wypisze, a żądania obsługuje stara kopia ze starym kodem. Sprawdzone. Zatrzymaj starą kopię (Ctrl+C w jej terminalu).
- Zmiany w kodzie nie działają, dopóki nie zrestartujesz serwera. `node --watch` robi to sam.
- `res.json(...)` dwa razy w jednej trasie: klient dostaje tylko pierwszą odpowiedź, a w konsoli serwera jest błąd `ERR_HTTP_HEADERS_SENT`. Jedna trasa, jedna odpowiedź.
- Na macOS port 5000 bywa zajęty przez system (AirPlay). Sprawdzone: odpowiedź 403 zamiast serwera. Na Windowsie tego problemu nie ma, ale 3000 działa wszędzie.

## Powiązane

- [Trasy Expressa: GET, POST, PUT, DELETE](#/karta/web-backend/02-trasy-i-odpowiedzi)
- [SQLite: tabela i zapytania z parametrami](#/karta/web-backend/03-sqlite-tabela-i-zapytania)
- [Projekt Vite z Reactem i Bootstrapem](#/karta/web-frontend/01-projekt-vite-i-bootstrap)
