---
tytul: "NWD algorytmem Euklidesa"
dzial: konsola
tagi: [python, NWD, Euklides, while, odejmowanie, funkcja]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3.12/reference/compound_stmts.html#the-while-statement
  - Zasady oceniania INF.04 2023 sty (R.1.4, R.1.5, R.1.6, R.2.1-R.2.6)
arkusze: [2023 sty]
---

## Po co to jest

W 2023 sty trzeba było zakodować NWD ==w pełni zgodnie ze schematem blokowym==: odejmowanie w pętli. Funkcja ma dwa argumenty, zwraca wynik i nie ma w niej operacji wejścia-wyjścia. Wczytywanie i wypisywanie robi program główny.

## Jak to działa

Wspólny dzielnik a i b dzieli też ich różnicę. Dlatego NWD(a, b) = NWD(a - b, b). Odejmujemy mniejszą od większej, aż obie będą równe. Wtedy NWD(x, x) = x.

Ślad dla `nwd(48, 18)`:

| Krok | `a` | `b` | `a != b`? | Co robi |
| --- | --- | --- | --- | --- |
| start | 48 | 18 | tak, `a > b` | `a = 48 - 18` |
| 1 | 30 | 18 | tak, `a > b` | `a = 30 - 18` |
| 2 | 12 | 18 | tak, `a < b` | `b = 18 - 12` |
| 3 | 12 | 6 | tak, `a > b` | `a = 12 - 6` |
| 4 | 6 | 6 | nie, koniec pętli | `return a`, czyli 6 |

> [!egzamin]
> Liczy się zgodność ze schematem z treści. W 2023 sty sprawdzano w kodzie pętlę `while`, która działa, dopóki a i b są różne, i odejmowanie `a = a - b` / `b = b - a` (R.2.2, R.2.3). Wersja z resztą (`a, b = b, a % b`) albo `math.gcd()` daje ten sam wynik, ale tych kryteriów nie spełnia.

## Składnia do zapamiętania

```python
def nwd(a, b):
    while a != b:
        if a > b:
            a = a - b
        else:
            b = b - a
    return a
```

## Przykład

```python nwd.py {2,3,7,11,12}
def nwd(a, b):
    while a != b:
        if a > b:
            a = a - b
        else:
            b = b - a
    return a

a = int(input("Podaj liczbę a: "))
b = int(input("Podaj liczbę b: "))
if a > 0 and b > 0:
    print(f"NWD({a}, {b}) = {nwd(a, b)}")
else:
    print("Obie liczby muszą być całkowite dodatnie.")
```

```wynik
Podaj liczbę a: [[48]]
Podaj liczbę b: [[18]]
NWD(48, 18) = 6
```

1. Pętla działa, dopóki a i b są różne (R.2.2).
2. Większa traci mniejszą. Warunki mogą być odwrócone, byle zgodne ze schematem (R.2.3). Pisz `a = a - b` tak jak na schemacie.
3. Zwracamy `a`, bo po pętli `a == b` (R.2.4).
4. Kontrola „całkowite dodatnie”. Python nie ma typu bez znaku, więc warunek `> 0` (R.1.5). Dla 0 albo liczby ujemnej program wypisze komunikat, a `nwd` nie ruszy.
5. Wynik wypisuje program główny (R.2.6), z opisem (R.1.6).

## Pułapki

- `input()` albo `print()` w funkcji `nwd` łamie założenie „funkcja nie może zawierać operacji wejścia-wyjścia” (2023 sty). Funkcja ma `return` (R.2.1).
- Bez kontroli dodatniości pętla się nie kończy: dla `nwd(0, 5)` wykonuje się `b = 5 - 0` w nieskończoność. Dla ujemnych, np. `nwd(-4, 6)`, różnica rośnie i też nie ma końca.
- Nazwy zmiennych algorytmu to `a` i `b`, jak na schemacie (R.1.4, 2023 sty). Inne nazwy mają być znaczące.
- Bez `int()` do funkcji trafiają napisy i `a - b` kończy się `TypeError`. Jawna konwersja to R.1.5.

## Powiązane

- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
- [Pętla while](#/karta/konsola/06-petla-while)
- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
