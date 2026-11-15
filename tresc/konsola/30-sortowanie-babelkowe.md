---
tytul: "Sortowanie bąbelkowe"
dzial: konsola
tagi: [python, algorytm, sortowanie, bąbelkowe, zamiana]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#range
  - Zasady oceniania INF.04 2021 cze (R.2.3, R.2.6)
arkusze: []
---

## Po co to jest

Ręczne sortowanie przez porównywanie sąsiadów: jeśli stoją źle, zamieniasz je. W arkuszach 2021-2026 nie padło. Przyda się, gdy treść każe posortować bez gotowych funkcji i nie narzuca metody.

## Jak to działa

Jedno przejście idzie od lewej: porównuje `liczby[j]` z `liczby[j + 1]` i zamienia, gdy lewy jest większy. Największy element „wypływa” jak bąbelek na koniec. Ślad pierwszego przejścia dla `[5, 3, 8, 1, 4]` (zakreślone = zamienione):

| `j` | porównanie | zamiana? | tablica |
| --- | --- | --- | --- |
| 0 | 5 > 3 | tak | [==3==, ==5==, 8, 1, 4] |
| 1 | 5 > 8 | nie | [3, 5, 8, 1, 4] |
| 2 | 8 > 1 | tak | [3, 5, ==1==, ==8==, 4] |
| 3 | 8 > 4 | tak | [3, 5, 1, ==4==, ==8==] |

Po każdym przejściu koniec tablicy rośnie o jeden gotowy element, więc następne przejście może być o jeden krótsze: `range(n - 1 - i)`. Zakreślone = element, który właśnie trafił na swoje miejsce:

| Przejście `i` | `j` od 0 do | tablica po przejściu |
| --- | --- | --- |
| 0 | 3 | [3, 5, 1, 4, ==8==] |
| 1 | 2 | [3, 1, 4, ==5==, 8] |
| 2 | 1 | [1, 3, ==4==, 5, 8] |
| 3 | 0 | [1, ==3==, 4, 5, 8] |

Po `n - 1` przejściach na miejscu jest też pierwszy element, dlatego pętla zewnętrzna to `range(n - 1)`.

## Składnia do zapamiętania

```python
def sortuj_babelkowo(liczby):
    n = len(liczby)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if liczby[j] > liczby[j + 1]:
                bufor = liczby[j]
                liczby[j] = liczby[j + 1]
                liczby[j + 1] = bufor
```

## Przykład

```python babelkowe.py {4,5,6}
def sortuj_babelkowo(liczby):
    n = len(liczby)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if liczby[j] > liczby[j + 1]:
                bufor = liczby[j]
                liczby[j] = liczby[j + 1]
                liczby[j + 1] = bufor


liczby = [5, 3, 8, 1, 4]
print("Przed:", liczby)
sortuj_babelkowo(liczby)
print("Po:   ", liczby)
```

```wynik
Przed: [5, 3, 8, 1, 4]
Po:    [1, 3, 4, 5, 8]
```

1. `n - 1 - i`: ostatnie `i` elementów jest już gotowe, a `- 1` pilnuje, żeby `j + 1` nie wyszło poza listę.
2. Porównanie sąsiadów. Rosnąco: zamiana, gdy lewy jest większy.
3. Bufor odkłada lewy element, a dwie następne linie kończą zamianę bez utraty danych.

## Pułapki

- `range(n - i)` zamiast `range(n - 1 - i)` daje `IndexError` na `liczby[j + 1]`.
- Zamiana przez `liczby[j] = liczby[j + 1]` i potem odwrotnie gubi wartość: oba miejsca mają tę samą liczbę. Zamiana bez utraty danych to R.2.6 (2021 cze).
- Malejąco: zmień tylko znak na `<`.
- Gdy arkusz narzuca metodę (2021 cze: przez wybieranie), bąbelkowe nie da punktu za algorytm (R.2.3).

## Powiązane

- [Sortowanie przez wybieranie](#/karta/konsola/29-sortowanie-przez-wybieranie)
- [Sortowanie przez wstawianie](#/karta/konsola/31-sortowanie-przez-wstawianie)
- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [Zadanie: sortowanie w klasie](#/karta/konsola/49-zadanie-sortowanie-w-klasie)
