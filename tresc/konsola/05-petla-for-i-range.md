---
tytul: "Pętla for i range()"
dzial: konsola
tagi: [python, for, range, pętla, indeks]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/controlflow.html#for-statements
  - https://docs.python.org/3/library/stdtypes.html#range
  - Zasady oceniania INF.04 2023 cze (R.2.3, R.2.4), 2024 cze (R.2.3) i 2025 sty (R.2.4)
arkusze: [2021 cze, 2023 cze, 2024 cze, 2025 sty]
---

## Po co to jest

Prawie każde zadanie konsolowe to pętla po tablicy: wypełnij, wyświetl, policz, znajdź. `for` z `range()` znaczy „zrób to n razy” albo „przejdź po indeksach 0..n-1”.

## Jak to działa

`range(start, stop, step)` nie tworzy listy. Podaje liczby po kolei: zaczyna od `start`, dodaje `step` i ==kończy, zanim dojdzie do stop==.

| Wywołanie | Kolejne `i` | Obrotów |
| --- | --- | --- |
| `range(5)` | 0 1 2 3 4 | 5 |
| `range(1, 6)` | 1 2 3 4 5 | 5 |
| `range(6, 21, 3)` | 6 9 12 15 18 | 5 |

Ślad pętli `for i in range(1, 5): suma += i`, gdy na starcie `suma = 0`:

| Obrót | `i` | `suma` po obrocie |
| --- | --- | --- |
| 1 | 1 | 1 |
| 2 | 2 | 3 |
| 3 | 3 | 6 |
| 4 | 4 | 10 |

Przy kroku 1 obrotów jest `stop - start`. Dlatego `range(len(liczby))` daje dokładnie wszystkie indeksy listy, od 0 do ostatniego.

## Składnia do zapamiętania

```python
for i in range(n):                 # 0, 1, ..., n-1
    print(i)
for i in range(1, n + 1):          # 1, 2, ..., n
    print(i)
for j in range(2 * i, n + 1, i):   # 2i, 3i, ... <= n (sito)
    sito[j] = False
for i in range(len(liczby)):       # indeksy listy
    liczby[i] = 0
for liczba in liczby:              # same wartości, bez indeksu
    print(liczba)
```

## Przykład

```python petle.py {3,7}
liczby = [7, 2, 9, 4]

for i in range(len(liczby)):
    print(f"{i}: {liczby[i]}")

n = 20
i = 3
for j in range(2 * i, n + 1, i):
    print(j, end=" ")
print()
```

```wynik
0: 7
1: 2
2: 9
3: 4
6 9 12 15 18
```

1. `range(len(liczby))` daje indeksy 0..3, a `f"{i}: {liczby[i]}"` to format „indeks: wartość”.
2. Wielokrotności `i` jak w sicie Eratostenesa (2023 cze): start `2 * i`, krok `i`, stop `n + 1`, żeby `n` też weszło.

## Pułapki

- `range(n)` zaczyna od 0. Dla „od 1 do n” pisz `range(1, n + 1)`, inaczej zgubisz ostatnią liczbę.
- Egzaminator sprawdza w kodzie, czy pętla ma właściwą liczbę obrotów (R.2.3, 2024 cze) i czy jest ograniczona liczbą elementów tablicy (R.2.4, 2025 sty). Liczba wpisana na sztywno zamiast `len(...)` albo pola z rozmiarem to ryzyko.
- `liczba = 0` w pętli `for liczba in liczby` nie zmienia listy. Do zmiany elementu potrzebny jest indeks.
- Wszystko, co ma się powtarzać, musi być wcięte pod `for`. Wcięcia bloków to osobne kryterium (R.1.2).
- `i` jako licznik pętli jest w porządku, ale lista nazwana `x` czy `tablica` może kosztować punkt za nazewnictwo (R.1.4, np. 2024 cze).

## Powiązane

- [Pętla while](#/karta/konsola/06-petla-while)
- [enumerate(): indeks i wartość](#/karta/konsola/07-enumerate)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
