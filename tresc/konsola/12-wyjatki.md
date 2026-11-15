---
tytul: "Wyjątki try/except"
dzial: konsola
tagi: [python, try, except, else, finally, ValueError, ZeroDivisionError, IndexError, wyjątek]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/errors.html#handling-exceptions
  - https://docs.python.org/3/tutorial/errors.html#defining-clean-up-actions
  - https://docs.python.org/3/reference/compound_stmts.html#except-clause
  - https://docs.python.org/3/library/exceptions.html
  - Zasady oceniania INF.04 2022 cze (R.2.8), arkusz 2023 sty (kontrola poprawności liczb)
arkusze: [2022 cze, 2023 sty]
---

## Po co to jest

Błędne dane z klawiatury nie powinny wywracać programu. `try/except` łapie wyjątek, np. `ValueError` z `int("abc")`, i pozwala zapytać jeszcze raz. Przydaje się przy kontroli poprawności wpisanej liczby (2023 sty).

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

Dodatkowe części: `else` wykonuje się ==tylko, gdy wyjątku nie było==, a `finally` zawsze, także po `break`.

## Składnia do zapamiętania

```python
while True:
    try:
        liczba = int(input("Podaj liczbę: "))
    except ValueError:
        print("To nie jest liczba całkowita.")
    else:
        break                      # tylko gdy int() się udał
    finally:
        print("Sprawdzono wpis.")  # zawsze
```

## Przykład

```python indeks.py {5,6,7,11,14}
liczby = [7, 2, 9, 4]

while True:
    try:
        indeks = int(input(f"Podaj indeks (0-{len(liczby) - 1}): "))
        wartosc = liczby[indeks]
    except ValueError:
        print("To nie jest liczba całkowita.")
    except IndexError:
        print("Nie ma takiego indeksu.")
    else:
        print(f"liczby[{indeks}] = {wartosc}")
        break
    finally:
        print("Sprawdzono wpis.")
print("Koniec programu.")
```

```wynik
$ python indeks.py
Podaj indeks (0-3): [[abc]]
To nie jest liczba całkowita.
Sprawdzono wpis.
Podaj indeks (0-3): [[7]]
Nie ma takiego indeksu.
Sprawdzono wpis.
Podaj indeks (0-3): [[2]]
liczby[2] = 9
Sprawdzono wpis.
Koniec programu.
```

1. `int()` rzuca `ValueError` dla `abc`; linia 6 już się nie wykona.
2. `liczby[7]` rzuca `IndexError`, bo ostatni indeks to 3.
3. `except` z konkretnym typem łapie tylko swój wyjątek.
4. `else` wypisuje wynik i wychodzi z pętli, gdy oba kroki się udały.
5. `finally` wykonuje się po każdym obrocie, także po `break`.

## Pułapki

- Gołe `except:` bez typu łapie każdy wyjątek, także literówkę w nazwie zmiennej (`NameError`) i Ctrl+C. Błąd się chowa, a komunikat „to nie liczba” kłamie. Pisz konkretny typ.
- `try` nie zastępuje poprawnej pętli. W 2022 cze punkt jest za to, że program w ogóle nie powoduje wyjątków przy wstawianiu wartownika i przeszukiwaniu (R.2.8). `except IndexError` wokół złej pętli tego nie naprawi.
- Ujemny indeks nie rzuca `IndexError`: `-1` da ostatni element. Gdy liczą się tylko 0..n-1, sprawdź `0 <= indeks < len(liczby)`.
- `try` łapie błędy wykonania, nie składni. Brak dwukropka czy złe wcięcie zatrzyma program przed startem.
- W `try` trzymaj tylko linie, które mogą rzucić wyjątek. Im więcej kodu w środku, tym trudniej powiedzieć, co zawiodło.
- Zakres (np. 3..10 w 2024 cze) sprawdza `if`, nie `except`: `int("2")` działa bez błędu.

## Powiązane

- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
- [Pętla while](#/karta/konsola/06-petla-while)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
