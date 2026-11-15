---
tytul: "Wyszukiwanie liniowe z -1"
dzial: konsola
tagi: [python, algorytm, wyszukiwanie, return, break, indeks]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements
  - https://docs.python.org/3/library/stdtypes.html#sequence.index
  - Zasady oceniania INF.04 2025 sty (R.2.3, R.2.4, R.2.5, R.2.8)
arkusze: [2025 sty]
---

## Po co to jest

Funkcja dostaje listę i szukaną liczbę, a zwraca ==indeks pierwszego wystąpienia albo -1==, gdy liczby nie ma. W 2025 sty była to metoda klasy z tablicą, a punkt dostawało się za to, że pętla kończy się zaraz po znalezieniu.

## Jak to działa

Idziesz od indeksu 0 i porównujesz każdy element z szukaną. Przy pierwszym trafieniu `return i` kończy pętlę i całą funkcję. Do `return -1` za pętlą dochodzisz tylko wtedy, gdy pętla przeszła wszystko i nic nie znalazła.

Ślad dla `liczby = [7, 3, 9, 3, 5]`, szukana `3`:

| `i` | `liczby[i]` | równe 3? | co się dzieje |
| --- | --- | --- | --- |
| 0 | 7 | nie | dalej |
| 1 | 3 | ==tak== | `return 1`, koniec |
| 2-4 | — | — | nie sprawdzane |

Drugie `3` pod indeksem 3 nie ma znaczenia: liczy się pierwsze wystąpienie. Dla szukanej `4` `i` przechodzi 0..4, wszędzie „nie”, pętla się kończy i wykonuje się `return -1`.

Dlaczego -1? Pętla zwraca tylko 0, 1, 2, …, więc -1 nie pomyli się z trafieniem. Program główny sprawdza `indeks != -1`. Uwaga: `liczby[-1]` to w Pythonie ostatni element, więc -1 nie wolno potem użyć jako indeksu.

Bez `return` w pętli (np. metoda, która ma jeszcze coś zrobić): ustaw `indeks = -1` przed pętlą, a przy trafieniu `indeks = i` i `break`.

## Składnia do zapamiętania

```python
def szukaj(liczby, szukana):
    for i in range(len(liczby)):
        if liczby[i] == szukana:
            return i          # koniec pętli i funkcji
    return -1                 # dopiero po całej pętli

indeks = szukaj(liczby, szukana)
if indeks != -1:
    print(f"Znaleziono pod indeksem {indeks}")
if szukana in liczby:                 # wersja z metodą wbudowaną
    indeks = liczby.index(szukana)    # bez "in" brak = ValueError
```

## Przykład

```python liniowe.py {4,5,12,13}
def szukaj(liczby, szukana):
    for i in range(len(liczby)):
        if liczby[i] == szukana:
            return i
    return -1


liczby = [7, 3, 9, 3, 5]
print("Tablica:", liczby)
for proba in range(2):
    szukana = int(input("Podaj szukaną liczbę: "))
    indeks = szukaj(liczby, szukana)
    if indeks != -1:
        print(f"Liczba {szukana} jest pod indeksem {indeks}")
```

```wynik
$ python liniowe.py
Tablica: [7, 3, 9, 3, 5]
Podaj szukaną liczbę: [[3]]
Liczba 3 jest pod indeksem 1
Podaj szukaną liczbę: [[4]]
```

1. Pierwsze trafienie od razu zwraca indeks, więc pętla dalej nie idzie.
2. `return -1` stoi na poziomie `for`, nie `if`: wykonuje się dopiero po sprawdzeniu wszystkich elementów.
3. Wynik funkcji trafia do zmiennej, żeby sprawdzić go raz i wypisać.
4. Dla 4 nic się nie wypisuje, tak jak chciał arkusz 2025 sty.

## Pułapki

- `else: return -1` pod `if` w pętli kończy funkcję już po pierwszym elemencie. -1 ma stać za pętlą.
- `indeks = i` bez `break` daje ostatnie wystąpienie, nie pierwsze, i pętla nie kończy się po znalezieniu (R.2.5, 2025 sty).
- Gdy nie znaleziono, program główny w 2025 sty ==nic nie wypisuje== (R.2.8). W 2022 cze było odwrotnie: komunikat o braku jest wymagany. Czytaj treść.
- `if indeks:` jest źle: indeks 0 to w Pythonie fałsz. Sprawdzaj `indeks != -1`.
- `liczby.index(szukana)` jest dozwolone (R.2.5 przyjmuje metodę wbudowaną), ale bez elementu rzuca `ValueError`. Najpierw `if szukana in liczby`.
- Pętla ograniczona długością listy albo polem z liczbą elementów, nie liczbą wpisaną na sztywno (R.2.4, 2025 sty). Funkcja zwraca liczbę całkowitą (R.2.3).

## Powiązane

- [Wyszukiwanie z wartownikiem](#/karta/konsola/27-wyszukiwanie-z-wartownikiem)
- [Wyszukiwanie binarne](#/karta/konsola/28-wyszukiwanie-binarne)
- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
- [Zadanie: klasa z tablicą](#/karta/konsola/44-zadanie-klasa-z-tablica)
