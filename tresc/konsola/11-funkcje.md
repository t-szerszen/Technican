---
tytul: "Funkcje: def, parametry, return"
dzial: konsola
tagi: [python, funkcja, def, parametr, argument, return, lista]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/controlflow.html#defining-functions
  - https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference
  - Zasady oceniania INF.04 2023 sty (R.2.1), 2023 cze (R.2.2), 2024 sty (R.2.1), 2024 cze (R.2.1, R.2.5), 2025 cze (R.2.1)
arkusze: [2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 cze, 2026 cze]
---

## Po co to jest

Każde zadanie konsolowe każe wydzielić funkcje: liczącą (zwraca wynik), wypełniającą tablicę, wyświetlającą. Za istnienie funkcji, jej parametry i `return` są osobne punkty, ==nawet gdy wnętrze jest niedokończone== (np. R.2.1, 2024 cze: „mogą być niedokończone, lub z błędami”).

## Jak to działa

Wywołanie `wynik = nwd(12, 18)` krok po kroku:

1. Argumenty trafiają do parametrów: powstają lokalne `a = 12` i `b = 18`.
2. Wykonuje się ciało funkcji: `(12, 18)`, potem `(12, 6)`, potem `(6, 6)` i koniec pętli.
3. `return a` kończy funkcję i ==oddaje 6 w miejsce wywołania==, więc `wynik = 6`.
4. Lokalne `a` i `b` znikają. Zmienne `a`, `b` z programu głównego to inne zmienne.

`return` a `print`:

| Ciało funkcji `f()` | Co widać na ekranie | `x = f()` daje |
| --- | --- | --- |
| `return 5` | nic | `5` |
| `print(5)` | `5` | `None` |

Lista jako argument: parametr dostaje ==tę samą listę==, nie kopię, jak przy `b = a`.

| Wewnątrz `wypelnij(liczby, 0)` | Lista w programie głównym |
| --- | --- |
| `liczby[i] = 0` | zmienia się |
| `liczby.append(7)` | zmienia się |
| `liczby = [0, 0, 0]` | bez zmian, nazwa `liczby` wskazuje teraz nową listę |

Dlatego funkcja wypełniająca może nic nie zwracać (2023 cze): zmienia elementy przekazanej listy.

## Składnia do zapamiętania

```python
def nazwa_funkcji(parametr1, parametr2):
    wynik = parametr1 * parametr2             # zmienna lokalna
    return wynik                              # oddaje wynik i kończy funkcję

def wypelnij(liczby, wartosc):                # nic nie zwraca, zmienia listę
    for i in range(len(liczby)):
        liczby[i] = wartosc

iloczyn = nazwa_funkcji(3, 2)                 # 6
```

## Przykład

```python funkcje.py {7,11,15,19}
def nwd(a, b):
    while a != b:
        if a > b:
            a = a - b
        else:
            b = b - a
    return a

def wypelnij(liczby, wartosc):
    for i in range(len(liczby)):
        liczby[i] = wartosc

a = int(input("Podaj a: "))
b = int(input("Podaj b: "))
print(f"NWD({a}, {b}) = {nwd(a, b)}")
oceny = [3, 8, 1]
wypelnij(oceny, 5)
print("Po wypelnij(oceny, 5):", oceny)
print("wypelnij zwraca:", wypelnij(oceny, 0))
```

```wynik
$ python funkcje.py
Podaj a: [[12]]
Podaj b: [[18]]
NWD(12, 18) = 6
Po wypelnij(oceny, 5): [5, 5, 5]
wypelnij zwraca: None
```

1. `return a` oddaje wynik. W funkcji nie ma `input` ani `print`, bo w 2023 sty „funkcja nie może zawierać operacji wejścia - wyjścia”. Wczytuje i wypisuje program główny.
2. Przypisanie do elementu zmienia listę programu głównego, choć parametr nazywa się inaczej niż argument.
3. Wynik funkcji użyty od razu w f-stringu.
4. Funkcja bez `return` oddaje `None`, a lista i tak się zmieniła.

## Pułapki

- Funkcja ma dostać dane przez parametry, a nie czytać zmiennych z programu głównego. Zmienne globalne w podejściu strukturalnym kosztują punkt (R.2.5, 2024 cze; R.2.1, 2025 cze).
- `return` na każdej ścieżce decyzyjnej (R.2.1, 2024 sty). `if ...: return "K"` bez dalszego ciągu oddaje `None` dla drugiego przypadku.
- Funkcja wypełniająca listę z 2023 cze ma przyjąć listę jako argument i nic nie zwracać (R.2.2). Zmieniaj elementy, nie przypisuj nowej listy do parametru.
- Nazwy funkcji mówią, co robią: `licz_punkty`, `wypelnij`, nie `fun` czy `f` (R.1.3; `fun` jako zła nazwa w R.1.4, 2024 cze).

## Powiązane

- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [NWD algorytmem Euklidesa](#/karta/konsola/35-nwd-euklides)
- [Sito Eratostenesa](#/karta/konsola/34-sito-eratostenesa)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
