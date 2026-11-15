---
tytul: "if, elif, else"
dzial: konsola
tagi: [python, if, elif, else, warunek, and, or, not, parzystość]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/controlflow.html#if-statements
  - https://docs.python.org/3/library/stdtypes.html#comparisons
  - Zasady oceniania INF.04 2024 sty (R.2.1, R.2.2) i 2024 cze (R.2.7)
arkusze: [2023 sty, 2024 sty, 2024 cze, 2025 sty, 2026 sty]
---

## Po co to jest

Warunki są w każdym zadaniu: płeć z parzystości cyfry PESEL (2024 sty), liczba kostek z przedziału <3, 10> (2024 cze), `a > b` w NWD (2023 sty), liczby nieparzyste (2025 sty), wartość spoza 1..6 daje 0 (2026 sty).

## Jak to działa

Python sprawdza warunki ==od góry do dołu== i wykonuje blok pierwszego prawdziwego. Reszty już nie sprawdza. `else` łapie wszystko, co zostało.

Łańcuch `if n < 3` / `elif n > 10` / `else` dla wartości granicznych, które sprawdza egzaminator (R.2.7, 2024 cze):

| `n` | `n < 3` | `n > 10` | Wykonany blok |
| --- | --- | --- | --- |
| 2 | `True` | nie sprawdzane | „Za mało” |
| 3 | `False` | `False` | `else`: poprawna |
| 10 | `False` | `False` | `else`: poprawna |
| 11 | `False` | `True` | „Za dużo” |

Operatory, które trzeba znać:

| Zapis | Znaczy |
| --- | --- |
| `==`, `!=`, `<`, `<=`, `>`, `>=` | porównania, wynik `True` albo `False` |
| `3 <= n <= 10` | to samo co `3 <= n and n <= 10` |
| `n < 3 or n > 10` | poza przedziałem, czyli `not (3 <= n <= 10)` |
| `n % 2 == 0` | parzysta (reszta z dzielenia przez 2 to 0), `!= 0` nieparzysta |

==Warunki komplementarne== (parzysta / nieparzysta) wykluczają się i razem pokrywają wszystko, więc zamiast drugiego warunku wystarczy samo `else` (R.2.2, 2024 sty).

## Składnia do zapamiętania

```python
if n < 3:
    print("Za mało")
elif n > 10:
    print("Za dużo")
else:
    print("Poprawna")
if 3 <= n <= 10 and odpowiedz == "t":
    print("Gramy")
```

## Przykład

```python warunki.py {2,5,8}
def plec(pesel):
    if int(pesel[9]) % 2 == 0:
        return "K"
    else:
        return "M"

pesel = input("Podaj PESEL: ")
if plec(pesel) == "K":
    print("Kobieta")
else:
    print("Mężczyzna")
```

```wynik
$ python warunki.py
Podaj PESEL: [[12345678901]]
Kobieta
```

1. Indeks 9 to 10. cyfra. To znak, więc `int()` przed `%`, inaczej `TypeError` (R.1.5, 2024 sty).
2. `return` także w `else`, więc każda ścieżka coś zwraca (R.2.1, 2024 sty).
3. Funkcja zwraca znak, a program główny wypisuje całe słowo „Kobieta” albo „Mężczyzna” (R.1.7, 2024 sty).

## Pułapki

- Granice: `3 < n < 10` odrzuca 3 i 10, a egzaminator sprawdza właśnie 2, 3, 10, 11 (R.2.7, 2024 cze).
- Funkcja z `return` tylko pod `if` zwraca `None`, gdy warunek nie zajdzie (R.2.1, 2024 sty).
- `if odpowiedz == "t" or "T":` jest zawsze prawdą, bo niepusty napis `"T"` to `True`. Pisz `odpowiedz == "t" or odpowiedz == "T"`.
- `if n = 5:` to `SyntaxError`. Porównanie to `==`, przypisanie to `=`.
- Kilka osobnych `if` zamiast `elif` może wykonać kilka bloków naraz. W łańcuchu `elif` wykona się najwyżej jeden.

## Powiązane

- [Pętla while](#/karta/konsola/06-petla-while)
- [//, % i divmod](#/karta/konsola/24-dzielenie-i-reszta)
- [Walidacja numeru PESEL](#/karta/konsola/43-pesel)
