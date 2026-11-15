---
tytul: "Atrybut klasowy jako licznik instancji"
dzial: konsola
tagi: [python, klasa, statyczne, atrybut klasy, licznik, instancje]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#class-and-instance-variables
  - https://docs.python.org/3/tutorial/classes.html#random-remarks
  - https://docs.python.org/3/reference/simple_stmts.html#attr-target-note
  - Zasady oceniania INF.04 2026 sty (R.2.1, R.2.4, R.2.9)
arkusze: [2026 sty]
---

## Po co to jest

W 2026 sty klasa `Kosc` miała ==publiczne pole statyczne z liczbą instancji==, zwiększane w konstruktorze i wypisywane po utworzeniu każdego obiektu. W Pythonie pole statyczne to po prostu atrybut zapisany pod `class`, poza metodami.

## Jak to działa

Atrybut klasy istnieje raz, w samej klasie. Obiekty go nie kopiują. Czytając `obiekt.pole`, Python ==najpierw szuka w obiekcie, potem w klasie==. Zapis `obiekt.pole = ...` trafia zawsze do obiektu.

Dobrze: `Kosc.liczba_instancji += 1` w `__init__`. Zapis idzie przez nazwę klasy, więc każdy nowy obiekt zwiększa tę jedną wartość: 0, 1, 2...

Źle: `self.liczba_instancji += 1`. Ta linia działa jak `self.liczba_instancji = self.liczba_instancji + 1`:

1. Prawa strona czyta `self.liczba_instancji`. W obiekcie go nie ma, więc Python bierze z klasy: 0.
2. Liczy 0 + 1 = 1.
3. Lewa strona zapisuje 1 ==w obiekcie==, tworząc nowe pole. Klasa dalej ma 0, a każdy kolejny obiekt też dostaje własne 1.

## Składnia do zapamiętania

```python
class Kosc:
    liczba_instancji = 0

    def __init__(self, oczka):
        self.oczka = oczka
        Kosc.liczba_instancji += 1


pierwsza = Kosc(3)
print("Liczba instancji:", Kosc.liczba_instancji)
```

## Przykład

```python licznik.py {2,6,18,24}
class Kosc:
    liczba_instancji = 0

    def __init__(self, oczka):
        self.oczka = oczka
        Kosc.liczba_instancji += 1


class ZlaKosc:
    liczba_instancji = 0

    def __init__(self, oczka):
        self.oczka = oczka
        self.liczba_instancji += 1


pierwsza = Kosc(3)
print("Liczba instancji:", Kosc.liczba_instancji)
druga = Kosc(5)
print("Liczba instancji:", Kosc.liczba_instancji)

zla1 = ZlaKosc(3)
zla2 = ZlaKosc(5)
print("Zła klasa:", ZlaKosc.liczba_instancji, "obiekt:", zla2.liczba_instancji)
```

```wynik
Liczba instancji: 1
Liczba instancji: 2
Zła klasa: 0 obiekt: 1
```

1. Atrybut klasy: pod `class`, bez `self`, wartość startowa 0.
2. Zwiększasz przez nazwę klasy, więc zmienia się jedna, wspólna wartość.
3. Odczyt też przez nazwę klasy. W 2026 sty liczbę instancji wypisywało się po utworzeniu każdego obiektu (R.2.9).
4. Wersja z `self.` po dwóch obiektach: klasa ma 0, a każdy obiekt własne 1.

## Pułapki

- `self.liczba_instancji += 1` nie liczy instancji, tylko tworzy pole w obiekcie. Kryterium wymaga, by w konstruktorze rosło pole statyczne (R.2.4, 2026 sty).
- `liczba_instancji += 1` bez przedrostka w `__init__` to `UnboundLocalError`: Python uznaje ją za zmienną lokalną metody.
- Pole statyczne w 2026 sty było tylko jedno: liczba instancji (R.2.1). Listę nazw plików, oczka i dostępność zakładaj w `__init__` przez `self.`, bo tak zasady opisują pola w Pythonie (uwaga do R.2).

## Powiązane

- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [Jeden konstruktor z domyślnym None](#/karta/konsola/19-konstruktor-z-none)
- [Zadanie: klasa Kosc](#/karta/konsola/45-zadanie-klasa-kosc)
