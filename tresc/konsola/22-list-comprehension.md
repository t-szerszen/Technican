---
tytul: "List comprehension"
dzial: konsola
tagi: [python, list comprehension, lista, filtrowanie, pętla]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
  - Zasady oceniania INF.04 2024 cze (R.2.3), 2025 sty (R.2.9), 2025 cze (R.2.5)
arkusze: []
---

## Po co to jest

Krótki zapis pętli, która buduje nową listę: przekształć każdy element albo wybierz tylko pasujące. ==Żaden arkusz 2021-2026 tego nie wymaga== i każde zadanie da się napisać zwykłą pętlą. Ta karta jest po to, żeby rozpoznać zapis i wiedzieć, kiedy go nie używać.

## Jak to działa

`[wyrażenie for x in lista if warunek]` to zwykła pętla zapisana od środka. Python robi po kolei:

1. Tworzy pustą listę wynikową.
2. Bierze kolejne `x` z `lista` (część `for`).
3. Sprawdza `warunek`; gdy fałsz, pomija `x` (część `if`, opcjonalna).
4. Liczy `wyrażenie` dla `x` i dopisuje je na koniec listy.

Ślad dla `[int(znak) for znak in "A7-b3" if znak.isdigit()]`:

| `znak` | `isdigit()` | dopisane | lista po kroku |
| --- | --- | --- | --- |
| `"A"` | `False` | — | `[]` |
| `"7"` | `True` | `7` | `[7]` |
| `"-"` | `False` | — | `[7]` |
| `"b"` | `False` | — | `[7]` |
| `"3"` | `True` | `3` | `[7, 3]` |

To samo pętlą: ==wyrażenie idzie do append, warunek do if==.

W zadaniach przydaje się najwyżej do pustej tablicy n x 6: `[[0] * 6 for i in range(n)]` robi n osobnych wierszy (szczegóły w karcie o liście dwuwymiarowej).

## Składnia do zapamiętania

```python
cyfry = [int(znak) for znak in napis if znak.isdigit()]
cyfry = []
for znak in napis:
    if znak.isdigit():
        cyfry.append(int(znak))
nieparzyste = [liczba for liczba in liczby if liczba % 2 != 0]
zestawy = [[0] * 6 for i in range(n)]
```

## Przykład

```python skladane.py {4,5,10}
liczby = [3, 8, 5, 12, 7]
kod = "A7-b3-9"

nieparzyste = [liczba for liczba in liczby if liczba % 2 != 0]
cyfry = [int(znak) for znak in kod if znak.isdigit()]
print("Nieparzyste:", nieparzyste)
print("Cyfry:", cyfry)

wynik = []
for liczba in liczby:
    if liczba % 2 != 0:
        wynik.append(liczba)
print("Pętlą to samo:", wynik == nieparzyste)
```

```wynik
$ python skladane.py
Nieparzyste: [3, 5, 7]
Cyfry: [7, 3, 9]
Pętlą to samo: True
```

1. Filtr: zostają tylko liczby, dla których warunek jest prawdziwy.
2. Przekształcenie i filtr naraz: najpierw `if`, potem `int(znak)`.
3. Ta sama lista zwykłą pętlą: tak pisz na egzaminie.

## Pułapki

- Zasady mówią o wypełnianiu i wyświetlaniu tablicy „w oparciu o pętlę” (2024 cze R.2.3) i „za pomocą pętli” (2025 cze R.2.5). Nie rozstrzygają, czy list comprehension się liczy. Zwykły `for` jest bezpieczniejszy, bo egzaminator widzi pętlę od razu.
- Gdy w pętli trzeba coś wypisać i policzyć naraz (wyświetl nieparzyste i zwróć ich liczbę, 2025 sty R.2.9), list comprehension nie pasuje. Pisz zwykłą pętlę z `print` i licznikiem.

## Powiązane

- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [Lista dwuwymiarowa](#/karta/konsola/09-lista-dwuwymiarowa)
- [join, split, strip, isdigit, count, in](#/karta/konsola/23-metody-napisow)
