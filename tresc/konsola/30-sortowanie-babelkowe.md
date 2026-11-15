---
tytul: "Sortowanie bąbelkowe"
dzial: konsola
tagi: [python, algorytm, sortowanie, bąbelkowe, zamiana, flaga]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/simple_stmts.html#assignment-statements
  - https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements
  - Zasady oceniania INF.04 2021 cze (R.2.5, R.2.6)
arkusze: []
---

## Po co to jest

Najprostsze ręczne sortowanie: porównujesz sąsiadów i zamieniasz, jeśli stoją źle. W arkuszach 2021-2026 nie padło z nazwy, ale gdy treść każe „posortować bez gotowych funkcji” i nie narzuca metody, to najkrótszy kod do napisania z głowy.

## Jak to działa

Jedno przejście idzie od lewej: porównuje `liczby[j]` z `liczby[j + 1]` i zamienia, gdy lewy jest większy. Największy element „wypływa” jak bąbelek na koniec. Ślad pierwszego przejścia dla `[5, 3, 8, 1, 4]` (zakreślone = zamienione):

| `j` | porównanie | zamiana? | tablica |
| --- | --- | --- | --- |
| 0 | 5 > 3 | tak | [==3==, ==5==, 8, 1, 4] |
| 1 | 5 > 8 | nie | [3, 5, 8, 1, 4] |
| 2 | 8 > 1 | tak | [3, 5, ==1==, ==8==, 4] |
| 3 | 8 > 4 | tak | [3, 5, 1, ==4==, ==8==] |

Po każdym przejściu koniec tablicy rośnie o jeden gotowy element, więc następne przejście może być o jeden krótsze: `range(n - 1 - i)`. Zakreślone = element, który właśnie trafił na swoje miejsce:

| Przejście `i` | `j` od 0 do | tablica po przejściu | były zamiany? |
| --- | --- | --- | --- |
| 0 | 3 | [3, 5, 1, 4, ==8==] | tak |
| 1 | 2 | [3, 1, 4, ==5==, 8] | tak |
| 2 | 1 | [1, 3, ==4==, 5, 8] | tak |
| 3 | 0 | [1, ==3==, 4, 5, 8] | nie |

Flaga `zamiana`: jeśli całe przejście nic nie zamieniło, tablica jest już posortowana i można przerwać `break`.

## Składnia do zapamiętania

```python
def sortuj_babelkowo(liczby):
    n = len(liczby)
    for i in range(n - 1):
        zamiana = False
        for j in range(n - 1 - i):
            if liczby[j] > liczby[j + 1]:
                liczby[j], liczby[j + 1] = liczby[j + 1], liczby[j]
                zamiana = True
        if not zamiana:
            break
```

## Przykład

```python babelkowe.py {5,7,10,11}
def sortuj_babelkowo(liczby):
    n = len(liczby)
    for i in range(n - 1):
        zamiana = False
        for j in range(n - 1 - i):
            if liczby[j] > liczby[j + 1]:
                liczby[j], liczby[j + 1] = liczby[j + 1], liczby[j]
                zamiana = True
        print(f"Po przejściu {i + 1}: {liczby}")
        if not zamiana:
            break


liczby = [4, 1, 2, 6, 3, 7]
sortuj_babelkowo(liczby)
print("Posortowana:", liczby)
```

```wynik
Po przejściu 1: [1, 2, 4, 3, 6, 7]
Po przejściu 2: [1, 2, 3, 4, 6, 7]
Po przejściu 3: [1, 2, 3, 4, 6, 7]
Posortowana: [1, 2, 3, 4, 6, 7]
```

1. `n - 1 - i`: ostatnie `i` elementów jest już gotowe, a `- 1` pilnuje, żeby `j + 1` nie wyszło poza listę.
2. Zamiana sąsiadów w jednej linii, bez utraty danych.
3. Przejście 3 nic nie zamieniło, więc flaga zostaje `False`.
4. `break` kończy sortowanie po 3 przejściach zamiast 5. `print` w funkcji jest tu tylko po to, żeby zobaczyć ślad.

## Pułapki

- `range(n - i)` zamiast `range(n - 1 - i)` daje `IndexError` na `liczby[j + 1]`.
- `zamiana = False` ustawiaj na początku każdego przejścia, w pętli zewnętrznej. Ustawione raz przed pętlami nigdy nie wraca do `False`.
- Zamiana przez `liczby[j] = liczby[j + 1]` i potem odwrotnie gubi wartość. Użyj bufora albo przypisania krotki (tak oceniano zamianę w R.2.6, 2021 cze).
- Malejąco: zmień tylko znak na `<`. Gdy arkusz narzuca metodę (2021 cze: przez wybieranie), bąbelkowe nie da punktów za algorytm.
- Pętla zewnętrzna `range(n - 1)` to pętla po n-1 elementach, jak chciało R.2.5 w 2021 cze.

## Powiązane

- [Sortowanie przez wybieranie](#/karta/konsola/29-sortowanie-przez-wybieranie)
- [Sortowanie przez wstawianie](#/karta/konsola/31-sortowanie-przez-wstawianie)
- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [Zadanie: sortowanie w klasie](#/karta/konsola/49-zadanie-sortowanie-w-klasie)
