---
tytul: "Słowniki"
dzial: konsola
tagi: [python, słownik, dict, get, items, zliczanie, licznik]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/datastructures.html#dictionaries
  - https://docs.python.org/3/tutorial/datastructures.html#looping-techniques
  - https://docs.python.org/3/library/stdtypes.html#dict.get
  - Zasady oceniania INF.04 2024 cze (R.2.2, R.2.6) i 2025 cze (R.2.7)
arkusze: [2024 cze, 2025 cze]
---

## Po co to jest

Słownik przypisuje ==kluczowi wartość==. Na egzaminie służy głównie do zliczania: ile razy wypadło każde oczko (punkty w grze w kości, 2024 cze) albo ile razy padła każda liczba 1..49 (loteria, 2025 cze).

## Jak to działa

Zliczanie jedną linią: `wystapienia[oczko] = wystapienia.get(oczko, 0) + 1`. `get` zwraca dotychczasowy licznik albo 0, gdy klucza jeszcze nie ma. Ślad dla oczek `[1, 5, 2, 2, 5]`:

| Krok | `oczko` | `get` dało | `wystapienia` po kroku |
| --- | --- | --- | --- |
| 1 | 1 | 0 | `{1: 1}` |
| 2 | 5 | 0 | `{1: 1, 5: 1}` |
| 3 | 2 | 0 | `{1: 1, 5: 1, 2: 1}` |
| 4 | 2 | 1 | `{1: 1, 5: 1, 2: 2}` |
| 5 | 5 | 1 | `{1: 1, 5: 2, 2: 2}` |

Potem pętla po parach `for oczko, ile in wystapienia.items()`. Punkty dają tylko pary z `ile >= 2`: `5 * 2 + 2 * 2 = 14`. Jedynka wypadła raz, więc nic nie daje.

To samo bez słownika: lista liczników, w której ==indeks to wartość oczka==. `licznik = [0] * 7` (indeksy 0..6, zero nieużywane), w pętli `licznik[oczko] += 1`:

| Indeks (oczko) | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `licznik` po rzucie | 0 | 1 | 2 | 0 | 0 | 2 | 0 |

Dla loterii analogicznie `[0] * 50` i indeksy 1..49.

## Składnia do zapamiętania

```python
wiek = {"Ala": 17, "Olek": 18}      # klucz: wartość
wiek["Ewa"] = 19                     # dodaje albo nadpisuje
print(wiek["Ala"])                   # 17, KeyError, gdy brak klucza
print(wiek.get("Jan", 0))            # 0 zamiast KeyError
if "Ola" in wiek:                    # in sprawdza KLUCZE
    print("Ola jest")
for imie, lata in wiek.items():      # pary klucz, wartość
    print(f"{imie}: {lata}")
licznik = {}
licznik[6] = licznik.get(6, 0) + 1   # zliczanie
```

## Przykład

```python punkty.py {2,4,6,7,9}
def licz_punkty(oczka):
    wystapienia = {}
    for oczko in oczka:
        wystapienia[oczko] = wystapienia.get(oczko, 0) + 1
    punkty = 0
    for oczko, ile in wystapienia.items():
        if ile >= 2:
            punkty += oczko * ile
    return punkty

rzut = [1, 5, 2, 2, 5]
print("Oczka:", rzut)
print("Punkty za rzut:", licz_punkty(rzut))
rzut = [2, 1, 2, 3, 2]
print("Oczka:", rzut)
print("Punkty za rzut:", licz_punkty(rzut))
```

```wynik
$ python punkty.py
Oczka: [1, 5, 2, 2, 5]
Punkty za rzut: 14
Oczka: [2, 1, 2, 3, 2]
Punkty za rzut: 6
```

1. Pusty słownik tworzony w funkcji, przy każdym wywołaniu od nowa.
2. `get(oczko, 0)` daje 0 przy pierwszym wystąpieniu, więc nie ma `KeyError`.
3. `items()` daje po kolei pary: oczko i liczba jego wystąpień.
4. Warunek „co najmniej dwa razy” to `>= 2`.
5. Funkcja zwraca liczbę całkowitą, a nie wypisuje jej.

## Pułapki

- `wystapienia[oczko] += 1` na pustym słowniku kończy się `KeyError`, bo klucza jeszcze nie ma. Użyj `get(…, 0)` albo najpierw `if oczko in wystapienia`.
- Punkty tylko za wartości wylosowane co najmniej dwa razy (R.2.6, 2024 cze). `ile > 2` gubi pary. Funkcja licząca ma zwracać liczbę całkowitą przez `return` (R.2.2, 2024 cze).
- Wystąpienia mają objąć wszystkie liczby 1..49, choć wolno pokazać tylko niezerowe (R.2.7, 2025 cze). Słownik zna tylko wylosowane, więc wypisuj w pętli `for liczba in range(1, 50)` z `get(liczba, 0)`. Wtedy kolejność jest też rosnąca, a słownik trzyma kolejność dodawania.
- Lista liczników `[0] * 49` i `licznik[49] += 1` to `IndexError`: indeksy kończą się na 48. Daj `[0] * 50` albo licz `licznik[liczba - 1]`.
- `in` przy słowniku sprawdza klucze, nie wartości. `17 in wiek` daje `False`.
- Nie nazywaj zmiennej `dict`, bo zasłania wbudowany typ. Ogólne `slownik` grozi tym samym co `tablica` czy `kolekcja`, które zasady wprost odrzucają (R.1.4, 2025 cze).

## Powiązane

- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [Zliczanie znaków](#/karta/konsola/39-zliczanie-znakow)
- [Zadanie: gra w kości](#/karta/konsola/46-zadanie-gra-w-kosci)
- [Zadanie: loteria](#/karta/konsola/47-zadanie-loteria)
