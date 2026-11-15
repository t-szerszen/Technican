---
tytul: "Asercje"
dzial: testy
tagi: [python, unittest, assertEqual, assertTrue, assertGreaterEqual, asercja]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/unittest.html#assert-methods
  - https://docs.python.org/3/library/unittest.html#unittest.TestCase.assertTrue
  - Zasady oceniania INF.04 2026 sty (R.4.1, R.4.2, R.4.3)
arkusze: [2026 sty]
---

## Po co to jest

Asercja to jedno sprawdzenie: „wynik ma być taki”. Test bez asercji niczego nie sprawdza, a w 2026 sty ==co najmniej jedna asercja== to warunek punktu R.4.1. Zakres 1..6 i „wartość bez zmian” to też asercje (R.4.2, R.4.3).

## Jak to działa

Asercja to metoda `self.assert...` w teście. Gdy warunek jest spełniony, nic się nie dzieje. Gdy nie, rzuca `AssertionError` z opisem, test kończy się jako FAIL, a reszta tej metody się nie wykonuje.

| Asercja | Przechodzi, gdy | Komunikat, gdy nie przejdzie |
| --- | --- | --- |
| `assertEqual(7, 6)` | `7 == 6` | `7 != 6` |
| `assertTrue(7 == 6)` | prawda | `False is not true` |
| `assertFalse(3 > 1)` | fałsz | `True is not false` |
| `assertGreaterEqual(0, 1)` | `0 >= 1` | `0 not greater than or equal to 1` |
| `assertLessEqual(7, 6)` | `7 <= 6` | `7 not less than or equal to 6` |

Te pięć wystarczy: równość, prawda/fałsz i zakres (dwie granice). Porównaj `assertEqual(a, b)` z `assertTrue(a == b)`: pierwsza pokazuje ==obie wartości==, druga tylko `False is not true`, więc nie wiesz, co wyszło. Dokumentacja radzi tu `assertEqual`.

## Składnia do zapamiętania

```python
self.assertEqual(kosc.oczka, 4)
self.assertTrue(kosc.dostepna)
self.assertFalse(kosc.dostepna)
self.assertGreaterEqual(kosc.oczka, 1)
self.assertLessEqual(kosc.oczka, 6)
```

## Przykład

```python liczby.py
import random


def losuj_oczka():
    return random.randint(1, 6)


def czy_parzysta(liczba):
    return liczba % 2 == 0


def szukaj(liczby, szukana):
    for i in range(len(liczby)):
        if liczby[i] == szukana:
            return i
    return -1
```

```python test_liczby.py {8,9,12,13,16,17}
import unittest
from liczby import losuj_oczka, czy_parzysta, szukaj


class TestLiczby(unittest.TestCase):
    def test_losowanie_daje_od_1_do_6(self):
        oczka = losuj_oczka()
        self.assertGreaterEqual(oczka, 1)
        self.assertLessEqual(oczka, 6)

    def test_czy_parzysta(self):
        self.assertTrue(czy_parzysta(4))
        self.assertFalse(czy_parzysta(7))

    def test_szukaj_zwraca_indeks_albo_minus_1(self):
        self.assertEqual(szukaj([5, 8, 3], 8), 1)
        self.assertEqual(szukaj([5, 8, 3], 7), -1)
```

```wynik
$ python -m unittest -v test_liczby
test_czy_parzysta (test_liczby.TestLiczby.test_czy_parzysta) ... ok
test_losowanie_daje_od_1_do_6 (test_liczby.TestLiczby.test_losowanie_daje_od_1_do_6) ... ok
test_szukaj_zwraca_indeks_albo_minus_1 (test_liczby.TestLiczby.test_szukaj_zwraca_indeks_albo_minus_1) ... ok

----------------------------------------------------------------------
Ran 3 tests in 0.000s

OK
```

1. Dolna granica: oczka co najmniej 1.
2. Górna granica: oczka najwyżej 6. Obie granice wchodzą do zakresu.
3. Funkcja zwraca `True`, więc `assertTrue` przechodzi.
4. Dla 7 zwraca `False`: do sprawdzenia fałszu jest `assertFalse`.
5. Najpierw wartość sprawdzana, potem oczekiwana: komunikat czyta się wtedy jak „dostałem != chciałem”.
6. Kilka asercji w jednej metodzie wolno, ale gdy pierwsza nie przejdzie, druga już się nie wykona.

## Pułapki

- Asercja bez `self.` (`assertEqual(...)`) to `NameError`, test kończy się jako ERROR, a nie FAIL.
- `assertTrue(wynik)` przechodzi dla każdej „prawdziwej” wartości, także `5` czy `"nie"`. Do konkretnej wartości używaj `assertEqual`.
- `assertEquals` (z „s”) to stara nazwa, w Pythonie 3.12 jej już nie ma: `AttributeError` i ERROR. Pisz `assertEqual`.

## Powiązane

- [unittest: pierwszy test](#/karta/testy/01-unittest-pierwszy-test)
- [Testy klasy Kosc](#/karta/testy/04-test-klasy-kosc)
- [Czytanie wyniku testów](#/karta/testy/05-wynik-testow)
