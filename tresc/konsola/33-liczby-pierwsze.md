---
tytul: "Liczby pierwsze"
dzial: konsola
tagi: [python, liczby pierwsze, dzielniki, pierwiastek, isqrt, bool]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3.12/library/math.html#math.isqrt
  - https://docs.python.org/3.12/library/math.html#math.sqrt
  - https://docs.python.org/3/library/functions.html#int
  - Zasady oceniania INF.04 2024 sty (R.2.1, R.2.3) — funkcja sprawdzająca typu logicznego
arkusze: []
---

## Po co to jest

Sprawdzenie „czy n jest pierwsza” to typowa funkcja zwracająca `True` albo `False`. Przydaje się, gdy trzeba ocenić jedną liczbę. Gdy trzeba wypisać wszystkie pierwsze do 100, szybsze jest sito.

## Jak to działa

Liczba pierwsza to liczba naturalna większa od 1, która ma ==dokładnie dwa dzielniki==: 1 i samą siebie. 0 i 1 nie są pierwsze. 2 to jedyna parzysta pierwsza.

Dzielniki chodzą parami: jeśli `d * e = n`, to jeden z nich jest ≤ √n, a drugi ≥ √n. Pary dla 36:

| mniejszy `d` | większy `e = 36 / d` |
| --- | --- |
| 2 | 18 |
| 3 | 12 |
| 4 | 9 |
| 6 | 6 (tu jest √36, dalej te same pary odwrócone) |

Jeśli do √n nie ma dzielnika, ==dalej też go nie ma==. Dlatego `d` idzie od 2 do `math.isqrt(n)`, czyli części całkowitej pierwiastka. `math.sqrt(n)` daje float, więc wtedy `int(math.sqrt(n))`.

Ślad: `n % d` dla 91 i 97 (`math.isqrt` daje dla obu 9):

| `d` | `91 % d` | `97 % d` |
| --- | --- | --- |
| 2 | 1 | 1 |
| 3 | 1 | 1 |
| 4 | 3 | 1 |
| 5 | 1 | 2 |
| 6 | 1 | 1 |
| 7 | 0, stop: 91 = 7 · 13, nie pierwsza | 6 |
| 8 | — | 1 |
| 9 | — | 7, koniec pętli: 97 jest pierwsza |

## Składnia do zapamiętania

```python
import math

def czy_pierwsza(n):
    if n < 2:
        return False
    for d in range(2, math.isqrt(n) + 1):   # albo int(math.sqrt(n)) + 1
        if n % d == 0:
            return False
    return True
```

## Przykład

```python pierwsze.py {4,6,8,9}
import math

def czy_pierwsza(n):
    if n < 2:
        return False
    for d in range(2, math.isqrt(n) + 1):
        if n % d == 0:
            return False
    return True

poczatek = int(input("Podaj początek przedziału: "))
koniec = int(input("Podaj koniec przedziału: "))
pierwsze = []
for liczba in range(poczatek, koniec + 1):
    if czy_pierwsza(liczba):
        pierwsze.append(liczba)
print(f"Liczby pierwsze od {poczatek} do {koniec}:", pierwsze)
print("Czy 49 jest pierwsza?", czy_pierwsza(49))
```

```wynik
Podaj początek przedziału: [[0]]
Podaj koniec przedziału: [[30]]
Liczby pierwsze od 0 do 30: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
Czy 49 jest pierwsza? False
```

1. 0 i 1 odpadają od razu. Bez tego pętla by się nie wykonała i funkcja zwróciłaby `True`.
2. `+ 1`, bo `range()` nie dochodzi do stop. Dla 49 pierwiastek to 7 i 7 musi być sprawdzone.
3. Pierwszy znaleziony dzielnik kończy funkcję: liczba nie jest pierwsza.
4. `return True` dopiero po całej pętli, gdy żaden dzielnik się nie znalazł.

## Pułapki

- `range(2, math.isqrt(n))` bez `+ 1` uznaje 4, 9, 25, 49 za pierwsze, bo pomija sam pierwiastek.
- `return True` w `else` wewnątrz pętli decyduje po pierwszym dzielniku: 9 % 2 to 1, więc „9 jest pierwsza”. `True` zwracaj dopiero za pętlą.
- `range(2, math.sqrt(n))` kończy się `TypeError: 'float' object cannot be interpreted as an integer`. Potrzebne `int()` albo `math.isqrt()`.
- Funkcja sprawdzająca ma zwracać `bool` na każdej ścieżce, a nie wypisywać „tak/nie”. Tak oceniano funkcję sprawdzającą PESEL (R.2.1, R.2.3, 2024 sty).

## Powiązane

- [Sito Eratostenesa](#/karta/konsola/34-sito-eratostenesa)
- [//, % i divmod](#/karta/konsola/24-dzielenie-i-reszta)
- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
