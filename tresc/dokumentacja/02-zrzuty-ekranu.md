---
tytul: "Zrzuty ekranu"
dzial: dokumentacja
tagi: [dokumentacja, zrzut ekranu, konsola1, interakcje, pasek zadań]
status: do-weryfikacji
zrodla:
  - https://support.microsoft.com/pl-pl/windows/skr%C3%B3ty-klawiaturowe-w-systemie-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec
  - https://docs.python.org/3/library/functions.html#enumerate
  - Zasady oceniania INF.04 2021 cze, 2023 sty, 2023 cze (uwaga do R.4, wykadrowane zrzuty)
  - Zasady oceniania INF.04 2024 cze (R.1.6, R.2.7-R.2.10, R.4.6)
  - Zasady oceniania INF.04 2026 sty (R.4.4-R.4.6)
arkusze: [2021 cze, 2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 sty, 2025 cze, 2026 sty, 2026 cze]
---

## Po co to jest

Zrzut to dowód, że program się uruchomił. Bez niego przepada punkt za próbę uruchomienia (R.1.6), za zrzut w dokumentacji (R.4.6), a w 2024 cze także punkty za działanie programu: R.2.7 wprost wymaga, by uruchomienie ==udokumentować zrzutem==.

## Jak to działa

Na każdym zrzucie egzaminator szuka trzech rzeczy:

1. Cały ekran z paskiem zadań. ==Wykadrowanych zrzutów nie sprawdzają== (uwaga do R.4, 2021 cze i 2023 cze; w innych latach „muszą zawierać cały obszar ekranu”).
2. Środowisko z otwartym projektem (IDE) albo terminal z uruchomieniem, czyli `python gra.py` i wynik.
3. Jeśli program się nie uruchamia: okno z błędami i otwarte środowisko. W Pythonie to treść błędu (Traceback) w konsoli IDE.

Zrzutów ma być tyle, ile interakcji (polecenie od 2022 cze). Plan dla gry w kości z 2024 cze, gdzie kryteria każą sprawdzić granice 2 i 11 oraz 3 i 10:

| Zrzut | Co wpisujesz | Co ma być widać | Kryterium |
| --- | --- | --- | --- |
| konsola1 | nic | pytanie o liczbę kostek | R.1.6 |
| konsola2 | `2`, potem `11` | pytanie się powtarza | R.2.7 |
| konsola3 | `3` | 3 kostki i suma punktów | R.2.7-R.2.9 |
| konsola4 | `t`, potem `10` | nowe losowanie, 10 kostek | R.2.7, R.2.10 |
| konsola5 | `n` | koniec programu | R.2.10 |

Konsola trzyma całą historię, więc późniejszy zrzut pokazuje też wcześniejsze kroki. Nazwy plików zmieniały się tak:

| Arkusz | Konsola | Testy | Gdzie |
| --- | --- | --- | --- |
| 2021 cze | `konsola.jpg` (jeden) | — | dokumentacja |
| 2022 cze - 2025 cze, 2026 cze | `konsola1`, `konsola2`, ... | — | dokumentacja |
| 2026 sty | `konsola1.png`, ... | `test1.png`, ... | konsolowa, testy |

Druga aplikacja analogicznie: `mobile1` (2022, 2024 cze), `desktop1`, `web1`, `mobilna1.png` (2026 sty).

## Składnia do zapamiętania

```python
liczba_zrzutow = 3
for numer in range(1, liczba_zrzutow + 1):
    print(f"konsola{numer}.png")  # konsola1.png, konsola2.png, ...
for numer in range(1, liczba_zrzutow + 1):
    print(f"test{numer}.png")     # 2026 sty: zrzuty testów
for numer, opis in enumerate(["start", "koniec"], start=1):
    print(f"konsola{numer}.png - {opis}")
```

## Przykład

```python plan_zrzutow.py {9,10,11}
interakcje = [
    "start programu, pytanie o liczbę kostek",
    "wpisane 2 i 11 - pytanie się powtarza",
    "wpisane 3 - trzy kostki i punkty",
    "odpowiedź t i 10 kostek - nowe losowanie",
    "odpowiedź n - koniec programu",
]

for numer, opis in enumerate(interakcje, start=1):
    print(f"konsola{numer}.png - {opis}")
print(f"Razem zrzutów: {len(interakcje)}")
```

```wynik
konsola1.png - start programu, pytanie o liczbę kostek
konsola2.png - wpisane 2 i 11 - pytanie się powtarza
konsola3.png - wpisane 3 - trzy kostki i punkty
konsola4.png - odpowiedź t i 10 kostek - nowe losowanie
konsola5.png - odpowiedź n - koniec programu
Razem zrzutów: 5
```

1. `enumerate(..., start=1)` numeruje od 1, bo zrzuty zaczynają się od `konsola1`.
2. Nazwa pliku powstaje z numeru, jak w arkuszu: `konsola1.png`, `konsola2.png`.
3. Zrzutów jest tyle, ile interakcji na liście.

## Pułapki

- Zrzut samego okna albo zaznaczonego fragmentu to zrzut wykadrowany. `Alt + PrtScn` łapie tylko aktywne okno. Bezpiecznie: `Windows + PrtScn`, który w Windows 11 zapisuje cały ekran w Obrazy > Zrzuty ekranu.
- Plik zapisany automatycznie ma inną nazwę. Przenieś go do właściwego folderu i zmień nazwę na `konsola1.png`.
- Okno programu nie może zasłaniać paska zadań ani środowiska (R.4.6: „widoczne jest środowisko”). W 2026 sty polecenie wymaga środowiska na każdym zrzucie, sam terminal to ryzyko.
- Program z błędem też dokumentuj zrzutem z błędami. W 2024 cze błąd w twoim pliku zeruje R.2.7-R.2.10, ale R.1.6 można dostać.
- W 2026 sty zrzuty konsoli idą do `konsolowa`, a zrzuty testów do `testy`, nie do wspólnego folderu.

## Powiązane

- [Zadanie: gra w kości](#/karta/konsola/46-zadanie-gra-w-kosci)
- [enumerate(): indeks i wartość](#/karta/konsola/07-enumerate)
- [Wynik testów](#/karta/testy/05-wynik-testow)
- [Foldery i pakowanie](#/karta/dokumentacja/04-foldery-i-pakowanie)
