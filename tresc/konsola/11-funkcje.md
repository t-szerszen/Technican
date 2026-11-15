---
tytul: "Funkcje: def, parametry, return"
dzial: konsola
tagi: [python, funkcja, def, parametr, argument, return, zasięg, lista]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/controlflow.html#defining-functions
  - https://docs.python.org/3/tutorial/controlflow.html#default-argument-values
  - https://docs.python.org/3/faq/programming.html#what-are-the-rules-for-local-and-global-variables-in-python
  - https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference
  - Zasady oceniania INF.04 2023 sty (R.2.1), 2023 cze (R.2.2), 2024 sty (R.2.1), 2024 cze (R.2.5), 2025 cze (R.2.1)
arkusze: [2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 cze, 2026 cze]
---

## Po co to jest

Każde zadanie konsolowe każe wydzielić funkcje: liczącą (zwraca wynik), wypełniającą tablicę, wyświetlającą. Za samo istnienie funkcji, jej parametry i `return` są osobne punkty, ==nawet gdy wnętrze jest niedokończone==.

## Jak to działa

Wywołanie `wynik = nwd(12, 18)` krok po kroku:

1. Argumenty trafiają do parametrów: powstają lokalne `a = 12` i `b = 18`.
2. Wykonuje się ciało funkcji. Ślad pętli: `(12, 18)`, potem `(12, 6)`, potem `(6, 6)` i koniec, bo `a == b`.
3. `return a` kończy funkcję i ==oddaje 6 w miejsce wywołania==, więc `wynik = 6`.
4. Lokalne `a` i `b` znikają. Zmienne `a`, `b` z programu głównego to inne zmienne.

`return` a `print`:

| Ciało funkcji `f()` | Co widać na ekranie | `x = f()` daje |
| --- | --- | --- |
| `return 5` | nic | `5` |
| `print(5)` | `5` | `None` |

Lista jako argument: parametr dostaje ==tę samą listę==, nie kopię, jak przy `b = a`.

| Wewnątrz `wypelnij(tablica)` | Lista w programie głównym |
| --- | --- |
| `tablica[i] = 0` | zmienia się |
| `tablica.append(7)` | zmienia się |
| `tablica = [0, 0, 0]` | bez zmian, nazwa `tablica` wskazuje teraz nową listę |

Dlatego funkcja wypełniająca może nic nie zwracać (2023 cze): zmienia elementy przekazanej listy.

## Składnia do zapamiętania

```python
def nazwa_funkcji(parametr1, parametr2=6):    # 6 to wartość domyślna
    wynik = parametr1 * parametr2             # zmienna lokalna
    return wynik                              # oddaje wynik i kończy funkcję

def wypelnij(tablica):                        # nic nie zwraca, zmienia listę
    for i in range(len(tablica)):
        tablica[i] = True

x = nazwa_funkcji(3)          # 18
y = nazwa_funkcji(3, 2)       # 6
```

## Przykład

```python funkcje.py {7,9,11,16,20}
def nwd(a, b):
    while a != b:
        if a > b:
            a = a - b
        else:
            b = b - a
    return a

def wypelnij(tablica, wartosc=0):
    for i in range(len(tablica)):
        tablica[i] = wartosc

def parzystosc(liczba):
    if liczba % 2 == 0:
        return "parzysta"
    return "nieparzysta"

a = int(input("Podaj a: "))
b = int(input("Podaj b: "))
print(f"NWD({a}, {b}) = {nwd(a, b)}")
print(f"Liczba {a} jest {parzystosc(a)}")
liczby = [3, 8, 1]
wypelnij(liczby, 5)
print("Po wypelnij(liczby, 5):", liczby)
wypelnij(liczby)
print("Po wypelnij(liczby):", liczby)
```

```wynik
$ python funkcje.py
Podaj a: [[12]]
Podaj b: [[18]]
NWD(12, 18) = 6
Liczba 12 jest parzysta
Po wypelnij(liczby, 5): [5, 5, 5]
Po wypelnij(liczby): [0, 0, 0]
```

1. `return a` oddaje wynik. W funkcji nie ma `input` ani `print`, wejście i wyjście robi program główny.
2. `wartosc=0` to wartość domyślna: bez drugiego argumentu wpisze zera.
3. Przypisanie do elementu zmienia listę programu głównego. Funkcja nic nie zwraca.
4. Druga ścieżka też ma `return`, więc funkcja nigdy nie odda `None`.
5. Wynik funkcji użyty od razu w f-stringu.

## Pułapki

- Funkcja ma dostać dane przez parametry, a nie czytać zmiennych z programu głównego. Zmienne globalne w podejściu strukturalnym kosztują punkt (R.2.5, 2024 cze; R.2.1, 2025 cze).
- `input` albo `print` w funkcji liczącej łamie wymóg funkcji bez operacji wejścia-wyjścia (2023 sty). Funkcja zwraca, program główny wypisuje.
- `return` na każdej ścieżce decyzyjnej (R.2.1, 2024 sty). `if ...: return "K"` bez dalszego ciągu oddaje `None` dla drugiego przypadku.
- Funkcja wypełniająca listę z 2023 cze ma przyjąć listę jako argument i nic nie zwracać (R.2.2). `tablica = [...]` w środku nie zmieni listy programu głównego, zmieniaj elementy.
- Zmienna jest lokalna, jeśli przypisujesz do niej w funkcji. `licznik = licznik + 1` bez parametru kończy się `UnboundLocalError`.
- Nie dawaj listy jako wartości domyślnej (`def f(lista=[])`): tworzy się raz i jest wspólna dla wszystkich wywołań.
- Nazwy funkcji mówią, co robią: `licz_punkty`, `wypelnij`, nie `fun` czy `f` (R.1.3, 2023 sty).

## Powiązane

- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [NWD algorytmem Euklidesa](#/karta/konsola/35-nwd-euklides)
- [Sito Eratostenesa](#/karta/konsola/34-sito-eratostenesa)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
