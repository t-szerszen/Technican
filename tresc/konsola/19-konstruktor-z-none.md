---
tytul: "Jeden konstruktor z domyślnym None"
dzial: konsola
tagi: [python, klasa, konstruktor, None, domyślny argument, przeciążanie, is]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/controlflow.html#default-argument-values
  - https://docs.python.org/3/tutorial/controlflow.html#defining-functions
  - https://docs.python.org/3/reference/expressions.html#is-not
  - Zasady oceniania INF.04 2026 sty (R.2.3, R.2.4)
arkusze: [2026 sty]
---

## Po co to jest

W 2026 sty klasa `Kosc` miała dwa konstruktory: bez argumentu (losuje 1..6) i z jednym (wartość albo 0 spoza 1..6). Arkusz mówi wprost, że w Pythonie piszesz ==jeden konstruktor z domyślną wartością None==, a zasady oceniania powtarzają to przy R.2.3.

## Jak to działa

Python nie ma przeciążania: druga `def __init__` w tej samej klasie po prostu nadpisuje pierwszą. Dlatego jeden `__init__(self, oczka=None)` obsługuje oba przypadki. `None` znaczy „nic nie podano” i nie myli się z żadną liczbą:

| Wywołanie | `oczka` na starcie | `oczka is None` | poza 1..6 | pole `oczka` |
| --- | --- | --- | --- | --- |
| `Kosc()` | `None` | `True` | — | losowe 1..6 |
| `Kosc(4)` | `4` | `False` | nie | `4` |
| `Kosc(9)` | `9` | `False` | tak | `0` |
| `Kosc(0)` | `0` | `False` | tak | `0` |

Gdyby domyślnym było 0, `Kosc()` i `Kosc(0)` wyglądałyby w środku identycznie. A mają dać co innego: losowanie i 0.

## Składnia do zapamiętania

```python
import random


class Kosc:
    def __init__(self, oczka=None):
        if oczka is None:
            oczka = random.randint(1, 6)
        elif oczka < 1 or oczka > 6:
            oczka = 0
        self.oczka = oczka
```

## Przykład

```python kosc.py {6,7,8,10,14,15}
import random


class Kosc:
    def __init__(self, oczka=None):
        if oczka is None:
            oczka = random.randint(1, 6)
        elif oczka < 1 or oczka > 6:
            oczka = 0
        self.oczka = oczka
        self.dostepna = True


random.seed(7)  # tylko po to, żeby wynik na karcie był stały
losowa = Kosc()
print("Pierwsza kość:", losowa.oczka)
wpisana = Kosc(int(input("Podaj liczbę oczek: ")))
print("Druga kość:", wpisana.oczka)
```

```wynik
Pierwsza kość: 3
Podaj liczbę oczek: [[9]]
Druga kość: 0
```

1. Najpierw sprawdzasz `None`, i to przez `is`. Porównanie `None < 1` dałoby `TypeError`.
2. Bez argumentu: losowanie 1..6.
3. `elif`, bo wartość z losowania już jest poprawna.
4. Oba przypadki kończą się tym samym zapisem pól, z `dostepna = True`. W pełnym zadaniu dochodzą identyfikator pliku (R.2.3) i licznik instancji (R.2.4).
5. `seed` tylko dla powtarzalnego wyniku tutaj. Na egzaminie go nie pisz.
6. Wywołanie bez argumentu, a dalej z liczbą z klawiatury, jak w arkuszu.

## Pułapki

- Dwa `def __init__` jak w C# czy Javie: `Kosc()` kończy się `TypeError: Kosc.__init__() missing 1 required positional argument: 'oczka'`.
- `if not oczka:` zamiast `if oczka is None:` traktuje 0 jak brak argumentu, więc `Kosc(0)` losuje zamiast dać 0.
- Liczbę z klawiatury zamień `int()` przed przekazaniem. `Kosc("4")` skończy się `TypeError` przy porównaniu z 1.
- Granice to 1 i 6 włącznie: `oczka < 1 or oczka > 6`. Pomyłka `<=` na którejś granicy psuje kryterium R.2.3.

## Powiązane

- [Atrybut klasowy jako licznik instancji](#/karta/konsola/15-atrybut-klasowy-licznik)
- [random: randint, choice, shuffle, sample](#/karta/konsola/20-random)
- [Zadanie: klasa Kosc](#/karta/konsola/45-zadanie-klasa-kosc)
