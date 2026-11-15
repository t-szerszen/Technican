---
tytul: "Pola prywatne z __"
dzial: konsola
tagi: [python, klasa, private, prywatne, hermetyzacja, podkreślnik]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#private-variables
  - https://docs.python.org/3/reference/expressions.html#private-name-mangling
  - https://peps.python.org/pep-0008/#descriptive-naming-styles
  - Zasady oceniania INF.04 2025 sty (R.2.1)
arkusze: [2025 sty]
---

## Po co to jest

W 2025 sty oba pola klasy miały być ==dostępne tylko w tej klasie i niedostępne dla klas potomnych==. Zasady oceniania mówią wprost: w Pythonie pole private to ==dwa podkreślniki przed nazwą== (R.2.1).

## Jak to działa

Python nie ma słowa `private`. Zamiast tego ==zmienia nazwę== (name mangling): każdą nazwę `__pole` zapisaną wewnątrz klasy `Tablica` zamienia na `_Tablica__pole`, zanim kod się wykona.

| Zapis | Gdzie | Python naprawdę szuka | Skutek |
| --- | --- | --- | --- |
| `self.__rozmiar` | w metodzie `Tablica` | `_Tablica__rozmiar` | działa |
| `tablica_liczb.__rozmiar` | poza klasą | `__rozmiar` | `AttributeError` |
| `self.__rozmiar` | w klasie potomnej `Potomna` | `_Potomna__rozmiar` | `AttributeError` |
| `self._rozmiar` | gdziekolwiek | `_rozmiar` | działa (to tylko umowa) |

Pole leży w obiekcie jako `_Tablica__rozmiar` i tylko kod klasy `Tablica` trafia pod tę nazwę. Poza klasą nazwa nie jest zmieniana, a klasa potomna zamienia ją na własną. Z zewnątrz zostają metody publiczne.

## Składnia do zapamiętania

```python
class Tablica:
    def __init__(self, rozmiar):
        self.__rozmiar = rozmiar
        self.__liczby = [0] * rozmiar

    def pobierz_rozmiar(self):
        return self.__rozmiar


tablica_liczb = Tablica(25)
print(tablica_liczb.pobierz_rozmiar())
```

## Przykład

```python prywatne.py {3,7,15,17}
class Tablica:
    def __init__(self, rozmiar):
        self.__rozmiar = rozmiar
        self.__liczby = [0] * rozmiar

    def ustaw(self, indeks, wartosc):
        if 0 <= indeks < self.__rozmiar:
            self.__liczby[indeks] = wartosc

    def pobierz_rozmiar(self):
        return self.__rozmiar


tablica_liczb = Tablica(3)
tablica_liczb.ustaw(1, 50)
print("Rozmiar:", tablica_liczb.pobierz_rozmiar())
try:
    print(tablica_liczb.__rozmiar)
except AttributeError as blad:
    print("Błąd:", blad)
```

```wynik
Rozmiar: 3
Błąd: 'Tablica' object has no attribute '__rozmiar'
```

1. Pole prywatne zakładasz w konstruktorze: `self.` plus dwa podkreślniki.
2. Wewnątrz klasy używasz go zwyczajnie, tu jako granicę w warunku.
3. Z zewnątrz tylko przez metodę publiczną (bez podkreślników).
4. Bezpośredni odczyt spoza klasy: Python szuka `__rozmiar` i go nie znajduje.

## Pułapki

- `self._liczby` (jedno `_`) to tylko umowa, Python go nie ukrywa. W 2025 sty pole private to dwa podkreślniki (R.2.1).
- `self.__liczby__` z podkreślnikami także na końcu nie jest prywatne. Zamiana nazwy działa tylko, gdy na końcu jest najwyżej jedno `_`.
- Nazwę z `__` musisz pisać identycznie w każdej metodzie. Literówka `self.__liczba` w jednym miejscu to nowe pole albo `AttributeError`.

## Powiązane

- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [Metody i metoda tylko dla klasy](#/karta/konsola/16-metody-i-metoda-prywatna)
- [Dziedziczenie i super()](#/karta/konsola/17-dziedziczenie-i-super)
- [Zadanie: klasa z tablicą](#/karta/konsola/44-zadanie-klasa-z-tablica)
