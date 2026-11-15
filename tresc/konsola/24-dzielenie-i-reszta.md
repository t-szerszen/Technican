---
tytul: "//, % i divmod"
dzial: konsola
tagi: [python, dzielenie, modulo, reszta, divmod, parzystość, cyfry]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations
  - https://docs.python.org/3/library/functions.html#divmod
  - https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex
  - Zasady oceniania INF.04 2024 sty (R.2.2, R.2.6) i 2025 sty (R.2.9)
arkusze: [2024 sty, 2025 sty]
---

## Po co to jest

Reszta z dzielenia wraca ciągle: parzystość (płeć z PESEL, liczby nieparzyste), ostatnia cyfra, suma kontrolna `M = S % 10` w PESEL (2024 sty), rozbijanie liczby na cyfry, minuty na godziny.

## Jak to działa

Dla liczb całkowitych zawsze zachodzi ==a = b · (a // b) + a % b==. `//` to wynik dzielenia zaokrąglony w dół (do minus nieskończoności), a `%` to to, co zostaje.

| `a` | `b` | `a / b` | `a // b` | `a % b` | sprawdzenie |
| --- | --- | --- | --- | --- | --- |
| 17 | 5 | 3.4 | 3 | 2 | 5 · 3 + 2 = 17 |
| 6 | 2 | 3.0 | 3 | 0 | reszta 0, więc parzysta |
| -7 | 2 | -3.5 | -4 | 1 | 2 · (-4) + 1 = -7 |
| 7 | -2 | -3.5 | -4 | -1 | -2 · (-4) - 1 = 7 |

Przy ujemnych `-3.5` zaokrągla się w dół do `-4`, nie do `-3`. Reszta ma wtedy ==znak dzielnika== (drugiej liczby). `divmod(a, b)` zwraca obie wartości naraz: `divmod(17, 5)` to `(3, 2)`.

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
ostatnia = liczba % 10
bez_ostatniej = liczba // 10
godziny, minuty = divmod(czas, 60)
M = S % 10
if M == 0:
    R = 0
else:
    R = 10 - M
```

## Przykład

```python reszta.py {4,5,10,18}
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

minuty = int(input("Podaj czas w minutach: "))
godziny, reszta = divmod(minuty, 60)
print(f"To {godziny} h {reszta} min")
print("Ujemne:", -7 // 2, -7 % 2, int(-7 / 2))
```

```wynik
$ python reszta.py
Podaj liczbę: [[1234]]
1234 jest parzysta
Ostatnia cyfra: 4 | bez niej: 123
Suma cyfr: 10
Podaj czas w minutach: [[135]]
To 2 h 15 min
Ujemne: -4 1 -3
```

1. `% 10` wyciąga ostatnią cyfrę i dodaje ją do sumy.
2. `// 10` obcina ostatnią cyfrę; przy 0 pętla się kończy.
3. Reszta 0 z dzielenia przez 2 znaczy „parzysta”.
4. `divmod` oddaje parę, którą od razu rozpakowujesz do dwóch zmiennych.

## Pułapki

- PESEL (2024 sty): sprawdzane jest `M = S % 10` i `R = 10 - M` albo `R = 0` (R.2.6). Płeć z 10. cyfry: `int(pesel[9]) % 2 == 0` to kobieta (R.2.2).
- `/` zawsze daje `float`: `6 / 2` to `3.0`. Do indeksów i liczby elementów używaj `//`.
- `int(-7 / 2)` obcina do `-3`, a `-7 // 2` daje `-4`. Dla dodatnich nie ma różnicy.
- Nieparzystość sprawdzaj przez `% 2 != 0`. `-3 % 2` to `1`, więc `% 2 == 1` też działa w Pythonie, ale w C++ i Javie da `-1`.
- Dzielenie przez zero (`/`, `//`, `%`) rzuca `ZeroDivisionError`. Przy średniej z pustej tablicy sprawdź najpierw rozmiar.
- NWD w 2023 sty miało być według schematu z odejmowaniem, nie z `%`.

## Powiązane

- [Suma cyfr](#/karta/konsola/41-suma-cyfr)
- [PESEL](#/karta/konsola/43-pesel)
- [NWD: algorytm Euklidesa](#/karta/konsola/35-nwd-euklides)
