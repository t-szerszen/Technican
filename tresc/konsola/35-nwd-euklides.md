---
tytul: "NWD algorytmem Euklidesa"
dzial: konsola
tagi: [python, NWD, Euklides, while, odejmowanie, modulo, funkcja]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3.12/library/math.html#math.gcd
  - https://docs.python.org/3.12/tutorial/introduction.html#first-steps-towards-programming
  - Zasady oceniania INF.04 2023 sty (R.1.4, R.1.5, R.2.1-R.2.6)
arkusze: [2023 sty]
---

## Po co to jest

W 2023 sty trzeba było zakodować NWD ==dokładnie według schematu blokowego==: odejmowanie w pętli. Funkcja ma dwa argumenty, zwraca wynik i nie ma w niej `input()` ani `print()`. Wczytywanie i wypisywanie robi program główny.

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

Wersja z resztą robi to samo szybciej: zamiast odejmować 18 dwa razy, od razu bierze `48 % 18`. Ślad: (48, 18) → (18, 12) → (12, 6) → (6, 0), koniec, wynik 6.

> [!egzamin]
> Liczy się zgodność ze schematem z treści. W 2023 sty sprawdzano w kodzie pętlę `while a != b` i odejmowanie `a = a - b` / `b = b - a` (R.2.2, R.2.3). Wersja z modulo albo `math.gcd()` daje dobry wynik, ale tych kryteriów nie spełnia.

## Składnia do zapamiętania

```python
def nwd(a, b):                 # wg schematu: odejmowanie
    while a != b:
        if a > b:
            a = a - b
        else:
            b = b - a
    return a

def nwd_modulo(a, b):          # tylko gdy treść nie narzuca schematu
    while b != 0:
        a, b = b, a % b
    return a
```

## Przykład

```python nwd.py {2,3,7,13,21}
def nwd(a, b):
    while a != b:
        if a > b:
            a = a - b
        else:
            b = b - a
    return a

def wczytaj_dodatnia(komunikat):
    while True:
        try:
            liczba = int(input(komunikat))
            if liczba > 0:
                return liczba
            print("Liczba musi być większa od zera.")
        except ValueError:
            print("To nie jest liczba całkowita.")

a = wczytaj_dodatnia("Podaj liczbę a: ")
b = wczytaj_dodatnia("Podaj liczbę b: ")
print(f"NWD({a}, {b}) = {nwd(a, b)}")
```

```wynik
Podaj liczbę a: [[0]]
Liczba musi być większa od zera.
Podaj liczbę a: [[48]]
Podaj liczbę b: [[abc]]
To nie jest liczba całkowita.
Podaj liczbę b: [[18]]
NWD(48, 18) = 6
```

1. Pętla działa, dopóki a i b są różne (R.2.2).
2. Większa traci mniejszą. Warunki mogą być odwrócone, byle zgodne ze schematem (R.2.3).
3. Zwracamy `a`, bo po pętli `a == b` (R.2.4).
4. Kontrola „całkowita dodatnia”. Python nie ma typu bez znaku, więc warunek `> 0` (R.1.5).
5. Wynik wypisuje program główny, z opisem (R.2.6).

## Pułapki

- `input()` albo `print()` w funkcji `nwd` łamie założenie „funkcja nie może zawierać operacji wejścia-wyjścia” (2023 sty). Funkcja ma `return` (R.2.1).
- Bez kontroli dodatniości pętla się zapętla: dla `nwd(0, 5)` wykonuje się `b = 5 - 0` w nieskończoność. Ujemne też nigdy się nie zrównają.
- Nazwy zmiennych algorytmu to `a` i `b`, jak na schemacie (R.1.4, 2023 sty). Inne nazwy mają być znaczące.
- Bez `int()` porównujesz napisy: `"9" > "18"` daje `True`. Jawna konwersja to R.1.5.
- `a -= b` działa tak samo, ale bezpieczniej pisać `a = a - b`, słowo w słowo jak na schemacie, bo z nim porównuje się kod.

## Powiązane

- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
- [Pętla while](#/karta/konsola/06-petla-while)
- [Funkcje](#/karta/konsola/11-funkcje)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
