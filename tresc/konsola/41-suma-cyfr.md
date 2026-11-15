---
tytul: "Suma cyfr"
dzial: konsola
tagi: [python, cyfry, reszta, dzielenie całkowite, abs, str, int]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations
  - https://docs.python.org/3/library/functions.html#abs
  - https://docs.python.org/3/library/functions.html#int
  - https://docs.python.org/3/library/functions.html#sum
arkusze: []
---

## Po co to jest

Suma cyfr, liczba cyfr, ostatnia cyfra: wszystkie wyciąga się tym samym ruchem. Można liczyć arytmetycznie (`% 10` i `// 10`) albo zamienić liczbę na napis i przejść po znakach.

## Jak to działa

`liczba % 10` to ==ostatnia cyfra==, `liczba // 10` to liczba bez ostatniej cyfry. Powtarzasz, aż liczba spadnie do 0. Ślad dla 4728:

| Krok | `liczba` | `liczba % 10` | `suma` po kroku | `liczba // 10` |
| --- | --- | --- | --- | --- |
| 1 | 4728 | 8 | 8 | 472 |
| 2 | 472 | 2 | 10 | 47 |
| 3 | 47 | 7 | 17 | 4 |
| 4 | 4 | 4 | 21 | 0 |

Cyfry wychodzą od końca, ale przy dodawaniu kolejność nie ma znaczenia.

**Przez napis.** `str(4728)` daje `"4728"`. Pętla po znakach daje `"4"`, `"7"`, `"2"`, `"8"`, a `int(znak)` robi z każdego cyfrę do dodania.

**Liczba ujemna.** `str(-45)` zaczyna się od `"-"`, a `int("-")` rzuca `ValueError`. Arytmetycznie jest gorzej: w Pythonie `-45 % 10` daje 5, a `-45 // 10` daje -5 (zaokrąglenie w dół). Pętla `while liczba != 0` utknie na -1, bo `-1 // 10` to znowu -1. Dlatego najpierw `abs()`: z -45 robi się 45, suma cyfr 9.

## Składnia do zapamiętania

```python
liczba = abs(liczba)
suma = 0
while liczba > 0:
    suma += liczba % 10
    liczba = liczba // 10
suma = 0
for znak in str(abs(liczba)):
    suma += int(znak)
suma = sum(int(znak) for znak in str(abs(liczba)))
ostatnia = liczba % 10
```

## Przykład

```python suma_cyfr.py {2,5,6,12}
def suma_cyfr(liczba):
    liczba = abs(liczba)
    suma = 0
    while liczba > 0:
        suma += liczba % 10
        liczba = liczba // 10
    return suma


def suma_cyfr_napis(liczba):
    suma = 0
    for znak in str(abs(liczba)):
        suma += int(znak)
    return suma


n = int(input("Podaj liczbę całkowitą: "))
print(f"Suma cyfr liczby {n}: {suma_cyfr(n)}")
print("Sprawdzenie przez napis:", suma_cyfr_napis(n))
```

```wynik
$ python suma_cyfr.py
Podaj liczbę całkowitą: [[-4728]]
Suma cyfr liczby -4728: 21
Sprawdzenie przez napis: 21
```

1. Znak minus odrzucamy na starcie, potem liczymy jak dla dodatniej.
2. Ostatnia cyfra dopisana do sumy.
3. Obcięcie ostatniej cyfry. Bez tego pętla kręci się w nieskończoność.
4. `str(abs(liczba))` to same cyfry, bez minusa. Każdy znak trzeba zamienić `int()`.

## Pułapki

- `suma += znak` na napisie rzuca `TypeError` (liczba plus napis). Konwersja `int(znak)` musi być jawna, w Pythonie egzaminator jej szuka (R.1.5, 2024 sty).
- `liczba / 10` zamiast `// 10` daje float (472.8) i suma wychodzi ułamkowa i błędna.
- Liczba cyfr pętlą `while liczba > 0` wychodzi 0 dla liczby 0. Prościej `len(str(abs(liczba)))`.
- Wynik zwracaj z funkcji `return`, nie wypisuj w środku. Arkusz 2023 sty wprost zabraniał wejścia i wyjścia w funkcji liczącej.

## Powiązane

- [Dzielenie całkowite i reszta](#/karta/konsola/24-dzielenie-i-reszta)
- [Zamiana na system dwójkowy](#/karta/konsola/40-system-dwojkowy)
- [Pętla while](#/karta/konsola/06-petla-while)
- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
