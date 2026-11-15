---
tytul: "__str__"
dzial: konsola
tagi: [python, klasa, __str__, print, str, f-string, repr]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/datamodel.html#object.__str__
  - https://docs.python.org/3/reference/datamodel.html#object.__repr__
  - https://docs.python.org/3/library/functions.html#print
  - https://docs.python.org/3/library/functions.html#func-str
arkusze: []
---

## Po co to jest

Żaden arkusz nie wymaga `__str__`, ale przydaje się przy sprawdzaniu klasy: `print(kosc)` od razu pokazuje stan obiektu zamiast adresu w pamięci. Metodę, która ma ==zwracać napis== (np. słownie z 2026 sty), pisze się tak samo.

## Jak to działa

`print(pierwsza)` krok po kroku:

1. `print` potrzebuje tekstu, więc wywołuje `str(pierwsza)`.
2. `str` szuka metody `__str__` w klasie obiektu i uruchamia ją z `self = pierwsza`.
3. `__str__` ==zwraca napis==, a `print` go wypisuje.

Bez własnego `__str__` Python bierze domyślny z klasy `object`. Wtedy `print(pierwsza)` wypisuje coś w rodzaju `<__main__.Kosc object at 0x10479a7b0>`: nazwę klasy i adres w pamięci, przy każdym uruchomieniu inny.

| Zapis | Czy woła `__str__` | Co wychodzi |
| --- | --- | --- |
| `print(pierwsza)` | tak | `Kość z 3 oczkami` |
| `str(pierwsza)` | tak | napis, można go dalej obrabiać |
| `f"Rzut: {pierwsza}"` | tak | `Rzut: Kość z 3 oczkami` |
| `"Rzut: " + pierwsza` | nie | `TypeError`, trzeba `str(pierwsza)` |
| `print(kosci)` (lista obiektów) | nie, lista używa `repr()` | każdy element jak bez `__str__` |

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

```python napis.py {5,6,12,14,17}
class Kosc:
    def __init__(self, oczka):
        self.oczka = oczka

    def __str__(self):
        return f"Kość z {self.oczka} oczkami"


pierwsza = Kosc(3)
druga = Kosc(6)
print(pierwsza)
opis = str(druga)
print(opis.upper())
print(f"Rzut: {pierwsza}")
kosci = [pierwsza, druga]
for kosc in kosci:
    print(kosc)
```

```wynik
Kość z 3 oczkami
KOŚĆ Z 6 OCZKAMI
Rzut: Kość z 3 oczkami
Kość z 3 oczkami
Kość z 6 oczkami
```

1. Dokładnie dwa podkreślniki z obu stron i tylko `self`.
2. `return`, nie `print`. Napis składa f-string z pól obiektu.
3. `str()` daje zwykły napis, więc działa na nim np. `upper()`.
4. f-string też korzysta z `__str__`.
5. Listę obiektów wypisuj w pętli, wtedy każdy element idzie przez `__str__`.

## Pułapki

- `print` zamiast `return` w `__str__` wypisze tekst, a potem rzuci `TypeError: __str__ returned non-string (type NoneType)`.
- `str()` woła `__str__` bez argumentów, więc poza `self` nie dawaj parametrów. Metoda ma tylko złożyć opis, niczego w obiekcie nie zmieniać.
- `print(kosci)` na całej liście daje `[<__main__.Kosc object at ...>, ...]`, bo lista pokazuje elementy przez `repr()`, a nie `__str__`.
- W 2026 sty po utworzeniu obiektu trzeba było wypisać oczka liczbowo i słownie oraz nazwę pliku (R.2.9). `__str__` musiałaby to wszystko zawierać, więc prościej wypisać pola jawnie w programie głównym.

## Powiązane

- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [f-stringi i print()](#/karta/konsola/03-f-stringi)
- [Metody i metoda tylko dla klasy](#/karta/konsola/16-metody-i-metoda-prywatna)
