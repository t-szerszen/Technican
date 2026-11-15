---
tytul: "Zrzuty ekranu"
dzial: dokumentacja
tagi: [dokumentacja, zrzut ekranu, konsola1, interakcje, pasek zadań]
status: do-weryfikacji
zrodla:
  - https://support.microsoft.com/pl-pl/windows/skr%C3%B3ty-klawiaturowe-w-systemie-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec
  - Arkusz INF.04 2024 cze (część III, przykładowe interakcje), 2026 sty (miejsce zrzutów)
  - Zasady oceniania INF.04 2021 cze, 2023 cze (uwaga do R.4, wykadrowane zrzuty)
  - Zasady oceniania INF.04 2024 cze (R.2.7), 2026 cze (R.1.6, R.2.6, R.4.6)
arkusze: [2021 cze, 2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 sty, 2025 cze, 2026 sty, 2026 cze]
---

## Po co to jest

Zrzut to dowód, że program się uruchomił. Bez niego przepada punkt za próbę uruchomienia (R.1.6, w 2023 sty R.1.7), punkt za zrzut w dokumentacji (R.4.6) i kryterium „program uruchamia się w konsoli, co udokumentowano zrzutem” (np. R.2.6 w 2026 cze).

## Jak to działa

Na każdym zrzucie egzaminator szuka trzech rzeczy:

1. Cały ekran z paskiem zadań. ==Wykadrowanych zrzutów nie sprawdzają== (uwaga do R.4, 2021 cze i 2023 cze; w pozostałych latach zrzuty mają „zawierać cały obszar ekranu”).
2. Środowisko (IDE) z otwartym projektem i okno z wynikiem programu. Arkusz dopuszcza też terminal, ale R.4.6 zwykle wymaga, by było „widoczne środowisko”, więc najbezpieczniej uruchamiać w IDE.
3. Gdy program się nie uruchamia: okno z błędami (w Pythonie Traceback w konsoli IDE) i otwarte środowisko.

Zrzutów ma być tyle, ile interakcji, a ==każde `input()` to interakcja==. Zrzut robisz po każdej odpowiedzi programu. Konsola trzyma historię, więc późniejszy zrzut pokazuje też wcześniejsze kroki.

Zrzuty zwykle idą do folderu `dokumentacja`. W 2026 sty szły do `konsolowa`, `mobilna` i `testy`, więc miejsce sprawdź w poleceniu.

## Składnia do zapamiętania

```tekst
Windows + PrtScn   cały ekran, plik w Obrazy > Zrzuty ekranu
PrtScn             Windows 11: zaznaczony obszar do schowka
Alt + PrtScn       samo aktywne okno (wykadrowany)

konsola1.png, konsola2.png, ...   aplikacja konsolowa
web1, desktop1, mobile1, ...      druga aplikacja, nazwa z arkusza
test1.png, test2.png, ...         testy jednostkowe (2026 sty)
```

## Przykład

```python gra.py {2,4,12,13}
def wczytaj_liczbe_kostek():
    liczba = int(input("Ile kostek chcesz rzucić? (3 - 10): "))
    while liczba < 3 or liczba > 10:
        liczba = int(input("Ile kostek chcesz rzucić? (3 - 10): "))
    return liczba


odpowiedz = "t"
while odpowiedz == "t":
    liczba_kostek = wczytaj_liczbe_kostek()
    print(f"Rzucasz {liczba_kostek} kostkami")
    odpowiedz = input("Jeszcze raz? (t/n): ")
print("Koniec gry")
```

```wynik
$ python gra.py
Ile kostek chcesz rzucić? (3 - 10): [[2]]
Ile kostek chcesz rzucić? (3 - 10): [[11]]
Ile kostek chcesz rzucić? (3 - 10): [[3]]
Rzucasz 3 kostkami
Jeszcze raz? (t/n): [[t]]
Ile kostek chcesz rzucić? (3 - 10): [[10]]
Rzucasz 10 kostkami
Jeszcze raz? (t/n): [[n]]
Koniec gry
```

1. Program czeka na pierwszą odpowiedź: `konsola1`, stan początkowy.
2. Po błędnych `2` i `11` pytanie wraca: `konsola2`. Te granice (oraz 3 i 10) sprawdzało R.2.7 w 2024 cze.
3. Po `3` i `t` program pyta od nowa: `konsola3`, a po `10`: `konsola4`.
4. Po `n` program się kończy: `konsola5` pokazuje całą historię.

## Pułapki

- `Alt + PrtScn` i samo `PrtScn` w Windows 11 łapią okno albo fragment, czyli zrzut wykadrowany. Bezpiecznie: `Windows + PrtScn`.
- Plik zapisany automatycznie ma inną nazwę. Przenieś go do właściwego folderu i zmień nazwę na `konsola1.png`.
- Okno programu nie może zasłaniać paska zadań ani środowiska.
- Program z błędem też udokumentuj zrzutem z błędami. Gdy błąd jest w twoim pliku, kryteria z uruchomienia przepadają (np. R.2.6-R.2.7 w 2026 cze), ale R.1.6 zostaje (2026 cze: „lub błędy jego kompilacji / interpretacji”).

## Powiązane

- [Zadanie: gra w kości](#/karta/konsola/46-zadanie-gra-w-kosci)
- [Pętla while](#/karta/konsola/06-petla-while)
- [Czytanie wyniku testów](#/karta/testy/05-wynik-testow)
- [Foldery i pakowanie](#/karta/dokumentacja/04-foldery-i-pakowanie)
