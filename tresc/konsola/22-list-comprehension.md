---
tytul: "List comprehension"
dzial: konsola
tagi: [python, list comprehension, lista, filtrowanie, pętla]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
  - Zasady oceniania INF.04 2024 cze (R.2.3), 2025 sty (R.1.1, R.2.9), 2025 cze (R.2.5)
arkusze: []
---

## Po co to jest

Krótki zapis pętli, która buduje nową listę: przekształć każdy element albo wybierz tylko pasujące. Przydaje się w pomocniczych miejscach: cyfry z napisu, pusta tablica dwuwymiarowa, szybkie sprawdzenie w programie głównym. Żaden arkusz tego nie wymaga.

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

```python
cyfry = []
for znak in "A7-b3":
    if znak.isdigit():
        cyfry.append(int(znak))
```

## Składnia do zapamiętania

```python
kwadraty = [liczba * liczba for liczba in liczby]
nieparzyste = [liczba for liczba in liczby if liczba % 2 != 0]
cyfry = [int(znak) for znak in napis if znak.isdigit()]
duze = [imie.upper() for imie in imiona]
zera = [0 for i in range(10)]
zestawy = [[0] * 6 for i in range(n)]
```

## Przykład

```python skladane.py {4,5,6,17}
liczby = [3, 8, 5, 12, 7]
kod = "A7-b3-9"

kwadraty = [liczba * liczba for liczba in liczby]
nieparzyste = [liczba for liczba in liczby if liczba % 2 != 0]
cyfry = [int(znak) for znak in kod if znak.isdigit()]
print("Kwadraty:", kwadraty)
print("Nieparzyste:", nieparzyste)
print("Cyfry:", cyfry, "suma:", sum(cyfry))

wynik = []
for liczba in liczby:
    if liczba % 2 != 0:
        wynik.append(liczba)
print("Pętlą to samo:", wynik == nieparzyste)

zestawy = [[0] * 3 for i in range(2)]
zestawy[0][0] = 9
print("Wiersz 0:", zestawy[0], "wiersz 1:", zestawy[1])
```

```wynik
$ python skladane.py
Kwadraty: [9, 64, 25, 144, 49]
Nieparzyste: [3, 5, 7]
Cyfry: [7, 3, 9] suma: 19
Pętlą to samo: True
Wiersz 0: [9, 0, 0] wiersz 1: [0, 0, 0]
```

1. Samo przekształcenie: bez `if` każdy element trafia do wyniku.
2. Filtr: zostają tylko te, dla których warunek jest prawdziwy.
3. Przekształcenie i filtr naraz: najpierw `if`, potem `int(znak)`.
4. Każdy wiersz to osobna lista `[0] * 3`, więc zmiana `[0][0]` nie rusza drugiego wiersza.

## Pułapki

- Gdy w pętli trzeba coś wypisać, policzyć i zwrócić naraz (np. wyświetl nieparzyste i zwróć ich liczbę, 2025 sty R.2.9), pisz zwykłą pętlę. Czytelność kodu to osobne kryterium (R.1.1).
- Zasady mówią o wypełnianiu i wyświetlaniu tablicy „za pomocą pętli” (2024 cze R.2.3, 2025 cze R.2.5). Zwykły `for` jest tu bezpieczniejszy, bo egzaminator widzi go od razu.
- `[[0] * 6] * n` robi n odwołań do jednego wiersza: zmiana jednego zmienia wszystkie. Pisz `[[0] * 6 for i in range(n)]`.
- `print` w środku nawiasów to zły pomysł: lista wyników zapełnia się wartościami `None`.
- Kolejność to `wyrażenie for ... if ...`. Zapis `[for x in lista ...]` bez wyrażenia na początku to `SyntaxError`.

## Powiązane

- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [Lista dwuwymiarowa](#/karta/konsola/09-lista-dwuwymiarowa)
- [Metody napisów](#/karta/konsola/23-metody-napisow)
