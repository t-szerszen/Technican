---
tytul: "Listy i wycinki"
dzial: konsola
tagi: [python, lista, indeks, append, pop, remove, wycinek, kopia]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/datastructures.html#more-on-lists
  - https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
  - https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types
  - Zasady oceniania INF.04 2022 cze (R.2.8), 2025 sty i 2025 cze (R.1.4)
arkusze: [2021 cze, 2022 cze, 2023 cze, 2024 cze, 2025 sty, 2025 cze, 2026 sty]
---

## Po co to jest

„Tablica” z arkusza to w Pythonie lista. Wypełniasz ją w pętli, czytasz po indeksie, dokładasz wartownika na koniec (2022 cze), tworzysz od razu n wartości, np. `[True] * (n + 1)` w sicie (2023 cze).

## Jak to działa

Każdy element ma dwa adresy: indeks od początku i ujemny od końca. Ujemny to skrót od `len(liczby) + indeks`.

| Wartość | 7 | 2 | 9 | 4 |
| --- | --- | --- | --- | --- |
| indeks | 0 | 1 | 2 | 3 |
| ujemny | -4 | -3 | -2 | -1 |

Stan listy po każdej operacji, start: `liczby = [7, 2, 9]`.

| Operacja | Lista po niej | Zwraca |
| --- | --- | --- |
| `liczby.append(4)` | `[7, 2, 9, 4]` | `None` |
| `liczby.insert(1, 5)` | `[7, 5, 2, 9, 4]` | `None` |
| `liczby.pop()` | `[7, 5, 2, 9]` | `4` |
| `liczby.pop(0)` | `[5, 2, 9]` | `7` |
| `liczby.remove(2)` | `[5, 9]` | `None` |

`insert(i, x)` wstawia przed indeksem `i`, reszta przesuwa się w prawo. `pop(i)` usuwa ==po indeksie==, `remove(x)` ==po wartości== (pierwsze wystąpienie).

Wycinek `[a:b]` bierze indeksy od `a` do `b - 1` i zawsze tworzy nową listę. Dla `liczby = [7, 2, 9, 4]`:

| Wycinek | Wynik |
| --- | --- |
| `liczby[1:3]` | `[2, 9]` |
| `liczby[:2]` / `liczby[2:]` | `[7, 2]` / `[9, 4]` |
| `liczby[::-1]` | `[4, 9, 2, 7]` (od końca) |
| `liczby[:]` | `[7, 2, 9, 4]` (nowa lista, kopia) |

`b = a` niczego nie kopiuje: to druga nazwa ==tej samej listy==.

| Kod | `a` | `b` |
| --- | --- | --- |
| `a = [1, 2]`, `b = a`, `b.append(3)` | `[1, 2, 3]` | `[1, 2, 3]` |
| `a = [1, 2]`, `b = a[:]`, `b.append(3)` | `[1, 2]` | `[1, 2, 3]` |

## Składnia do zapamiętania

```python
liczby = [4, 7]
liczby.append(5)              # [4, 7, 5]
liczby.insert(0, 8)           # [8, 4, 7, 5]
ostatnia = liczby.pop()       # 5, zostaje [8, 4, 7]
liczby.remove(8)              # [4, 7], ValueError, gdy brak
zera = [0] * 10               # dziesięć zer
czy_jest = 7 in liczby        # True
ile = len(liczby)             # 2
pierwsza, ostatnia = liczby[0], liczby[-1]
odwrocona = liczby[::-1]
kopia = liczby[:]
```

## Przykład

```python oceny.py {1,4,6,7,8}
oceny = [0] * 3
for i in range(len(oceny)):
    oceny[i] = int(input(f"Ocena {i + 1}: "))
oceny.append(6)
print("Wszystkie:", oceny)
print("Bez ostatniej:", oceny[:-1])
print("Od końca:", oceny[::-1])
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
Bez ostatniej: [4, 5, 3]
Od końca: [6, 3, 5, 4]
Kopia po pop(): [4, 5, 3]
Oryginał: [4, 5, 3, 6]
```

1. `[0] * 3` daje gotową listę trzech zer, więc można od razu przypisywać `oceny[i]`.
2. `append` dokłada element za ostatnim, lista rośnie o jeden.
3. `[:-1]` to wszystko bez ostatniego elementu, lista zostaje bez zmian.
4. `[::-1]` to nowa lista od końca.
5. `oceny[:]` to kopia, więc `pop()` na niej nie rusza oryginału.

## Pułapki

- Ostatni indeks to `len(liczby) - 1`. `liczby[len(liczby)]` kończy się `IndexError`. Wartownika dopisz przez `append`, nie przez `liczby[n] = szukana`, bo za wyjście poza tablicę traci się punkt (R.2.8, 2022 cze).
- `liczby = liczby.append(5)` niszczy listę: `append` zwraca `None`. Pisz samo `liczby.append(5)`.
- `remove` szuka wartości, `pop` bierze indeks. `remove` wartości, której nie ma, rzuca `ValueError`.
- `b = a`, a potem sortowanie `b` psuje też `a`. Gdy oryginał ma zostać, rób `b = a[:]`.
- Nie usuwaj z listy w pętli `for` po tej samej liście: dla `[3, 3, 5, 3]` usuwanie trójek daje `[5, 3]`, bo pętla przeskakuje element.
- Zmienna nazwana `tab`, `tablica`, `kolekcja` czy `x` nie spełnia kryterium nazewnictwa (R.1.4, 2025 cze). Pisz `oceny`, `liczby`, `zestawy`. Wyjątek z 2025 sty: pole tablicowe klasy mogło się nazywać ogólnie.

## Powiązane

- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [Lista dwuwymiarowa](#/karta/konsola/09-lista-dwuwymiarowa)
- [Wyszukiwanie z wartownikiem](#/karta/konsola/27-wyszukiwanie-z-wartownikiem)
- [Sito Eratostenesa](#/karta/konsola/34-sito-eratostenesa)
