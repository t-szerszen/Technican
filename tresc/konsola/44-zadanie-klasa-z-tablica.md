---
tytul: "Zadanie: klasa z tablicą"
dzial: konsola
tagi: [python, zadanie, klasa, pola prywatne, random, wyszukiwanie, średnia, nieparzyste]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#private-variables
  - https://docs.python.org/3/library/random.html#random.randint
  - Arkusz INF.04 2025 sty, część I
  - Zasady oceniania INF.04 2025 sty (R.1.1-R.1.7, R.2.1-R.2.10)
arkusze: [2025 sty]
---

## Po co to jest

Typ zadania: jedna klasa trzyma listę losowych liczb i jej rozmiar w polach prywatnych, a metody robią na niej typowe operacje: wypisanie, wyszukanie, nieparzyste, średnia. Program główny tworzy obiekt i wywołuje każdą metodę. Poniżej pełny program, który spełnia w kodzie wszystkie kryteria R.1 i R.2 (zrzuty ekranu do R.1.6 i R.2.6 robisz osobno).

## Jak to działa

Plan rozwiązania, w tej kolejności pisania:

1. Pola `self.__liczby` i `self.__rozmiar`: dwa podkreślniki to w Pythonie pole prywatne (R.2.1).
2. `__init__(self, rozmiar)`: jeden parametr, zapis do pola, losowanie `randint(1, 1000)` (R.2.2).
3. Każda pętla idzie po `range(self.__rozmiar)` (R.2.4).
4. `wyswietl()` nic nie zwraca, `szukaj()` zwraca indeks albo -1, `nieparzyste()` zwraca licznik, `srednia()` zwraca liczbę (R.2.3).
5. Program główny: obiekt z rozmiarem większym niż 20 i wywołanie wszystkich metod z opisem wyników (R.2.7-R.2.10).

Ślad `szukaj(12)` dla listy `[7, 12, 5, 12]`:

| `i` | `__liczby[i]` | równe 12? | co się dzieje |
| --- | --- | --- | --- |
| 0 | 7 | nie | pętla idzie dalej |
| 1 | 12 | tak | `return 1`, koniec metody |
| 2, 3 | — | — | nie są już sprawdzane |

Liczy się pierwsze wystąpienie. Gdyby żadna liczba nie pasowała, pętla skończy się sama i wykona się `return -1`.

## Składnia do zapamiętania

```python
class TablicaLiczb:
    def __init__(self, rozmiar):
        self.__rozmiar = rozmiar
        self.__liczby = []
        for i in range(self.__rozmiar):
            self.__liczby.append(random.randint(1, 1000))

    def szukaj(self, szukana):
        for i in range(self.__rozmiar):
            if self.__liczby[i] == szukana:
                return i
        return -1
```

## Przykład

`random.seed(7)` jest tylko po to, żeby wynik na karcie był zawsze ten sam. Na egzaminie go nie pisz.

```python tablica.py {6,13,18,29,35,43}
import random


class TablicaLiczb:
    def __init__(self, rozmiar):
        self.__rozmiar = rozmiar
        self.__liczby = []
        for i in range(self.__rozmiar):
            self.__liczby.append(random.randint(1, 1000))

    def wyswietl(self):
        for i in range(self.__rozmiar):
            print(f"{i}: {self.__liczby[i]}")

    def szukaj(self, szukana):
        for i in range(self.__rozmiar):
            if self.__liczby[i] == szukana:
                return i
        return -1

    def nieparzyste(self):
        ile = 0
        print("Liczby nieparzyste:", end=" ")
        for i in range(self.__rozmiar):
            if self.__liczby[i] % 2 != 0:
                print(self.__liczby[i], end=" ")
                ile += 1
        print()
        return ile

    def srednia(self):
        suma = 0
        for i in range(self.__rozmiar):
            suma += self.__liczby[i]
        return suma / self.__rozmiar


random.seed(7)  # tylko na potrzeby karty
tablica_liczb = TablicaLiczb(21)
tablica_liczb.wyswietl()
szukana = int(input("Podaj szukaną liczbę: "))
indeks = tablica_liczb.szukaj(szukana)
if indeks != -1:
    print(f"Liczba {szukana} jest pod indeksem {indeks}")
ile_nieparzystych = tablica_liczb.nieparzyste()
print(f"Razem nieparzystych: {ile_nieparzystych}")
print(f"Średnia wszystkich elementów: {tablica_liczb.srednia()}")
```

```wynik
$ python tablica.py
0: 332
1: 971
2: 155
3: 405
4: 667
5: 50
6: 75
7: 841
8: 549
9: 97
10: 375
11: 597
12: 60
13: 932
14: 520
15: 220
16: 39
17: 89
18: 445
19: 429
20: 72
Podaj szukaną liczbę: [[75]]
Liczba 75 jest pod indeksem 6
Liczby nieparzyste: 971 155 405 667 75 841 549 97 375 597 39 89 445 429
Razem nieparzystych: 14
Średnia wszystkich elementów: 377.14285714285717
```

1. Pole z rozmiarem ustawione z parametru. Od niego liczą się wszystkie pętle.
2. Format `<indeks>: <wartość>`, jeden element w linii (R.2.7).
3. `return` w środku pętli kończy metodę przy pierwszym trafieniu (R.2.5).
4. Metoda drukuje nieparzyste, ale ==zwraca ich liczbę==. Opis do tej liczby wypisuje program główny (R.2.9).
5. Średnia to suma przez rozmiar, wynik jest typu `float` (R.2.10).
6. Dla -1 nie ma `else`: przy braku liczby program ==nic nie wypisuje==, tak każe treść (R.2.8).

## Pułapki

- Jeden podkreślnik (`_liczby`) to w Pythonie tylko umowa. Zasady wprost wymagają dwóch (R.2.1).
- Rozmiar 20 to za mało: obiekt ma mieć więcej niż 20 elementów (R.2.1). Bezpiecznie: 21.
- `range(21)` zamiast `range(self.__rozmiar)` zrywa związek z polem. Treść każe ograniczać polem wszystkie operacje, a R.2.4 sprawdza co najmniej jedną pętlę.
- Szukanie z samą flagą, bez `return` w pętli, idzie do końca listy i nie spełnia R.2.5.
- Wypisanie „nie znaleziono” łamie R.2.8.
- `tablica_liczb.__liczby` poza klasą kończy się `AttributeError`. Dane czytasz tylko przez metody.
- Nazwy w rodzaju `x`, `foo` nie spełniają R.1.4. Ogólną nazwę (`tab`, `tablica`) treść dopuszcza tylko dla klasy i pola tablicowego.
- Komentarz-nagłówek do jednej, dowolnej metody według wzoru z części III (R.4.1-R.4.5).

## Powiązane

- [Pola prywatne z `__`](#/karta/konsola/14-pola-prywatne)
- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [Wyszukiwanie liniowe z -1](#/karta/konsola/26-wyszukiwanie-liniowe)
- [Średnia i liczby nieparzyste](#/karta/konsola/32-srednia-i-nieparzyste)
- [random: randint, choice, shuffle, sample](#/karta/konsola/20-random)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
