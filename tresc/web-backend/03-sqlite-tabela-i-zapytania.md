---
tytul: "SQLite: tabela i zapytania z parametrami"
dzial: web-backend
tagi: [sqlite, node:sqlite, DatabaseSync, CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, prepare, run, all, get, "?", lastInsertRowid]
status: do-weryfikacji
zrodla:
  - https://nodejs.org/api/sqlite.html
  - https://www.sqlite.org/lang_createtable.html
  - https://www.sqlite.org/autoinc.html
  - https://www.sqlite.org/lang_delete.html
  - Przykład uruchomiony w Node 26.0 (moduł node:sqlite, bez instalacji); sklejanie zapytania, UPDATE bez WHERE i ponowne nadanie id sprawdzone osobno
  - W arkuszach INF.04 z lat 2021-2026 nie było zadania z bazą danych
arkusze: []
---

## Po co to jest

Dane w tablicy w pamięci znikają po restarcie serwera. Baza SQLite trzyma je w jednym pliku (`galeria.db`). Sterownik `node:sqlite` jest wbudowany w Node od wersji 22.13 bez żadnej flagi, więc ==nie trzeba nic instalować==, co ma znaczenie na komputerze bez internetu. Dokumentacja Node oznacza go jako „release candidate”, czyli jeszcze nie w pełni stabilny.

## Jak to działa

```tekst Od zapytania do wyniku
new DatabaseSync('galeria.db')   otwiera plik
  (nie ma pliku? tworzy pusty)
        ↓
db.exec(`CREATE TABLE ...`)      SQL bez wyniku
        ↓
db.prepare('SQL z ?')            zapytanie gotowe
        ↓
.run(...)  zmiana: INSERT, UPDATE, DELETE
.all(...)  wszystkie wiersze: tablica obiektów
.get(...)  pierwszy wiersz albo undefined
```

`?` w zapytaniu to miejsce na wartość. Wartości podajesz w `run`, `all` albo `get`, w tej samej kolejności co znaki `?`. Sterownik wstawia je bezpiecznie, także tekst z apostrofem.

`run` zwraca obiekt z dwoma polami: `lastInsertRowid` to `id` nowego wiersza po `INSERT`, a `changes` to liczba zmienionych wierszy po `UPDATE` i `DELETE`.

Kolumna `id INTEGER PRIMARY KEY` sama dostaje numer, zwykle o jeden większy niż największy obecny. Sprawdzone: po usunięciu wiersza 2 i ponownym uruchomieniu nowy wiersz znowu dostał 2. `AUTOINCREMENT` nie jest potrzebny, dokumentacja SQLite odradza go, jeśli nie jest konieczny.

`CREATE TABLE IF NOT EXISTS` tworzy tabelę tylko przy pierwszym uruchomieniu. Przy kolejnych nic nie robi i nie zgłasza błędu.

## Składnia do zapamiętania

```js
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('galeria.db');
db.exec('CREATE TABLE IF NOT EXISTS zdjecia (id INTEGER PRIMARY KEY, alt TEXT, pobrania INTEGER DEFAULT 0)');

db.prepare('INSERT INTO zdjecia (alt) VALUES (?)').run('Mak');
const lista = db.prepare('SELECT * FROM zdjecia').all();
const jedno = db.prepare('SELECT * FROM zdjecia WHERE id = ?').get(1);
db.prepare('UPDATE zdjecia SET pobrania = pobrania + 1 WHERE id = ?').run(1);
db.prepare('DELETE FROM zdjecia WHERE id = ?').run(1);
```

## Przykład

```js baza.js {1,3,6,7,14,16,19,24,27,30}
const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('galeria.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS zdjecia (
    id INTEGER PRIMARY KEY,
    alt TEXT NOT NULL,
    kategoria INTEGER NOT NULL,
    pobrania INTEGER DEFAULT 0
  )
`);

const dodaj = db.prepare('INSERT INTO zdjecia (alt, kategoria, pobrania) VALUES (?, ?, ?)');
const wynik = dodaj.run('Mak', 1, 35);
console.log('Dodano id:', wynik.lastInsertRowid);
dodaj.run('Audi', 3, 11);

const wszystkie = db.prepare('SELECT * FROM zdjecia').all();
for (const z of wszystkie) {
  console.log(z.id, z.alt, z.kategoria, z.pobrania);
}

const jedno = db.prepare('SELECT * FROM zdjecia WHERE id = ?').get(2);
console.log('Jedno:', jedno.alt);

const zmiana = db.prepare('UPDATE zdjecia SET pobrania = pobrania + 1 WHERE id = ?').run(1);
console.log('Zmienione wiersze:', zmiana.changes);

const usuniecie = db.prepare('DELETE FROM zdjecia WHERE id = ?').run(2);
console.log('Usunięte wiersze:', usuniecie.changes);

for (const z of db.prepare('SELECT * FROM zdjecia').all()) {
  console.log(z.id, z.alt, z.kategoria, z.pobrania);
}
```

1. Wbudowany moduł Node. Nic nie instalujesz.
2. Plik bazy. Ścieżka bez katalogu liczy się od folderu, w którym uruchamiasz `node`. Przy pierwszym uruchomieniu powstaje pusty.
3. Tabela tylko wtedy, gdy jej jeszcze nie ma.
4. Numer wiersza nadawany automatycznie.
5. Trzy `?` i trzy wartości w `run`, w tej samej kolejności.
6. `id` nowego wiersza.
7. Wszystkie wiersze jako tablica obiektów.
8. Jeden wiersz albo `undefined`, gdy go nie ma.
9. Zwiększenie licznika w samym SQL, bez odczytu wcześniej.
10. Usunięcie jednego wiersza. Bez `WHERE` usunęłoby wszystkie.

```wynik
$ node baza.js
Dodano id: 1
1 Mak 1 35
2 Audi 3 11
Jedno: Audi
Zmienione wiersze: 1
Usunięte wiersze: 1
1 Mak 1 36
```

## Pułapki

- Zapytanie sklejane z tekstem (`"... WHERE alt = '" + alt + "'"`) wysypuje się przy apostrofie w danych. Sprawdzone: dla `Ola's` błąd `near "s": syntax error`. Zawsze `?`.
- `UPDATE` albo `DELETE` bez `WHERE` dotyczy wszystkich wierszy. Sprawdzone: `UPDATE z SET pobrania = 0` zmienił 3 z 3.
- `CREATE TABLE` bez `IF NOT EXISTS`: drugie uruchomienie programu kończy się błędem, bo tabela już istnieje.
- `.get(...)` dla nieistniejącego `id` zwraca `undefined`. Sprawdź to przed odczytem pola, inaczej `undefined.alt` wysypie serwer.
- `DatabaseSync` wymaga Node 22.13 lub nowszego. Sprawdź wersję na stanowisku (`node -v`). W nowszych wersjach dokumentacja podaje nazwę `Database`, a `DatabaseSync` zostaje jako przestarzały alias. W Node 26.0 była dostępna tylko `DatabaseSync`.
- `[Object: null prototype]` w `console.log` wyniku `all()` to normalne. Pola czytasz jak zwykle: `z.alt`.

## Powiązane

- [API z bazą: Express i SQLite razem](#/karta/web-backend/04-api-z-baza)
- [Trasy Expressa: GET, POST, PUT, DELETE](#/karta/web-backend/02-trasy-i-odpowiedzi)
