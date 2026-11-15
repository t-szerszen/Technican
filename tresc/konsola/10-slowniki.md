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

Słownik przypisuje ==kluczowi wartość==. Na egzaminie może posłużyć do zliczania: ile razy wypadło każde oczko (punkty w grze w kości, 2024 cze) albo ile razy padła każda liczba 1..49 (loteria, 2025 cze). Arkusz go nie wymaga: to samo robi lista liczników `[0] * 50`, w której indeks to liczba.

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

## Składnia do zapamiętania

```python
wystapienia = {}                                  # pusty słownik
wystapienia[6] = wystapienia.get(6, 0) + 1        # zliczanie
print(wystapienia[6])                             # 1, KeyError, gdy brak klucza
print(wystapienia.get(3, 0))                      # 0 zamiast KeyError
if 6 in wystapienia:                              # in sprawdza KLUCZE
    print("Szóstka wypadła")
for oczko, ile in wystapienia.items():            # pary klucz, wartość
    print(f"{oczko}: {ile}")
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
4. Warunek „przynajmniej dwa razy” to `>= 2` (R.2.6, 2024 cze).
5. Funkcja zwraca liczbę całkowitą przez `return`, a nie wypisuje jej (R.2.2, 2024 cze).

## Pułapki

- `wystapienia[oczko] += 1` na pustym słowniku kończy się `KeyError`, bo klucza jeszcze nie ma. Użyj `get(…, 0)`.
- `ile > 2` gubi pary. Punkty są za wartości wylosowane przynajmniej dwa razy (R.2.6, 2024 cze).
- Wystąpienia mają objąć wszystkie liczby 1..49, choć wolno pokazać tylko niezerowe (R.2.7, 2025 cze). Słownik zna tylko wylosowane i trzyma kolejność dodawania, więc wypisuj w pętli `for liczba in range(1, 50)` z `get(liczba, 0)`.
- `in` przy słowniku sprawdza klucze, nie wartości.

## Powiązane

- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [Zliczanie znaków](#/karta/konsola/39-zliczanie-znakow)
- [Zadanie: gra w kości](#/karta/konsola/46-zadanie-gra-w-kosci)
- [Zadanie: loteria](#/karta/konsola/47-zadanie-loteria)
