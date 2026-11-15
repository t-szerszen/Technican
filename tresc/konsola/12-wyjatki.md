---
tytul: "Wyjątki try/except"
dzial: konsola
tagi: [python, try, except, ValueError, ZeroDivisionError, IndexError, wyjątek]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/errors.html#handling-exceptions
  - https://docs.python.org/3/reference/compound_stmts.html#except-clause
  - https://docs.python.org/3/library/exceptions.html
  - Zasady oceniania INF.04 2022 cze (R.2.8), 2023 sty (R.1.5), 2024 cze (R.2.7)
arkusze: []
---

## Po co to jest

Błędne dane z klawiatury nie powinny wywracać programu. `try/except` łapie wyjątek, np. `ValueError` z `int("abc")`, i pozwala zapytać jeszcze raz. Żaden arkusz tego nie wymaga: kontrolę „liczba dodatnia” z 2023 sty zasady przyjmują jako zwykły warunek (R.1.5). To zabezpieczenie dodatkowe, gdy zostanie czas.

## Jak to działa

Gdy w `try` poleci wyjątek, ==reszta bloku try jest pomijana==. Python szuka pierwszego `except` z pasującym typem, wykonuje go i idzie dalej, za całą instrukcję `try`. Gdy żaden nie pasuje, program kończy się komunikatem `Traceback`.

```python dziel.py
try:
    liczba = int(input("Podaj liczbę: "))
    wynik = 100 / liczba
    print("Wynik:", wynik)
except ValueError:
    print("To nie liczba.")
except ZeroDivisionError:
    print("Nie dziel przez zero.")
print("Koniec")
```

Ślad: które linie się wykonują.

| Wpisano | Wyjątek | Wykonane linie | Na ekranie |
| --- | --- | --- | --- |
| `5` | brak | 1, 2, 3, 4, 9 | `Wynik: 20.0`, `Koniec` |
| `abc` | `ValueError` w linii 2 | 1, 2, 5, 6, 9 | `To nie liczba.`, `Koniec` |
| `0` | `ZeroDivisionError` w linii 3 | 1, 2, 3, 7, 8, 9 | `Nie dziel przez zero.`, `Koniec` |

## Składnia do zapamiętania

```python
while True:
    try:
        liczba = int(input("Podaj liczbę: "))
        break                      # tylko gdy int() się udał
    except ValueError:
        print("To nie jest liczba całkowita.")
```

## Przykład

```python indeks.py {5,6,7,8,12}
liczby = [7, 2, 9, 4]

while True:
    try:
        indeks = int(input(f"Podaj indeks (0-{len(liczby) - 1}): "))
        wartosc = liczby[indeks]
        break
    except ValueError:
        print("To nie jest liczba całkowita.")
    except IndexError:
        print("Nie ma takiego indeksu.")
print(f"liczby[{indeks}] = {wartosc}")
```

```wynik
$ python indeks.py
Podaj indeks (0-3): [[abc]]
To nie jest liczba całkowita.
Podaj indeks (0-3): [[7]]
Nie ma takiego indeksu.
Podaj indeks (0-3): [[2]]
liczby[2] = 9
```

1. `int()` rzuca `ValueError` dla `abc`; linie 6 i 7 już się nie wykonają.
2. `liczby[7]` rzuca `IndexError`, bo ostatni indeks to 3.
3. `break` wykona się tylko wtedy, gdy obie linie wyżej przeszły bez wyjątku.
4. `except` z konkretnym typem łapie tylko swój wyjątek, po nim pętla pyta jeszcze raz.
5. Za pętlą `indeks` i `wartosc` są już na pewno poprawne.

## Pułapki

- Gołe `except:` bez typu łapie każdy wyjątek, także literówkę w nazwie zmiennej (`NameError`). Błąd się chowa, a komunikat „to nie liczba” kłamie. Pisz konkretny typ.
- `try` nie zastępuje poprawnej pętli. W 2022 cze punkt jest za to, że program w ogóle nie powoduje wyjątków przy wstawianiu wartownika i przeszukiwaniu (R.2.8). `except IndexError` wokół złej pętli tego nie naprawi.
- Zakres (np. 3..10 w 2024 cze, R.2.7) i „dodatnia” sprawdza `if`, nie `except`: `int("2")` i `int("-4")` działają bez błędu.

## Powiązane

- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
- [Pętla while](#/karta/konsola/06-petla-while)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
