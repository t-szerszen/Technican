---
tytul: "Zadanie: sortowanie w klasie"
dzial: konsola
tagi: [python, zadanie, klasa, metoda prywatna, sortowanie przez wybieranie, maksimum, zamiana]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#private-variables
  - https://docs.python.org/3/library/functions.html#input
  - Arkusz INF.04 2021 cze, część I
  - Zasady oceniania INF.04 2021 cze (R.1.1-R.1.7, R.2.1-R.2.7)
arkusze: [2021 cze]
---

## Po co to jest

Typ zadania: klasa trzyma listę 10 liczb wpisanych z klawiatury i sortuje ją przez wybieranie od największej do najmniejszej. Szukanie maksimum siedzi w osobnej metodzie widocznej tylko w klasie. Gotowe `sorted()`, `sort()` i `max()` są zakazane.

## Jak to działa

Plan rozwiązania:

1. Pole `self.liczby` w `__init__` i metoda `wczytaj()`: komunikat, potem 10 razy `int(input())` (R.1.5, R.1.7).
2. Prywatna `__indeks_maksimum(start)`: szuka największej liczby od pozycji `start` do końca i zwraca jej indeks (R.2.2, R.2.4).
3. `sortuj()`: dla każdego `i` od 0 do przedostatniego bierze indeks maksimum z reszty i zamienia go z `liczby[i]` przez `bufor` (R.2.3, R.2.5, R.2.6).
4. `wyswietl()` wypisuje posortowaną listę z opisem (R.2.7).

Ślad dla `[4, 8, 1, 9, 6]`. Pogrubiona część jest już na swoim miejscu.

| `i` | Maksimum w `liczby[i:]` | Indeks max | Zamiana | Lista po kroku |
| --- | --- | --- | --- | --- |
| 0 | 9 | 3 | `liczby[0]` z `liczby[3]` | **9** 8 1 4 6 |
| 1 | 8 | 1 | sam ze sobą | **9 8** 1 4 6 |
| 2 | 6 | 4 | `liczby[2]` z `liczby[4]` | **9 8 6** 4 1 |
| 3 | 4 | 3 | sam ze sobą | **9 8 6 4** 1 |

Pętla ma `n - 1` obrotów: gdy zostaje jeden element, jest już na swoim miejscu. Zamiana przez `bufor` po kroku `i = 0`:

| Instrukcja | `bufor` | `liczby[0]` | `liczby[3]` |
| --- | --- | --- | --- |
| przed | — | 4 | 9 |
| `bufor = liczby[0]` | 4 | 4 | 9 |
| `liczby[0] = liczby[3]` | 4 | 9 | 9 |
| `liczby[3] = bufor` | 4 | 9 | 4 |

## Składnia do zapamiętania

```python
def __indeks_maksimum(self, start):
    indeks_max = start
    for j in range(start + 1, len(self.liczby)):
        if self.liczby[j] > self.liczby[indeks_max]:
            indeks_max = j
    return indeks_max

def sortuj(self):
    for i in range(len(self.liczby) - 1):
        indeks_max = self.__indeks_maksimum(i)
        self.liczby[i], self.liczby[indeks_max] = self.liczby[indeks_max], self.liczby[i]
```

## Przykład

```python sortowanie.py {3,10,13,19,20}
class Sortowanie:
    def __init__(self):
        self.liczby = []

    def wczytaj(self):
        print("Podaj 10 liczb całkowitych do posortowania.")
        for i in range(10):
            self.liczby.append(int(input(f"Liczba {i + 1}: ")))

    def __indeks_maksimum(self, start):
        indeks_max = start
        for j in range(start + 1, len(self.liczby)):
            if self.liczby[j] > self.liczby[indeks_max]:
                indeks_max = j
        return indeks_max

    def sortuj(self):
        for i in range(len(self.liczby) - 1):
            indeks_max = self.__indeks_maksimum(i)
            bufor = self.liczby[i]
            self.liczby[i] = self.liczby[indeks_max]
            self.liczby[indeks_max] = bufor

    def wyswietl(self):
        print("Liczby posortowane malejąco:", end=" ")
        for liczba in self.liczby:
            print(liczba, end=" ")
        print()


sortowanie = Sortowanie()
sortowanie.wczytaj()
sortowanie.sortuj()
sortowanie.wyswietl()
```

```wynik
$ python sortowanie.py
Podaj 10 liczb całkowitych do posortowania.
Liczba 1: [[4]]
Liczba 2: [[8]]
Liczba 3: [[-1]]
Liczba 4: [[9]]
Liczba 5: [[6]]
Liczba 6: [[15]]
Liczba 7: [[0]]
Liczba 8: [[8]]
Liczba 9: [[3]]
Liczba 10: [[12]]
Liczby posortowane malejąco: 15 12 9 8 8 6 4 3 0 -1
```

1. Lista jest polem obiektu, a nie zmienną programu głównego.
2. Dwa podkreślniki: metoda prywatna, wywołasz ją tylko przez `self.` wewnątrz klasy.
3. Znak `>` daje kolejność malejącą. Przy `<` ta sama metoda szukałaby minimum.
4. Wywołanie metody prywatnej z wnętrza klasy działa normalnie.
5. Zamiana przez zmienną `bufor`: żadna wartość nie ginie.

## Pułapki

- Zamiana bez bufora (`liczby[i] = liczby[k]`, potem `liczby[k] = liczby[i]`) kopiuje tę samą liczbę dwa razy, a druga przepada (R.2.6). Zapis krotkowy `a, b = b, a` z karty składni też jest dobry.
- `max()`, `sorted()`, `sort()` i `index(max(...))` łamią treść zadania. Maksimum szukasz pętlą.
- Szukanie maksimum od 0 zamiast od `start` za każdym razem znajduje tę samą, już ustawioną liczbę.
- Metoda szukająca bez dwóch podkreślników jest publiczna i nie spełnia R.2.4.
- Zwracaj indeks, a nie samą wartość: do zamiany i tak potrzebna jest pozycja maksimum.
- Komunikat przed wczytaniem jest wymagany (R.1.7). Nazwy `tab` czy `a` dla listy nie spełniają R.1.4 w tym arkuszu.
- Nagłówki-komentarze w tym arkuszu dotyczą metody sortującej i szukającej (część III).

## Powiązane

- [Sortowanie przez wybieranie](#/karta/konsola/29-sortowanie-przez-wybieranie)
- [Metody i metoda tylko dla klasy](#/karta/konsola/16-metody-i-metoda-prywatna)
- [Ręcznie: min, max, suma, liczenie](#/karta/konsola/25-reczne-min-max-suma)
- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
