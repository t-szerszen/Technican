---
tytul: "Walidacja numeru PESEL"
dzial: konsola
tagi: [python, PESEL, suma kontrolna, wagi, bool, napis, int]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#int
  - https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations
  - Zasady oceniania INF.04 2024 sty (R.1.4, R.1.5, R.1.7, R.2.1-R.2.7)
arkusze: [2024 sty]
---

## Po co to jest

W 2024 sty program konsolowy sprawdzał PESEL: płeć z 10. cyfry i sumę kontrolną z wagami. Dwie osobne funkcje dostają zmienną z numerem: jedna zwraca `'K'` albo `'M'`, druga `True` albo `False`.

## Jak to działa

PESEL trzymaj ==jako napis==: zera z przodu zostają, a do cyfry dostajesz się indeksem. Pozycja 10. to indeks 9, pozycja 11. to indeks 10. Płeć: `int(pesel[9])` parzysta to kobieta, nieparzysta to mężczyzna.

**Suma kontrolna.** Wagi dla pierwszych 10 cyfr: 1 3 7 9 1 3 7 9 1 3. Ślad dla fikcyjnego numeru `02070803628`:

| Pozycja | Indeks | Cyfra | Waga | Iloczyn | `S` po kroku |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 2 | 1 | 2 | 3 | 6 | 6 |
| 3 | 2 | 0 | 7 | 0 | 6 |
| 4 | 3 | 7 | 9 | 63 | 69 |
| 5 | 4 | 0 | 1 | 0 | 69 |
| 6 | 5 | 8 | 3 | 24 | 93 |
| 7 | 6 | 0 | 7 | 0 | 93 |
| 8 | 7 | 3 | 9 | 27 | 120 |
| 9 | 8 | 6 | 1 | 6 | 126 |
| 10 | 9 | 2 | 3 | 6 | 132 |

1. `S = 132` to suma iloczynów, więc `M = S % 10 = 2`.
2. `M` nie jest 0, więc `R = 10 - M = 8`. Gdyby `M` było 0, to `R = 0`.
3. Cyfra 11. (`pesel[10]`) to 8, równa `R`: suma zgodna. Cyfra 10. to 2, parzysta: kobieta.

## Składnia do zapamiętania

```python
cyfra = int(pesel[9])
wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
S = 0
for i in range(10):
    S = S + int(pesel[i]) * wagi[i]
M = S % 10
if M == 0:
    R = 0
else:
    R = 10 - M
zgodna = R == int(pesel[10])
```

## Przykład

```python pesel.py {2,11,17,18}
def plec(pesel):
    if int(pesel[9]) % 2 == 0:
        return 'K'
    else:
        return 'M'


def czy_suma_zgodna(pesel):
    wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
    S = 0
    for i in range(10):
        S = S + int(pesel[i]) * wagi[i]
    M = S % 10
    if M == 0:
        R = 0
    else:
        R = 10 - M
    return R == int(pesel[10])


pesel = input("Podaj numer PESEL: ")
if plec(pesel) == 'K':
    print("Płeć: Kobieta")
else:
    print("Płeć: Mężczyzna")
if czy_suma_zgodna(pesel):
    print("Suma kontrolna jest zgodna.")
else:
    print("Suma kontrolna jest niezgodna.")
```

```wynik
$ python pesel.py
Podaj numer PESEL: [[02070803628]]
Płeć: Kobieta
Suma kontrolna jest zgodna.
```

1. 10. cyfra to indeks 9, `int()` robi z niej liczbę. `else` wystarczy, warunki są komplementarne (R.2.2).
2. `range(10)`: tylko pierwsze 10 cyfr, 11. nie ma wagi. Iloczyn cyfry i wagi idzie do `S` (R.2.4, R.2.5).
3. `R = 10 - M` tylko, gdy `M` nie jest 0 (R.2.6).
4. Porównanie daje `bool`, więc funkcja zwraca `True` albo `False` na każdej ścieżce (R.2.1, R.2.3).

## Pułapki

- `int(input())` na cały PESEL gubi zero z przodu (`02070803628` staje się 10-cyfrowe) i nie da się go indeksować. Trzymaj napis albo listę cyfr (R.1.5, 2024 sty).
- `pesel[i] * wagi[i]` bez `int()` to powtórzenie napisu (`"7" * 9` daje `"777777777"`), a dodanie go do `S` rzuca `TypeError`. W Pythonie wymagana jest jawna konwersja (R.1.5, 2024 sty).
- `pesel[10]` zamiast `pesel[9]` przy płci: indeksy liczą się od 0 (R.2.2, 2024 sty).
- Funkcja płci zwraca `'K'`/`'M'`, a całe słowo „Kobieta” lub „Mężczyzna” wypisuje program główny (R.1.7). Funkcja sumy zwraca `bool`, nie napis „zgodna” (R.2.3).
- Nazwy `S`, `M`, `R` są dozwolone, bo pochodzą z algorytmu (R.1.4). Funkcje wołaj dla PESEL-u wczytanego z klawiatury (R.2.7).

## Powiązane

- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [Dzielenie całkowite // i reszta %](#/karta/konsola/24-dzielenie-i-reszta)
