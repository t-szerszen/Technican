---
tytul: "f-stringi i print()"
dzial: konsola
tagi: [python, print, f-string, formatowanie, sep, end]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals
  - https://docs.python.org/3/library/functions.html#print
  - https://docs.python.org/3/tutorial/controlflow.html#unpacking-argument-lists
  - Zasady oceniania INF.04 2022 cze (R.2.7), 2023 cze (R.1.7), 2024 cze (R.1.7), 2025 sty (R.2.7)
arkusze: [2022 cze, 2023 cze, 2024 cze, 2025 sty, 2025 cze]
---

## Po co to jest

Arkusze podają gotowy wzór wyniku: „Kostka <numer-kostki>: <liczba-oczek>” (2024 cze), „<index_tablicy>: <wartość>” (2025 sty), liczby oddzielone przecinkami (2022 cze), „Losowanie 1: 18 31 49 ...” (2025 cze). Za ==wyniki opatrzone komentarzem== jest punkt w R.1.7 (2024 cze).

## Jak to działa

f-string to napis z literą `f` przed cudzysłowem. Python liczy każde wyrażenie w `{}` i wkleja wynik jako tekst. Po dwukropku można dać format, np. `:.2f` to dwa miejsca po przecinku.

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
| `print(7, end=" ")` trzy razy, potem `print()` | `7 7 7` i nowa linia |
| `print(*[7, 2, 9], sep=", ")` | `7, 2, 9` |

Gwiazdka w `print(*liczby)` rozkłada listę na osobne argumenty, jakby napisać `print(7, 2, 9)`. Wtedy `sep` wstawia się ==tylko między== liczbami, więc na końcu nie zostaje przecinek.

## Składnia do zapamiętania

```python
print(f"Kostka {i + 1}: {oczka[i]}")
print(f"{i}: {liczby[i]}")
print(f"Średnia: {srednia:.2f}")
print("Liczba punktów:", punkty)
print(*liczby, sep=", ")
for liczba in liczby:
    print(liczba, end=" ")
print()
```

## Przykład

```python wypisz.py {5,6,8,10}
oczka = [5, 2, 6]
suma = sum(oczka)
srednia = suma / len(oczka)
for i in range(len(oczka)):
    print(f"Kostka {i + 1}: {oczka[i]}")
print("Suma oczek:", suma)
print(f"Średnia oczek: {srednia:.2f}")
print(*oczka, sep=", ")
for oczko in oczka:
    print(oczko, end=" ")
print()
```

```wynik
$ python wypisz.py
Kostka 1: 5
Kostka 2: 2
Kostka 3: 6
Suma oczek: 13
Średnia oczek: 4.33
5, 2, 6
5 2 6
```

1. Numer kostki to indeks + 1, bo indeksy liczą się od 0.
2. Kilka argumentów `print` rozdziela spacja, liczba nie potrzebuje `str()`.
3. `*oczka` rozkłada listę, `sep=", "` daje przecinki tylko między liczbami.
4. `end=" "` zamiast nowej linii. Pusty `print()` kończy wiersz.

## Pułapki

- Trzymaj się wzoru z treści co do znaku: „Kostka 1: 5” liczy od 1 (2024 cze), a „<index_tablicy>: <wartość>” to indeks tablicy, czyli od 0 (R.2.7, 2025 sty).
- `:.2f` zaokrągla tylko na ekranie. Zmienna `srednia` dalej ma pełną wartość, więc metoda ma zwracać `srednia`, a formatuje dopiero `print`.
- `print(oczka)` wypisze nawiasy kwadratowe, a 2022 cze chce liczb oddzielonych przecinkami (R.2.7). Pętla z `end=", "` zostawia przecinek po ostatniej liczbie. Zasady o tym nie mówią, ale `sep=", "` go nie zostawia, więc jest pewniejsze.

## Powiązane

- [Zmienne i typy](#/karta/konsola/01-zmienne-i-typy)
- [enumerate(): indeks i wartość](#/karta/konsola/07-enumerate)
- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
