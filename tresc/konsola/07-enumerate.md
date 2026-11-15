---
tytul: "enumerate(): indeks i wartość"
dzial: konsola
tagi: [python, enumerate, for, indeks, pętla]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#enumerate
  - https://docs.python.org/3/tutorial/datastructures.html#looping-techniques
  - Zasady oceniania INF.04 2025 sty (R.2.4, R.2.5, R.2.7)
arkusze: [2024 cze, 2025 sty, 2025 cze]
---

## Po co to jest

Wzory wyniku z arkuszy łączą numer z wartością: „Kostka 1: 5” (2024 cze), „<indeks>: <wartość>” (2025 sty), „Losowanie 1: ...” (2025 cze). `enumerate()` daje w pętli ==naraz indeks i wartość==, bez `liczby[i]`.

## Jak to działa

`enumerate(lista, start=0)` przy każdym obrocie podaje parę `(licznik, element)`. Licznik zaczyna od `start` i rośnie o 1. `for i, wartosc in ...` rozpakowuje parę na dwie zmienne.

Ślad dla `oczka = [5, 2, 6]`:

| Obrót | Para z `enumerate(oczka)` | `i` | `wartosc` | Para z `start=1` |
| --- | --- | --- | --- | --- |
| 1 | `(0, 5)` | 0 | 5 | `(1, 5)` |
| 2 | `(1, 2)` | 1 | 2 | `(2, 2)` |
| 3 | `(2, 6)` | 2 | 6 | `(3, 6)` |

==`start=1` przesuwa tylko licznik==. Elementy listy dalej mają indeksy 0, 1, 2.

Trzy sposoby przejścia po liście:

| Pętla | Masz | Kiedy |
| --- | --- | --- |
| `for wartosc in oczka` | wartość | sumowanie, wypisywanie |
| `for i in range(len(oczka))` | indeks, wartość przez `oczka[i]` | sortowanie, zamiana, pętla po polu z rozmiarem |
| `for i, wartosc in enumerate(oczka)` | jedno i drugie | numerowany wynik, szukanie indeksu |

Do ==zmiany elementu== potrzebny jest indeks: `oczka[i] = 0`. Przypisanie `wartosc = 0` zmienia tylko zmienną pętli, nie listę.

## Składnia do zapamiętania

```python
for i, wartosc in enumerate(liczby):
    print(f"{i}: {wartosc}")
for numer, oczko in enumerate(oczka, start=1):
    print(f"Kostka {numer}: {oczko}")
for i, wartosc in enumerate(liczby):
    if wartosc == szukana:
        indeks = i
        break
```

## Przykład

```python numeruj.py {3,6,8}
oczka = [5, 2, 6, 2]

for numer, oczko in enumerate(oczka, start=1):
    print(f"Kostka {numer}: {oczko}")

for i, oczko in enumerate(oczka):
    if oczko == 2:
        oczka[i] = 0
print("Po zmianie:", oczka)
```

```wynik
$ python numeruj.py
Kostka 1: 5
Kostka 2: 2
Kostka 3: 6
Kostka 4: 2
Po zmianie: [5, 0, 6, 0]
```

1. `start=1` daje numery 1..4 do wzoru „Kostka 1: 5”, a lista zostaje bez zmian.
2. Bez `start` licznik to prawdziwy indeks od 0.
3. Zmiana przez `oczka[i]`, bo `oczko = 0` nie zapisałoby się w liście.

## Pułapki

- Z `start=1` nie używaj licznika jako indeksu: `oczka[numer]` bierze następny element, a przy ostatnim rzuca `IndexError`.
- „<indeks>: <wartość>” w 2025 sty to indeks tablicy, więc od 0, bez `start=1` (R.2.7).
- Kolejność w parze jest stała: najpierw licznik, potem wartość. `for wartosc, i in ...` zamienia je miejscami.
- W klasie z polem rozmiaru (2025 sty) przynajmniej jedna pętla ma być ograniczona liczbą elementów (R.2.4). Pewniej napisać tam `range(self.__rozmiar)`.
- Szukając pierwszego wystąpienia, przerwij pętlę `break` albo `return` zaraz po trafieniu (R.2.5, 2025 sty).

## Powiązane

- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [f-stringi i print()](#/karta/konsola/03-f-stringi)
- [Wyszukiwanie liniowe z -1](#/karta/konsola/26-wyszukiwanie-liniowe)
