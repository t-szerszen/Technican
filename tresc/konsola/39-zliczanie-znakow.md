---
tytul: "Zliczanie znaków"
dzial: konsola
tagi: [python, napis, count, licznik, isupper, isdigit, samogłoski]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#str.count
  - https://docs.python.org/3/library/stdtypes.html#str.isdigit
  - https://docs.python.org/3/library/stdtypes.html#str.isupper
arkusze: []
---

## Po co to jest

„Ile samogłosek, cyfr, wielkich liter” to jeden schemat: przejdź po napisie znak po znaku i podbijaj licznik, gdy warunek jest spełniony. Dla jednego konkretnego znaku jest skrót `napis.count("a")`.

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

Polskie litery to zwykłe pojedyncze znaki: `len("Łoś")` daje 3, `"Ł".isupper()` daje `True`. Liczenie wystąpień każdej liczby z osobna (lista liczników) jest w karcie loterii.

## Składnia do zapamiętania

```python
napis = "Łoś 2A"
samogloski = 0
for znak in napis:
    if znak.lower() in "aąeęioóuy":
        samogloski += 1
    if znak.isdigit():
        print("cyfra:", znak)
ile_o = napis.count("o")
```

## Przykład

```python zliczanie.py {2,6,10}
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
```

```wynik
$ python zliczanie.py
Podaj tekst: [[Łoś Ola 2025]]
Samogłoski: 3, cyfry: 4, wielkie: 2
Litera o: 1
```

1. Liczniki zerowane raz, przed pętlą.
2. `lower()` sprawia, że `O` i `o` liczą się tak samo.
3. Trzy osobne `if`, nie `elif`: `A` jest naraz samogłoską i wielką literą.

## Pułapki

- `count` rozróżnia wielkość liter: w „Łoś Ola” `count("o")` daje 1, bo `O` to inny znak. Ujednolić można `tekst.lower().count("o")`.
- Licznik ustawiony na 0 wewnątrz pętli zeruje się co obrót i na końcu ma najwyżej 1.
- `"Ala".isupper()` daje `False`: na całym napisie mówi o wszystkich literach naraz, niczego nie liczy.

## Powiązane

- [join, split, strip, isdigit, count, in](#/karta/konsola/23-metody-napisow)
- [Zadanie: loteria](#/karta/konsola/47-zadanie-loteria)
- [Palindrom i odwracanie napisu](#/karta/konsola/38-palindrom-i-odwracanie)
