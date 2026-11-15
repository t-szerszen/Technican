---
tytul: "Palindrom i odwracanie napisu"
dzial: konsola
tagi: [python, napis, palindrom, odwracanie, wycinek, dwa wskaźniki]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
  - https://docs.python.org/3/library/stdtypes.html#str.lower
  - https://docs.python.org/3/library/stdtypes.html#str.replace
  - https://docs.python.org/3/library/functions.html#reversed
arkusze: []
---

## Po co to jest

Palindrom czytany od końca jest taki sam: „kajak”, „Kobyła ma mały bok”. To klasyczne zadanie na napisach: odwróć, porównaj, pomiń wielkość liter i spacje. Indeks od końca i dwa wskaźniki przydają się potem też przy tablicach.

## Jak to działa

**Od końca.** `"kot"[::-1]` daje `"tok"`: krok `-1` bez startu i stopu idzie od ostatniego znaku do pierwszego. Ręcznie: pętla idzie po indeksach od `len(napis) - 1` do `0` i ==dokleja każdy znak na koniec wyniku==. Ślad dla `"kot"`:

| `i` | `napis[i]` | `odwrocony` po kroku |
| --- | --- | --- |
| start | — | `""` |
| 2 | `t` | `"t"` |
| 1 | `o` | `"to"` |
| 0 | `k` | `"tok"` |

**Dwa wskaźniki.** `lewy` startuje z początku, `prawy` z końca. Gdy znaki są równe, oba wskaźniki idą do środka. Przy pierwszej różnicy koniec: to nie palindrom. Gdy się spotkają, wszystkie pary były równe.

| Napis | `lewy` | `prawy` | porównanie | co dalej |
| --- | --- | --- | --- | --- |
| `kajak` | 0 | 4 | `k` i `k` | równe, idź do środka |
| `kajak` | 1 | 3 | `a` i `a` | równe, idź do środka |
| `kajak` | 2 | 2 | — | `lewy < prawy` fałsz: palindrom |
| `rower` | 0 | 4 | `r` i `r` | równe, idź do środka |
| `rower` | 1 | 3 | `o` i `e` | różne: `return False` |

**Wielkość liter i spacje.** Przed sprawdzaniem wyczyść napis: `napis.lower().replace(" ", "")`. Z „Kobyła ma mały bok” zostaje „kobyłamamałybok”. Polskie litery to zwykłe znaki: `"Ł".lower()` daje `"ł"`.

## Składnia do zapamiętania

```python
odwrocony = napis[::-1]
odwrocony = "".join(reversed(napis))
odwrocony = ""
for i in range(len(napis) - 1, -1, -1):
    odwrocony = odwrocony + napis[i]
czysty = napis.lower().replace(" ", "")
jest_palindromem = czysty == czysty[::-1]
```

## Przykład

```python palindrom.py {2,5,7}
def czy_palindrom(napis):
    czysty = napis.lower().replace(" ", "")
    lewy = 0
    prawy = len(czysty) - 1
    while lewy < prawy:
        if czysty[lewy] != czysty[prawy]:
            return False
        lewy += 1
        prawy -= 1
    return True


tekst = input("Podaj tekst: ")
print("Od końca:", tekst[::-1])
if czy_palindrom(tekst):
    print("To jest palindrom.")
else:
    print("To nie jest palindrom.")
```

```wynik
$ python palindrom.py
Podaj tekst: [[Kobyła ma mały bok]]
Od końca: kob yłam am ałyboK
To jest palindrom.
```

1. Czyszczenie przed porównaniem: małe litery, bez spacji. Bez tego „K” i „k” są różne.
2. `lewy < prawy`: pętla kończy się, gdy wskaźniki się spotkają albo miną. Środkowy znak nie ma pary.
3. Pierwsza różna para od razu kończy funkcję. `return True` jest dopiero za pętlą.

## Pułapki

- Napis nie ma metody `reverse()`. `reversed(napis)` daje iterator, nie napis: potrzebny `"".join(...)`.
- `napis.lower()` nie zmienia napisu, tylko zwraca nowy. Bez przypisania wynik ginie.
- `replace(" ", "")` usuwa tylko spacje. Przecinki i kropki zostają, więc „Kajak, kajak” wymaga też ich usunięcia.
- `return True` wewnątrz pętli kończy po pierwszej parze. Funkcja zwracająca wynik musi mieć `return` na każdej ścieżce (tak oceniano funkcje w R.2.1, 2024 sty).
- Pętla od końca to `range(len(napis) - 1, -1, -1)`. Stop `0` zgubiłby pierwszy znak.

## Powiązane

- [join, split, strip, isdigit, count, in](#/karta/konsola/23-metody-napisow)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [Zliczanie znaków](#/karta/konsola/39-zliczanie-znakow)
