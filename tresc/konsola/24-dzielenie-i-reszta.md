---
tytul: "Dzielenie całkowite // i reszta %"
dzial: konsola
tagi: [python, dzielenie, modulo, reszta, parzystość, podzielność, cyfry]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations
  - Zasady oceniania INF.04 2023 sty (R.2.3), 2024 sty (R.2.2, R.2.6), 2025 sty (R.2.9)
arkusze: [2024 sty, 2025 sty]
---

## Po co to jest

Reszta z dzielenia wraca ciągle: parzystość (płeć z PESEL, liczby nieparzyste), podzielność (liczby pierwsze), suma kontrolna `M = S % 10` w PESEL (2024 sty), rozbijanie liczby na cyfry, środek przedziału w wyszukiwaniu binarnym.

## Jak to działa

Dla liczb całkowitych zawsze zachodzi ==a = b · (a // b) + a % b==. `//` to wynik dzielenia zaokrąglony w dół (dla liczb dodatnich po prostu część całkowita), a `%` to to, co zostaje.

| `a` | `b` | `a / b` | `a // b` | `a % b` | sprawdzenie |
| --- | --- | --- | --- | --- | --- |
| 17 | 5 | 3.4 | 3 | 2 | 5 · 3 + 2 = 17 |
| 6 | 2 | 3.0 | 3 | 0 | reszta 0, więc parzysta |
| 7 | 2 | 3.5 | 3 | 1 | reszta 1, więc nieparzysta |

Cyfry liczby 1234 bierzesz od końca: `% 10` daje ostatnią cyfrę, `// 10` ją obcina.

| Obrót | `liczba` | `liczba % 10` | `suma` | `liczba // 10` |
| --- | --- | --- | --- | --- |
| 1 | 1234 | 4 | 4 | 123 |
| 2 | 123 | 3 | 7 | 12 |
| 3 | 12 | 2 | 9 | 1 |
| 4 | 1 | 1 | 10 | 0, koniec pętli |

## Składnia do zapamiętania

```python
if liczba % 2 == 0:
    print("parzysta")
if liczba % dzielnik == 0:
    print("dzieli się bez reszty")
ostatnia = liczba % 10
bez_ostatniej = liczba // 10
srodek = (lewy + prawy) // 2
M = S % 10
```

## Przykład

```python reszta.py {4,5,10,15}
def suma_cyfr(liczba):
    suma = 0
    while liczba > 0:
        suma = suma + liczba % 10
        liczba = liczba // 10
    return suma

n = int(input("Podaj liczbę: "))
if n % 2 == 0:
    print(n, "jest parzysta")
else:
    print(n, "jest nieparzysta")
print("Ostatnia cyfra:", n % 10, "| bez niej:", n // 10)
print("Suma cyfr:", suma_cyfr(n))
print("17 / 5 =", 17 / 5, "| 17 // 5 =", 17 // 5, "| 17 % 5 =", 17 % 5)
```

```wynik
$ python reszta.py
Podaj liczbę: [[1234]]
1234 jest parzysta
Ostatnia cyfra: 4 | bez niej: 123
Suma cyfr: 10
17 / 5 = 3.4 | 17 // 5 = 3 | 17 % 5 = 2
```

1. `% 10` wyciąga ostatnią cyfrę i dodaje ją do sumy.
2. `// 10` obcina ostatnią cyfrę; przy 0 pętla się kończy.
3. Reszta 0 z dzielenia przez 2 znaczy „parzysta”.
4. Funkcja dostaje `n` jako argument i zwraca wynik, więc w środku nie ma `input` ani `print`.

## Pułapki

- PESEL (2024 sty): sprawdzane jest `M = S % 10` i `R = 10 - M` albo `R = 0`, gdy `M` jest 0 (R.2.6). Płeć z 10. cyfry: `int(pesel[9]) % 2 == 0` to kobieta (R.2.2).
- `/` zawsze daje `float`: `6 / 2` to `3.0`. Indeks listy musi być `int`, więc środek przedziału licz przez `//`, inaczej `TypeError`.
- NWD w 2023 sty miało być według schematu z odejmowaniem (`a = a - b`, R.2.3), nie z `%`.

## Powiązane

- [Suma cyfr](#/karta/konsola/41-suma-cyfr)
- [Walidacja numeru PESEL](#/karta/konsola/43-pesel)
- [NWD algorytmem Euklidesa](#/karta/konsola/35-nwd-euklides)
