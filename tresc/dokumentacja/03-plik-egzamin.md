---
tytul: "Plik egzamin"
dzial: dokumentacja
tagi: [dokumentacja, egzamin, system operacyjny, środowisko, wersja, platform]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/using/cmdline.html#cmdoption-V
  - https://docs.python.org/3/using/windows.html
  - https://docs.python.org/3/library/platform.html
  - https://docs.python.org/3/library/sys.html#sys.platform
  - https://support.microsoft.com/pl-pl/windows/kt%C3%B3r%C4%85-wersj%C4%99-systemu-operacyjnego-windows-mam-628bec99-476a-2c13-5296-9dd081cdd808
  - Zasady oceniania INF.04 2021 cze (R.4.8, R.4.9), 2025 cze (R.4.8), 2026 sty (R.4.8)
arkusze: [2021 cze, 2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 sty, 2025 cze, 2026 sty, 2026 cze]
---

## Po co to jest

Plik `egzamin` to krótka lista narzędzi, z których korzystałeś. Daje ==osobny punkt (R.4.8)== i zajmuje dwie minuty, jeśli wiesz, co wpisać i gdzie go zapisać.

## Jak to działa

Co roku te same trzy pozycje, czasem czwarta:

1. Nazwa systemu operacyjnego.
2. Nazwy środowisk programistycznych (IDE do konsoli i do drugiej aplikacji).
3. Nazwy języków programowania, ==wszystkich użytych==, nie tylko Pythona (2025 cze: „stosowanych przez zdającego”).
4. Nazwa emulatora, gdy druga aplikacja jest mobilna (2021 cze, 2022 cze, 2024 cze, 2026 sty).

Zmieniała się forma pliku i miejsce:

| Arkusz | Rodzaj pliku | Zrzuty w środku | Gdzie |
| --- | --- | --- | --- |
| 2021 cze - 2024 sty | edytor tekstu pakietu biurowego | tak, podpisane | dokumentacja |
| 2024 cze, 2025 sty | edytor tekstu pakietu biurowego | nie | dokumentacja |
| 2025 cze | „plik z dokumentacją” | nie | dokumentacja |
| 2026 sty | plik tekstowy | nie | folder z numerem zdającego |
| 2026 cze | plik tekstowy | nie | dokumentacja |

Egzaminator porównuje plik ze zrzutami. W 2021 cze było to osobne kryterium: dane ==zgodne z tymi na zrzutach== (R.4.9), a podpisy zrzutów „zgodne z prawdą” (R.4.8). Na zrzucie widać PyCharm, więc w pliku nie może stać „Visual Studio Code”.

Wersję Pythona daje polecenie w terminalu: `python --version` wypisuje np. `Python 3.12.4`. Wersję Windows pokazują Ustawienia > System > Informacje.

## Składnia do zapamiętania

```python
import platform
import sys

print(platform.system())          # Windows
print(platform.python_version())  # np. 3.12.4
print(sys.platform)               # win32
print(sys.version)                # pełny opis wersji
with open("egzamin.txt", "w", encoding="utf-8") as plik:
    plik.write("System operacyjny: Windows 11\n")
```

## Przykład

```python egzamin.py {2,4,5,8}
narzedzia = {
    "System operacyjny": "Windows 11 Pro",
    "Środowiska programistyczne": "PyCharm, Android Studio",
    "Języki programowania": "Python, Kotlin",
    "Emulator": "Android Emulator, Pixel 7",
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
Środowiska programistyczne: PyCharm, Android Studio
Języki programowania: Python, Kotlin
Emulator: Android Emulator, Pixel 7
```

1. Nazwa systemu taka, jak w Ustawieniach, nie „komputer szkolny”.
2. Wszystkie języki: Python do konsoli i język drugiej aplikacji.
3. Emulator tylko przy aplikacji mobilnej. Przy desktopowej i webowej usuń tę linię.
4. `encoding="utf-8"` zapisuje polskie znaki bez krzaczków. Na egzaminie ten sam tekst wpiszesz też w Notatniku.

## Pułapki

- Brak jednej pozycji (np. języka drugiej aplikacji albo emulatora) może kosztować cały punkt R.4.8, bo kryterium wymienia je razem.
- Plik ma się nazywać `egzamin`. W 2026 to plik tekstowy (`egzamin.txt`), wcześniej dokument edytora tekstu.
- Do 2024 sty w dokumencie musiały być też wklejone i podpisane zrzuty. Od 2024 cze same informacje o narzędziach.
- W 2026 sty plik leży w folderze z numerem zdającego, obok `konsolowa`, `mobilna`, `testy`. W pozostałych latach w `dokumentacja`.
- `platform.system()` mówi tylko „Windows”, bez numeru. Numer i edycję bierz z Ustawień.
- Gdy `python` w terminalu nie działa, a jest zainstalowany starszy launcher `py`, `py --list` pokaże zainstalowane wersje.

## Powiązane

- [Zrzuty ekranu](#/karta/dokumentacja/02-zrzuty-ekranu)
- [Foldery i pakowanie](#/karta/dokumentacja/04-foldery-i-pakowanie)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
