---
tytul: "f-stringi i print()"
dzial: konsola
tagi: [python, print, f-string, formatowanie, join, sep, end]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals
  - https://docs.python.org/3/library/functions.html#print
  - https://docs.python.org/3/library/stdtypes.html#str.join
  - Zasady oceniania INF.04 2022 cze (R.2.7), 2023 cze (R.1.7), 2025 sty (R.2.7)
arkusze: [2022 cze, 2023 cze, 2024 cze, 2025 sty, 2025 cze]
---

## Po co to jest

Arkusze podają gotowy wzór wyniku: „Kostka 1: 5” (2024 cze), „<indeks>: <wartość>” (2025 sty), liczby po przecinku (2022 cze), „Losowanie 1: 18 31 49 ...” (2025 cze). Za ==wynik opatrzony komentarzem== są punkty w R.1.7.

## Jak to działa

f-string to napis z literą `f` przed cudzysłowem. Python liczy każde wyrażenie w `{}` i wkleja wynik jako tekst. Po dwukropku można dać format.

| Kod (`i = 0`, `oczka = 5`, `srednia = 13 / 3`) | Wynik |
| --- | --- |
| `f"Kostka {i + 1}: {oczka}"` | `Kostka 1: 5` |
| `f"{i}: {oczka}"` | `0: 5` |
| `f"Średnia: {srednia:.2f}"` | `Średnia: 4.33` |
| `"Kostka {oczka}"` (bez `f`) | `Kostka {oczka}`, bez błędu |

`print(a, b, c, sep=" ", end="\n")` składa wiersz tak: `a` + `sep` + `b` + `sep` + `c` + `end`. Domyślnie `sep` to spacja, a `end` to znak nowej linii.

| Wywołanie | Na ekranie |
| --- | --- |
| `print("Suma:", 14)` | `Suma: 14` (spacja od `sep`, nie dopisuj własnej) |
| `print(7, 2, 9, sep=", ")` | `7, 2, 9` |
| `print(7, end=" ")` trzy razy, potem `print()` | `7 2 9` i nowa linia |

`", ".join(lista)` wstawia separator tylko ==między== elementami, więc na końcu nie zostaje przecinek. Działa wyłącznie na napisach, dlatego liczby najpierw idą przez `map(str, liczby)`.

## Składnia do zapamiętania

```python
print(f"Kostka {i + 1}: {oczka[i]}")
print(f"{i}: {liczby[i]}")
print(f"Średnia: {srednia:.2f}")
print("Liczba punktów:", punkty)
print(", ".join(map(str, liczby)))
print(*liczby, sep=", ")
for liczba in liczby:
    print(liczba, end=" ")
print()
```

## Przykład

```python wypisz.py {5,7,8,10}
oczka = [5, 2, 6]
suma = sum(oczka)
srednia = suma / len(oczka)
for i in range(len(oczka)):
    print(f"Kostka {i + 1}: {oczka[i]}")
print("Wyrzucone oczka:", ", ".join(map(str, oczka)))
print(f"Średnia oczek: {srednia:.2f}")
print("Suma: " + str(suma))
for liczba in oczka:
    print(liczba, end=" ")
print()
```

```wynik
$ python wypisz.py
Kostka 1: 5
Kostka 2: 2
Kostka 3: 6
Wyrzucone oczka: 5, 2, 6
Średnia oczek: 4.33
Suma: 13
5 2 6
```

1. Numer kostki to indeks + 1, bo indeksy liczą się od 0.
2. `:.2f` zaokrągla do dwóch miejsc tylko przy wypisaniu. Zmienna `srednia` dalej ma pełną wartość.
3. Sklejanie `+` wymaga napisów, więc `str(suma)`. W f-stringu konwersja dzieje się sama.
4. `end=" "` zamiast nowej linii. Pusty `print()` kończy wiersz.

## Pułapki

- Trzymaj się wzoru z treści co do znaku: „Kostka 1: 5” liczy od 1 (2024 cze), a „<indeks>: <wartość>” to indeks tablicy, czyli od 0 (R.2.7, 2025 sty).
- Sam `print(srednia)` bez opisu to słaba komunikacja z użytkownikiem (R.1.7). Każdy wynik poprzedź tekstem.
- `", ".join(liczby)` na liście liczb kończy się `TypeError`. Najpierw `map(str, liczby)`.
- Pętla z `print(liczba, end=", ")` zostawia przecinek po ostatniej liczbie. `join` albo `sep` tego nie robią (R.2.7, 2022 cze).

## Powiązane

- [Zmienne i typy](#/karta/konsola/01-zmienne-i-typy)
- [enumerate(): indeks i wartość](#/karta/konsola/07-enumerate)
- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
