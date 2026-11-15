---
tytul: "Palindrom i odwracanie napisu"
dzial: konsola
tagi: [python, napis, palindrom, odwracanie, wycinek]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
  - https://docs.python.org/3/library/stdtypes.html#str.lower
  - https://docs.python.org/3/library/stdtypes.html#str.replace
arkusze: []
---

## Po co to jest

Palindrom czytany od końca jest taki sam: „kajak”, „Kobyła ma mały bok”. Schemat: wyczyść napis, odwróć go, porównaj z oryginałem. Odwracanie to pętla od ostatniego indeksu, a skrót `[::-1]` robi to samo w jednej linii.

## Jak to działa

**Odwracanie pętlą.** Indeksy idą od `len(napis) - 1` do `0`, a każdy znak ==doklejasz na koniec wyniku==. Ślad dla `"kot"`:

| `i` | `napis[i]` | `odwrocony` po kroku |
| --- | --- | --- |
| start | — | `""` |
| 2 | `t` | `"t"` |
| 1 | `o` | `"to"` |
| 0 | `k` | `"tok"` |

**Skrót.** `napis[::-1]` to wycinek z krokiem `-1`: bez startu i stopu idzie od ostatniego znaku do pierwszego. `"kot"[::-1]` daje `"tok"`.

**Czyszczenie.** `napis.lower().replace(" ", "")` robi małe litery i usuwa spacje. Z „Kobyła ma mały bok” zostaje „kobyłamamałybok”, a to czytane od końca jest takie samo. Polskie litery to zwykłe znaki: `"Ł".lower()` daje `"ł"`.

## Składnia do zapamiętania

```python
napis = "kot"
odwrocony = ""
for i in range(len(napis) - 1, -1, -1):
    odwrocony = odwrocony + napis[i]
skrot = napis[::-1]
czysty = napis.lower().replace(" ", "")
jest_palindromem = czysty == czysty[::-1]
```

## Przykład

```python palindrom.py {3,9,10}
def odwroc(napis):
    odwrocony = ""
    for i in range(len(napis) - 1, -1, -1):
        odwrocony = odwrocony + napis[i]
    return odwrocony


def czy_palindrom(napis):
    czysty = napis.lower().replace(" ", "")
    return czysty == odwroc(czysty)


tekst = input("Podaj tekst: ")
print("Od końca:", odwroc(tekst))
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

1. Start `len(napis) - 1` (ostatni indeks), stop `-1`, krok `-1`: ostatni obrót ma `i = 0`.
2. Czyszczenie przed porównaniem. Bez `lower()` „K” i „k” są różne.
3. Porównanie daje od razu `True` albo `False`, więc funkcja zwraca `bool`.

## Pułapki

- Stop `0` w `range(len(napis) - 1, 0, -1)` gubi pierwszy znak: z „kot” wyjdzie „to”.
- `napis.reverse()` rzuca `AttributeError`: to metoda listy, napis jej nie ma.
- `napis.lower()` nie zmienia napisu, tylko zwraca nowy. Bez przypisania wynik ginie.
- `replace(" ", "")` usuwa tylko spacje. „Kobyła, ma mały bok” zachowa przecinek i nie wyjdzie palindromem.

## Powiązane

- [join, split, strip, isdigit, count, in](#/karta/konsola/23-metody-napisow)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [Zliczanie znaków](#/karta/konsola/39-zliczanie-znakow)
