---
tytul: "unittest: pierwszy test"
dzial: testy
tagi: [python, unittest, TestCase, test, unittest.main]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/unittest.html#basic-example
  - https://docs.python.org/3/library/unittest.html#command-line-interface
  - https://docs.python.org/3/library/unittest.html#test-discovery
  - Zasady oceniania INF.04 2026 sty (R.4.1, R.4.4)
arkusze: [2026 sty]
---

## Po co to jest

W 2026 sty trzecia część egzaminu to testy jednostkowe klasy z części konsolowej. W Pythonie narzędzie jest wbudowane: moduł `unittest`. Za ==narzędzie odpowiednie dla języka== i nazwy metod mówiące, co sprawdzają, jest punkt R.4.1.

## Jak to działa

Test to zwykły plik Pythona, który importuje testowany kod i sprawdza wyniki. `python -m unittest -v test_nwd` robi po kolei:

1. Importuje moduł `test_nwd` (plik `test_nwd.py` z bieżącego folderu).
2. Szuka w nim klas dziedziczących po `unittest.TestCase`.
3. W każdej bierze ==tylko metody, których nazwa zaczyna się od test==, i układa je alfabetycznie (nie w kolejności z pliku).
4. Dla każdej metody tworzy nowy obiekt klasy testowej i ją wywołuje.
5. Wypisuje stan każdego testu i podsumowanie: liczbę testów i `OK` albo `FAILED`.

Z `-v` każdy test ma linię zakończoną `ok`. Bez `-v` każdy test to jeden znak: `.` przeszedł, `F` asercja nie przeszła, `E` wyjątek w teście.

```wynik
$ python -m unittest test_nwd
..
----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

## Składnia do zapamiętania

```python
import unittest
from nwd import nwd


class TestNwd(unittest.TestCase):
    def test_nwd_roznych_liczb(self):
        self.assertEqual(nwd(12, 18), 6)


if __name__ == "__main__":
    unittest.main()
```

## Przykład

```python nwd.py
def nwd(a, b):
    while a != b:
        if a > b:
            a = a - b
        else:
            b = b - a
    return a
```

```python test_nwd.py {1,5,6,12,16}
import unittest
from nwd import nwd


class TestNwd(unittest.TestCase):
    def test_nwd_roznych_liczb(self):
        self.assertEqual(nwd(12, 18), 6)

    def test_nwd_rownych_liczb(self):
        self.assertEqual(nwd(7, 7), 7)

    def pomocnicza(self):
        return "to nie jest test"


if __name__ == "__main__":
    unittest.main()
```

```wynik
$ python -m unittest -v test_nwd
test_nwd_rownych_liczb (test_nwd.TestNwd.test_nwd_rownych_liczb) ... ok
test_nwd_roznych_liczb (test_nwd.TestNwd.test_nwd_roznych_liczb) ... ok

----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

1. Moduł testów jest w bibliotece standardowej, nic nie instalujesz.
2. Klasa musi dziedziczyć po `unittest.TestCase`, inaczej nie zostanie znaleziona.
3. Nazwa zaczyna się od `test_` i mówi, co sprawdza. W wyniku `rownych` jest przed `roznych`, bo „w” < „z”.
4. `pomocnicza` nie zaczyna się od `test`, więc się nie uruchamia: są 2 testy, nie 3.
5. Dzięki temu blokowi działa też `python test_nwd.py` (wynik w kropkach, jak bez `-v`).

## Pułapki

- Metoda bez przedrostka `test` po cichu się nie uruchamia. `Ran 0 tests` i `NO TESTS RAN` oznaczają złe nazwy metod albo brak dziedziczenia po `TestCase`.
- Samo `python -m unittest` (bez nazwy modułu) szuka plików `test*.py`: `test_nwd.py` znajdzie, `nwd_test.py` nie.
- Jeden test: `python -m unittest -v test_nwd.TestNwd.test_nwd_rownych_liczb`, cała klasa: `test_nwd.TestNwd`.
- Nazwy `test1`, `test_a` nie mówią, co jest sprawdzane. Arkusz wymaga nazw wyrażających cel, w konwencji języka, w Pythonie `snake_case` (R.4.1, 2026 sty).
- Plik testowy i testowany moduł trzymaj w jednym folderze, inaczej `from nwd import nwd` kończy się `ModuleNotFoundError`.

## Powiązane

- [Asercje](#/karta/testy/02-asercje)
- [Czytanie wyniku testów](#/karta/testy/05-wynik-testow)
- [NWD: algorytm Euklidesa](#/karta/konsola/35-nwd-euklides)
- [Funkcje](#/karta/konsola/11-funkcje)
