---
tytul: "enumerate(): indeks i wartość"
dzial: konsola
tagi: [python, enumerate, for, indeks, pętla]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#enumerate
  - https://docs.python.org/3/tutorial/datastructures.html#looping-techniques
  - Zasady oceniania INF.04 2025 sty (R.2.4, R.2.7)
arkusze: [2024 cze, 2025 sty, 2025 cze]
---

## Po co to jest

Wzory wyniku z arkuszy łączą numer z wartością: „Kostka <numer-kostki>: <liczba-oczek>” (2024 cze), „<index_tablicy>: <wartość>” (2025 sty), „Losowanie 1: ...” (2025 cze). `enumerate()` daje w pętli ==naraz indeks i wartość==, bez `liczby[i]`. To skrót: wszystko da się też napisać przez `range(len(...))`.

## Jak to działa

`enumerate(lista, start=0)` przy każdym obrocie podaje parę `(licznik, element)`. Licznik zaczyna od `start` i rośnie o 1. `for i, wartosc in ...` rozpakowuje parę na dwie zmienne.

Ślad dla `oczka = [5, 2, 6]`:

| Obrót | Para z `enumerate(oczka)` | `i` | `wartosc` | Para z `start=1` |
| --- | --- | --- | --- | --- |
| 1 | `(0, 5)` | 0 | 5 | `(1, 5)` |
| 2 | `(1, 2)` | 1 | 2 | `(2, 2)` |
| 3 | `(2, 6)` | 2 | 6 | `(3, 6)` |

==`start=1` przesuwa tylko licznik==. Elementy listy dalej mają indeksy 0, 1, 2.

## Składnia do zapamiętania

```python
for i, wartosc in enumerate(liczby):             # i od 0
    print(f"{i}: {wartosc}")
for numer, oczko in enumerate(oczka, start=1):   # numer od 1
    print(f"Kostka {numer}: {oczko}")
```

## Przykład

```python numeruj.py {3,6}
oczka = [5, 2, 6]

for numer, oczko in enumerate(oczka, start=1):
    print(f"Kostka {numer}: {oczko}")

for i, oczko in enumerate(oczka):
    print(f"{i}: {oczko}")
```

```wynik
$ python numeruj.py
Kostka 1: 5
Kostka 2: 2
Kostka 3: 6
0: 5
1: 2
2: 6
```

1. `start=1` daje numery 1..3 do wzoru „Kostka 1: 5”, a lista zostaje bez zmian.
2. Bez `start` licznik to prawdziwy indeks od 0, jak we wzorze „<index_tablicy>: <wartość>”.

## Pułapki

- Z `start=1` nie używaj licznika jako indeksu: `oczka[numer]` bierze następny element, a przy ostatnim rzuca `IndexError`.
- „<index_tablicy>: <wartość>” w 2025 sty to indeks tablicy, więc od 0, bez `start=1` (R.2.7).
- Kolejność w parze jest stała: najpierw licznik, potem wartość. `for wartosc, i in ...` zamienia je miejscami.
- W klasie z polem rozmiaru (2025 sty) przynajmniej jedna pętla ma być ograniczona liczbą elementów (R.2.4). `enumerate(self.__liczby)` idzie po całej liście, więc tam pewniej `range(self.__rozmiar)`.

## Powiązane

- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [f-stringi i print()](#/karta/konsola/03-f-stringi)
- [Wyszukiwanie liniowe z -1](#/karta/konsola/26-wyszukiwanie-liniowe)
