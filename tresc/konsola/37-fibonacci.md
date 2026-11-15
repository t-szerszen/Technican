---
tytul: "Ciąg Fibonacciego"
dzial: konsola
tagi: [python, Fibonacci, przypisanie wielokrotne, lista]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3.12/tutorial/introduction.html#first-steps-towards-programming
  - https://docs.python.org/3.12/tutorial/controlflow.html#defining-functions
arkusze: []
---

## Po co to jest

Ciąg Fibonacciego to klasyk „następna wartość z dwóch poprzednich”. W arkuszach 2021-2026 go nie było. Uczy jednak przypisania `a, b = b, a + b` i tego, że ==kolejność przypisań ma znaczenie==.

## Jak to działa

F(0) = 0, F(1) = 1, a każdy następny to suma dwóch poprzednich: 0 1 1 2 3 5 8 13 21 ...

`a, b = b, a + b` działa w dwóch krokach. Najpierw Python liczy ==całą prawą stronę na starych wartościach==, dopiero potem przypisuje do `a` i `b`.

Ślad pętli dla n = 7, na starcie `a, b = 0, 1`:

| Obrót | `a` | `b` | Dopisane | Prawa strona `(b, a + b)` | `a, b` po |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 1 | 0 | (1, 0 + 1) = (1, 1) | 1, 1 |
| 2 | 1 | 1 | 1 | (1, 1 + 1) = (1, 2) | 1, 2 |
| 3 | 1 | 2 | 1 | (2, 1 + 2) = (2, 3) | 2, 3 |
| 4 | 2 | 3 | 2 | (3, 2 + 3) = (3, 5) | 3, 5 |
| 5 | 3 | 5 | 3 | (5, 3 + 5) = (5, 8) | 5, 8 |
| 6 | 5 | 8 | 5 | (8, 5 + 8) = (8, 13) | 8, 13 |
| 7 | 8 | 13 | 8 | (13, 8 + 13) = (13, 21) | 13, 21 |

Lista: `[0, 1, 1, 2, 3, 5, 8]`.

Dwie osobne linie `a = b` i `b = a + b` dają zły wynik. Druga linia widzi już nowe `a`:

| Obrót | Dopisane | `a = b` | `b = a + b` |
| --- | --- | --- | --- |
| 1 | 0 | 1 | 1 + 1 = 2 |
| 2 | 1 | 2 | 2 + 2 = 4 |
| 3 | 2 | 4 | 4 + 4 = 8 |

Zamiast Fibonacciego wychodzą potęgi dwójki. Bez przypisania wielokrotnego potrzebna jest zmienna pomocnicza: `nowy = a + b`, `a = b`, `b = nowy`.

## Składnia do zapamiętania

```python
wyrazy = []
a, b = 0, 1
for i in range(n):
    wyrazy.append(a)
    a, b = b, a + b          # prawa strona liczona najpierw

nowy = a + b                 # to samo z pomocniczą zmienną
a = b
b = nowy
```

## Przykład

```python fibonacci.py {3,5,6}
def ciag_fibonacciego(n):
    wyrazy = []
    a, b = 0, 1
    for i in range(n):
        wyrazy.append(a)
        a, b = b, a + b
    return wyrazy

n = int(input("Ile wyrazów ciągu wyświetlić? "))
wyrazy = ciag_fibonacciego(n)
print(f"Pierwsze {n} wyrazów:", wyrazy)
```

```wynik
Ile wyrazów ciągu wyświetlić? [[10]]
Pierwsze 10 wyrazów: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

1. Dwa pierwsze wyrazy ustawione jednym przypisaniem.
2. Dopisujemy bieżące `a`, zanim się zmieni. Dzięki temu lista zaczyna się od 0.
3. Przesunięcie o jeden wyraz: nowe `a` to stare `b`, nowe `b` to suma starych.

## Pułapki

- `a = b` i `b = a + b` w osobnych liniach psują ciąg (tabela wyżej). Albo jedna linia `a, b = b, a + b`, albo zmienna pomocnicza.
- Sprawdź, od czego zaczyna treść: od 0, 1 czy od 1, 1. Jeden wyraz przesunięcia to inny wynik.
- `wyrazy.append(b)` zamiast `a` gubi początkowe 0.
- Wzór F(n) = F(n - 1) + F(n - 2) da się zapisać rekurencyjnie jak silnię, ale wtedy te same wyrazy liczą się wiele razy. Pętla jest prostsza i szybka.

## Powiązane

- [Silnia iteracyjnie i rekurencyjnie](#/karta/konsola/36-silnia)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
