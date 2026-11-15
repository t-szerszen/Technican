---
tytul: "Asercje"
dzial: testy
tagi: [python, unittest, assertEqual, assertAlmostEqual, assertRaises, asercja]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/unittest.html#assert-methods
  - https://docs.python.org/3/library/unittest.html#unittest.TestCase.assertAlmostEqual
  - https://docs.python.org/3/library/unittest.html#unittest.TestCase.assertRaises
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
| `assertNotEqual(6, 6)` | `6 != 6` | `6 == 6` |
| `assertTrue(7 == 6)` | prawda | `False is not true` |
| `assertFalse(3 > 1)` | fałsz | `True is not false` |
| `assertIn(7, [1, 2, 3])` | 7 jest w liście | `7 not found in [1, 2, 3]` |
| `assertGreaterEqual(0, 1)` | `0 >= 1` | `0 not greater than or equal to 1` |
| `assertLessEqual(7, 6)` | `7 <= 6` | `7 not less than or equal to 6` |
| `assertAlmostEqual(7 / 3, 2.33)` | `round(a - b, 7) == 0` | `2.3333333333333335 != 2.33 within 7 places (...)` |
| `with assertRaises(ValueError):` | blok rzuci ten wyjątek | `ValueError not raised` |

Porównaj `assertEqual(a, b)` z `assertTrue(a == b)`: pierwsza pokazuje ==obie wartości==, druga tylko `False is not true`, więc nie wiesz, co wyszło. Dokumentacja wprost radzi `assertEqual`.

Ułamki: `(0.1 + 0.2) / 2` daje `0.15000000000000002`, więc `assertEqual(..., 0.15)` nie przejdzie. `assertAlmostEqual` zaokrągla różnicę do 7 miejsc po przecinku (albo `places=2`) i dopiero wtedy porównuje z zerem.

## Składnia do zapamiętania

```python
self.assertEqual(wynik, 6)
self.assertNotEqual(wynik, 0)
self.assertTrue(kosc.dostepna)
self.assertFalse(kosc.dostepna)
self.assertIn(kosc.oczka, [1, 2, 3, 4, 5, 6])
self.assertGreaterEqual(kosc.oczka, 1)
self.assertLessEqual(kosc.oczka, 6)
self.assertAlmostEqual(srednia, 2.33, places=2)
with self.assertRaises(ValueError):
    int("abc")
```

## Przykład

```python tablica.py
def srednia(liczby):
    if len(liczby) == 0:
        raise ValueError("Pusta lista nie ma średniej.")
    return sum(liczby) / len(liczby)


def szukaj(liczby, szukana):
    for i in range(len(liczby)):
        if liczby[i] == szukana:
            return i
    return -1
```

```python test_tablica.py {7,10,14,15}
import unittest
from tablica import srednia, szukaj


class TestTablica(unittest.TestCase):
    def test_srednia_ulamkow(self):
        self.assertAlmostEqual(srednia([0.1, 0.2]), 0.15)

    def test_pusta_lista_rzuca_wyjatek(self):
        with self.assertRaises(ValueError):
            srednia([])

    def test_szukaj_zwraca_indeks_albo_minus_1(self):
        self.assertEqual(szukaj([5, 8, 3], 8), 1)
        self.assertEqual(szukaj([5, 8, 3], 7), -1)
```

```wynik
$ python -m unittest -v test_tablica
test_pusta_lista_rzuca_wyjatek (test_tablica.TestTablica.test_pusta_lista_rzuca_wyjatek) ... ok
test_srednia_ulamkow (test_tablica.TestTablica.test_srednia_ulamkow) ... ok
test_szukaj_zwraca_indeks_albo_minus_1 (test_tablica.TestTablica.test_szukaj_zwraca_indeks_albo_minus_1) ... ok

----------------------------------------------------------------------
Ran 3 tests in 0.000s

OK
```

1. Średnia ułamków: `assertEqual` by tu nie przeszło, `assertAlmostEqual` przechodzi.
2. `assertRaises` w `with`: test przechodzi tylko wtedy, gdy blok rzuci `ValueError`.
3. Kilka asercji w jednej metodzie jest dozwolone, ale gdy pierwsza nie przejdzie, druga się już nie wykona.
4. Najpierw wartość sprawdzana, potem oczekiwana: wtedy komunikat czyta się jak „dostałem != chciałem”.

## Pułapki

- Asercja bez `self.` (`assertEqual(...)`) to `NameError`, test kończy się jako ERROR, a nie FAIL.
- `assertTrue(wynik)` przechodzi dla każdej „prawdziwej” wartości, także `5` czy `"nie"`. Do konkretnej wartości używaj `assertEqual`.
- `self.assertRaises(ValueError, srednia([]))` najpierw wywołuje `srednia([])`, wyjątek wylatuje przed asercją i test kończy się ERROR. Wywołanie wpisz wcięte w bloku `with`.
- `assertEquals` (z „s”) to stara nazwa, w Pythonie 3.12 już jej nie ma (`AttributeError`). Pisz `assertEqual`.
- Do wartości z rzutu kością wystarczy `assertIn(kosc.oczka, [1, 2, 3, 4, 5, 6])` albo para `assertGreaterEqual` i `assertLessEqual` (R.4.2, 2026 sty).

## Powiązane

- [unittest: pierwszy test](#/karta/testy/01-unittest-pierwszy-test)
- [Testy klasy Kosc](#/karta/testy/04-test-klasy-kosc)
- [Czytanie wyniku testów](#/karta/testy/05-wynik-testow)
- [Wyjątki try/except](#/karta/konsola/12-wyjatki)
- [Średnia i liczby nieparzyste](#/karta/konsola/32-srednia-i-nieparzyste)
