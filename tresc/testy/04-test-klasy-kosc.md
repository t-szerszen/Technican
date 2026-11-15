---
tytul: "Testy klasy Kosc"
dzial: testy
tagi: [python, unittest, Kosc, assertGreaterEqual, assertEqual, zadanie]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/unittest.html#unittest.TestCase.assertGreaterEqual
  - Arkusz INF.04 2026 sty, część III
  - Zasady oceniania INF.04 2026 sty (R.4.1-R.4.5)
arkusze: [2026 sty]
---

## Po co to jest

W 2026 sty trzecia część to testy metody rzutu kością z klasy `Kosc`. Arkusz podaje dwa przypadki: ==wartość po rzucie jest z zakresu 1..6== i ==wartość nie zmienia się, gdy kość jest niedostępna==. Każdy w osobnej metodzie, z nazwą mówiącą, co sprawdza (R.4.1-R.4.3).

## Jak to działa

Rzut jest losowy, więc jeden rzut niewiele dowodzi. Błąd typu `randint(0, 6)` wyjdzie tylko wtedy, gdy akurat wypadnie 0. Dlatego test ==rzuca w pętli==, np. 100 razy, i po każdym rzucie sprawdza obie granice.

Drugi przypadek: tworzysz kość ze ==znaną wartością== `Kosc(4)`, blokujesz ją i rzucasz w pętli. Po każdym rzucie oczka mają być nadal 4. Znana wartość startowa to „dane testowe”, z których wynika wynik testu (R.4.5).

## Składnia do zapamiętania

```python
kosc = Kosc()
for _ in range(100):
    kosc.rzuc()
    self.assertGreaterEqual(kosc.oczka, 1)
    self.assertLessEqual(kosc.oczka, 6)

kosc = Kosc(4)
kosc.zablokuj()
for _ in range(100):
    kosc.rzuc()
    self.assertEqual(kosc.oczka, 4)
```

## Przykład

Plik `kosc.py` to klasa z części konsolowej (ta sama co w karcie o zadaniu, bez programu głównego), w tym samym folderze co test.

```python kosc.py
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
```

```python test_kosc.py {2,5,8,10,14,15,18}
import unittest
from kosc import Kosc


class TestKosc(unittest.TestCase):
    def test_rzut_daje_wartosc_od_1_do_6(self):
        kosc = Kosc()
        for _ in range(100):
            kosc.rzuc()
            self.assertGreaterEqual(kosc.oczka, 1)
            self.assertLessEqual(kosc.oczka, 6)

    def test_zablokowana_kosc_nie_zmienia_wartosci(self):
        kosc = Kosc(4)
        kosc.zablokuj()
        for _ in range(100):
            kosc.rzuc()
            self.assertEqual(kosc.oczka, 4)
```

```wynik
$ python -m unittest -v test_kosc
test_rzut_daje_wartosc_od_1_do_6 (test_kosc.TestKosc.test_rzut_daje_wartosc_od_1_do_6) ... ok
test_zablokowana_kosc_nie_zmienia_wartosci (test_kosc.TestKosc.test_zablokowana_kosc_nie_zmienia_wartosci) ... ok

----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

1. Import klasy z pliku `kosc.py` leżącego w tym samym folderze co test.
2. Klasa testowa dziedziczy po `unittest.TestCase`: to narzędzie odpowiednie dla Pythona (R.4.1).
3. 100 rzutów zamiast jednego, bo wynik jest losowy. `_` to licznik, którego nie używasz.
4. Zakres 1..6 to dwie asercje, obie granice wchodzą (R.4.2).
5. Znana wartość startowa: wiesz, czego oczekiwać po rzutach.
6. Blokada przed rzutami: `dostepna` ustawia się na `False`.
7. Po każdym rzucie oczka nadal 4, czyli rzut niedostępnej kości niczego nie zmienia (R.4.3).

## Pułapki

- Dwa przypadki w jednej metodzie (np. `test_kosc`) łamią wymóg arkusza „każdy przypadek oddzielną metodą”, a taka nazwa nie wyraża celu testu (R.4.1, 2026 sty).
- `Kosc()` zamiast `Kosc(4)` w drugim teście: nie wiesz, ile oczek oczekiwać. Przy losowym starcie trzeba by najpierw zapamiętać `przed = kosc.oczka`.
- Gdy kopiujesz `kosc.py` z programem głównym, musi on stać pod `if __name__ == "__main__":`. Bez tego import w teście uruchomi program i test stanie na `input()`.
- Blokuj metodą `zablokuj()`, nie przez `kosc.dostepna = False`: arkusz wymaga tej metody, a test sprawdza ją przy okazji.
- Do folderu `testy` trafia spakowany projekt testów, plik z testami obok archiwum oraz zrzuty `test1.png`, `test2.png`.

## Powiązane

- [Zadanie: klasa Kosc](#/karta/konsola/45-zadanie-klasa-kosc)
- [Asercje](#/karta/testy/02-asercje)
- [Czytanie wyniku testów](#/karta/testy/05-wynik-testow)
- [random: randint, choice, shuffle, sample](#/karta/konsola/20-random)
- [Zrzuty ekranu](#/karta/dokumentacja/02-zrzuty-ekranu)
