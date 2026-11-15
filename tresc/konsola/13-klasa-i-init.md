---
tytul: "Klasa i __init__"
dzial: konsola
tagi: [python, klasa, obiekt, __init__, self, konstruktor, pole]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#class-objects
  - https://docs.python.org/3/tutorial/classes.html#method-objects
  - https://docs.python.org/3/tutorial/classes.html#random-remarks
  - Zasady oceniania INF.04 2025 sty (R.2, uwaga o self) i 2026 sty (R.2, uwaga o self i self.pole)
arkusze: [2021 cze, 2025 sty, 2026 sty]
---

## Po co to jest

Klasę trzeba było napisać w 2021 cze (tablica jako pole klasy), 2025 sty (klasa z tablicą) i 2026 sty (klasa `Kosc`). Wszystko zaczyna się od `class`, `__init__` i `self`. Zasady 2026 sty mówią wprost, że w Pythonie pola deklaruje się ==w konstruktorze przez self.pole==.

## Jak to działa

`anna = Uczen("Anna", 34)` to cztery kroki:

1. Python tworzy nowy, pusty obiekt klasy `Uczen`.
2. Sam wywołuje `__init__(obiekt, "Anna", 34)`. Nowy obiekt trafia do ==self==, reszta do kolejnych parametrów.
3. `self.imie = imie` tworzy w tym obiekcie pole `imie`. Nie ma osobnej deklaracji jak w C++: pole powstaje przy pierwszym przypisaniu i to właśnie zasady nazywają deklaracją przez `self`.
4. Gotowy obiekt trafia do zmiennej `anna`. `__init__` nic nie zwraca.

Z metodami jest tak samo: `anna.przedstaw_sie()` Python wykonuje jako `Uczen.przedstaw_sie(anna)`. Dlatego `self` stoi na początku każdej metody, a przy wywołaniu go nie podajesz. To tylko umowna nazwa, ale pisz zawsze `self`.

Każdy obiekt ma własne pola. Stan po kolejnych liniach:

| Linia | pola `anna` | pola `jan` |
| --- | --- | --- |
| `anna = Uczen("Anna", 34)` | imie `"Anna"`, punkty `34` | — |
| `jan = Uczen("Jan", 21)` | imie `"Anna"`, punkty `34` | imie `"Jan"`, punkty `21` |
| `jan.punkty = 25` | bez zmian | imie `"Jan"`, punkty `25` |

## Składnia do zapamiętania

```python
class Uczen:
    def __init__(self, imie, punkty):
        self.imie = imie
        self.punkty = punkty

    def zdal(self):
        return self.punkty >= 20


anna = Uczen("Anna", 34)
print(anna.imie, anna.zdal())
```

## Przykład

```python uczniowie.py {3,6,10,12}
class Uczen:
    def __init__(self, imie, punkty):
        self.imie = imie
        self.punkty = punkty

    def przedstaw_sie(self):
        print(f"{self.imie}: {self.punkty} pkt")


anna = Uczen("Anna", 34)
jan = Uczen("Jan", 21)
jan.punkty = 25
anna.przedstaw_sie()
jan.przedstaw_sie()
```

```wynik
Anna: 34 pkt
Jan: 25 pkt
```

1. `self.imie = imie` zapisuje parametr w polu obiektu. Samo `imie` to zmienna lokalna, która znika po wyjściu z `__init__`.
2. `self` jest pierwszym parametrem każdej metody, także tej bez innych parametrów.
3. Dwa argumenty, choć `__init__` ma trzy parametry: `self` wstawia Python.
4. Zmiana pola jednego obiektu nie rusza drugiego: `anna` dalej ma 34.

## Pułapki

- `def przedstaw_sie():` bez `self` daje `TypeError: ... takes 0 positional arguments but 1 was given`, bo Python i tak przekazuje obiekt.
- `imie = imie` zamiast `self.imie = imie` niczego nie zapisuje w obiekcie. Później `anna.imie` kończy się `AttributeError`.
- Zła liczba podkreślników (`_init_`, `__init`) to zwykła metoda, której nikt nie wywoła. `Uczen("Anna", 34)` daje wtedy `TypeError: Uczen() takes no arguments`.
- Zmienna wpisana pod `class`, poza metodą, to atrybut klasy, wspólny dla wszystkich obiektów, a nie pole każdego z nich.
- Zasady 2025 sty i 2026 sty nie liczą `self` do parametrów. „Konstruktor z jednym parametrem” to `def __init__(self, rozmiar)` (R.2.2, 2025 sty).
- Metoda bez ciała to błąd składni (`IndentationError`). Gdy brakuje czasu, wpisz choć `pass` albo prosty `return`, żeby program się uruchomił.

## Powiązane

- [Pola prywatne z `__`](#/karta/konsola/14-pola-prywatne)
- [Metody i metoda tylko dla klasy](#/karta/konsola/16-metody-i-metoda-prywatna)
- [Zadanie: klasa z tablicą](#/karta/konsola/44-zadanie-klasa-z-tablica)
