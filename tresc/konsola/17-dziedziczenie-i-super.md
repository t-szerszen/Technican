---
tytul: "Dziedziczenie i super()"
dzial: konsola
tagi: [python, klasa, dziedziczenie, super, potomna, bazowa]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#inheritance
  - https://docs.python.org/3/tutorial/classes.html#private-variables
  - https://docs.python.org/3/library/functions.html#super
  - Zasady oceniania INF.04 2025 sty (R.2.1)
arkusze: [2025 sty]
---

## Po co to jest

Żaden arkusz nie każe pisać klasy potomnej. Dziedziczenie pojawia się tylko w warunku z 2025 sty: pola mają być ==niedostępne dla klas potomnych==. Ta karta pokazuje, co to znaczy i dlaczego spełniają to dwa podkreślniki.

## Jak to działa

`class KoscKolorowa(Kosc):` znaczy: weź wszystko z `Kosc`, a resztę dopisz. Szukając metody, Python ==zaczyna od klasy obiektu i idzie w górę==, do bazowej. Własny `__init__` potomnej zastępuje bazowy, więc pola bazowej powstaną tylko po wywołaniu `super().__init__(...)`.

| Zapis | Gdzie Python szuka | Skutek |
| --- | --- | --- |
| `czerwona.opis()` | `KoscKolorowa`: brak, więc `Kosc` | metoda z bazowej działa |
| `self.oczka` w `KoscKolorowa` | pole `oczka` w obiekcie | działa |
| `self.__dostepna` w `Kosc` | `_Kosc__dostepna` | działa |
| `self.__dostepna` w `KoscKolorowa` | `_KoscKolorowa__dostepna` | `AttributeError` |

Ostatni wiersz to warunek z 2025 sty. Pole z `__` jest w obiekcie, ale pod nazwą z przedrostkiem klasy bazowej. Potomna dokleja swój przedrostek i go nie znajduje.

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

```python dziedziczenie.py {10,12,20,22}
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

    def czy_dostepna(self):
        return self.__dostepna


czerwona = KoscKolorowa(4, "czerwony")
print(czerwona.opis(), czerwona.kolor)
try:
    czerwona.czy_dostepna()
except AttributeError as blad:
    print("Błąd:", blad)
```

```wynik
Kość: 4 czerwony
Błąd: 'KoscKolorowa' object has no attribute '_KoscKolorowa__dostepna'
```

1. Klasa bazowa w nawiasie.
2. `super().__init__(oczka)` uruchamia konstruktor `Kosc`, który zakłada `oczka` i `__dostepna`.
3. `opis` nie ma w `KoscKolorowa`, więc Python bierze ją z `Kosc`.
4. Potomna sięga po pole z `__` i dostaje `AttributeError`: tego wymagało 2025 sty.

## Pułapki

- Bez `super().__init__(...)` w konstruktorze potomnej pola bazowej nie powstaną, a `czerwona.oczka` da `AttributeError`.
- `super().__init__(self, oczka)` to błąd: `super()` sam przekazuje `self`, więc dostaniesz `TypeError` (za dużo argumentów).
- Pole z jednym `_` potomna widzi bez przeszkód. Warunek „niedostępne dla klas potomnych” (2025 sty) spełniają tylko dwa podkreślniki (R.2.1).
- Nie dopisuj na egzaminie klasy potomnej „na pokaz”, skoro arkusz jej nie wymaga. Wystarczą pola z `__`.

## Powiązane

- [Pola prywatne z `__`](#/karta/konsola/14-pola-prywatne)
- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [`__str__`](#/karta/konsola/18-metoda-str)
