---
tytul: "Zadanie: klasa Kosc"
dzial: konsola
tagi: [python, zadanie, klasa, atrybut klasowy, None, random, __main__]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#class-and-instance-variables
  - https://docs.python.org/3/library/__main__.html
  - https://docs.python.org/3/library/random.html#random.randint
  - Arkusz INF.04 2026 sty, część I i III
  - Zasady oceniania INF.04 2026 sty (R.1.1-R.1.7, R.2.1-R.2.9)
arkusze: [2026 sty]
---

## Po co to jest

Typ zadania: klasa opisująca jedną kość do gry. Ma licznik wszystkich utworzonych kości, publiczne pola (nazwy obrazków, oczka, numer obrazka, dostępność), konstruktor z argumentem albo bez, rzut, blokadę i zamianę oczek na słowo. Ta sama klasa wraca potem w testach jednostkowych, dlatego plik ma się nazywać `kosc.py`.

## Jak to działa

Plan rozwiązania:

1. Atrybut klasowy `liczba_instancji = 0` pod `class Kosc:`, a nie w `__init__` (R.2.1).
2. W `__init__` przez `self.`: lista `obrazy` z nazwami `kosc0.png`..`kosc6.png` (R.2.2), `oczka` i `id_obrazu` (int), `dostepna` (bool).
3. ==Jeden konstruktor== `__init__(self, wartosc=None)`, bo Python nie ma przeciążania (R.2.3). Tabela niżej.
4. Na końcu `__init__`: `dostepna = True` i `Kosc.liczba_instancji += 1` (R.2.4).
5. `rzuc()` losuje 1..6 tylko pod `if self.dostepna:` (R.2.5). `zablokuj()` ustawia `False` i nic nie zwraca (R.2.6).
6. `slownie()` zwraca słowo z listy `["zero", "jeden", ...]` pod indeksem `oczka` (R.2.7).
7. Program główny: kość bez argumentu, potem kość z liczbą z klawiatury. Po każdej: licznik, oczka liczbą i słownie, nazwa pliku `obrazy[id_obrazu]` (R.2.9).

Co robi jeden konstruktor zależnie od argumentu:

| Wywołanie | `wartosc` | `oczka` i `id_obrazu` |
| --- | --- | --- |
| `Kosc()` | `None` | losowo 1..6 |
| `Kosc(4)` | 4 | 4 |
| `Kosc(8)` | 8 | 0 (spoza 1..6) |

Po co `if __name__ == "__main__":`? Gdy test robi `from kosc import Kosc`, Python wykonuje cały plik `kosc.py`. Bez tego warunku program główny ruszyłby w środku testów i czekałby na `input()`. Uruchomiony wprost (`python kosc.py`) plik ma `__name__` równe `"__main__"`, a zaimportowany ma `"kosc"`, więc blok wykona się tylko przy uruchomieniu.

## Składnia do zapamiętania

```python
class Kosc:
    liczba_instancji = 0

    def __init__(self, wartosc=None):
        if wartosc is None:
            self.oczka = random.randint(1, 6)
        elif 1 <= wartosc <= 6:
            self.oczka = wartosc
        else:
            self.oczka = 0
        Kosc.liczba_instancji += 1
```

## Przykład

`random.seed(3)` jest tylko po to, żeby wynik na karcie był zawsze ten sam. Na egzaminie go nie pisz.

```python kosc.py {5,7,18,21,39}
import random


class Kosc:
    liczba_instancji = 0

    def __init__(self, wartosc=None):
        self.obrazy = ["kosc0.png", "kosc1.png", "kosc2.png", "kosc3.png",
                       "kosc4.png", "kosc5.png", "kosc6.png"]
        if wartosc is None:
            self.oczka = random.randint(1, 6)
        elif 1 <= wartosc <= 6:
            self.oczka = wartosc
        else:
            self.oczka = 0
        self.id_obrazu = self.oczka
        self.dostepna = True
        Kosc.liczba_instancji += 1

    def rzuc(self):
        if self.dostepna:
            self.oczka = random.randint(1, 6)
            self.id_obrazu = self.oczka

    def zablokuj(self):
        self.dostepna = False

    def slownie(self):
        nazwy = ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć"]
        return nazwy[self.oczka]


def pokaz_kosc(kosc):
    print(f"Liczba utworzonych kości: {Kosc.liczba_instancji}")
    print(f"Wyrzucono: {kosc.oczka} ({kosc.slownie()})")
    print(f"Plik obrazu: {kosc.obrazy[kosc.id_obrazu]}")


if __name__ == "__main__":
    random.seed(3)  # tylko na potrzeby karty
    pierwsza = Kosc()
    pokaz_kosc(pierwsza)
    wartosc = int(input("Podaj liczbę oczek dla drugiej kości: "))
    druga = Kosc(wartosc)
    pokaz_kosc(druga)
```

```wynik
$ python kosc.py
Liczba utworzonych kości: 1
Wyrzucono: 2 (dwa)
Plik obrazu: kosc2.png
Podaj liczbę oczek dla drugiej kości: [[8]]
Liczba utworzonych kości: 2
Wyrzucono: 0 (zero)
Plik obrazu: kosc0.png
```

1. Atrybut klasowy: jeden wspólny licznik dla wszystkich kości.
2. `None` jako wartość domyślna zastępuje dwa konstruktory z Javy czy C#.
3. Zwiększanie przez nazwę klasy, nie przez `self`.
4. Rzut działa tylko na dostępnej kości. Na zablokowanej oczka zostają bez zmian.
5. Program główny rusza tylko przy uruchomieniu pliku, nie przy imporcie w testach.

## Pułapki

- `self.liczba_instancji += 1` tworzy osobne pole w obiekcie i licznik klasy dalej ma 0. Pisz `Kosc.liczba_instancji` (R.2.4).
- Dwa `def __init__` w jednej klasie nie dają dwóch konstruktorów: drugi zastępuje pierwszy. Zasady wprost wymagają w Pythonie jednego z `None` (R.2.3, 2026 sty).
- `if not wartosc:` zamiast `if wartosc is None:` potraktuje 0 jak brak argumentu i wylosuje oczka, a 0 ma dać 0.
- Liczbę z klawiatury zamień przez `int()`, inaczej `1 <= "4"` rzuca `TypeError`.
- `id_obrazu` też musi się zmieniać w `rzuc()`, bo inaczej nazwa pliku nie pasuje do oczek (R.2.5).
- Wypisz liczbę instancji ==po każdym== obiekcie, a nie raz na końcu (R.2.9).
- `zablokuj()` nie przyjmuje parametru i nic nie zwraca (R.2.6). Odblokowanie nie jest potrzebne.

## Powiązane

- [Atrybut klasowy jako licznik instancji](#/karta/konsola/15-atrybut-klasowy-licznik)
- [Jeden konstruktor z domyślnym None](#/karta/konsola/19-konstruktor-z-none)
- [Liczba słownie](#/karta/konsola/42-liczba-slownie)
- [random: randint, choice, shuffle, sample](#/karta/konsola/20-random)
- [Testy klasy Kosc](#/karta/testy/04-test-klasy-kosc)
