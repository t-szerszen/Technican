---
tytul: "Plik egzamin"
dzial: dokumentacja
tagi: [dokumentacja, egzamin, system operacyjny, środowisko, emulator]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#open
  - https://support.microsoft.com/pl-pl/windows/kt%C3%B3r%C4%85-wersj%C4%99-systemu-operacyjnego-windows-mam-628bec99-476a-2c13-5296-9dd081cdd808
  - Arkusz INF.04 2026 sty i 2026 cze (część III, plik tekstowy egzamin)
  - Zasady oceniania INF.04 2024 cze, 2025 cze, 2026 sty, 2026 cze (R.4.8)
arkusze: [2021 cze, 2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 sty, 2025 cze, 2026 sty, 2026 cze]
---

## Po co to jest

Plik `egzamin` to krótka lista narzędzi, z których korzystałeś. Daje ==osobny punkt (R.4.8)== i zajmuje dwie minuty, jeśli wiesz, co wpisać i gdzie go zapisać.

## Jak to działa

Co roku te same trzy pozycje, czasem czwarta:

1. Nazwa systemu operacyjnego, np. „Windows 11 Pro” z Ustawienia > System > Informacje.
2. Nazwy środowisk programistycznych: IDE do konsoli i do drugiej aplikacji.
3. Nazwy języków programowania, ==wszystkich użytych==, nie tylko Pythona (2025 cze: „stosowanych przez zdającego”).
4. Nazwa emulatora, gdy druga aplikacja jest mobilna (2021 cze, 2022 cze, 2024 cze, 2026 sty).

W 2026 to ==plik tekstowy==: Notatnik, zapis jako `egzamin.txt`. Zwykle leży w `dokumentacja` razem ze zrzutami, ale w 2026 sty w folderze z numerem zdającego. Rodzaj pliku i miejsce bierz z polecenia.

Wpisuj to, czego naprawdę używałeś: na zrzutach widać twoje IDE, więc w pliku musi stać to samo.

## Składnia do zapamiętania

```tekst
System operacyjny: Windows 11 Pro
Środowiska programistyczne: PyCharm, Android Studio
Języki programowania: Python, Kotlin
Emulator: Android Emulator, Pixel 7
```

## Przykład

```python egzamin.py {2,3,4,7}
narzedzia = {
    "System operacyjny": "Windows 11 Pro",
    "Środowiska programistyczne": "PyCharm, Visual Studio Code",
    "Języki programowania": "Python, JavaScript",
}

with open("egzamin.txt", "w", encoding="utf-8") as plik:
    for nazwa, opis in narzedzia.items():
        plik.write(f"{nazwa}: {opis}\n")

with open("egzamin.txt", encoding="utf-8") as plik:
    print(plik.read(), end="")
```

```wynik
$ python egzamin.py
System operacyjny: Windows 11 Pro
Środowiska programistyczne: PyCharm, Visual Studio Code
Języki programowania: Python, JavaScript
```

1. Nazwa systemu taka, jak w Ustawieniach, nie „komputer szkolny”.
2. Oba środowiska: do konsoli i do drugiej aplikacji.
3. Wszystkie języki: Python i język drugiej aplikacji, tu webowej. Przy mobilnej dopisz jeszcze linię „Emulator”, jak w Składni.
4. `encoding="utf-8"` zapisuje polskie znaki poprawnie. Na egzaminie ten sam tekst wpiszesz w Notatniku.

## Pułapki

- Brak jednej pozycji (np. języka drugiej aplikacji albo emulatora) może kosztować cały punkt R.4.8, bo kryterium wymienia je razem.
- Nazwa pliku to dokładnie `egzamin`; Notatnik dopisze `.txt`.
- Gdy polecenie każe użyć edytora tekstu pakietu biurowego (tak było do 2025 sty), zapisz dokument w Wordzie lub Writerze, nie w Notatniku. Do 2024 sty trzeba było też wkleić do niego podpisane zrzuty.
- Przy aplikacji webowej zasady nie mówią, czy HTML i CSS liczą się jako języki. Bezpieczniej dopisać je obok JavaScriptu.

## Powiązane

- [Zrzuty ekranu](#/karta/dokumentacja/02-zrzuty-ekranu)
- [Foldery i pakowanie](#/karta/dokumentacja/04-foldery-i-pakowanie)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
