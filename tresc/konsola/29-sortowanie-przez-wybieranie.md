---
tytul: "Sortowanie przez wybieranie"
dzial: konsola
tagi: [python, algorytm, sortowanie, wybieranie, maksimum, zamiana]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/simple_stmts.html#assignment-statements
  - https://docs.python.org/3/library/functions.html#input
  - Zasady oceniania INF.04 2021 cze (R.2.2-R.2.7)
arkusze: [2021 cze]
---

## Po co to jest

Ręczne sortowanie. W 2021 cze trzeba było tak posortować ==malejąco== tablicę 10 liczb z klawiatury, a szukanie maksimum miało być osobną metodą. Gotowe `sorted()`, `sort()` i `max()` były zabronione, a za sam algorytm przez wybieranie był osobny punkt (R.2.3).

## Jak to działa

Dla każdej pozycji `i` od lewej:

1. Znajdź indeks największego elementu wśród `liczby[i]`, …, `liczby[n-1]`.
2. Zamień go z `liczby[i]`. Pozycja `i` jest już gotowa i więcej jej nie ruszasz.

Ślad dla `[3, 8, 1, 9, 4]` (n = 5), zakreślone = zamienione w tym kroku:

| `i` | szukasz max w | max (indeks) | zamiana | tablica po kroku |
| --- | --- | --- | --- | --- |
| 0 | 3, 8, 1, 9, 4 | 9 (3) | 0 i 3 | [==9==, 8, 1, ==3==, 4] |
| 1 | 8, 1, 3, 4 | 8 (1) | ze sobą | [9, 8, 1, 3, 4] |
| 2 | 1, 3, 4 | 4 (4) | 2 i 4 | [9, 8, ==4==, 3, ==1==] |
| 3 | 3, 1 | 3 (3) | ze sobą | [9, 8, 4, 3, 1] |

Po `n - 1` krokach ostatni element sam jest na miejscu, dlatego pętla `range(n - 1)`. Wersja rosnąca (tak opisuje algorytm arkusz 2021 cze): szukasz minimum, czyli `<` zamiast `>`.

Zamiana idzie przez bufor. R.2.6 dopuszcza też inny sposób bez utraty danych, np. `liczby[i], liczby[m] = liczby[m], liczby[i]`.

## Składnia do zapamiętania

```python
def indeks_maksimum(liczby, od):
    indeks_max = od
    for j in range(od + 1, len(liczby)):
        if liczby[j] > liczby[indeks_max]:
            indeks_max = j
    return indeks_max
def sortuj_malejaco(liczby):
    for i in range(len(liczby) - 1):    # n - 1 przejść
        m = indeks_maksimum(liczby, i)
        bufor = liczby[i]
        liczby[i] = liczby[m]
        liczby[m] = bufor
```

## Przykład

```python wybieranie.py {2,10,12-14,18}
def indeks_maksimum(liczby, od):
    indeks_max = od
    for j in range(od + 1, len(liczby)):
        if liczby[j] > liczby[indeks_max]:
            indeks_max = j
    return indeks_max


def sortuj_malejaco(liczby):
    for i in range(len(liczby) - 1):
        m = indeks_maksimum(liczby, i)
        bufor = liczby[i]
        liczby[i] = liczby[m]
        liczby[m] = bufor


liczby = []
print("Podaj 5 liczb całkowitych:")
for i in range(5):
    liczby.append(int(input(f"Liczba {i + 1}: ")))
sortuj_malejaco(liczby)
print("Malejąco:", liczby)
```

```wynik
$ python wybieranie.py
Podaj 5 liczb całkowitych:
Liczba 1: [[3]]
Liczba 2: [[8]]
Liczba 3: [[1]]
Liczba 4: [[9]]
Liczba 5: [[4]]
Malejąco: [9, 8, 4, 3, 1]
```

1. Kandydat na maksimum to pierwszy element nieposortowanej części, czyli `liczby[od]`.
2. Pętla po `n - 1` elementach, ograniczona długością listy.
3. Bufor trzyma starą wartość `liczby[i]`, zanim zostanie nadpisana.
4. Nadpisanie `liczby[i]` maksimum.
5. Stara wartość z bufora idzie na miejsce maksimum. Nic nie ginie.
6. Komunikat przed wczytaniem i jawne `int()`. W 2021 cze liczb było 10 (R.1.7).

## Pułapki

- `liczby[i] = liczby[m]` i zaraz `liczby[m] = liczby[i]` bez bufora gubi wartość: oba miejsca mają maksimum (R.2.6).
- Pętla zewnętrzna ma iść po `n` albo `n - 1` elementach (R.2.5). Wewnętrzna od `i + 1`, nie od 0, inaczej przy każdym `i` znajduje to samo maksimum, które już stoi na początku.
- Metoda szukająca zwraca max albo indeks maksimum (R.2.2); indeks wygodniejszy, bo wiesz, z czym zamienić. W 2021 cze była prywatna w klasie: w Pythonie `__indeks_maksimum` (R.2.4).
- Malejąco to `>`. Pomyłka znaku daje kolejność rosnącą i wynik niezgodny z R.2.7.

## Powiązane

- [Zadanie: sortowanie w klasie](#/karta/konsola/49-zadanie-sortowanie-w-klasie)
- [Ręcznie: min, max, suma, liczenie](#/karta/konsola/25-reczne-min-max-suma)
- [Sortowanie bąbelkowe](#/karta/konsola/30-sortowanie-babelkowe)
- [Metody i metoda tylko dla klasy](#/karta/konsola/16-metody-i-metoda-prywatna)
