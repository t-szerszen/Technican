---
tytul: "Ręcznie: min, max, suma, liczenie"
dzial: konsola
tagi: [python, maksimum, minimum, suma, zliczanie, indeks, pętla, bez funkcji wbudowanych]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/controlflow.html#for-statements
  - https://docs.python.org/3/library/stdtypes.html#range
  - Arkusz INF.04 2021 cze (założenia: bez gotowych funkcji sortowania i szukania maksimum)
  - Zasady oceniania INF.04 2021 cze (R.2.1, R.2.2, R.2.4), 2024 cze (R.2.6), 2025 sty (R.2.9, R.2.10)
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

Suma i licznik działają tak samo: zmienna startuje od 0 ==przed pętlą== (w środku zerowałaby się w każdym obrocie), a w każdym obrocie dodajesz element albo, gdy warunek jest prawdziwy, 1.

## Składnia do zapamiętania

```python
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
print("Dni z temperaturą -5 lub niższą:", ile_mrozow)
```

```wynik
$ python reczne.py
Max: -2 pod indeksem 1
Min: -8
Suma: -20 | średnia: -4.0
Dni z temperaturą -5 lub niższą: 2
```

1. Start od indeksu 0, czyli od pierwszego elementu, nie od zera jako wartości.
2. Pętla od 1, bo element 0 jest już kandydatem.
3. Minimum tak samo: start od `temperatury[0]`, znak `<`.
4. Suma zaczyna od 0, bo 0 nic nie dodaje.
5. Licznik rośnie tylko, gdy warunek jest prawdziwy.

## Pułapki

- W 2021 cze treść zabraniała gotowych funkcji sortowania i szukania maksimum, a zasady sprawdzają w kodzie metodę szukającą (R.2.1, R.2.2). `max()`, `sorted()` czy `sort()` łamią treść. Szukaj pętlą.
- Metoda szukająca w 2021 cze miała mieć zasięg prywatny (R.2.4): w Pythonie `def __indeks_maksimum(self):`.
- `najwieksza = 0` na starcie psuje wynik dla samych ujemnych: dla tej listy żaden element nie jest większy od 0, więc wyszłoby 0, którego w liście nie ma. Tak samo `najmniejsza = 0` dla samych dodatnich. Startuj od `liczby[0]`.
- Wyświetlanie nieparzystych i zwracanie ich liczby (2025 sty R.2.9): `print` w pętli, `return ile` dopiero po pętli, nie w jej środku.
- Średnia to suma przez rozmiar (2025 sty R.2.10). `//` zamiast `/` obetnie część ułamkową.

## Powiązane

- [sum, len, min, max, count, index, sorted](#/karta/konsola/21-funkcje-wbudowane)
- [Sortowanie przez wybieranie](#/karta/konsola/29-sortowanie-przez-wybieranie)
- [Średnia i liczby nieparzyste](#/karta/konsola/32-srednia-i-nieparzyste)
- [Metody i metoda tylko dla klasy](#/karta/konsola/16-metody-i-metoda-prywatna)
