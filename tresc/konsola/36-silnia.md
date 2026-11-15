---
tytul: "Silnia iteracyjnie i rekurencyjnie"
dzial: konsola
tagi: [python, silnia, rekurencja, pętla, RecursionError]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3.12/tutorial/controlflow.html#defining-functions
  - https://docs.python.org/3.12/library/exceptions.html#RecursionError
arkusze: []
---

## Po co to jest

Silnia to najprostszy przykład, na którym widać różnicę między pętlą a rekurencją. W arkuszach 2021-2026 jej nie było, ale schemat „mnożę w pętli od 1” i „funkcja wywołuje samą siebie z warunkiem stopu” przydaje się wszędzie.

## Jak to działa

`n! = 1 · 2 · 3 · ... · n`, a ==0! = 1==. Iloczyn zaczyna się od 1, nie od 0, bo mnożenie przez 0 zeruje wszystko.

Ślad pętli dla n = 5, na starcie `wynik = 1`:

| `i` | `wynik = wynik * i` |
| --- | --- |
| 2 | 2 |
| 3 | 6 |
| 4 | 24 |
| 5 | 120 |

Dla n = 0 i n = 1 `range(2, n + 1)` jest pusty, pętla nie rusza i zostaje 1.

Rekurencja: `silnia(n) = n * silnia(n - 1)`, aż do warunku stopu `n <= 1`. Ślad `silnia(4)`. Najpierw wywołania idą w głąb, każde czeka na wynik następnego. Potem wyniki wracają od dołu:

| Poziom | Wywołanie | `n <= 1`? | Czeka na | Zwraca (od dołu) |
| --- | --- | --- | --- | --- |
| 1 | `silnia(4)` | nie | `4 * silnia(3)` | 4 · 6 = 24 |
| 2 | `silnia(3)` | nie | `3 * silnia(2)` | 3 · 2 = 6 |
| 3 | `silnia(2)` | nie | `2 * silnia(1)` | 2 · 1 = 2 |
| 4 | `silnia(1)` | tak, stop | nic | 1 |

Każdy poziom ma osobną kopię zmiennej `n`. Python trzyma je, dopóki wynik nie wróci.

## Składnia do zapamiętania

```python
def silnia_iteracyjnie(n):
    wynik = 1
    for i in range(2, n + 1):
        wynik = wynik * i
    return wynik

def silnia_rekurencyjnie(n):
    if n <= 1:                         # warunek stopu
        return 1
    return n * silnia_rekurencyjnie(n - 1)
```

## Przykład

```python silnia.py {2,3,8,10}
def silnia_iteracyjnie(n):
    wynik = 1
    for i in range(2, n + 1):
        wynik = wynik * i
    return wynik

def silnia_rekurencyjnie(n):
    if n <= 1:
        return 1
    return n * silnia_rekurencyjnie(n - 1)

n = int(input("Podaj liczbę naturalną n: "))
print(f"{n}! iteracyjnie = {silnia_iteracyjnie(n)}")
print(f"{n}! rekurencyjnie = {silnia_rekurencyjnie(n)}")
print(f"0! = {silnia_iteracyjnie(0)}")
```

```wynik
Podaj liczbę naturalną n: [[5]]
5! iteracyjnie = 120
5! rekurencyjnie = 120
0! = 1
```

1. Start od 1, bo 1 nie zmienia iloczynu.
2. Mnożymy przez 2, 3, ..., n. `n + 1`, bo `range()` nie dochodzi do stop.
3. Warunek stopu: dla 0 i 1 zwracamy 1 bez dalszych wywołań.
4. Wywołanie z mniejszym n. Każde przybliża do warunku stopu.

## Pułapki

- Brak warunku stopu: `n` spada do -1, -2, ... aż Python przerwie program błędem `RecursionError: maximum recursion depth exceeded`.
- `wynik = 0` na starcie daje zawsze 0.
- Dla ujemnych `n <= 1` zwraca 1, a silnia ujemnej liczby nie istnieje. Sprawdź `n >= 0` w programie głównym.

## Powiązane

- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [Ciąg Fibonacciego](#/karta/konsola/37-fibonacci)
