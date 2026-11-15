---
tytul: "join, split, strip, isdigit, count, in"
dzial: konsola
tagi: [python, str, napis, split, join, strip, isdigit, count, in, lower, upper]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#str.split
  - https://docs.python.org/3/library/stdtypes.html#str.join
  - https://docs.python.org/3/library/stdtypes.html#str.isdigit
  - https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str
  - Zasady oceniania INF.04 2022 cze (R.2.7), 2023 cze (R.1.7), 2024 sty (R.2.1)
arkusze: [2022 cze, 2023 cze, 2024 sty, 2024 cze, 2026 cze]
---

## Po co to jest

Wypisanie tablicy po przecinku (2022 cze), liczby z separatorem (2023 cze), PESEL jako napis cyfr (2024 sty), odpowiedź „t/n” (2024 cze), budowanie hasła (2026 cze). Wszystko to napisy i ich metody.

## Jak to działa

Napis to ciąg znaków z indeksami jak lista, ale ==niezmienny==. Metody nie zmieniają napisu, tylko zwracają nowy.

| Indeks | 0 | 1 | 2 | 3 | 4 | -1 |
| --- | --- | --- | --- | --- | --- | --- |
| `"t, 5!"` | `t` | `,` | spacja | `5` | `!` | `!` |

Droga od wpisanego tekstu do listy liczb i z powrotem:

| Krok | Kod | Wartość |
| --- | --- | --- |
| wpisano | `tekst` | `"1, 5, 2"` |
| tnij | `tekst.split(",")` | `["1", " 5", " 2"]` |
| obetnij spacje | `kawalek.strip()` | `"5"` |
| sprawdź i zamień | `kawalek.isdigit()`, `int(kawalek)` | `True`, `5` |
| z powrotem na napisy | `str(liczba)` | `["1", "5", "2"]` |
| sklej | `", ".join(napisy)` | `"1, 5, 2"` |

W `join` ==separator stoi przed kropką==, a lista w nawiasie musi zawierać same napisy.

## Składnia do zapamiętania

```python
czesci = tekst.split(",")
slowa = tekst.split()
czysty = tekst.strip()
print(", ".join(napisy))
if pesel.isdigit() and len(pesel) == 11:
    cyfra = int(pesel[9])
ile = tekst.count("a")
if "@" in email:
    print("Jest małpa")
odpowiedz = input("Jeszcze raz? (t/n) ").strip().lower()
```

## Przykład

```python napisy.py {3,4,5,14,17}
tekst = input("Podaj liczby po przecinku: ")
liczby = []
for kawalek in tekst.split(","):
    kawalek = kawalek.strip()
    if kawalek.isdigit():
        liczby.append(int(kawalek))
    else:
        print(f"Pomijam: '{kawalek}'")
print("Liczby:", liczby, "suma:", sum(liczby))

napisy = []
for liczba in liczby:
    napisy.append(str(liczba))
print("Po przecinku:", ", ".join(napisy))

print("Przecinków:", tekst.count(","), "| jest 5:", "5" in tekst)
odpowiedz = input("Jeszcze raz? (t/n) ").strip().lower()
print("Odpowiedź:", odpowiedz, "| dalej:", odpowiedz == "t")
```

```wynik
$ python napisy.py
Podaj liczby po przecinku: [[1, 5, x, 2]]
Pomijam: 'x'
Liczby: [1, 5, 2] suma: 8
Po przecinku: 1, 5, 2
Przecinków: 3 | jest 5: True
Jeszcze raz? (t/n) [[  T ]]
Odpowiedź: t | dalej: True
```

1. `split(",")` tnie w miejscu każdego przecinka; spacje zostają przy kawałkach.
2. `strip()` usuwa spacje z obu końców.
3. `isdigit()` odrzuca litery, spacje i minus, więc `x` jest pomijane zamiast wywołać `ValueError` w `int()`.
4. `join` skleja napisy, wstawiając `", "` między nimi.
5. `strip().lower()` sprawia, że `" T "` też liczy się jako `t`.

## Pułapki

- `", ".join(liczby)` na liście int kończy się `TypeError`. Najpierw zamień liczby na `str`.
- Liczby po przecinku są sprawdzane na ekranie (2022 cze R.2.7), w 2023 cze wystarczy dowolny separator (R.1.7). `", ".join(...)` nie zostawia przecinka na końcu, a `print(liczba, end=", ")` w pętli zostawia.
- `"-3".isdigit()` i `"".isdigit()` dają `False`. Do liczb ujemnych użyj `int()` w `try`.
- `tekst[0] = "X"` rzuca `TypeError`, bo napis jest niezmienny. Zbuduj nowy: `"X" + tekst[1:]`.
- `split()` bez argumentu tnie po dowolnych odstępach i nie zostawia pustych kawałków; `split(",")` na `"1,,2"` daje `["1", "", "2"]`.
- PESEL trzymaj jako napis, bo `int()` gubi zera z przodu (`int("0123")` to `123`). Cyfrę bierzesz przez `int(pesel[i])` (2024 sty).

## Powiązane

- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
- [Zliczanie znaków](#/karta/konsola/39-zliczanie-znakow)
- [PESEL](#/karta/konsola/43-pesel)
