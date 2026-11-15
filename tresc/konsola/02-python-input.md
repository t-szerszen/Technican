---
tytul: "Dane z klawiatury: input()"
dzial: konsola
tagi: [python, input, int, split, ValueError]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#input
  - https://docs.python.org/3/library/stdtypes.html#str.split
arkusze:
  - inf04-2023-styczen
  - inf04-2025-czerwiec
---

`input()` zawsze zwraca tekst (`str`). Żeby na nim liczyć, zamień go przez `int()` albo `float()`.

## Jedna liczba

```python silnia.py {1,3}
n = int(input("Podaj n: "))
wynik = 1
for i in range(2, n + 1):
    wynik *= i
print(f"{n}! = {wynik}")
```

```wynik
$ python silnia.py
Podaj n: [[5]]
5! = 120
```

1. Bez `int()` zmienna `n` byłaby napisem, a `n + 1` skończyłoby się błędem `TypeError`.
2. `n + 1`, bo stop w `range()` nie wchodzi do zakresu.

## Kilka liczb w jednej linii

```python dwie.py {1}
a, b = map(int, input("Podaj dwie liczby: ").split())
print("Suma:", a + b)
```

```wynik
Podaj dwie liczby: [[48 18]]
Suma: 66
```

1. `split()` tnie tekst po spacjach, a `map(int, ...)` zamienia każdy kawałek na liczbę.

## Błędne dane

```python zestawy.py {3,5}
while True:
    try:
        n = int(input("Ile zestawów? "))
        break
    except ValueError:
        print("To nie jest liczba, spróbuj jeszcze raz.")
```

```wynik
Ile zestawów? [[dwa]]
To nie jest liczba, spróbuj jeszcze raz.
Ile zestawów? [[2]]
```

1. `int("dwa")` rzuca `ValueError`.
2. `except` łapie błąd, a `while True` pyta jeszcze raz, aż dostanie liczbę.

> [!egzamin]
> Zrzut ekranu ma pokazać wpisane dane i wynik. Zanim oddasz program, sprawdź go dla 0, 1 i liczby ujemnej.
