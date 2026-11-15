---
tytul: "Atrybut klasowy jako licznik instancji"
dzial: konsola
tagi: [python, klasa, statyczne, atrybut klasy, licznik, instancje]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#class-and-instance-variables
  - https://docs.python.org/3/tutorial/classes.html#random-remarks
  - https://docs.python.org/3/reference/simple_stmts.html#attr-target-note
  - Zasady oceniania INF.04 2026 sty (R.2.1, R.2.4, R.2.8)
arkusze: [2026 sty]
---

## Po co to jest

W 2026 sty klasa `Kosc` miała ==publiczne pole statyczne z liczbą instancji==, zwiększane w konstruktorze i wypisywane po utworzeniu każdego obiektu. W Pythonie pole statyczne to po prostu atrybut zapisany pod `class`, poza metodami.

## Jak to działa

Atrybut klasy istnieje raz, w samej klasie. Obiekty go nie kopiują. Czytając `obiekt.pole`, Python ==najpierw szuka w obiekcie, potem w klasie==. Zapis `obiekt.pole = ...` trafia zawsze do obiektu.

Dobrze: `Kosc.liczba_instancji += 1` w `__init__`. Zapis idzie przez nazwę klasy, więc każdy nowy obiekt zwiększa tę jedną wartość: 0, 1, 2...

Źle: `self.liczba_instancji += 1`. Ta linia to `self.liczba_instancji = self.liczba_instancji + 1`:

1. Prawa strona czyta `self.liczba_instancji`. W obiekcie go nie ma, więc Python bierze z klasy: 0.
2. Liczy 0 + 1 = 1.
3. Lewa strona zapisuje 1 ==w obiekcie==, tworząc nowe pole. Klasa dalej ma 0.

| Linia | `ZlaKosc.liczba_instancji` | pola `zla1` | pola `zla2` |
| --- | --- | --- | --- |
| `zla1 = ZlaKosc(3)` | 0 | oczka 3, liczba_instancji 1 | — |
| `zla2 = ZlaKosc(5)` | 0 | oczka 3, liczba_instancji 1 | oczka 5, liczba_instancji 1 |

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

```python licznik.py {2,6,18,23}
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
print("Instancji:", Kosc.liczba_instancji)
druga = Kosc(5)
print("Instancji:", Kosc.liczba_instancji)
print("Przez obiekt:", pierwsza.liczba_instancji)

zla1 = ZlaKosc(3)
zla2 = ZlaKosc(5)
print("Zła klasa:", ZlaKosc.liczba_instancji, zla2.__dict__)
```

```wynik
Instancji: 1
Instancji: 2
Przez obiekt: 2
Zła klasa: 0 {'oczka': 5, 'liczba_instancji': 1}
```

1. Atrybut klasy: pod `class`, bez `self`, wartość startowa 0.
2. Zwiększasz przez nazwę klasy, więc zmienia się jedna, wspólna wartość.
3. Odczyt przez nazwę klasy. Przez obiekt też działa, ale tylko dopóki obiekt nie ma pola o tej nazwie. Tak wypisuj liczbę instancji po każdym utworzeniu obiektu (R.2.8, 2026 sty).
4. Wersja z `self.` po dwóch obiektach: klasa ma 0, a każdy obiekt własne 1.

## Pułapki

- `self.liczba_instancji += 1` nie liczy instancji, tylko tworzy pole w obiekcie. Kryterium wymaga, by w konstruktorze rosło pole statyczne (R.2.4, 2026 sty).
- `liczba_instancji += 1` bez przedrostka w `__init__` to `UnboundLocalError`: Python uznaje ją za zmienną lokalną metody.
- Lista jako atrybut klasy też jest wspólna. `append` przez jeden obiekt widać we wszystkich. Pola zmieniane osobno dla każdego obiektu zakładaj w `__init__` przez `self.`.
- Zasady 2026 sty chcą zwykłych pól (oczka, dostępność) w konstruktorze przez `self.pole` (uwaga do R.2) i osobno pola statycznego (R.2.1). W Pythonie to drugie jest atrybutem pod `class`.

## Powiązane

- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [Jeden konstruktor z domyślnym None](#/karta/konsola/19-konstruktor-z-none)
- [Zadanie: klasa Kosc](#/karta/konsola/45-zadanie-klasa-kosc)
