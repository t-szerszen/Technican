---
tytul: "Dane z klawiatury: input() i int()"
dzial: konsola
tagi: [python, input, int, konwersja, ValueError]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#input
  - https://docs.python.org/3/library/functions.html#int
  - Zasady oceniania INF.04 2022 cze (R.1.5), 2023 sty (R.1.5), 2024 cze (R.1.7)
arkusze: [2021 cze, 2022 cze, 2023 sty, 2024 sty, 2024 cze, 2025 cze, 2026 sty]
---

## Po co to jest

Prawie każdy program konsolowy z arkusza coś wczytuje: szukaną liczbę, liczbę kostek, liczbę losowań. ==Jawna konwersja do int== jest częścią kryterium R.1.5 (typy pasujące do problemu).

## Jak to działa

`input("monit")` wypisuje monit, czeka na Enter i zwraca to, co wpisano, ==zawsze jako napis (str)==. Liczba powstaje dopiero po `int()`.

| Wpisano | `input()` daje | po `int()` | `+ 1` daje |
| --- | --- | --- | --- |
| `5` | `"5"` | `5` | `6` |
| `5` (bez `int`) | `"5"` | — | `TypeError` |
| `abc` | `"abc"` | `ValueError` | — |
| ` 7 ` | `" 7 "` | `7` (spacje nie przeszkadzają) | `8` |

Po kolei: tekst z klawiatury, potem `int()` próbuje go zamienić na liczbę. Jeśli się nie da, rzuca `ValueError`, który można złapać w `try`.

## Składnia do zapamiętania

```python
n = int(input("Podaj liczbę: "))           # liczba: zawsze int()
pesel = input("Podaj PESEL: ")             # tekst zostaje napisem
odpowiedz = input("Jeszcze raz? (t/n) ")   # porównasz z "t"
while True:
    try:
        n = int(input("Podaj liczbę: "))
        break
    except ValueError:
        print("To nie jest liczba całkowita.")
```

## Przykład

```python dodatnia.py {3,4,7}
while True:
    try:
        a = int(input("Podaj liczbę dodatnią: "))
        if a > 0:
            break
        print("Liczba musi być większa od zera.")
    except ValueError:
        print("To nie jest liczba całkowita.")
print("Wczytano:", a)
```

```wynik
$ python dodatnia.py
Podaj liczbę dodatnią: [[abc]]
To nie jest liczba całkowita.
Podaj liczbę dodatnią: [[-4]]
Liczba musi być większa od zera.
Podaj liczbę dodatnią: [[12]]
Wczytano: 12
```

1. `int()` zamienia napis na liczbę albo rzuca `ValueError`.
2. `break` wychodzi z pętli dopiero, gdy liczba jest poprawna.
3. `except ValueError` łapie tekst, który nie jest liczbą, i pętla pyta jeszcze raz.

## Pułapki

- Bez `int()` liczysz na napisach: `"5" + "1"` daje `"51"`, a `"5" + 1` kończy się `TypeError`. W Pythonie egzaminator szuka jawnej konwersji (R.1.5, 2022 cze, 2023 sty, 2024 sty).
- Monit ma mówić, co wpisać („Podaj liczbę kostek”), bo zrozumiała komunikacja to osobny punkt (R.1.7, 2024 cze: monit o wprowadzenie danych).
- Gdy treść mówi „liczby całkowite dodatnie” (2023 sty), sprawdź warunek `> 0`, bo Python nie ma typu bez znaku. Zasady wprost to dopuszczają (R.1.5, 2023 sty). Sam `try` nie wystarczy: `int("-4")` działa bez błędu.
- Wczytuj w programie głównym, nie w funkcji liczącej (2023 sty: funkcja bez operacji wejścia-wyjścia).

## Powiązane

- [Wyjątki try/except](#/karta/konsola/12-wyjatki)
- [Pętla while](#/karta/konsola/06-petla-while)
- [f-stringi i print()](#/karta/konsola/03-f-stringi)
