---
tytul: "setUp: świeży obiekt przed każdym testem"
dzial: testy
tagi: [python, unittest, setUp, tearDown, self]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/unittest.html#organizing-test-code
  - https://docs.python.org/3/library/unittest.html#unittest.TestCase.setUp
  - https://docs.python.org/3/library/unittest.html#unittest.TestCase.tearDown
arkusze: [2026 sty]
---

## Po co to jest

Testy jednej klasy zwykle zaczynają się tak samo: utwórz obiekt. Zamiast pisać to w każdej metodzie, piszesz raz w `setUp`. W 2026 sty oba testy kości potrzebują nowej kości, więc to naturalne miejsce na `self.kosc = Kosc(...)`.

## Jak to działa

`unittest` dla ==każdej metody testowej osobno== tworzy nowy obiekt klasy testowej i woła po kolei: `setUp`, test, `tearDown`. Ślad dla klasy, w której stoją `setUp` (tworzy `self.koszyk`), `tearDown` i testy `test_b`, `test_a`:

| Krok | Wywołanie | Stan `self.koszyk` |
| --- | --- | --- |
| 1 | `setUp` | nowy, pusty koszyk |
| 2 | `test_a` | test go zmienia |
| 3 | `tearDown` | sprzątanie po teście |
| 4 | `setUp` | znowu nowy, pusty koszyk |
| 5 | `test_b` | nie widzi zmian z `test_a` |
| 6 | `tearDown` | sprzątanie po teście |

Gdy każda z tych metod wypisze swoją nazwę przez `print`, terminal pokazuje (napisy wchodzą między nazwę testu a `ok`):

```wynik
$ python -m unittest -v test_slad
test_a (test_slad.TestSlad.test_a) ... setUp
test_a
tearDown
ok
test_b (test_slad.TestSlad.test_b) ... setUp
test_b
tearDown
ok

----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

`test_a` idzie pierwszy, choć w pliku stał drugi: kolejność jest alfabetyczna. ==Testy nie mogą zależeć od siebie==. Każdy ma przejść sam, w dowolnej kolejności, także uruchomiony pojedynczo.

## Składnia do zapamiętania

```python
class TestKosc(unittest.TestCase):
    def setUp(self):
        self.kosc = Kosc(4)

    def test_zablokowana_kosc_nie_zmienia_wartosci(self):
        self.kosc.zablokuj()
        self.kosc.rzuc()
        self.assertEqual(self.kosc.oczka, 4)

    def tearDown(self):
        self.kosc = None
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
- Obiekt utworzony raz na poziomie klasy albo modułu jest wspólny dla wszystkich testów. Wtedy wynik zależy od kolejności i drugi test w przykładzie by nie przeszedł.
- `tearDown` jest potrzebny rzadko (zamknięcie pliku, usunięcie danych). Woła się po każdym teście, także nieudanym, o ile `setUp` się powiódł.
- Arkusz wymaga, by ==każdy przypadek był w osobnej metodzie== (2026 sty). Wspólne przygotowanie w `setUp` tego nie łamie.

## Powiązane

- [unittest: pierwszy test](#/karta/testy/01-unittest-pierwszy-test)
- [Testy klasy Kosc](#/karta/testy/04-test-klasy-kosc)
- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
