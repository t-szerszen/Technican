---
tytul: "Zmienne i typy"
dzial: konsola
tagi: [python, zmienne, typy, int, float, str, bool, type, konwersja]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/introduction.html#numbers
  - https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex
  - https://docs.python.org/3/library/functions.html#type
  - Zasady oceniania INF.04 2024 sty, 2025 sty, 2026 sty, 2026 cze (R.1.5) i 2025 sty (R.2.10)
arkusze: [2024 sty, 2024 cze, 2025 sty, 2026 sty, 2026 cze]
---

## Po co to jest

W każdym arkuszu jest kryterium R.1.5: ==typy pasujące do problemu==. W Pythonie nie piszesz typu przy zmiennej, więc zasady mówią wprost: typ wynika z przypisanych danych (2025 sty, 2026 sty, 2026 cze). Liczysz się więc z tym, ==co przypisujesz==.

## Jak to działa

Zmienna to nazwa przyklejona do wartości. Typ ma wartość, nie nazwa. `type()` pokazuje, jaki typ ma to, co teraz siedzi w zmiennej.

| Przypisanie | `type()` | Do czego w zadaniu |
| --- | --- | --- |
| `liczba_kostek = 5` | `int` | ilość, indeks, oczka, punkty |
| `srednia = 13 / 3` | `float` | średnia, wynik dzielenia |
| `pesel = "0123..."` | `str` | PESEL, hasło, odpowiedź t/n |
| `dostepna = True` | `bool` | stan tak/nie, wynik sprawdzenia |
| `oczka = [5, 2, 6]` | `list` | tablica |

Konwersja tworzy nową wartość innego typu. Zmienna, z której czytasz, się nie zmienia.

| Wyrażenie | Wynik | Uwaga |
| --- | --- | --- |
| `int("42")` | `42` | napis na liczbę |
| `int("3.5")` | `ValueError` | `int()` nie czyta ułamka z napisu |
| `int(3.9)` | `3` | obcina w stronę zera, nie zaokrągla |
| `str(7)` | `"7"` | do sklejania z tekstem |
| `int("0123")` | `123` | zero z przodu znika |
| `7 / 2`, `6 / 2` | `3.5`, `3.0` | `/` ==zawsze daje float== |

## Składnia do zapamiętania

```python
liczba = 7                    # int
polowa = liczba / 2           # float: 3.5
odpowiedz = "t"               # str
dostepna = True               # bool
n = int("42")                 # str -> int
opis = "Wynik: " + str(n)     # int -> str
cyfra = int(pesel[9])         # znak z napisu -> liczba
```

## Przykład

```python typy.py {1,2,4,5}
liczba = int(input("Podaj liczbę całkowitą: "))
polowa = liczba / 2
calkowita_polowa = liczba // 2
parzysta = liczba % 2 == 0
opis = "Liczba " + str(liczba)
print(type(liczba), type(polowa), type(parzysta), type(opis))
print(opis, "podzielona przez 2:", polowa)
print(f"{liczba} // 2 = {calkowita_polowa}, parzysta: {parzysta}")
```

```wynik
$ python typy.py
Podaj liczbę całkowitą: [[7]]
<class 'int'> <class 'float'> <class 'bool'> <class 'str'>
Liczba 7 podzielona przez 2: 3.5
7 // 2 = 3, parzysta: False
```

1. Jawna konwersja `int(input())`: zasady wymieniają ją w R.1.5 (np. 2022 cze, 2024 cze).
2. `/` daje `float` nawet dla dwóch `int`. Dla `8 / 2` wyjdzie `4.0`.
3. Porównanie daje `bool`, więc można je od razu przypisać.
4. `+` skleja tylko napisy, dlatego liczba przechodzi przez `str()`. Samo `"Liczba " + liczba` daje `TypeError`.

## Pułapki

- Średnia to `suma / rozmiar` (R.2.10, 2025 sty). `//` obcina część ułamkową, tak samo `int()` na wyniku. Średnia ma być liczbą, nie zaokrągloną w dół.
- Przypisuj dane właściwego typu: `dostepna = True`, a nie `1` czy `"tak"`; oczka jako `int`, a nie `"5"` (R.1.5, 2026 sty).
- PESEL trzymaj jako napis albo listę cyfr, nie jako jedną liczbę (R.1.5, 2024 sty). `int(pesel)` zgubi zero z przodu. Cyfrę zamieniasz osobno: `int(pesel[9])`.
- `bool("n")` daje `True`, bo każdy niepusty napis jest prawdą. Odpowiedź t/n trzymaj jako napis i porównuj: `odpowiedz == "t"` (R.1.5, 2024 cze: zmienna znakowa dla zgody).

## Powiązane

- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
- [f-stringi i print()](#/karta/konsola/03-f-stringi)
- [Dzielenie całkowite // i reszta %](#/karta/konsola/24-dzielenie-i-reszta)
