---
tytul: "join, split, strip, isdigit, count, in"
dzial: konsola
tagi: [python, str, napis, split, join, strip, isdigit, count, in, lower]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#str.split
  - https://docs.python.org/3/library/stdtypes.html#str.join
  - https://docs.python.org/3/library/stdtypes.html#str.isdigit
  - https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str
  - Zasady oceniania INF.04 2022 cze (R.2.7), 2024 sty (R.1.5), 2024 cze (R.2.10), 2026 cze (R.2.1, R.2.5)
arkusze: [2022 cze, 2024 sty, 2024 cze, 2026 cze]
---

## Po co to jest

PESEL jako napis cyfr (2024 sty), odpowiedź „t/n” (2024 cze), hasło sklejane ze znaków i zwracane jako napis (2026 cze), kilka liczb wpisanych w jednej linii. Wszystko to napisy i ich metody.

## Jak to działa

Napis to ciąg znaków z indeksami jak lista, ale ==niezmienny==. Metody nie zmieniają napisu, tylko zwracają nowy: samo `odpowiedz.lower()` bez przypisania nic nie daje.

| Indeks | 0 | 1 | 2 | ... | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- |
| `pesel = "02070803628"` | `0` | `2` | `0` | ... | `2` | `8` |

Indeksy liczysz od 0, więc ==10. cyfra ma indeks 9==: `pesel[9]`, a 11. to `pesel[10]`.

Droga od wpisanego tekstu do listy liczb i z powrotem do napisu:

| Krok | Kod | Wartość |
| --- | --- | --- |
| wpisano | `tekst` | `"12 7 x"` |
| tnij po odstępach | `tekst.split()` | `["12", "7", "x"]` |
| sprawdź | `kawalek.isdigit()` | `True`, `True`, `False` |
| zamień | `int(kawalek)` | `12`, `7` |
| sklej znaki | `"".join(["k", "7", "@"])` | `"k7@"` |

`isdigit()` daje `True`, gdy napis nie jest pusty i ma same cyfry. W `join` ==separator stoi przed kropką==, a lista w nawiasie musi zawierać same napisy.

## Składnia do zapamiętania

```python
czesci = tekst.split()
if pesel.isdigit() and len(pesel) == 11:
    cyfra = int(pesel[9])
ile_malp = haslo.count("@")
if "@" in haslo:
    print("Jest znak specjalny")
haslo = "".join(znaki)
odpowiedz = input("Jeszcze raz? (t/n) ").strip().lower()
```

## Przykład

```python napisy.py {3,4,11,15,17}
tekst = input("Podaj liczby oddzielone spacjami: ")
liczby = []
for kawalek in tekst.split():
    if kawalek.isdigit():
        liczby.append(int(kawalek))
    else:
        print(f"Pomijam: {kawalek}")
print("Liczby:", liczby)

pesel = input("Podaj PESEL: ")
if pesel.isdigit() and len(pesel) == 11:
    print("Dziesiąta cyfra:", int(pesel[9]))

znaki = ["k", "7", "@"]
haslo = "".join(znaki)
print("Hasło:", haslo, "| ile @:", haslo.count("@"), "| jest 7:", "7" in haslo)
odpowiedz = input("Jeszcze raz? (t/n) ").strip().lower()
print("Dalej:", odpowiedz == "t")
```

```wynik
$ python napisy.py
Podaj liczby oddzielone spacjami: [[12 7 x]]
Pomijam: x
Liczby: [12, 7]
Podaj PESEL: [[02070803628]]
Dziesiąta cyfra: 2
Hasło: k7@ | ile @: 1 | jest 7: True
Jeszcze raz? (t/n) [[ T]]
Dalej: True
```

1. `split()` bez argumentu tnie po spacjach i nie zostawia pustych kawałków.
2. `isdigit()` odrzuca `x`, więc `int()` nie rzuci `ValueError`.
3. Sprawdzenie długości i samych cyfr chroni przed `IndexError` przy `pesel[9]`.
4. `"".join` skleja znaki bez separatora w jeden napis.
5. `strip().lower()` sprawia, że `" T"` też liczy się jako `t`.

## Pułapki

- PESEL trzymaj jako napis (2024 sty R.1.5: zmienna tekstowa albo tablica). `int("0207...")` gubi zero z przodu. Cyfrę bierzesz przez `int(pesel[i])`.
- `haslo[3] = "x"` rzuca `TypeError`, bo napis jest niezmienny. Zbieraj znaki w liście i na końcu `"".join(znaki)`; funkcja w 2026 cze ma zwrócić napis, nie listę (R.2.1, R.2.5).
- `", ".join(liczby)` na liście int kończy się `TypeError`. Liczby po przecinku (2022 cze R.2.7) wypisuje karta o f-stringach.

## Powiązane

- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
- [f-stringi i print()](#/karta/konsola/03-f-stringi)
- [Walidacja numeru PESEL](#/karta/konsola/43-pesel)
