---
tytul: "Wyszukiwanie z wartownikiem"
dzial: konsola
tagi: [python, algorytm, wyszukiwanie, wartownik, while, randint]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types
  - https://docs.python.org/3/library/random.html#random.randint
  - https://docs.python.org/3/library/functions.html#print
  - Zasady oceniania INF.04 2022 cze (R.1.5, R.2.1-R.2.8, R.4.4)
arkusze: [2022 cze]
---

## Po co to jest

Wersja wyszukiwania, w której pętla ==nie sprawdza, czy doszła do końca tablicy==. Zamiast tego na koniec dopisujesz szukaną liczbę (wartownika), więc pętla zawsze ją w końcu trafi. Tak brzmiało całe zadanie konsolowe z 2022 cze.

## Jak to działa

1. Zapamiętaj `n = len(liczby)` i dopisz szukaną na koniec: teraz stoi pod indeksem `n`.
2. Idź `while liczby[i] != szukana: i += 1`. Bez warunku `i < n`, bo wartownik zatrzyma pętlę.
3. Usuń wartownika (`pop()`), żeby tablica wróciła do `n` elementów.
4. Jeśli `i == n`, pętla zatrzymała się na wartowniku: liczby nie było. Inaczej `i` to indeks pierwszego wystąpienia.

Ślad dla `[4, 8, 2]` (n = 3). Po dopisaniu: [4, 8, 2, ==2==] albo [4, 8, 2, ==5==].

| `i` | szukana 2: `liczby[i]` | szukana 5: `liczby[i]` |
| --- | --- | --- |
| 0 | 4 | 4 |
| 1 | 8 | 8 |
| 2 | ==2==, stop | 2 |
| 3 | — | ==5== (wartownik), stop |
| po `pop()` | `i = 2`, 2 < 3: znaleziono | `i = 3`, `3 == n`: brak |

## Składnia do zapamiętania

```python
def szukaj_z_wartownikiem(liczby, szukana):
    liczby.append(szukana)        # wartownik pod indeksem n
    i = 0
    while liczby[i] != szukana:   # bez sprawdzania końca
        i += 1
    liczby.pop()                  # tablica znów ma n elementów
    return i                      # i == n znaczy brak
```

## Przykład

```python wartownik.py {7,12,14,26}
import random


def wypelnij(rozmiar):
    liczby = []
    for i in range(rozmiar):
        liczby.append(random.randint(1, 100))
    return liczby


def szukaj_z_wartownikiem(liczby, szukana):
    liczby.append(szukana)
    i = 0
    while liczby[i] != szukana:
        i += 1
    liczby.pop()
    return i


random.seed(2022)
liczby = wypelnij(50)
szukana = int(input("Podaj szukaną liczbę (1-100): "))
indeks = szukaj_z_wartownikiem(liczby, szukana)
print("Tablica:")
print(*liczby, sep=", ")
if indeks == len(liczby):
    print(f"Liczby {szukana} nie ma w tablicy.")
else:
    print(f"Liczba {szukana} jest pod indeksem {indeks}.")
```

```wynik
$ python wartownik.py
Podaj szukaną liczbę (1-100): [[67]]
Tablica:
69, 37, 57, 70, 40, 75, 8, 67, 89, 91, 53, 88, 82, 41, 2, 98, 56, 40, 83, 81, 59, 71, 67, 73, 5, 96, 34, 6, 100, 48, 37, 52, 9, 54, 34, 57, 22, 2, 7, 30, 87, 62, 54, 9, 88, 15, 87, 14, 72, 50
Liczba 67 jest pod indeksem 7.
```

1. `randint(1, 100)` losuje z obu końców włącznie. Wypełnianie jest w osobnej funkcji, która zwraca listę.
2. Wartownik ląduje za ostatnim elementem, pod indeksem 50.
3. Pętla nie ma `i < n`. To właśnie jest wartownik, a nie zwykłe szukanie.
4. Po `pop()` lista ma znów 50 elementów, więc `len(liczby)` to stare `n`. 67 stoi też pod 22, ale liczy się pierwsze.

## Pułapki

- Wartownik ma stanąć ZA ostatnim elementem (`append`), a pętla iść od pierwszego do trafienia, bez `i < n` (R.2.3). `liczby[-1] = szukana` nadpisuje prawdziwy element.
- Bez `pop()` wypisana tablica ma 51 liczb, a `len(liczby)` to 51, więc `indeks == len(liczby)` nigdy nie wyjdzie. Komunikat o braku tylko przy indeksie wartownika, indeks tylko w przeciwnym razie (R.2.4, R.2.5).
- `print(liczby)` wypisze nawiasy kwadratowe. Arkusz chciał liczby oddzielone przecinkami (R.2.7): `print(*liczby, sep=", ")` albo `", ".join(map(str, liczby))`.
- Python: jawne `int(input())` i `randint` liczy się w R.1.5 (2022 cze). `randrange(1, 100)` nigdy nie da 100.
- W komentarzu nad funkcją wpisz nazwę algorytmu: „przeszukiwanie tablicy z wartownikiem” (R.4.4, 2022 cze).

## Powiązane

- [Wyszukiwanie liniowe z -1](#/karta/konsola/26-wyszukiwanie-liniowe)
- [Pętla while](#/karta/konsola/06-petla-while)
- [random: randint, choice, shuffle, sample](#/karta/konsola/20-random)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
