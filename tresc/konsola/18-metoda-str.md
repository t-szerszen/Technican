---
tytul: "__str__"
dzial: konsola
tagi: [python, klasa, __str__, print, str, f-string]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/datamodel.html#object.__str__
  - https://docs.python.org/3/reference/datamodel.html#object.__repr__
  - https://docs.python.org/3/library/functions.html#print
  - https://docs.python.org/3/library/functions.html#func-str
arkusze: []
---

## Po co to jest

Żaden arkusz nie wymaga `__str__`. Przydaje się przy sprawdzaniu klasy: `print(kosc)` pokazuje stan obiektu zamiast adresu w pamięci. Metodę, która ma ==zwracać napis== (np. słownie z 2026 sty), pisze się tak samo: `return`, nie `print`.

## Jak to działa

`print(pierwsza)` krok po kroku:

1. `print` potrzebuje tekstu, więc wywołuje `str(pierwsza)`.
2. `str` szuka metody `__str__` w klasie obiektu i uruchamia ją z `self = pierwsza`.
3. `__str__` ==zwraca napis==, a `print` go wypisuje.

Bez własnego `__str__` Python bierze domyślny z klasy `object` i wypisuje coś w rodzaju `<__main__.Kosc object at 0x10479a7b0>`: nazwę klasy i adres w pamięci.

| Zapis | Czy woła `__str__` | Co wychodzi |
| --- | --- | --- |
| `print(pierwsza)` | tak | `Kość z 3 oczkami` |
| `f"Rzut: {pierwsza}"` | tak | `Rzut: Kość z 3 oczkami` |
| `"Rzut: " + pierwsza` | nie | `TypeError`, trzeba `str(pierwsza)` |
| `print(kosci)` (lista obiektów) | nie, lista używa `repr()` | `[<__main__.Kosc object at ...>, ...]` |

## Składnia do zapamiętania

```python
class Kosc:
    def __init__(self, oczka):
        self.oczka = oczka

    def __str__(self):
        return f"Kość z {self.oczka} oczkami"


print(Kosc(3))
```

## Przykład

```python napis.py {5,6,12,15}
class Kosc:
    def __init__(self, oczka):
        self.oczka = oczka

    def __str__(self):
        return f"Kość z {self.oczka} oczkami"


pierwsza = Kosc(3)
druga = Kosc(6)
print(pierwsza)
print(f"Rzut: {druga}")
kosci = [pierwsza, druga]
for kosc in kosci:
    print(kosc)
```

```wynik
Kość z 3 oczkami
Rzut: Kość z 6 oczkami
Kość z 3 oczkami
Kość z 6 oczkami
```

1. Dokładnie dwa podkreślniki z obu stron i tylko `self`.
2. `return`, nie `print`. Napis składa f-string z pól obiektu.
3. f-string też korzysta z `__str__`.
4. Listę obiektów wypisuj w pętli, wtedy każdy element idzie przez `__str__`.

## Pułapki

- `print` zamiast `return` w `__str__` wypisze tekst, a potem rzuci `TypeError: __str__ returned non-string (type NoneType)`.
- W 2026 sty po utworzeniu obiektu trzeba było wypisać oczka liczbowo i słownie oraz nazwę pliku (R.2.9). Prościej wypisać pola jawnie w programie głównym niż upychać to w `__str__`.

## Powiązane

- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [f-stringi i print()](#/karta/konsola/03-f-stringi)
- [Metody i metoda tylko dla klasy](#/karta/konsola/16-metody-i-metoda-prywatna)
