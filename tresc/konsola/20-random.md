---
tytul: "random: randint, choice, shuffle, sample"
dzial: konsola
tagi: [python, random, randint, choice, shuffle, sample, seed, losowanie]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/random.html#random.randint
  - https://docs.python.org/3/library/random.html#random.sample
  - https://docs.python.org/3/library/random.html#notes-on-reproducibility
  - Zasady oceniania INF.04 2022 cze (R.1.5), 2024 cze (R.2.5), 2025 cze (R.2.1, R.2.3, R.2.6)
arkusze: [2022 cze, 2024 cze, 2025 sty, 2025 cze, 2026 sty, 2026 cze]
---

## Po co to jest

Losowanie jest w co drugim arkuszu: tablica 1..100, kostki 1..6, liczby 1..1000, loteria 6 z 49, znaki hasła. W Pythonie zasady oceniania wprost szukają ==randint== (2022 cze, R.1.5), a w 2025 cze są punkty za generator liczb pseudolosowych i za losowanie bez powtórzeń.

## Jak to działa

Na górze pliku `import random`, potem `random.nazwa(...)`. Najważniejsze: ==randint bierze obie granice==, a `range` i `randrange` nie biorą końca.

| Wywołanie | Możliwe wyniki | Uwagi |
| --- | --- | --- |
| `random.randint(1, 6)` | 1 2 3 4 5 6 | obie granice włącznie |
| `random.randrange(1, 6)` | 1 2 3 4 5 | jak `range`, bez 6 |
| `random.choice(lista)` | jeden element | pusta lista: `IndexError` |
| `random.sample(range(1, 50), 6)` | nowa lista 6 różnych | bez powtórzeń |
| `random.shuffle(lista)` | zwraca `None` | miesza listę w miejscu |

Bez `sample` losujesz do skutku: dopisujesz liczbę tylko wtedy, gdy jej jeszcze nie ma. Ślad dla 4 liczb z 1..10 po `random.seed(37)`:

| Krok | `randint(1, 10)` | `not in zestaw`? | `zestaw` po kroku |
| --- | --- | --- | --- |
| 1 | 10 | tak | [10] |
| 2 | 2 | tak | [10, 2] |
| 3 | 10 | nie, pomijam | [10, 2] |
| 4 | 9 | tak | [10, 2, 9] |
| 5 | 1 | tak | [10, 2, 9, 1] |

`while len(zestaw) < 4` kręci się do skutku, więc kroków bywa więcej niż liczb. `random.seed(37)` ustawia punkt startu generatora: ta sama liczba daje te same wyniki przy każdym uruchomieniu.

## Składnia do zapamiętania

```python
import random

oczka = random.randint(1, 6)
znak = random.choice("abcdefghijklmnopqrstuvwxyz")
zestaw = random.sample(range(1, 50), 6)
random.shuffle(znaki)
tablica = []
for i in range(50):
    tablica.append(random.randint(1, 100))
random.seed(37)
```

## Przykład

```python losowanie.py {7,15,18}
import random


def losuj_zestaw(ile, od, do):
    zestaw = []
    while len(zestaw) < ile:
        liczba = random.randint(od, do)
        if liczba not in zestaw:
            zestaw.append(liczba)
    return zestaw


random.seed(37)
print("Ręcznie:", losuj_zestaw(4, 1, 10))
print("sample:", random.sample(range(1, 50), 6))
print("choice:", random.choice(["papier", "kamień", "nożyce"]))
liczby = [1, 2, 3, 4, 5]
wynik = random.shuffle(liczby)
print("shuffle:", liczby, wynik)
```

```wynik
$ python losowanie.py
Ręcznie: [10, 2, 9, 1]
sample: [41, 24, 29, 34, 7, 44]
choice: kamień
shuffle: [1, 4, 2, 3, 5] None
```

1. `randint(od, do)` może dać także `do`, więc 1..10 to `randint(1, 10)`.
2. `range(1, 50)` to 1..49, a `sample` wybiera z niego 6 różnych liczb.
3. `shuffle` miesza samą listę, a zwraca `None`.

## Pułapki

- Zły zakres: `randint(0, 100)` zamiast `randint(1, 100)`. Zakres jest sprawdzany w kodzie, z tolerancją ±1 (2025 sty R.2.2, 2025 cze R.2.3).
- `liczby = random.shuffle(liczby)` niszczy listę: zostaje `None`. Pisz samo `random.shuffle(liczby)`.
- Loteria wymaga liczb bez powtórzeń (2025 cze R.2.6). Sześć razy `randint` bez `not in` tego nie gwarantuje.
- Losuj w funkcji z parametrami, bez zmiennych globalnych (2024 cze R.2.5), i oddaj listę przez `return`, bo inaczej dane przepadają (2025 cze R.2.1).
- `random.seed(...)` tylko do prób. W oddanym programie wyniki mają się zmieniać. Dokumentacja nie obiecuje tych samych wyników `randint` dla tego samego `seed` w innych wersjach Pythona.

## Powiązane

- [Pętla while](#/karta/konsola/06-petla-while)
- [Zadanie: loteria](#/karta/konsola/47-zadanie-loteria)
- [Zadanie: generator haseł](#/karta/konsola/48-zadanie-generator-hasel)
