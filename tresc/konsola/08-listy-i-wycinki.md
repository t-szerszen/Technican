---
tytul: "Listy i wycinki"
dzial: konsola
tagi: [python, lista, indeks, append, pop, in, wycinek, kopia]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/datastructures.html#more-on-lists
  - https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
  - https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types
  - Zasady oceniania INF.04 2022 cze (R.2.3, R.2.8), 2025 cze (R.2.6), 2025 sty i 2025 cze (R.1.4)
arkusze: [2021 cze, 2022 cze, 2023 cze, 2024 cze, 2025 sty, 2025 cze, 2026 sty]
---

## Po co to jest

„Tablica” z arkusza to w Pythonie lista. Wypełniasz ją w pętli, czytasz po indeksie, dokładasz wartownika na koniec (2022 cze), sprawdzasz `in`, czy liczba już jest (losowanie bez powtórzeń, 2025 cze), tworzysz od razu n wartości, np. `[True] * (n + 1)` w sicie (2023 cze).

## Jak to działa

Indeksy idą od 0 do `len(liczby) - 1`. Ujemny indeks liczy od końca: `liczby[-1]` to ostatni element, czyli `liczby[len(liczby) - 1]`.

Stan listy po każdej operacji, start: `liczby = [7, 2, 9]`.

| Operacja | Lista po niej | Zwraca |
| --- | --- | --- |
| `liczby.append(4)` | `[7, 2, 9, 4]` | `None` |
| `liczby[1] = 5` | `[7, 5, 9, 4]` | — |
| `liczby.pop()` | `[7, 5, 9]` | `4` |
| `9 in liczby` | bez zmian | `True` |

Wycinek `[a:b]` bierze indeksy od `a` do `b - 1` i zawsze tworzy ==nową listę==: `[7, 2, 9, 4][1:3]` to `[2, 9]`, a `[:]` to kopia całej listy.

`b = a` niczego nie kopiuje: to druga nazwa ==tej samej listy==.

| Kod | `a` | `b` |
| --- | --- | --- |
| `a = [1, 2]`, `b = a`, `b.append(3)` | `[1, 2, 3]` | `[1, 2, 3]` |
| `a = [1, 2]`, `b = a[:]`, `b.append(3)` | `[1, 2]` | `[1, 2, 3]` |

## Składnia do zapamiętania

```python
liczby = []                   # pusta lista
liczby.append(5)              # [5]
zera = [0] * 10               # dziesięć zer
sito = [True] * (n + 1)       # indeksy 0..n
ostatnia = liczby.pop()       # usuwa i zwraca ostatni
czy_jest = 7 in liczby        # True albo False
ile = len(liczby)
pierwsza, ostatnia = liczby[0], liczby[-1]
kopia = liczby[:]
```

## Przykład

```python oceny.py {1,4,6,8}
oceny = [0] * 3
for i in range(len(oceny)):
    oceny[i] = int(input(f"Ocena {i + 1}: "))
oceny.append(6)
print("Wszystkie:", oceny)
print("Czy jest 5:", 5 in oceny)
kopia = oceny[:]
kopia.pop()
print("Kopia po pop():", kopia)
print("Oryginał:", oceny)
```

```wynik
$ python oceny.py
Ocena 1: [[4]]
Ocena 2: [[5]]
Ocena 3: [[3]]
Wszystkie: [4, 5, 3, 6]
Czy jest 5: True
Kopia po pop(): [4, 5, 3]
Oryginał: [4, 5, 3, 6]
```

1. `[0] * 3` daje gotową listę trzech zer, więc można od razu przypisywać `oceny[i]`.
2. `append` dokłada element za ostatnim, lista rośnie o jeden.
3. `in` przechodzi po liście i daje `True` albo `False`.
4. `pop()` na kopii zdejmuje ostatni element, a oryginał zostaje.

## Pułapki

- Ostatni indeks to `len(liczby) - 1`. `liczby[len(liczby)] = szukana` kończy się `IndexError`. Wartownika dopisz przez `append` (R.2.3, 2022 cze), bo za wyjątek przy wstawianiu traci się punkt (R.2.8, 2022 cze).
- `liczby = liczby.append(5)` niszczy listę: `append` zwraca `None`. Pisz samo `liczby.append(5)`.
- `b = a`, a potem sortowanie `b` psuje też `a`. Gdy oryginał ma zostać, rób `b = a[:]`.
- Zmienna nazwana `tab`, `tablica`, `kolekcja` czy `x` nie spełnia kryterium nazewnictwa (R.1.4, 2025 cze). Pisz `oceny`, `liczby`, `zestawy`. Wyjątek z 2025 sty: pole tablicowe klasy mogło się nazywać ogólnie (R.1.4).

## Powiązane

- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [Lista dwuwymiarowa](#/karta/konsola/09-lista-dwuwymiarowa)
- [Wyszukiwanie z wartownikiem](#/karta/konsola/27-wyszukiwanie-z-wartownikiem)
- [Sito Eratostenesa](#/karta/konsola/34-sito-eratostenesa)
