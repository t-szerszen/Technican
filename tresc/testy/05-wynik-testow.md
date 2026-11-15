---
tytul: "Czytanie wyniku testów"
dzial: testy
tagi: [python, unittest, FAIL, ERROR, traceback, AssertionError, zrzut]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/unittest.html#basic-example
  - https://docs.python.org/3/library/unittest.html#unittest.TestResult.failures
  - Zasady oceniania INF.04 2026 sty (R.4.4, R.4.5)
arkusze: [2026 sty]
---

## Po co to jest

Po uruchomieniu testów trzeba w kilka sekund wiedzieć, co jest nie tak: test, kod czy dane. W 2026 sty ==wynik testów musi być widoczny na zrzutach== `test1.png`, `test2.png` (R.4.4, R.4.5).

## Jak to działa

Każdy test kończy się jednym z trzech stanów:

| Z `-v` | Bez `-v` | Znaczy | Gdzie szukać |
| --- | --- | --- | --- |
| `ok` | `.` | wszystkie asercje przeszły | nigdzie |
| `FAIL` | `F` | asercja nie przeszła: `AssertionError` | wynik albo oczekiwana wartość |
| `ERROR` | `E` | inny wyjątek w teście, zanim asercja skończyła | błąd w kodzie lub w teście |

Raport po nieudanych testach czytaj tak:

1. Linia `FAIL: nazwa_testu (...)` albo `ERROR: ...` mówi, który test.
2. ==Ostatnia linia bloku== to przyczyna: `AssertionError: dostałem != chciałem` albo nazwa wyjątku.
3. Linie `File "...", line N` to ślad wywołań, od testu w głąb kodu. Pierwsza wskazuje linię w teście, kolejne w testowanym module.
4. Na samym dole: `Ran 3 tests` i `OK` albo `FAILED (failures=1, errors=1)`, czyli ile FAIL i ile ERROR.

Bez `-v` ten sam przebieg to jedna linia `.EF`, a pod nią ten sam raport. Trzeci argument asercji (`msg`) dokleja się do komunikatu po dwukropku.

## Składnia do zapamiętania

```python
class TestSrednia(unittest.TestCase):
    def test_srednia_ulamkowa(self):
        wynik = srednia([1, 2, 4])
        self.assertEqual(wynik, 2.33, "średnia z [1, 2, 4]")
        # FAIL: AssertionError: 2.3333333333333335 != 2.33 : średnia z [1, 2, 4]
        # ERROR: wyjątek przed asercją, np. ZeroDivisionError w srednia()
```

## Przykład

```python srednia.py
def srednia(liczby):
    return sum(liczby) / len(liczby)
```

```python test_srednia.py {7,10,13}
import unittest
from srednia import srednia


class TestSrednia(unittest.TestCase):
    def test_srednia_calkowitych(self):
        self.assertEqual(srednia([2, 4, 6]), 4)

    def test_srednia_ulamkowa(self):
        self.assertEqual(srednia([1, 2, 4]), 2.33)

    def test_srednia_pustej_listy(self):
        self.assertEqual(srednia([]), 0)
```

Wynik z Pythona 3.12 (pełne ścieżki w liniach `File` skrócone do `...`):

```wynik
$ python -m unittest -v test_srednia
test_srednia_calkowitych (test_srednia.TestSrednia.test_srednia_calkowitych) ... ok
test_srednia_pustej_listy (test_srednia.TestSrednia.test_srednia_pustej_listy) ... ERROR
test_srednia_ulamkowa (test_srednia.TestSrednia.test_srednia_ulamkowa) ... FAIL

======================================================================
ERROR: test_srednia_pustej_listy (test_srednia.TestSrednia.test_srednia_pustej_listy)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "...test_srednia.py", line 13, in test_srednia_pustej_listy
    self.assertEqual(srednia([]), 0)
                     ^^^^^^^^^^^
  File "...srednia.py", line 2, in srednia
    return sum(liczby) / len(liczby)
           ~~~~~~~~~~~~^~~~~~~~~~~~~
ZeroDivisionError: division by zero

======================================================================
FAIL: test_srednia_ulamkowa (test_srednia.TestSrednia.test_srednia_ulamkowa)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "...test_srednia.py", line 10, in test_srednia_ulamkowa
    self.assertEqual(srednia([1, 2, 4]), 2.33)
AssertionError: 2.3333333333333335 != 2.33

----------------------------------------------------------------------
Ran 3 tests in 0.000s

FAILED (failures=1, errors=1)
```

1. `ok`: 12 / 3 daje `4.0`, a `4.0 == 4`, więc asercja przechodzi.
2. FAIL: kod liczy dobrze, ale test oczekuje `2.33` zamiast `2.3333...`. Poprawia się test: `assertAlmostEqual(..., 2.33, places=2)`.
3. ERROR: `srednia([])` dzieli przez zero, zanim `assertEqual` cokolwiek porówna. Ślad prowadzi z linii 13 testu do linii 2 w `srednia.py`.

Po poprawieniu testów:

```python test_srednia_poprawiony.py
import unittest
from srednia import srednia


class TestSrednia(unittest.TestCase):
    def test_srednia_ulamkowa(self):
        self.assertAlmostEqual(srednia([1, 2, 4]), 2.33, places=2)

    def test_pusta_lista_rzuca_wyjatek(self):
        with self.assertRaises(ZeroDivisionError):
            srednia([])
```

```wynik
$ python -m unittest -v test_srednia_poprawiony
test_pusta_lista_rzuca_wyjatek (test_srednia_poprawiony.TestSrednia.test_pusta_lista_rzuca_wyjatek) ... ok
test_srednia_ulamkowa (test_srednia_poprawiony.TestSrednia.test_srednia_ulamkowa) ... ok

----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

## Pułapki

- FAIL nie zawsze znaczy „zły kod”. Najpierw sprawdź, czy oczekiwana wartość w teście jest dobra.
- `ERROR: test_srednia (unittest.loader._FailedTest...)` i `ImportError: Failed to import test module` znaczą, że żaden test się nie uruchomił: plik testu nie widzi modułu albo ma błąd składni. Uruchamiaj z folderu, w którym leżą oba pliki.
- Zrzut musi obejmować cały ekran z paskiem zadań i środowiskiem programistycznym, z widocznymi wynikami testów. Wykadrowany wynik się nie liczy (R.4.4, 2026 sty).
- Wynik na zrzucie ma wynikać z danych testowych (R.4.5). Niech na zrzucie obok wyniku widać kod testu z danymi, np. `Kosc(4)` i oczekiwane 4.
- Zrzuty zapisz w folderze `testy` jako `test1.png`, `test2.png`, obok spakowanego projektu i pliku z testami.

## Powiązane

- [Asercje](#/karta/testy/02-asercje)
- [Testy klasy Kosc](#/karta/testy/04-test-klasy-kosc)
- [Wyjątki try/except](#/karta/konsola/12-wyjatki)
- [Zrzuty ekranu](#/karta/dokumentacja/02-zrzuty-ekranu)
- [Foldery i pakowanie](#/karta/dokumentacja/04-foldery-i-pakowanie)
