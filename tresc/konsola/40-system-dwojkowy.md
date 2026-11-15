---
tytul: "Zamiana na system dwójkowy"
dzial: konsola
tagi: [python, dwójkowy, binarny, bin, int, reszta]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#bin
  - https://docs.python.org/3/library/functions.html#int
  - https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations
arkusze: []
---

## Po co to jest

Zamiana liczby na zapis dwójkowy to krótki algorytm na `%` i `//`. Gotowe `bin()` daje ten sam wynik i służy do sprawdzenia własnej funkcji.

## Jak to działa

Dziel przez 2, zapisuj resztę, dziel dalej wynik, aż dojdziesz do 0. Reszty czytane ==od ostatniej do pierwszej== to zapis dwójkowy, więc każdą nową resztę doklejasz na początek napisu. Ślad dla 13:

| Krok | `liczba` | `liczba % 2` | `liczba // 2` | `wynik` po kroku |
| --- | --- | --- | --- | --- |
| 1 | 13 | 1 | 6 | `"1"` |
| 2 | 6 | 0 | 3 | `"01"` |
| 3 | 3 | 1 | 1 | `"101"` |
| 4 | 1 | 1 | 0 | `"1101"` |

**Z powrotem.** Cyfry od prawej mają wagi 1, 2, 4, 8, ... Sumujesz wagi tam, gdzie stoi 1: 1·8 + 1·4 + 0·2 + 1·1 = 13. W kodzie robi to `int("1101", 2)`.

## Składnia do zapamiętania

```python
liczba = 13
wynik = ""
while liczba > 0:
    wynik = str(liczba % 2) + wynik
    liczba = liczba // 2
print(bin(13))          # 0b1101
print(bin(13)[2:])      # 1101, bez przedrostka 0b
print(int("1101", 2))   # 13
```

## Przykład

```python dwojkowy.py {3,6,13}
def na_dwojkowy(liczba):
    if liczba == 0:
        return "0"
    wynik = ""
    while liczba > 0:
        wynik = str(liczba % 2) + wynik
        liczba = liczba // 2
    return wynik


n = int(input("Podaj liczbę naturalną: "))
dwojkowa = na_dwojkowy(n)
print(f"{n} dwójkowo: {dwojkowa}")
print("Sprawdzenie bin():", bin(n)[2:])
print(f"{dwojkowa} dziesiętnie: {int(dwojkowa, 2)}")
```

```wynik
$ python dwojkowy.py
Podaj liczbę naturalną: [[13]]
13 dwójkowo: 1101
Sprawdzenie bin(): 1101
1101 dziesiętnie: 13
```

1. Zero osobno: dla 0 pętla `while liczba > 0` nie ruszy i zostałby pusty napis.
2. Reszta na początek napisu: tak powstaje odczyt reszt od końca.
3. `[2:]` ucina przedrostek `0b`, który `bin()` zawsze dokleja.

## Pułapki

- `wynik = wynik + str(reszta)` daje reszty w złej kolejności: dla 13 wyjdzie `"1011"`.
- `liczba / 2` zwraca float (6.5). Do dzielenia całkowitego jest `//`.
- `int(dwojkowa)` bez `2` czyta napis dziesiętnie: z `"1101"` robi tysiąc sto jeden.
- Funkcja zwraca napis, a wypisuje program główny. Tak wymagał arkusz 2023 sty dla funkcji liczącej NWD (bez wejścia i wyjścia w funkcji).

## Powiązane

- [Dzielenie całkowite // i reszta %](#/karta/konsola/24-dzielenie-i-reszta)
- [Pętla while](#/karta/konsola/06-petla-while)
- [Suma cyfr](#/karta/konsola/41-suma-cyfr)
