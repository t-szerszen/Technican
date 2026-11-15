---
tytul: "Pętla for i range()"
dzial: konsola
tagi: [python, for, range, while, pętla]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#range
  - https://docs.python.org/3/tutorial/controlflow.html#for-statements
arkusze:
  - inf04-2023-styczen
  - inf04-2023-czerwiec
  - inf04-2025-czerwiec
---

Pętla `for` przechodzi po kolejnych elementach. Gdy wiesz, ile razy coś powtórzyć, łączysz ją z `range()`. Gdy czekasz na warunek, bierzesz `while`.

## range(start, stop, step)

Zwraca kolejne liczby całkowite. Zapamiętaj: ==stop nie wchodzi do zakresu==.

| Wywołanie | Daje |
| --- | --- |
| `range(5)` | 0 1 2 3 4 |
| `range(2, 5)` | 2 3 4 |
| `range(0, 10, 3)` | 0 3 6 9 |
| `range(5, 0, -1)` | 5 4 3 2 1 |

```python petle.py {1,2,4}
for i in range(1, 6):
    print(i, end=" ")
print()
for i in range(10, 0, -3):
    print(i, end=" ")
```

```wynik
1 2 3 4 5
10 7 4 1
```

1. `range(1, 6)` daje 1–5. Szóstki już nie ma.
2. `end=" "` wypisuje spację zamiast nowej linii, więc liczby lądują w jednym wierszu.
3. Krok `-3` liczy w dół: 10, 7, 4, 1.

> [!blad]
> `range(n)` zaczyna od 0. Dla „od 1 do n” pisz `range(1, n + 1)`.

## Indeks i wartość

Po liście chodzisz wprost po elementach. Gdy potrzebny jest też indeks, użyj `enumerate()`, a do zmiany elementów `range(len(...))`.

```python lista.py {3,6}
liczby = [4, 8, 15]

for i, x in enumerate(liczby):
    print(i, x)

for i in range(len(liczby)):
    liczby[i] *= 2
print(liczby)
```

```wynik
0 4
1 8
2 15
[8, 16, 30]
```

1. `enumerate()` daje pary: indeks i wartość.
2. Element listy zmienisz tylko przez indeks. Samo `x *= 2` w pętli listy nie ruszy.

## while

Powtarza, dopóki warunek jest prawdziwy. Tak liczy się NWD algorytmem Euklidesa.

```python nwd.py {2,3}
a, b = 48, 18
while b != 0:
    a, b = b, a % b
print(a)
```

```wynik
6
```

1. Warunek jest sprawdzany przed każdym obrotem. Gdy `b` dojdzie do 0, pętla się kończy.
2. Obie nowe wartości liczą się ze starych `a` i `b`, więc nie trzeba zmiennej pomocniczej.

> [!egzamin]
> Sprawdź pętlę na brzegach: dla 0, 1 i największej wartości z treści zadania. Najczęściej ginie ostatni element.
