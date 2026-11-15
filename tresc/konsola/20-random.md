---
tytul: "random: randint, choice, shuffle, sample"
dzial: konsola
tagi: [python, random, randint, choice, shuffle, sample, losowanie, bez powtórzeń]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/random.html#random.randint
  - https://docs.python.org/3/library/random.html#random.choice
  - https://docs.python.org/3/library/random.html#random.shuffle
  - https://docs.python.org/3/library/random.html#random.sample
  - Zasady oceniania INF.04 2022 cze (R.1.5), 2024 cze (R.2.5), 2025 sty (R.2.2), 2025 cze (R.2.1, R.2.3, R.2.6), 2026 cze (R.2.4)
arkusze: [2022 cze, 2024 cze, 2025 sty, 2025 cze, 2026 sty, 2026 cze]
---

## Po co to jest

Losowanie było w sześciu arkuszach: tablica 1..100 (2022 cze), kostki 1..6 (2024 cze, 2026 sty), liczby 1..1000 (2025 sty), 6 różnych liczb z 1..49 (2025 cze), znaki hasła w losowych miejscach (2026 cze). W 2022 cze zasady dla Pythona wprost wymieniają ==randint== (R.1.5).

## Jak to działa

Na górze pliku `import random`, potem `random.nazwa(...)`. ==randint bierze obie granice==, w odróżnieniu od `range`.

| Wywołanie | Wynik | Do czego |
| --- | --- | --- |
| `random.randint(1, 6)` | jedna z liczb 1 2 3 4 5 6 | kostka, tablica losowych liczb |
| `random.choice("abc")` | jeden element napisu albo listy | znak hasła z zestawu |
| `random.shuffle(znaki)` | `None`, lista wymieszana w miejscu | znaki hasła w losowych miejscach |
| `random.sample(range(1, 50), 6)` | nowa lista 6 różnych liczb | loteria bez powtórzeń |

Bez powtórzeń ręcznie: dopisujesz liczbę tylko wtedy, gdy jej jeszcze nie ma. `while len(zestaw) < 4` kręci się do skutku, więc kroków bywa więcej niż liczb. Ślad dla 4 liczb z 1..10 po `random.seed(37)`:

| Krok | `randint(1, 10)` | `not in zestaw`? | `zestaw` po kroku |
| --- | --- | --- | --- |
| 1 | 10 | tak | [10] |
| 2 | 2 | tak | [10, 2] |
| 3 | 10 | nie, pomijam | [10, 2] |
| 4 | 9 | tak | [10, 2, 9] |
| 5 | 1 | tak | [10, 2, 9, 1] |

## Składnia do zapamiętania

```python
import random
oczka = random.randint(1, 6)
tablica = []
for i in range(50):
    tablica.append(random.randint(1, 100))
znak = random.choice("abcdefghijklmnopqrstuvwxyz")
random.shuffle(znaki)
haslo = "".join(znaki)
zestaw = random.sample(range(1, 50), 6)
```

## Przykład

```python losowanie.py {7,17,19}
import random


def losuj_bez_powtorzen(ile, od, do):
    zestaw = []
    while len(zestaw) < ile:
        liczba = random.randint(od, do)
        if liczba not in zestaw:
            zestaw.append(liczba)
    return zestaw


random.seed(37)  # tylko na potrzeby karty, na egzaminie bez tego
print("Bez powtórzeń:", losuj_bez_powtorzen(4, 1, 10))
znaki = []
for i in range(2):
    znaki.append(random.choice("abcdefghijklmnopqrstuvwxyz"))
    znaki.append(random.choice("0123456789"))
random.shuffle(znaki)
print("Hasło:", "".join(znaki))
```

```wynik
$ python losowanie.py
Bez powtórzeń: [10, 2, 9, 1]
Hasło: 85ou
```

1. `randint(od, do)` może dać także `do`, więc 1..10 to `randint(1, 10)`.
2. `choice` wybiera jeden znak z napisu z zestawem.
3. `shuffle` miesza listę w miejscu, więc niczego nie przypisujesz; potem `join` skleja ją w napis.

## Pułapki

- Zły zakres, np. `randint(0, 100)` zamiast `randint(1, 100)`. Zakres sprawdzany jest w kodzie z tolerancją ±1 (2025 sty R.2.2, 2025 cze R.2.3).
- `znaki = random.shuffle(znaki)` zostawia `None` zamiast listy. `random.shuffle(haslo)` na napisie rzuca `TypeError`: mieszaj listę znaków, a potem sklej ją `"".join(znaki)`.
- Loteria wymaga liczb bez powtórzeń (2025 cze R.2.6). Sześć razy `randint` bez `not in` tego nie gwarantuje. Zasady nie mówią, czy wystarczy `sample`; ręczna pętla na pewno pokazuje losowanie bez powtórzeń.
- Losuj w funkcji z parametrami, bez zmiennych globalnych (2024 cze R.2.5), i oddaj listę przez `return`, bo inaczej dane przepadają (2025 cze R.2.1).
- W 2026 cze nie wolno użyć gotowej funkcji generującej całe hasło. Zasady nie zakazują z nazwy `choice` ani `shuffle`: one tylko losują znaki z zestawów zdefiniowanych w kodzie (R.2.2-R.2.4).

## Powiązane

- [Pętla while](#/karta/konsola/06-petla-while)
- [Zadanie: loteria](#/karta/konsola/47-zadanie-loteria)
- [Zadanie: generator haseł](#/karta/konsola/48-zadanie-generator-hasel)
