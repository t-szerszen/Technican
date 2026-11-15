---
tytul: "Dziedziczenie i super()"
dzial: konsola
tagi: [python, klasa, dziedziczenie, super, nadpisanie, isinstance, potomna]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#inheritance
  - https://docs.python.org/3/tutorial/classes.html#private-variables
  - https://docs.python.org/3/library/functions.html#super
  - https://docs.python.org/3/library/functions.html#isinstance
  - Zasady oceniania INF.04 2025 sty (R.2.1)
arkusze: [2025 sty]
---

## Po co to jest

W arkuszach dziedziczenie pojawia się raz: w 2025 sty pola miały być ==niedostępne dla klas potomnych==. Żeby świadomie spełnić ten warunek, trzeba wiedzieć, jak działa klasa potomna i co widzi z klasy bazowej.

## Jak to działa

`class KoscKolorowa(Kosc):` znaczy: weź wszystko z `Kosc`, a resztę dopisz albo zmień. Szukając metody, Python ==zaczyna od klasy obiektu i idzie w górę==, do bazowej.

| Zapis | Gdzie Python szuka | Co znajduje |
| --- | --- | --- |
| `czerwona.opis()` | `KoscKolorowa` | nową `opis` (nadpisaną) |
| `super().opis()` w `KoscKolorowa` | od razu `Kosc` | starą `opis` |
| `Kosc(2).opis()` | `Kosc` | starą `opis` |
| `self.__dostepna` w `Kosc` | `_Kosc__dostepna` | pole jest |
| `self.__dostepna` w `KoscKolorowa` | `_KoscKolorowa__dostepna` | brak, `AttributeError` |

Ostatni wiersz to mechanizm z 2025 sty. `__dostepna` w klasie bazowej zapisuje się w obiekcie jako `_Kosc__dostepna`. W potomnej ta sama nazwa zamienia się na `_KoscKolorowa__dostepna`, której nie ma. Pole jest w obiekcie, ale potomna nie trafi do niego pod nazwą `__dostepna`.

Konstruktor potomnej zastępuje bazowy. Pola z bazowego powstaną tylko wtedy, gdy wywołasz go przez `super().__init__(...)`.

## Składnia do zapamiętania

```python
class Kosc:
    def __init__(self, oczka):
        self.oczka = oczka


class KoscKolorowa(Kosc):
    def __init__(self, oczka, kolor):
        super().__init__(oczka)
        self.kolor = kolor
```

## Przykład

```python dziedziczenie.py {10,12,16,24}
class Kosc:
    def __init__(self, oczka):
        self.oczka = oczka
        self.__dostepna = True

    def opis(self):
        return f"Kość: {self.oczka}"


class KoscKolorowa(Kosc):
    def __init__(self, oczka, kolor):
        super().__init__(oczka)
        self.kolor = kolor

    def opis(self):
        return f"{super().opis()}, kolor {self.kolor}"

    def czy_dostepna(self):
        return self.__dostepna


czerwona = KoscKolorowa(4, "czerwony")
print(czerwona.opis())
print(isinstance(czerwona, Kosc), isinstance(Kosc(2), KoscKolorowa))
print(czerwona.__dict__)
try:
    czerwona.czy_dostepna()
except AttributeError as blad:
    print("Błąd:", blad)
```

```wynik
Kość: 4, kolor czerwony
True False
{'oczka': 4, '_Kosc__dostepna': True, 'kolor': 'czerwony'}
Błąd: 'KoscKolorowa' object has no attribute '_KoscKolorowa__dostepna'
```

1. Klasa bazowa w nawiasie.
2. `super().__init__(oczka)` uruchamia konstruktor `Kosc`, który zakłada `oczka` i `__dostepna`.
3. Nadpisanie: ta sama nazwa metody. `super().opis()` wywołuje wersję z `Kosc` i dokleja kolor.
4. `isinstance` mówi `True` także dla klasy bazowej. Odwrotnie nie: zwykła `Kosc` nie jest `KoscKolorowa`.

## Pułapki

- Bez `super().__init__(...)` w konstruktorze potomnej pola bazowej nie powstaną, a `czerwona.oczka` da `AttributeError`.
- `super().__init__(self, oczka)` to błąd: `super()` sam przekazuje `self`, więc dostaniesz za dużo argumentów.
- Gdy potomna nie ma własnego `__init__`, dziedziczy bazowy i trzeba podać jego argumenty.
- Pole z jednym `_` potomna widzi bez przeszkód. Warunek „niedostępne dla klas potomnych” (2025 sty) spełniają tylko dwa podkreślniki (R.2.1).
- W arkuszu nie trzeba pisać klasy potomnej. Wystarczą pola z `__`, nie dopisuj dziedziczenia „na pokaz”.

## Powiązane

- [Pola prywatne z `__`](#/karta/konsola/14-pola-prywatne)
- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [`__str__`](#/karta/konsola/18-metoda-str)
