---
tytul: "sum, len, min, max, count, index, sorted"
dzial: konsola
tagi: [python, sum, len, min, max, sorted, sort, count, index, funkcje wbudowane]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#sum
  - https://docs.python.org/3/library/functions.html#sorted
  - https://docs.python.org/3/library/stdtypes.html#list.sort
  - https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
  - Arkusz INF.04 2021 cze (założenia: bez gotowych funkcji sortowania i szukania maksimum)
  - Zasady oceniania INF.04 2021 cze (R.2.1-R.2.3), 2025 sty (R.2.5, R.2.10)
arkusze: [2021 cze, 2024 cze, 2025 sty]
---

## Po co to jest

Gotowe funkcje skracają średnią (2025 sty), liczenie powtórzeń oczek (2024 cze) i wyszukiwanie (2025 sty). Bywają jednak ==zakazane==, jak sortowanie i maksimum w 2021 cze. Wtedy piszesz pętlę z karty o ręcznym liczeniu.

## Jak to działa

Ważne, ==czy funkcja zwraca nową rzecz, czy zmienia listę==. Dla `oceny = [4, 2, 5, 3, 5]`:

| Wywołanie | Zwraca | `oceny` po wywołaniu |
| --- | --- | --- |
| `sum(oceny)`, `len(oceny)` | `19`, `5` | bez zmian |
| `min(oceny)`, `max(oceny)` | `2`, `5` | bez zmian |
| `oceny.count(5)` | `2`, tyle razy jest 5 | bez zmian |
| `5 in oceny` | `True` | bez zmian |
| `oceny.index(5)` | `2`, pierwsze wystąpienie | bez zmian |
| `sorted(oceny, reverse=True)` | nowa lista `[5, 5, 4, 3, 2]` | bez zmian |
| `oceny.sort()` | `None` | `[2, 3, 4, 5, 5]` |

Kiedy wolno ich użyć:

| Arkusz | Co | Wolno? |
| --- | --- | --- |
| 2021 cze | `sorted`, `sort`, `max` | nie, treść zadania zabrania |
| 2025 sty | `index`, `in` do wyszukiwania | tak, R.2.5 dopuszcza wbudowaną metodę |
| 2025 sty | `sum(...) / len(...)` | tak, R.2.10 chce suma / rozmiar |
| 2024 cze | `count` do punktów | treść tego nie zabrania |

## Składnia do zapamiętania

```python
suma = sum(oceny)
srednia = sum(oceny) / len(oceny)
ile_piatek = oceny.count(5)
if szukana in oceny:
    indeks = oceny.index(szukana)
else:
    indeks = -1
malejaco = sorted(oceny, reverse=True)
oceny.sort()
```

## Przykład

```python wbudowane.py {4,6,9,11,13}
oceny = [4, 2, 5, 3, 5]

print("Suma:", sum(oceny), "| ile:", len(oceny))
print("Średnia:", sum(oceny) / len(oceny))
print("Min:", min(oceny), "| max:", max(oceny))
print("Ile piątek:", oceny.count(5))
szukana = 5
if szukana in oceny:
    print("Pierwsza piątka pod indeksem", oceny.index(szukana))

malejaco = sorted(oceny, reverse=True)
print("sorted:", malejaco, "| oryginał:", oceny)
wynik = oceny.sort()
print("sort:", oceny, "| zwraca:", wynik)
```

```wynik
$ python wbudowane.py
Suma: 19 | ile: 5
Średnia: 3.8
Min: 2 | max: 5
Ile piątek: 2
Pierwsza piątka pod indeksem 2
sorted: [5, 5, 4, 3, 2] | oryginał: [4, 2, 5, 3, 5]
sort: [2, 3, 4, 5, 5] | zwraca: None
```

1. Średnia to suma przez liczbę elementów; `/` zawsze daje `float`.
2. `count` liczy, ile razy wartość jest w liście.
3. `index` wołasz dopiero po sprawdzeniu `in`, bo przy braku elementu rzuca `ValueError`. W 2025 sty metoda zwracała wtedy -1.
4. `sorted` oddaje nową listę, oryginał zostaje.
5. `sort()` sortuje w miejscu i zwraca `None`.

## Pułapki

- 2021 cze: treść zabrania gotowych funkcji sortowania i szukania maksimum, a zasady sprawdzają w kodzie metodę szukającą i algorytm przez wybieranie (R.2.1-R.2.3). `max`, `sorted` czy `sort` łamią treść i nie pokazują algorytmu. Pisz pętlę.
- `oceny = oceny.sort()` zostawia `None` zamiast listy.
- W klasie z 2025 sty dziel przez pole z liczbą elementów: `sum(self.__liczby) / self.__rozmiar` (R.2.10).

## Powiązane

- [Ręcznie: min, max, suma, liczenie](#/karta/konsola/25-reczne-min-max-suma)
- [Sortowanie przez wybieranie](#/karta/konsola/29-sortowanie-przez-wybieranie)
- [Palindrom i odwracanie napisu](#/karta/konsola/38-palindrom-i-odwracanie)
