---
tytul: "Zadanie: loteria"
dzial: konsola
tagi: [python, zadanie, funkcje, lista dwuwymiarowa, random, bez powtórzeń, zliczanie]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/random.html#random.randint
  - https://docs.python.org/3/library/random.html#random.sample
  - https://docs.python.org/3/tutorial/controlflow.html#unpacking-argument-lists
  - Arkusz INF.04 2025 cze, część I
  - Zasady oceniania INF.04 2025 cze (R.1.1-R.1.7, R.2.1-R.2.8)
arkusze: [2025 cze]
---

## Po co to jest

Typ zadania: losowanie wielu zestawów liczb bez powtórzeń w zestawie, zapis w liście dwuwymiarowej, wypisanie zestawów i policzenie, ile razy wypadła każda liczba. Podejście strukturalne: co najmniej dwie funkcje, bez zmiennych globalnych.

## Jak to działa

Plan rozwiązania:

1. Wczytaj liczbę zestawów przez `int(input())` (R.1.5).
2. `losuj_zestawy(liczba_zestawow)` buduje listę list i ==zwraca ją==. Dzięki `return` dane nie giną po wyjściu z funkcji (R.2.1, R.2.2).
3. Zestaw rośnie w `while len(zestaw) < 6`, a liczba wchodzi tylko, gdy `not in zestaw` (R.2.3, R.2.6).
4. Zewnętrzna pętla `for` obraca się tyle razy, ile zestawów wpisano (R.2.4).
5. `wyswietl_zestawy(zestawy)` wypisuje każdy zestaw w pętli (R.2.5).
6. Zliczanie: lista 50 zer, `wystapienia[liczba] += 1` dla każdej liczby z każdego zestawu. Indeks to sama liczba, indeks 0 zostaje pusty (R.2.7).

Ślad budowy jednego zestawu (przykładowe losowania):

| Wylosowano | `liczba not in zestaw` | `zestaw` po kroku |
| --- | --- | --- |
| 12 | tak | `[12]` |
| 40 | tak | `[12, 40]` |
| 12 | nie, pomijam | `[12, 40]` |
| 7 | tak | `[12, 40, 7]` |
| 33, 2, 19 | tak | `[12, 40, 7, 33, 2, 19]`, koniec |

Dlatego `while`, a nie `for i in range(6)`: przy powtórce trzeba losować jeszcze raz, więc nie wiadomo z góry, ile będzie obrotów.

Gotowiec `random.sample(range(1, 50), 6)` też daje 6 różnych liczb. Ręczna pętla jest jednak bezpieczna, bo kryterium mówi o zaimplementowaniu losowania bez powtórzeń.

## Składnia do zapamiętania

```python
def losuj_zestawy(liczba_zestawow):
    zestawy = []
    for i in range(liczba_zestawow):
        zestaw = []
        while len(zestaw) < 6:
            liczba = random.randint(1, 49)
            if liczba not in zestaw:
                zestaw.append(liczba)
        zestawy.append(zestaw)
    return zestawy
```

## Przykład

`random.seed(6729)` jest tylko po to, żeby wynik na karcie był zawsze ten sam. Na egzaminie go nie pisz.

```python loteria.py {10,13,19,26,32}
import random


def losuj_zestawy(liczba_zestawow):
    zestawy = []
    for i in range(liczba_zestawow):
        zestaw = []
        while len(zestaw) < 6:
            liczba = random.randint(1, 49)
            if liczba not in zestaw:
                zestaw.append(liczba)
        zestawy.append(zestaw)
    return zestawy


def wyswietl_zestawy(zestawy):
    print("Zestawy wylosowanych liczb:")
    for i in range(len(zestawy)):
        print(f"Losowanie {i + 1}:", *zestawy[i])


def policz_wystapienia(zestawy):
    wystapienia = [0] * 50
    for zestaw in zestawy:
        for liczba in zestaw:
            wystapienia[liczba] += 1
    return wystapienia


random.seed(6729)  # tylko na potrzeby karty
liczba_zestawow = int(input("Ile wygenerować losowań? "))
zestawy = losuj_zestawy(liczba_zestawow)
wyswietl_zestawy(zestawy)
wystapienia = policz_wystapienia(zestawy)
for liczba in range(1, 50):
    if wystapienia[liczba] > 0:
        print(f"Wystąpienia liczby {liczba}: {wystapienia[liczba]}")
```

```wynik
$ python loteria.py
Ile wygenerować losowań? [[3]]
Zestawy wylosowanych liczb:
Losowanie 1: 18 5 13 30 49 33
Losowanie 2: 24 49 33 27 43 30
Losowanie 3: 30 24 31 49 13 18
Wystąpienia liczby 5: 1
Wystąpienia liczby 13: 2
Wystąpienia liczby 18: 2
Wystąpienia liczby 24: 2
Wystąpienia liczby 27: 1
Wystąpienia liczby 30: 3
Wystąpienia liczby 31: 1
Wystąpienia liczby 33: 2
Wystąpienia liczby 43: 1
Wystąpienia liczby 49: 3
```

1. Bez powtórzeń: liczba, która już jest w zestawie, nie wchodzi drugi raz.
2. `return` oddaje całą listę do programu głównego.
3. `*zestawy[i]` rozpakowuje zestaw, więc `print` wypisze liczby rozdzielone spacją.
4. Licznik dla liczby 30 to `wystapienia[30]`, bez przeliczania indeksów.
5. Wynik funkcji trzeba przypisać do zmiennej, inaczej przepada.

## Pułapki

- Funkcja, która tworzy listę w środku i nic nie zwraca, gubi dane po wyjściu (R.2.1). Albo `return`, albo lista utworzona w programie głównym i przekazana parametrem.
- Lista zestawów poza funkcjami, z której funkcje korzystają bez parametru, to zmienna globalna. To też kosztuje R.2.1.
- `random.randint(1, 49)` obejmuje oba końce. `randrange(1, 49)` nigdy nie da 49.
- `[[0] * 6] * n` tworzy n odwołań do ==tej samej== listy: zmiana jednego wiersza zmienia wszystkie. Buduj wiersze w pętli przez `append`.
- Wystarczy wypisać liczby, które wypadły choć raz (R.2.7), ale zliczanie ma objąć wszystkie liczby 1..49.
- Nazwy `tab`, `tablica`, `kolekcja` nie spełniają R.1.4 w tym arkuszu.
- Nie zapomnij komentarza-nagłówka do jednej, dowolnej funkcji według wzoru z części III.

## Powiązane

- [Lista dwuwymiarowa](#/karta/konsola/09-lista-dwuwymiarowa)
- [Funkcje](#/karta/konsola/11-funkcje)
- [Moduł random](#/karta/konsola/20-random)
- [Pętla while](#/karta/konsola/06-petla-while)
- [Komentarz-nagłówek](#/karta/dokumentacja/01-komentarz-naglowek)
