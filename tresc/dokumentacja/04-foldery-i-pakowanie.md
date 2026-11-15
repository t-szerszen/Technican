---
tytul: "Foldery i pakowanie"
dzial: dokumentacja
tagi: [dokumentacja, foldery, zip, archiwum, konsola.zip, shutil, pathlib]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/shutil.html#shutil.make_archive
  - https://docs.python.org/3/library/pathlib.html
  - https://docs.python.org/3/library/zipfile.html
  - https://support.microsoft.com/pl-pl/windows/kompresowanie-i-dekompresowanie-plik%C3%B3w-8d28fa72-f2f9-712f-67df-f80cf89fd4e5
  - Zasady oceniania INF.04 2025 cze, 2026 sty, 2026 cze (R.4.9)
arkusze: [2021 cze, 2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 sty, 2025 cze, 2026 sty, 2026 cze]
---

## Po co to jest

Egzaminator ocenia to, co znajdzie na płycie. Folder ma stałą strukturę z arkusza, a od 2025 cze jest za nią ==osobny punkt R.4.9==: projekty spakowane, a pliki źródłowe ==na zewnątrz archiwów==.

## Jak to działa

Na początku egzaminu tworzysz folder nazwany numerem zdającego (2021 cze: PESEL) i podfoldery z arkusza. Po skończeniu aplikacji:

1. Pakujesz cały folder projektu do archiwum o nazwie z arkusza, np. `konsola.zip`.
2. Kopiujesz obok archiwum pliki źródłowe, które zmieniałeś, i plik wykonywalny, jeśli istnieje.
3. Zrzuty i plik `egzamin` kładziesz tam, gdzie każe arkusz.

Arkusz chce obu rzeczy naraz: archiwum z całym projektem i osobno pliki, które zmieniałeś. Wzór z 2026 cze:

```tekst
1234/
├── konsolowa/
│   ├── konsola.zip        cały folder projektu
│   └── main.py            zmodyfikowany plik źródłowy
├── webowa/
│   ├── web.zip
│   └── App.js             zmodyfikowane pliki
└── dokumentacja/
    ├── konsola1.png, konsola2.png, ...
    ├── web1.png, web2.png, ...
    └── egzamin.txt
```

W 2026 sty zamiast `dokumentacja` był folder `testy` (archiwum z testami, plik z testami, `test1.png`), zrzuty konsoli leżały w `konsolowa`, a `egzamin` w folderze głównym.

Folder konsoli to `konsola` do 2024 sty, potem `konsolowa`. Archiwum `konsola.zip` jest od 2022 cze; w 2021 cze projekt kopiowało się bez pakowania. Druga aplikacja: `mobilna.zip` (2022 cze, 2024 cze), `desktopowa.zip` (2023 sty, 2024 sty, 2025 cze), `desktop.zip` (2023 cze), `web.zip` (2025 sty, 2026 cze).

W Windows: prawy przycisk na folderze projektu > Wyślij do > folder skompresowany (w Windows 11 najpierw „Pokaż więcej opcji”). Archiwum dostaje nazwę folderu, więc zmień ją na `konsola.zip`.

## Składnia do zapamiętania

```python
import shutil
from pathlib import Path

folder = Path("1234") / "konsolowa"
folder.mkdir(parents=True, exist_ok=True)
shutil.make_archive("1234/konsolowa/konsola", "zip", root_dir=".", base_dir="KoscProjekt")
shutil.copy("KoscProjekt/main.py", folder)
for sciezka in sorted(Path("1234").rglob("*")):
    print(sciezka)
```

## Przykład

```python pakuj.py {12,13,14,17}
import shutil
import zipfile
from pathlib import Path

projekt = Path("KoscProjekt")
(projekt / ".idea").mkdir(parents=True, exist_ok=True)
(projekt / "main.py").write_text('print("Rzut kością")\n', encoding="utf-8")

numer = Path("1234")
konsolowa = numer / "konsolowa"
for nazwa in ["konsolowa", "webowa", "dokumentacja"]:
    (numer / nazwa).mkdir(parents=True, exist_ok=True)
shutil.make_archive(str(konsolowa / "konsola"), "zip", root_dir=".", base_dir=str(projekt))
shutil.copy(projekt / "main.py", konsolowa)

print(f"{numer}/")
for sciezka in sorted(numer.rglob("*")):
    poziom = len(sciezka.relative_to(numer).parts)
    znak = "/" if sciezka.is_dir() else ""
    print("    " * poziom + sciezka.name + znak)

with zipfile.ZipFile(konsolowa / "konsola.zip") as archiwum:
    print("W konsola.zip:", archiwum.namelist())
```

```wynik
$ python pakuj.py
1234/
    dokumentacja/
    konsolowa/
        konsola.zip
        main.py
    webowa/
W konsola.zip: ['KoscProjekt/', 'KoscProjekt/.idea/', 'KoscProjekt/main.py']
```

1. Podfoldery z arkusza; `parents=True` tworzy też folder `1234`, `exist_ok=True` nie rzuca błędu przy drugim uruchomieniu.
2. Pierwszy argument to nazwa archiwum bez `.zip`, z folderem docelowym. Rozszerzenie dopisuje `make_archive`.
3. Kopia zmodyfikowanego pliku obok archiwum, czyli to, czego wymaga R.4.9.
4. `rglob("*")` przechodzi wszystkie podfoldery, `sorted()` daje stałą kolejność do wypisania drzewa.

## Pułapki

- Samo archiwum bez plików źródłowych obok to stracony R.4.9 (2025 cze, 2026 sty, 2026 cze). Same pliki bez archiwum też.
- Nazwa archiwum musi być z arkusza: `konsola.zip`, nie `KoscProjekt.zip`. Windows nadaje nazwę folderu.
- Pakuj cały folder projektu, nie sam plik `.py`. Arkusz mówi wprost „archiwum całego projektu”.
- W Pythonie zwykle nie ma pliku wykonywalnego. Arkusz każe go dołączyć tylko, „jeżeli istnieje”.
- Pakuj na końcu, po ostatniej zmianie kodu. Inaczej w archiwum zostanie starsza wersja niż plik obok.
- W Pythonie 3.12 podawaj `make_archive` ścieżki jako napisy (`str(...)`). Obiekty `Path` dokumentacja wymienia dopiero od 3.15.

## Powiązane

- [Plik egzamin](#/karta/dokumentacja/03-plik-egzamin)
- [Zrzuty ekranu](#/karta/dokumentacja/02-zrzuty-ekranu)
- [Wynik testów](#/karta/testy/05-wynik-testow)
