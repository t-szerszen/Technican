---
tytul: "sum, len, min, max, sorted, reversed, zip"
dzial: konsola
tagi: [python, sum, len, min, max, sorted, sort, reversed, zip, funkcje wbudowane]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#sorted
  - https://docs.python.org/3/library/functions.html#max
  - https://docs.python.org/3/library/functions.html#reversed
  - https://docs.python.org/3/library/functions.html#zip
  - https://docs.python.org/3/library/stdtypes.html#list.sort
  - Zasady oceniania INF.04 2021 cze (R.2.2, R.2.3) i 2025 sty (R.2.5, R.2.10)
arkusze: [2021 cze, 2025 sty]
---

## Po co to jest

Gotowe funkcje skracają sprawdzanie wyników i program główny: suma, średnia, największa wartość. Na egzaminie bywają jednak ==zakazane==: w 2021 cze sortowanie i szukanie maksimum miały być napisane bez gotowych funkcji. Wtedy idź do karty o ręcznym liczeniu.

## Jak to działa

Każda funkcja dostaje listę i coś zwraca. Ważne, ==czy zwraca nową rzecz, czy zmienia listę==. Dla `oceny = [4, 2, 5, 3, 5]`:

| Wywołanie | Zwraca | Lista `oceny` po wywołaniu |
| --- | --- | --- |
| `sum(oceny)` | `19` | bez zmian |
| `len(oceny)` | `5` | bez zmian |
| `min(oceny)`, `max(oceny)` | `2`, `5` | bez zmian |
| `sorted(oceny)` | nowa lista `[2, 3, 4, 5, 5]` | bez zmian |
| `sorted(oceny, reverse=True)` | nowa lista `[5, 5, 4, 3, 2]` | bez zmian |
| `oceny.sort()` | `None` | `[2, 3, 4, 5, 5]` |
| `reversed(oceny)` | iterator (jednorazowy) | bez zmian |
| `zip(imiona, oceny)` | iterator par | bez zmian |

`zip` paruje elementy o tym samym indeksie: `("Ola", 4)`, `("Jan", 2)` i tak dalej. Kończy na krótszej liście. `key=len` każe porównywać nie same napisy, tylko ich długości. Przy remisie `max` i `min` oddają pierwszy z równych.

## Składnia do zapamiętania

```python
suma = sum(oceny)
srednia = sum(oceny) / len(oceny)
najwieksza = max(oceny)
indeks = oceny.index(max(oceny))
rosnaco = sorted(oceny)
malejaco = sorted(oceny, reverse=True)
oceny.sort()
od_konca = list(reversed(oceny))
for imie, ocena in zip(imiona, oceny):
    print(f"{imie}: {ocena}")
```

## Przykład

```python wbudowane.py {5,8,10,12,14}
oceny = [4, 2, 5, 3, 5]
imiona = ["Ola", "Jan", "Ewa", "Piotr", "Zosia"]

print("Suma:", sum(oceny), "ile:", len(oceny))
print("Średnia:", sum(oceny) / len(oceny))
print("Min:", min(oceny), "max:", max(oceny))
print("Indeks max:", oceny.index(max(oceny)))
for imie, ocena in zip(imiona, oceny):
    print(f"{imie}: {ocena}")
malejaco = sorted(oceny, reverse=True)
print("sorted:", malejaco, "oryginał:", oceny)
wynik = oceny.sort()
print("sort:", oceny, "zwraca:", wynik)
print("Od końca:", list(reversed(imiona)))
print("Najdłuższe imię:", max(imiona, key=len))
```

```wynik
$ python wbudowane.py
Suma: 19 ile: 5
Średnia: 3.8
Min: 2 max: 5
Indeks max: 2
Ola: 4
Jan: 2
Ewa: 5
Piotr: 3
Zosia: 5
sorted: [5, 5, 4, 3, 2] oryginał: [4, 2, 5, 3, 5]
sort: [2, 3, 4, 5, 5] zwraca: None
Od końca: ['Zosia', 'Piotr', 'Ewa', 'Jan', 'Ola']
Najdłuższe imię: Piotr
```

1. Średnia to suma przez liczbę elementów; `/` zawsze daje `float`.
2. `zip` rozpakowuje każdą parę od razu do `imie` i `ocena`.
3. `sorted` oddaje nową listę, oryginał zostaje.
4. `sort()` sortuje w miejscu i zwraca `None`.
5. `reversed` daje iterator, więc do wypisania owijasz go w `list()`.

## Pułapki

- Gdy treść zabrania gotowych funkcji do sortowania i szukania maksimum (2021 cze), `sorted`, `sort` i `max` odbierają punkty za algorytm. Pisz pętlę ręcznie.
- `oceny = oceny.sort()` zostawia `None` zamiast listy.
- `print(reversed(oceny))` wypisuje `<list_reverseiterator object ...>`. Iterator zużywa się po jednym przejściu: drugi `list()` da `[]`.
- `max([])` i `min([])` rzucają `ValueError`. Sprawdź najpierw, czy lista nie jest pusta.
- `sum(oceny) / len(oceny)` to dokładnie wzór suma / rozmiar z 2025 sty (R.2.10). W klasie dziel przez pole z liczbą elementów.
- Wbudowane wyszukiwanie (`index`, `in`) jest dopuszczone w 2025 sty (R.2.5), ale `index` rzuca `ValueError`, gdy elementu nie ma.

## Powiązane

- [Ręcznie: min, max, suma, liczenie](#/karta/konsola/25-reczne-min-max-suma)
- [Sortowanie przez wybieranie](#/karta/konsola/29-sortowanie-przez-wybieranie)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
