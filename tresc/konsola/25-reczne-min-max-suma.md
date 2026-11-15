---
tytul: "Ręcznie: min, max, suma, liczenie"
dzial: konsola
tagi: [python, maksimum, minimum, suma, zliczanie, indeks, pętla, bez funkcji wbudowanych]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/controlflow.html#for-statements
  - https://docs.python.org/3/library/stdtypes.html#range
  - Zasady oceniania INF.04 2021 cze (R.2.1, R.2.2), 2024 cze (R.2.6), 2025 sty (R.2.3, R.2.9, R.2.10)
arkusze: [2021 cze, 2024 cze, 2025 sty]
---

## Po co to jest

W 2021 cze szukanie maksimum i sortowanie miały być napisane ==bez gotowych funkcji==, a metoda szukająca miała zwracać największą wartość albo jej indeks. Ten sam schemat pętli liczy sumę, średnią i liczbę elementów spełniających warunek (nieparzyste w 2025 sty, punkty za oczka w 2024 cze).

## Jak to działa

Maksimum: ==zacznij od pierwszego elementu==, potem porównuj z każdym następnym i zapamiętuj większy. Ślad `indeks_maksimum([-5, -2, -8, -2, -3])`, na starcie `indeks = 0`:

| `i` | `liczby[i]` | `liczby[indeks]` przed | większy? | `indeks` po |
| --- | --- | --- | --- | --- |
| 1 | -2 | -5 | tak | 1 |
| 2 | -8 | -2 | nie | 1 |
| 3 | -2 | -2 | nie (równy) | 1 |
| 4 | -3 | -2 | nie | 1 |

Znak `>` zostawia pierwsze wystąpienie. Z `>=` wynik byłby 3, czyli ostatnie wystąpienie.

Ten sam przebieg, gdy start to `najwieksza = 0` zamiast pierwszego elementu:

| Element | `najwieksza` przed | większy? | `najwieksza` po |
| --- | --- | --- | --- |
| -5 | 0 | nie | 0 |
| -2 | 0 | nie | 0 |
| -8, -2, -3 | 0 | nie | 0 |

Wynik 0, a takiej liczby w liście nie ma. Dla samych dodatnich błąd jest niewidoczny, dlatego łatwo go przeoczyć.

## Składnia do zapamiętania

```python
najwieksza = liczby[0]
indeks = 0
for i in range(1, len(liczby)):
    if liczby[i] > liczby[indeks]:
        indeks = i
suma = 0
ile = 0
for liczba in liczby:
    suma = suma + liczba
    if liczba % 2 != 0:
        ile = ile + 1
```

## Przykład

```python reczne.py {2,3,10,11,18}
def indeks_maksimum(liczby):
    indeks = 0
    for i in range(1, len(liczby)):
        if liczby[i] > liczby[indeks]:
            indeks = i
    return indeks


temperatury = [-5, -2, -8, -2, -3]
najmniejsza = temperatury[0]
suma = 0
ile_mrozow = 0
for temperatura in temperatury:
    if temperatura < najmniejsza:
        najmniejsza = temperatura
    suma = suma + temperatura
    if temperatura <= -5:
        ile_mrozow = ile_mrozow + 1

indeks = indeks_maksimum(temperatury)
print("Max:", temperatury[indeks], "pod indeksem", indeks)
print("Min:", najmniejsza)
print("Suma:", suma, "| średnia:", suma / len(temperatury))
print("Dni z mrozem -5 lub większym:", ile_mrozow)
```

```wynik
$ python reczne.py
Max: -2 pod indeksem 1
Min: -8
Suma: -20 | średnia: -4.0
Dni z mrozem -5 lub większym: 2
```

1. Start od indeksu 0, czyli od pierwszego elementu, nie od zera jako wartości.
2. Pętla od 1, bo element 0 jest już kandydatem.
3. Minimum tak samo: start od `temperatury[0]`, znak `<`.
4. Suma zaczyna od 0, bo 0 nic nie dodaje.
5. Liczenie warunkowe: licznik rośnie tylko, gdy warunek jest prawdziwy.

## Pułapki

- `max()`, `sorted()` lub `sort()` przy zakazie gotowych funkcji (2021 cze) odbierają punkty za algorytm. Szukanie maksimum ma być pętlą (R.2.1, R.2.2).
- Metoda szukająca w 2021 cze miała być widoczna tylko w klasie: w Pythonie `def __indeks_maksimum(self):`.
- `najwieksza = 0` psuje wynik dla liczb ujemnych, a `najmniejsza = 0` dla dodatnich. Zawsze startuj od `liczby[0]`.
- Zwracaj to, co mówi treść: wartość albo indeks, typ całkowity (2021 cze R.2.2, 2025 sty R.2.3). Nie mieszaj obu w jednej funkcji.
- Wyświetlanie nieparzystych i zwracanie ich liczby (2025 sty R.2.9): `print` w pętli, `return ile` dopiero po pętli, nie w jej środku.
- Średnia to `suma / len(...)` albo suma przez pole z rozmiarem (2025 sty R.2.10). `//` obetnie część ułamkową.
- `suma = 0` wewnątrz pętli zeruje sumę w każdym obrocie. Inicjalizacja zawsze przed pętlą.

## Powiązane

- [sum, len, min, max, sorted, reversed, zip](#/karta/konsola/21-funkcje-wbudowane)
- [Sortowanie przez wybieranie](#/karta/konsola/29-sortowanie-przez-wybieranie)
- [Średnia i nieparzyste](#/karta/konsola/32-srednia-i-nieparzyste)
- [Metody i metoda prywatna](#/karta/konsola/16-metody-i-metoda-prywatna)
