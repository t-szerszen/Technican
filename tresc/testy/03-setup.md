---
tytul: "setUp: świeży obiekt przed każdym testem"
dzial: testy
tagi: [python, unittest, setUp, self]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/unittest.html#organizing-test-code
  - https://docs.python.org/3/library/unittest.html#unittest.TestCase.setUp
  - Arkusz INF.04 2026 sty, część III
arkusze: [2026 sty]
---

## Po co to jest

Testy jednej klasy zwykle zaczynają się tak samo: utwórz obiekt. Zamiast pisać to w każdej metodzie, piszesz raz w `setUp`. Nie jest obowiązkowy: w teście kości z 2026 sty możesz równie dobrze tworzyć kość w każdym teście osobno.

## Jak to działa

`unittest` dla ==każdej metody testowej osobno== tworzy nowy obiekt klasy testowej i woła `setUp`, a zaraz po nim test. Gdy w klasie z `setUp` i testami `test_b`, `test_a` każda metoda wypisze swoją nazwę przez `print`, terminal pokazuje (napisy wchodzą między nazwę testu a `ok`):

```wynik
$ python -m unittest -v test_slad
test_a (test_slad.TestSlad.test_a) ... setUp
test_a
ok
test_b (test_slad.TestSlad.test_b) ... setUp
test_b
ok

----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

`setUp` rusza przed każdym testem, więc obiekt utworzony w nim jest ==za każdym razem nowy==: `test_b` nie widzi zmian zrobionych w `test_a`. `test_a` idzie pierwszy, choć w pliku stał drugi: kolejność jest alfabetyczna, więc testy nie mogą zależeć od siebie.

## Składnia do zapamiętania

```python
class TestKosc(unittest.TestCase):
    def setUp(self):
        self.kosc = Kosc(4)

    def test_zablokowana_kosc_nie_zmienia_wartosci(self):
        self.kosc.zablokuj()
        self.kosc.rzuc()
        self.assertEqual(self.kosc.oczka, 4)
```

## Przykład

```python koszyk.py
class Koszyk:
    def __init__(self):
        self.ceny = []

    def dodaj(self, cena):
        self.ceny.append(cena)

    def suma(self):
        return sum(self.ceny)
```

```python test_koszyk.py {6,7,10,14}
import unittest
from koszyk import Koszyk


class TestKoszyk(unittest.TestCase):
    def setUp(self):
        self.koszyk = Koszyk()

    def test_dodanie_dwoch_cen_daje_sume(self):
        self.koszyk.dodaj(5)
        self.koszyk.dodaj(3)
        self.assertEqual(self.koszyk.suma(), 8)

    def test_nowy_koszyk_jest_pusty(self):
        self.assertEqual(self.koszyk.suma(), 0)
```

```wynik
$ python -m unittest -v test_koszyk
test_dodanie_dwoch_cen_daje_sume (test_koszyk.TestKoszyk.test_dodanie_dwoch_cen_daje_sume) ... ok
test_nowy_koszyk_jest_pusty (test_koszyk.TestKoszyk.test_nowy_koszyk_jest_pusty) ... ok

----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

1. Nazwa `setUp` dokładnie tak: małe „s”, wielkie „U”. Przyjmuje tylko `self`.
2. Pole `self.koszyk` żyje w obiekcie testowym, więc widzą je metody testowe.
3. W teście sięgasz po obiekt przez `self.`, nie tworzysz go od nowa.
4. Ten test idzie drugi (alfabetycznie) i przechodzi, bo `setUp` dał mu nowy, pusty koszyk zamiast tego z cenami 5 i 3.

## Pułapki

- `setup` albo `SetUp` to zwykła metoda, nikt jej nie wywoła. Test kończy się wtedy ERROR: `AttributeError: 'TestKoszyk' object has no attribute 'koszyk'`.
- `koszyk = Koszyk()` w `setUp` bez `self.` tworzy zmienną lokalną, która znika po wyjściu z metody. Ten sam `AttributeError`.
- Arkusz wymaga, by ==każdy przypadek był w osobnej metodzie== (2026 sty). Wspólne przygotowanie w `setUp` tego nie łamie.

## Powiązane

- [unittest: pierwszy test](#/karta/testy/01-unittest-pierwszy-test)
- [Testy klasy Kosc](#/karta/testy/04-test-klasy-kosc)
- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
