---
tytul: "Zliczanie znaków"
dzial: konsola
tagi: [python, napis, count, licznik, słownik, isupper, isdigit, samogłoski]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#str.count
  - https://docs.python.org/3/library/stdtypes.html#str.isdigit
  - https://docs.python.org/3/library/stdtypes.html#str.isupper
  - https://docs.python.org/3/library/stdtypes.html#dict.get
arkusze: []
---

## Po co to jest

„Ile samogłosek, cyfr, wielkich liter, ile razy każdy znak” to jeden schemat: przejdź po napisie znak po znaku i podbijaj licznik, gdy warunek jest spełniony. Ten sam licznik liczy też wystąpienia liczb w tablicy.

## Jak to działa

Licznik startuje od 0 ==przed pętlą==. `for znak in napis` daje po kolei każdy znak, także spację. Ślad dla `"Łoś 2A"`, samogłoska to `znak.lower() in "aąeęioóuy"`:

| `znak` | samogłoska | `isdigit()` | `isupper()` | `samogloski` | `cyfry` | `wielkie` |
| --- | --- | --- | --- | --- | --- | --- |
| `Ł` | nie | nie | tak | 0 | 0 | 1 |
| `o` | tak | nie | nie | 1 | 0 | 1 |
| `ś` | nie | nie | nie | 1 | 0 | 1 |
| spacja | nie | nie | nie | 1 | 0 | 1 |
| `2` | nie | tak | nie | 1 | 1 | 1 |
| `A` | tak | nie | tak | 2 | 1 | 2 |

Polskie litery to zwykłe pojedyncze znaki: `len("Łoś")` daje 3, `"Ł".isupper()` daje `True`.

**Słownik znak → liczba.** `wystapienia.get(znak, 0)` zwraca dotychczasową liczbę albo 0, gdy znaku jeszcze nie było. Słownik pamięta kolejność dodania kluczy. Ślad dla `"kajak"`:

| `znak` | `wystapienia` po kroku |
| --- | --- |
| `k` | `{'k': 1}` |
| `a` | `{'k': 1, 'a': 1}` |
| `j` | `{'k': 1, 'a': 1, 'j': 1}` |
| `a` | `{'k': 1, 'a': 2, 'j': 1}` |
| `k` | `{'k': 2, 'a': 2, 'j': 1}` |

## Składnia do zapamiętania

```python
ile_a = napis.count("a")
samogloski = 0
for znak in napis:
    if znak.lower() in "aąeęioóuy":
        samogloski += 1
cyfry_tak = znak.isdigit()
wielka_tak = znak.isupper()
wystapienia = {}
for znak in napis:
    wystapienia[znak] = wystapienia.get(znak, 0) + 1
```

## Przykład

```python zliczanie.py {5,16,18}
def policz_wystapienia(napis):
    wystapienia = {}
    for znak in napis:
        if znak != " ":
            wystapienia[znak] = wystapienia.get(znak, 0) + 1
    return wystapienia


tekst = input("Podaj tekst: ")
samogloski = 0
cyfry = 0
wielkie = 0
for znak in tekst:
    if znak.lower() in "aąeęioóuy":
        samogloski += 1
    if znak.isdigit():
        cyfry += 1
    if znak.isupper():
        wielkie += 1
print(f"Samogłoski: {samogloski}, cyfry: {cyfry}, wielkie: {wielkie}")
print("Litera o:", tekst.count("o"))
print(policz_wystapienia(tekst))
```

```wynik
$ python zliczanie.py
Podaj tekst: [[Łoś Ola 2025]]
Samogłoski: 3, cyfry: 4, wielkie: 2
Litera o: 1
{'Ł': 1, 'o': 1, 'ś': 1, 'O': 1, 'l': 1, 'a': 1, '2': 2, '0': 1, '5': 1}
```

1. Nowy klucz dostaje 1, istniejący o 1 więcej. Spacje pomija warunek wyżej.
2. Trzy osobne `if`, nie `elif`: `A` jest naraz samogłoską i wielką literą.
3. `isupper()` na jednym znaku: `Ł` i `O` to 2 wielkie litery.

## Pułapki

- `count` rozróżnia wielkość liter: w „Łoś Ola” `count("o")` daje 1, bo `O` to inny znak. W słowniku `'o'` i `'O'` to też osobne klucze. Ujednolić można `lower()`.
- `wystapienia[znak] += 1` dla nowego znaku rzuca `KeyError`. Użyj `get(znak, 0)` albo sprawdź `if znak in wystapienia`.
- Licznik ustawiony na 0 wewnątrz pętli zeruje się co obrót i na końcu ma najwyżej 1.
- `"Ala".isupper()` daje `False`: wywołane na całym napisie mówi o wszystkich znakach naraz, niczego nie liczy.

## Powiązane

- [join, split, strip, isdigit, count, in](#/karta/konsola/23-metody-napisow)
- [Słowniki](#/karta/konsola/10-slowniki)
- [Zadanie: loteria](#/karta/konsola/47-zadanie-loteria)
- [Palindrom i odwracanie napisu](#/karta/konsola/38-palindrom-i-odwracanie)
