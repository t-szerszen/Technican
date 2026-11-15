---
tytul: "Sortowanie przez wstawianie"
dzial: konsola
tagi: [python, algorytm, sortowanie, wstawianie, while, klucz]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/expressions.html#boolean-operations
  - https://docs.python.org/3/tutorial/controlflow.html#for-statements
  - Zasady oceniania INF.04 2021 cze (R.2.3)
arkusze: []
---

## Po co to jest

Sortowanie jak układanie kart w ręce: bierzesz kolejną kartę i wsuwasz ją między już ułożone. W arkuszach 2021-2026 nie padło. Przyda się tylko, gdy treść wprost każe sortować przez wstawianie.

## Jak to działa

Lewa część `liczby[0..i-1]` jest zawsze posortowana. Dla każdego `i` od 1:

1. Zapamiętaj `klucz = liczby[i]`. Jego miejsce jest teraz wolne.
2. Idź w lewo od `j = i - 1`: dopóki `liczby[j] > klucz`, przesuń go o jedno w prawo.
3. Wstaw klucz w lukę: `liczby[j + 1] = klucz`.

Krok `i = 4` dla `[2, 4, 5, 6, 1, 3]`, klucz `1` (zakreślone = zmienione):

| `j` | `liczby[j] > 1`? | tablica |
| --- | --- | --- |
| 3 | 6, tak | [2, 4, 5, 6, ==6==, 3] |
| 2 | 5, tak | [2, 4, 5, ==5==, 6, 3] |
| 1 | 4, tak | [2, 4, ==4==, 5, 6, 3] |
| 0 | 2, tak | [2, ==2==, 4, 5, 6, 3] |
| -1 | koniec, `j >= 0` fałsz | [==1==, 2, 4, 5, 6, 3] |

Podwojona liczba to nie błąd: to luka, którą zaraz nadpisze następne przesunięcie albo klucz.

Cały ślad dla `[5, 2, 4, 6, 1, 3]`:

| `i` | klucz | przesunięte w prawo | wstawiony na | tablica po kroku |
| --- | --- | --- | --- | --- |
| 1 | 2 | 5 | 0 | [==2==, 5, 4, 6, 1, 3] |
| 2 | 4 | 5 | 1 | [2, ==4==, 5, 6, 1, 3] |
| 3 | 6 | nic | 3 | [2, 4, 5, ==6==, 1, 3] |
| 4 | 1 | 6, 5, 4, 2 | 0 | [==1==, 2, 4, 5, 6, 3] |
| 5 | 3 | 6, 5, 4 | 2 | [1, 2, ==3==, 4, 5, 6] |

## Składnia do zapamiętania

```python
def sortuj_przez_wstawianie(liczby):
    for i in range(1, len(liczby)):
        klucz = liczby[i]
        j = i - 1
        while j >= 0 and liczby[j] > klucz:
            liczby[j + 1] = liczby[j]     # przesuń w prawo
            j -= 1
        liczby[j + 1] = klucz             # wstaw w lukę
```

## Przykład

```python wstawianie.py {2,3,5,8}
def sortuj_przez_wstawianie(liczby):
    for i in range(1, len(liczby)):
        klucz = liczby[i]
        j = i - 1
        while j >= 0 and liczby[j] > klucz:
            liczby[j + 1] = liczby[j]
            j -= 1
        liczby[j + 1] = klucz


liczby = [5, 2, 4, 6, 1, 3]
print("Przed:", liczby)
sortuj_przez_wstawianie(liczby)
print("Po:   ", liczby)
```

```wynik
Przed: [5, 2, 4, 6, 1, 3]
Po:    [1, 2, 3, 4, 5, 6]
```

1. Start od 1: jednoelementowa część `[5]` jest posortowana sama z siebie.
2. Klucz trzeba zapamiętać, bo pierwsze przesunięcie nadpisze `liczby[i]`.
3. `j >= 0` zatrzymuje pętlę na lewym końcu listy, gdy klucz jest mniejszy od wszystkich na lewo.
4. `j + 1`, bo pętla zatrzymała się jedno miejsce przed luką.

## Pułapki

- Bez `j >= 0` pętla nie stanie na lewym końcu. `liczby[-1]` to w Pythonie ostatni element, więc `j` leci w ujemne indeksy, psuje listę i zwykle kończy się `IndexError`.
- `liczby[j] = klucz` zamiast `liczby[j + 1] = klucz` wstawia o jedno za daleko w lewo.
- Malejąco: `liczby[j] < klucz`. Gdy treść narzuca inną metodę (2021 cze: przez wybieranie), wstawianie nie da punktu za algorytm (R.2.3).

## Powiązane

- [Sortowanie bąbelkowe](#/karta/konsola/30-sortowanie-babelkowe)
- [Sortowanie przez wybieranie](#/karta/konsola/29-sortowanie-przez-wybieranie)
- [Pętla while](#/karta/konsola/06-petla-while)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
