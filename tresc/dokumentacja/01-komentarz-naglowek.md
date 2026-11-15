---
tytul: "Komentarz-nagłówek funkcji"
dzial: dokumentacja
tagi: [dokumentacja, komentarz, docstring, nagłówek, metoda, self]
status: do-weryfikacji
zrodla:
  - https://peps.python.org/pep-0257/
  - https://docs.python.org/3/tutorial/controlflow.html#documentation-strings
  - https://docs.python.org/3/library/inspect.html#inspect.getdoc
  - Zasady oceniania INF.04 2024 cze, 2025 sty, 2025 cze, 2026 cze (R.4.1-R.4.5)
  - Zasady oceniania INF.04 2025 sty i 2026 sty (uwaga do R.2 o self)
arkusze: [2021 cze, 2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 sty, 2025 cze, 2026 cze]
---

## Po co to jest

Prawie co roku w części III trzeba opisać jedną funkcję (metodę) komentarzem według wzoru z arkusza. To ==5 punktów za kilka linijek== (R.4.1-R.4.5), nawet gdy kod nie działa.

## Jak to działa

Egzaminator kładzie wzór obok komentarza i punktuje linię po linii. Wzór z 2025 cze i 2026 cze (2025 sty: „nazwa metody”, „opis metody”):

| Linia wzoru | Co wpisać | Kryterium |
| --- | --- | --- |
| `nazwa funkcji:` | nazwa dokładnie jak w `def` | R.4.2 |
| `opis funkcji:` | co robi, jednym zdaniem | R.4.2 |
| `parametry:` | każdy parametr: nazwa i opis, albo „brak” | R.4.3 |
| `zwracany typ i opis:` | np. `int` i co oznacza, albo „brak” | R.4.4 |
| `autor:` | numer zdającego | R.4.5 |

==Komentarz ma się zgadzać z kodem, nawet gdy kod ma błędy== (uwaga do R.4: „liczba pól, typy”). Dwa parametry w `def` i jeden w komentarzu to stracony punkt.

W Pythonie są dwa zapisy, oba dopuszczone od 2024 sty (R.4.1): linie `#` nad `def` albo docstring `"""` jako pierwsza linia pod `def`. Komentarz `#` Python pomija, a docstring zapisuje w funkcji jako napis. Liczba gwiazdek się nie liczy (od 2023 sty), w 2026 cze wzór w ogóle ich nie ma.

Starsze wzory:

| Arkusz | Inaczej niż dziś |
| --- | --- |
| 2021 cze | „parametry wejściowe”, „wartość zwracana”, nagłówki nad dwiema metodami, autor to PESEL |
| 2022 cze | „argumenty”, „typ zwracany”, „informacje” z nazwą algorytmu (R.4.4) |
| 2023 cze | jak 2021 plus „informacje”, np. „sito Eratostenesa” (R.4.4) |
| 2023 sty, 2024 sty | już „opis funkcji”, „parametry”, „zwracany typ i opis” |

## Składnia do zapamiętania

```python
class Tablica:
    # **********************************************
    # nazwa metody: szukaj
    # opis metody: szuka pierwszego wystąpienia liczby w tablicy
    # parametry: szukana - liczba całkowita, której szukamy
    # zwracany typ i opis: int - indeks liczby albo -1, gdy jej nie ma
    # autor: 1234
    # **********************************************
    def szukaj(self, szukana):
        ...
```

## Przykład

```python tytul.py {5,9,10,18}
import inspect


def wypisz_tytul():
    """
    **********************************************
    nazwa funkcji: wypisz_tytul
    opis funkcji: wypisuje tytuł programu
    parametry: brak
    zwracany typ i opis: brak
    autor: 1234
    **********************************************
    """
    print("Gra w kości")


wypisz_tytul()
print(inspect.getdoc(wypisz_tytul))
```

```wynik
Gra w kości
**********************************************
nazwa funkcji: wypisz_tytul
opis funkcji: wypisuje tytuł programu
parametry: brak
zwracany typ i opis: brak
autor: 1234
**********************************************
```

1. Docstring to pierwsza linia pod `def`, wcięta jak ciało funkcji. Wersja z `#` stoi nad `def`.
2. Funkcja bez parametrów: „brak”, nie puste pole.
3. Bez `return` funkcja nic nie zwraca, więc też „brak”.
4. Docstring jest napisem zapisanym w funkcji, `inspect.getdoc()` go odczytuje. Komentarz `#` znika, a `__doc__` takiej funkcji to `None`.

## Pułapki

- `self` nie liczy się do parametrów (uwaga do R.2, 2025 sty i 2026 sty). `szukaj(self, szukana)` ma jeden parametr.
- Puste parametry i brak zwrotu też wpisz: „brak” (R.4.3, R.4.4 od 2025 sty; już R.4.2 w 2021 cze).
- Typ pisz taki, jaki naprawdę zwraca `return`: `int`, `float`, `bool`, `str`, `list`. Python go nie deklaruje, ale egzaminator porównuje.
- Nagłówek pisz na końcu, gdy `def` i `return` już się nie zmienią. Dopisany potem parametr psuje zgodność z kodem.
- Docstring musi być pierwszą instrukcją pod `def`. Napis niżej, po innej linii, nie jest docstringiem.
- Sprawdzany jest jeden nagłówek (2025 sty, 2025 cze), ale w 2021 cze trzeba było opisać dwie metody. Czytaj polecenie.

## Powiązane

- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
- [Metody i metoda tylko dla klasy](#/karta/konsola/16-metody-i-metoda-prywatna)
- [Zrzuty ekranu](#/karta/dokumentacja/02-zrzuty-ekranu)
