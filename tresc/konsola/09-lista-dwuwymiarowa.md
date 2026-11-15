---
tytul: "Lista dwuwymiarowa"
dzial: konsola
tagi: [python, lista, dwuwymiarowa, tablica, wiersz, kolumna, pętla zagnieżdżona]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions
  - https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
  - https://docs.python.org/3/faq/programming.html#how-do-i-create-a-multidimensional-list
  - Zasady oceniania INF.04 2025 cze (R.2.1, R.2.2, R.2.4, R.2.5)
arkusze: [2025 cze]
---

## Po co to jest

Tablica dwuwymiarowa n x 6 to w Pythonie lista list: każdy wiersz to osobna lista. Tak przechowuje się n zestawów po 6 liczb w loterii (2025 cze).

## Jak to działa

`zestawy[w][k]` czyta się w dwóch krokach: `zestawy[w]` daje ==cały wiersz== (listę), a `[k]` wybiera z niego element.

| `zestawy` | k = 0 | k = 1 | k = 2 |
| --- | --- | --- | --- |
| w = 0 | 3 | 17 | 42 |
| w = 1 | 8 | 25 | 11 |

`zestawy[1]` to `[8, 25, 11]`, a `zestawy[1][2]` to `11`. `len(zestawy)` to liczba wierszy, `len(zestawy[0])` to liczba kolumn.

Budowanie wiersz po wierszu:

1. `zestawy = []`, zewnętrzna lista jest pusta.
2. `w = 0`: nowy `wiersz = []`, pętla wewnętrzna dokłada 3, 17, 42, potem `zestawy.append(wiersz)` daje `[[3, 17, 42]]`.
3. `w = 1`: znowu nowy `wiersz = []`, dokłada 8, 25, 11, po `append` jest `[[3, 17, 42], [8, 25, 11]]`.

Pułapka `[[0] * 3] * 2`: `[0] * 3` tworzy ==jeden== wiersz, a `* 2` wstawia do zewnętrznej listy dwa odwołania do tego samego wiersza. Kopii nie ma.

| Kod | `plansza` po nim |
| --- | --- |
| `plansza = [[0] * 3] * 2` | `[[0, 0, 0], [0, 0, 0]]` |
| `plansza[0][0] = 7` | `[[7, 0, 0], [7, 0, 0]]` |

Zmianę w „pierwszym” wierszu widać w obu, bo to jedna lista. Samo `[0] * 3` jest bezpieczne: liczby się nie zmieniają, przypisanie wstawia nową liczbę w miejsce starej.

## Składnia do zapamiętania

```python
n = 3
zestawy = []
for w in range(n):
    wiersz = [0] * 6              # nowy wiersz w każdym obrocie
    zestawy.append(wiersz)
zestawy[0][5] = 49                # wiersz 0, kolumna 5
for w in range(len(zestawy)):
    for k in range(len(zestawy[w])):
        print(zestawy[w][k], end=" ")
    print()
tablica_zer = [[0] * 6 for w in range(n)]   # też poprawnie
```

## Przykład

```python loteria.py {5,7,11,18,25}
import random

def wylosuj_zestawy(liczba_zestawow):
    zestawy = []
    for w in range(liczba_zestawow):
        wiersz = []
        while len(wiersz) < 6:
            liczba = random.randint(1, 49)
            if liczba not in wiersz:
                wiersz.append(liczba)
        zestawy.append(wiersz)
    return zestawy

def wyswietl_zestawy(zestawy):
    for w in range(len(zestawy)):
        print(f"Losowanie {w + 1}:", end=" ")
        for k in range(len(zestawy[w])):
            print(zestawy[w][k], end=" ")
        print()

random.seed(4)  # stałe losowanie, żeby wynik był powtarzalny
n = int(input("Ile zestawów wylosować? "))
zestawy = wylosuj_zestawy(n)
wyswietl_zestawy(zestawy)
print("Pierwsza liczba drugiego zestawu:", zestawy[1][0])
```

```wynik
$ python loteria.py
Ile zestawów wylosować? [[3]]
Losowanie 1: 16 20 7 47 26 31
Losowanie 2: 10 6 5 2 26 36
Losowanie 3: 19 49 4 15 34 35
Pierwsza liczba drugiego zestawu: 10
```

1. Pętla zewnętrzna robi tyle wierszy, ile podał użytkownik.
2. `while` losuje, aż wiersz ma 6 różnych liczb; `not in` odrzuca powtórki.
3. Gotowy wiersz trafia do zewnętrznej listy, a cała lista wraca z funkcji.
4. Pętla zagnieżdżona: `w` to wiersz, `k` to kolumna, `zestawy[w][k]` to jedna liczba.
5. `zestawy[1][0]`: najpierw drugi wiersz, potem jego pierwszy element.

## Pułapki

- `[[0] * 6] * n` daje n odwołań do jednego wiersza. Wypełnianie „kolejnych” wierszy nadpisuje wszystkie naraz i na końcu masz n identycznych zestawów.
- Lista zbudowana w funkcji musi z niej wyjść przez `return`. Za dane utracone po wyjściu z funkcji losującej albo za zmienną globalną traci się punkt (R.2.1, 2025 cze).
- Liczba wierszy ma wynikać z wczytanego n, a pętle mają obsłużyć rzeczywistą liczbę losowań (R.2.2, R.2.4, 2025 cze). Pisz `range(len(zestawy))`, nie stałą.
- Wyświetlanie ma być pętlą po całej kolekcji (R.2.5, 2025 cze). `print(zestawy)` wypisze nawiasy i przecinki zamiast czytelnych wierszy.
- Kolejność indeksów: najpierw wiersz, potem kolumna. `zestawy[5][1]` przy trzech wierszach kończy się `IndexError`.
- `wiersz = []` musi stać wewnątrz pętli zewnętrznej. Postawiony przed nią daje jeden wiersz, który `append` wstawia n razy: znowu n odwołań do tej samej listy.

## Powiązane

- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [Słowniki](#/karta/konsola/10-slowniki)
- [Moduł random](#/karta/konsola/20-random)
- [Zadanie: loteria](#/karta/konsola/47-zadanie-loteria)
