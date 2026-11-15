---
tytul: "Komentarz-nagłówek funkcji"
dzial: dokumentacja
tagi: [dokumentacja, komentarz, docstring, nagłówek, metoda, self]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/controlflow.html#documentation-strings
  - https://peps.python.org/pep-0257/
  - Arkusz INF.04 2025 cze i 2026 cze (część III, listing 1)
  - Zasady oceniania INF.04 2025 cze, 2026 cze (R.4.1-R.4.5 i uwaga do R.4)
  - Zasady oceniania INF.04 2025 sty i 2026 sty (uwaga do R.2 o self)
  - Zasady oceniania INF.04 2022 cze, 2023 cze (R.4.4, linia „informacje”)
arkusze: [2021 cze, 2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 sty, 2025 cze, 2026 cze]
---

## Po co to jest

W części III prawie co roku (wyjątek: 2026 sty) trzeba opisać jedną funkcję lub metodę komentarzem według wzoru z arkusza. To ==5 punktów za kilka linijek== (R.4.1-R.4.5).

## Jak to działa

Egzaminator kładzie wzór obok komentarza i punktuje linię po linii. Wzór z 2025 cze i 2026 cze (przy klasie wolno pisać „metody” zamiast „funkcji”):

| Linia wzoru | Co wpisać | Kryterium |
| --- | --- | --- |
| cały komentarz | układ jak w listingu z arkusza | R.4.1 |
| `nazwa funkcji:` | nazwa dokładnie jak w `def` | R.4.2 |
| `opis funkcji:` | co robi, jednym zdaniem | R.4.2 |
| `parametry:` | każdy parametr: nazwa i opis, albo „brak” | R.4.3 |
| `zwracany typ i opis:` | np. `int` i co oznacza, albo „brak” | R.4.4 |
| `autor:` | numer zdającego | R.4.5 |

==Komentarz ma się zgadzać z kodem, nawet gdy kod ma błędy logiczne== (uwaga do R.4: „liczba pól, typy”). Dwa parametry w `def` i jeden w komentarzu to stracony punkt.

W Pythonie zasady dopuszczają dwa zapisy (R.4.1): linie `#` nad `def` albo docstring `"""` w pierwszej linii pod `def`. Liczby gwiazdek nie liczą, a w 2026 cze wzór nie ma ich wcale.

Etykiety przepisuj z listingu w swoim arkuszu, bo bywają inne (2024 cze: `nazwa:`, `opis:`). Gdy wzór ma linię `informacje:` (2022 cze, 2023 cze), wpisz w niej nazwę algorytmu, np. „sito Eratostenesa”: był za to punkt R.4.4.

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

```python srednia.py {2,5,6,7}
def policz_srednia(liczby):
    """
    nazwa funkcji: policz_srednia
    opis funkcji: liczy średnią arytmetyczną liczb z listy
    parametry: liczby - lista liczb całkowitych
    zwracany typ i opis: float - średnia liczb z listy
    autor: 1234
    """
    suma = 0
    for liczba in liczby:
        suma += liczba
    return suma / len(liczby)


oceny = [4, 5, 3, 5]
print(f"Średnia ocen: {policz_srednia(oceny)}")
```

```wynik
Średnia ocen: 4.25
```

1. Docstring zaczyna się w pierwszej linii pod `def`, wcięty jak ciało funkcji. Wersja z `#` stoi nad `def`, jak w Składni.
2. Jeden parametr w `def`, jeden w komentarzu. Funkcja bez parametrów: „brak”.
3. Typ zgodny z `return`: dzielenie `/` daje `float`. Funkcja bez `return`: „brak”.
4. Autor to numer zdającego, nie imię i nazwisko.

## Pułapki

- `self` nie wpisuj jako parametru: zasady nie wliczają go do liczby parametrów (uwaga do R.2, 2025 sty i 2026 sty). `szukaj(self, szukana)` ma jeden parametr, `zablokuj(self)` ma „brak”.
- Puste pole to stracony punkt. Bez parametrów albo bez zwracanej wartości wpisz „brak” (R.4.3, R.4.4).
- Typ pisz taki, jaki naprawdę daje `return`: `int`, `float`, `bool`, `str`, `list`. Python go nie deklaruje, ale egzaminator porównuje komentarz z kodem.
- Nagłówek pisz na końcu, gdy `def` i `return` już się nie zmienią. Dopisany potem parametr psuje zgodność z kodem.
- Docstring musi być pierwszą instrukcją pod `def`. Napis niżej, po innej instrukcji, nie jest docstringiem.
- Polecenie mówi, co opisać: od 2024 sty jedną dowolną funkcję (sprawdzany jest jeden nagłówek), wcześniej wskazaną, a w 2021 cze dwie metody.

## Powiązane

- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
- [Metody i metoda tylko dla klasy](#/karta/konsola/16-metody-i-metoda-prywatna)
- [Zrzuty ekranu](#/karta/dokumentacja/02-zrzuty-ekranu)
