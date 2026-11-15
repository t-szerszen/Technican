---
tytul: "Wyszukiwanie binarne"
dzial: konsola
tagi: [python, algorytm, wyszukiwanie, binarne, while, dzielenie całkowite]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations
  - https://docs.python.org/3/library/bisect.html#bisect.bisect_left
  - Zasady oceniania INF.04 2025 sty (R.1.4, R.2.3)
arkusze: []
---

## Po co to jest

Szybkie szukanie w ==posortowanej== liście: każde porównanie wyrzuca połowę kandydatów. W arkuszach 2021-2026 nie padło, ale to klasyczny algorytm, który warto umieć obok liniowego. Inna nazwa: wyszukiwanie połówkowe.

## Jak to działa

Pilnujesz przedziału `lewy..prawy` (na start cała lista), w którym szukana jeszcze może być.

1. Dopóki `lewy <= prawy`: `srodek = (lewy + prawy) // 2`.
2. Trafienie: zwróć `srodek`. Środek za mały: `lewy = srodek + 1`. Za duży: `prawy = srodek - 1`.
3. Gdy `lewy > prawy`, przedział jest pusty: zwróć -1.

Ślad dla `[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]`, szukana `23`:

| Krok | `lewy` | `prawy` | `srodek` | `liczby[srodek]` | przedział po kroku |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 9 | 4 | 16 < 23 | `lewy = 5`: [23, 38, 56, 72, 91] |
| 2 | 5 | 9 | 7 | 56 > 23 | `prawy = 6`: [23, 38] |
| 3 | 5 | 6 | 5 | ==23 trafione== | `return 5` |

Szukana `7` w tej samej liście:

| Krok | `lewy` | `prawy` | `srodek` | `liczby[srodek]` | przedział po kroku |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 9 | 4 | 16 > 7 | `prawy = 3`: [2, 5, 8, 12] |
| 2 | 0 | 3 | 1 | 5 < 7 | `lewy = 2`: [8, 12] |
| 3 | 2 | 3 | 2 | 8 > 7 | `prawy = 1`: pusty |
| koniec | 2 | 1 | — | `lewy > prawy` | `return -1` |

Dziesięć elementów, najwyżej cztery porównania. Liniowe zrobiłoby do dziesięciu.

## Składnia do zapamiętania

```python
def szukaj_binarnie(liczby, szukana):
    lewy = 0
    prawy = len(liczby) - 1
    while lewy <= prawy:
        srodek = (lewy + prawy) // 2
        if liczby[srodek] == szukana:
            return srodek
        elif liczby[srodek] < szukana:
            lewy = srodek + 1
        else:
            prawy = srodek - 1
    return -1
```

## Przykład

```python binarne.py {5,9,12}
def szukaj_binarnie(liczby, szukana):
    lewy = 0
    prawy = len(liczby) - 1
    while lewy <= prawy:
        srodek = (lewy + prawy) // 2
        if liczby[srodek] == szukana:
            return srodek
        elif liczby[srodek] < szukana:
            lewy = srodek + 1
        else:
            prawy = srodek - 1
    return -1


liczby = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
for szukana in [23, 91, 7]:
    indeks = szukaj_binarnie(liczby, szukana)
    if indeks == -1:
        print(f"{szukana}: brak w tablicy")
    else:
        print(f"{szukana}: indeks {indeks}")
```

```wynik
23: indeks 5
91: indeks 9
7: brak w tablicy
```

1. `//` to dzielenie całkowite: `(0 + 9) // 2` daje 4, a nie 4.5. Indeks musi być liczbą całkowitą.
2. `srodek + 1` (i niżej `srodek - 1`), bo środek już sprawdzony. Bez tego pętla potrafi kręcić się w nieskończoność.
3. -1 dopiero po pętli, gdy przedział się opróżnił.

## Pułapki

- Lista musi być posortowana rosnąco. Na nieposortowanej nie ma błędu, ale wynik może być -1, choć liczba w liście jest. Posortuj ją wcześniej albo użyj liniowego.
- `while lewy < prawy` gubi przedział z jednym elementem: szukana 91 na ostatnim miejscu nie zostanie znaleziona.
- `srodek = (lewy + prawy) / 2` daje float, a `liczby[4.5]` kończy się `TypeError`.
- Przy powtórzeniach zwraca któreś wystąpienie, niekoniecznie pierwsze. Gdy treść chce pierwszego (jak 2025 sty), pisz liniowe.
- Funkcja zwraca indeks, czyli liczbę całkowitą, na każdej ścieżce (typ zwracany punktowano np. w R.2.3, 2025 sty). Nazwy `lewy`, `prawy`, `srodek` są znaczące, `l`, `p`, `s` mogą kosztować punkt (R.1.4).
- Gotowiec: `bisect.bisect_left(liczby, szukana)` zwraca miejsce wstawienia, nie -1. Na egzaminie z opisem algorytmu pisz pętlę sam.

## Powiązane

- [Wyszukiwanie liniowe z -1](#/karta/konsola/26-wyszukiwanie-liniowe)
- [Sortowanie przez wybieranie](#/karta/konsola/29-sortowanie-przez-wybieranie)
- [//, % i divmod](#/karta/konsola/24-dzielenie-i-reszta)
- [Pętla while](#/karta/konsola/06-petla-while)
