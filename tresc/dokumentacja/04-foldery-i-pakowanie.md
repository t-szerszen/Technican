---
tytul: "Foldery i pakowanie"
dzial: dokumentacja
tagi: [dokumentacja, foldery, zip, archiwum, konsola.zip]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/shutil.html#shutil.make_archive
  - https://docs.python.org/3/library/os.html#os.makedirs
  - https://support.microsoft.com/pl-pl/windows/kompresowanie-i-dekompresowanie-plik%C3%B3w-8d28fa72-f2f9-712f-67df-f80cf89fd4e5
  - Arkusz INF.04 2026 cze i 2026 sty (struktura folderów, UWAGA na końcu części III)
  - Zasady oceniania INF.04 2025 cze, 2026 sty, 2026 cze (R.4.9)
arkusze: [2021 cze, 2022 cze, 2023 sty, 2023 cze, 2024 sty, 2024 cze, 2025 sty, 2025 cze, 2026 sty, 2026 cze]
---

## Po co to jest

Egzaminator ocenia to, co znajdzie na płycie. Folder ma stałą strukturę z arkusza, a od 2025 cze jest za nią ==osobny punkt R.4.9==: projekty spakowane, a zmienione pliki źródłowe ==na zewnątrz archiwów==.

## Jak to działa

Na początku egzaminu tworzysz folder nazwany numerem zdającego i podfoldery z arkusza. Po skończeniu każdej aplikacji:

1. Pakujesz cały folder projektu do archiwum o nazwie z arkusza, np. `konsola.zip`.
2. Kopiujesz obok archiwum pliki źródłowe, które zmieniałeś (w Pythonie np. `main.py`), i plik wykonywalny, jeśli istnieje.
3. Zrzuty i plik `egzamin` kładziesz tam, gdzie każe arkusz.

R.4.9 chce obu rzeczy naraz i dla obu aplikacji (2026: „oba projekty są spakowane”).

W 2026 sty układ był inny: zamiast `dokumentacja` folder `testy` (archiwum projektu z testami, plik z testami, `test1.png`), zrzuty konsoli w `konsolowa`, a `egzamin` w folderze głównym.

Nazwy przepisuj z arkusza. `konsola.zip` jest co roku od 2022 cze, ale folder bywał `konsola` (do 2024 sty) albo `konsolowa`, a archiwum drugiej aplikacji to np. `web.zip`, `desktopowa.zip`, `mobilna.zip`.

W Windows: prawy przycisk na folderze projektu > Pokaż więcej opcji > Wyślij do > folder skompresowany (spakowany). Archiwum dostaje nazwę folderu, więc zmień ją na `konsola.zip`.

## Składnia do zapamiętania

```tekst
1234/                          wzór z 2026 cze
├── konsolowa/
│   ├── konsola.zip            cały folder projektu
│   └── main.py                zmieniony plik źródłowy
├── webowa/
│   ├── web.zip
│   └── App.js                 zmienione pliki
└── dokumentacja/
    ├── konsola1.png, konsola2.png, ...
    ├── web1.png, web2.png, ...
    └── egzamin.txt
```

## Przykład

```python pakuj.py {4,8,9,10}
import os
import shutil

os.makedirs("KoscProjekt", exist_ok=True)
with open("KoscProjekt/main.py", "w", encoding="utf-8") as plik:
    plik.write('print("Rzut kością")\n')

os.makedirs("1234/konsolowa", exist_ok=True)
shutil.make_archive("1234/konsolowa/konsola", "zip", base_dir="KoscProjekt")
shutil.copy("KoscProjekt/main.py", "1234/konsolowa")
print("W folderze konsolowa:", sorted(os.listdir("1234/konsolowa")))
```

```wynik
$ python pakuj.py
W folderze konsolowa: ['konsola.zip', 'main.py']
```

1. Tu powstaje projekt, taki jak folder projektu z IDE.
2. Folder z numerem zdającego i podfolder z arkusza. `exist_ok=True` nie rzuca błędu, gdy folder już jest.
3. Archiwum całego folderu projektu. Nazwę podajesz bez `.zip`, rozszerzenie dopisuje `make_archive`.
4. Kopia zmienionego pliku obok archiwum, czyli to, czego wymaga R.4.9.

## Pułapki

- Samo archiwum bez zmienionych plików obok to stracony R.4.9 (2025 cze, 2026 sty, 2026 cze). Same pliki bez archiwum też.
- Nazwa archiwum musi być z arkusza: `konsola.zip`, nie `KoscProjekt.zip`. Windows nadaje nazwę folderu.
- Pakuj cały folder projektu, nie sam plik `.py`. Arkusz mówi wprost „archiwum całego projektu”.
- W Pythonie zwykle nie ma pliku wykonywalnego. Arkusz każe go dołączyć tylko, „jeżeli istnieje”.
- Pakuj na końcu, po ostatniej zmianie kodu. Inaczej w archiwum zostanie starsza wersja niż plik obok.

## Powiązane

- [Plik egzamin](#/karta/dokumentacja/03-plik-egzamin)
- [Zrzuty ekranu](#/karta/dokumentacja/02-zrzuty-ekranu)
- [Czytanie wyniku testów](#/karta/testy/05-wynik-testow)
