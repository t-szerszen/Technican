---
tytul: "Obrazy, kolory i czcionka"
dzial: desktop
tagi: [pyside6, QPixmap, QLabel, setPixmap, scaledToHeight, setStyleSheet, background-color, font-weight, ścieżka, __file__]
status: do-weryfikacji
zrodla:
  - https://doc.qt.io/qtforpython-6/PySide6/QtGui/QPixmap.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QWidget.html (styleSheet)
  - https://doc.qt.io/qt-6/stylesheet-reference.html
  - Przykład uruchomiony z PySide6 6.12 z obrazami z archiwum 2023 cze; kolory odczytane z pikseli zrzutu w stylach macOS, Windows i Fusion; ścieżki sprawdzone z dwóch katalogów
  - Zasady oceniania INF.04 2023 sty (R.3.3), 2023 cze (R.3.2, R.3.8), 2024 sty (R.3.2, R.3.5, R.3.10), 2025 cze (R.3.2)
arkusze: [2023 sty, 2023 cze, 2024 sty, 2025 cze]
---

## Po co to jest

Kolor tła okna był w każdym arkuszu desktopowym: LightSteelBlue (2023 sty), CadetBlue (2024 sty), Cornsilk (2025 cze). Do tego kolor przycisków, pogrubiona i większa etykieta „Cena:” (2023 cze) i obrazy z plików: przesyłki (2023 cze), zdjęcie i odcisk palca o tej samej wysokości (2024 sty). Kolory i czcionkę daje `setStyleSheet`, obraz daje `QPixmap` w `QLabel`.

## Jak to działa

**Obraz.** `QLabel` umie wyświetlić obraz zamiast tekstu:

1. `QPixmap(ścieżka)` wczytuje plik. Gdy pliku nie ma, powstaje pusty obraz (`isNull()` daje `True`), bez błędu.
2. `scaledToHeight(80)` zwraca kopię o wysokości 80 z zachowanymi proporcjami. Dwa obrazy z tą samą wysokością spełniają R.3.5 z 2024 sty.
3. `etykieta.setPixmap(obraz)` pokazuje go w oknie.

Ścieżka do pliku: `"pocztowka.png"` bez katalogu Python szuka w ==katalogu, z którego uruchomiono program==, a nie obok pliku `.py`. Sprawdzone: ten sam program uruchomiony z innego katalogu dał pusty obraz. Pewnie działa ścieżka od pliku programu: `os.path.join(KATALOG, "pocztowka.png")`.

**Styl.** `setStyleSheet` przyjmuje reguły jak w CSS:

```tekst Reguły stylu okna
Okno { background-color: #B0C4DE; }
QPushButton { background-color: #4682B4;
              color: white;
              border: 1px solid #333333; }
```

- `Okno` to nazwa Twojej klasy: tło dostaje tylko okno. Sprawdzone: przy samym `background-color` bez nazwy klasy tło dostały też pola tekstowe.
- `QPushButton { ... }` ustawia wszystkie przyciski w oknie naraz.
- `border` przy przycisku jest potrzebny. Dokumentacja Qt ostrzega, że bez niego tło może się nie pokazać. Sprawdzone: w stylu Fusion bez `border` przycisk miał gradient zamiast #4682B4.
- Na pojedynczej etykiecie: `font-weight: bold; font-size: 20px;`.

## Składnia do zapamiętania

```python
KATALOG = os.path.dirname(os.path.abspath(__file__))

self.setStyleSheet("Okno { background-color: #5F9EA0; }"
                   "QPushButton { background-color: #F0FFFF; border: 1px solid #333333; }")
self.napis_cena.setStyleSheet("font-weight: bold; font-size: 20px;")

obraz = QPixmap(os.path.join(KATALOG, "000-zdjecie.jpg"))
self.zdjecie.setPixmap(obraz.scaledToHeight(180))
```

## Przykład

Obrazy `pocztowka.png` i `list.png` z archiwum 2023 cze leżą obok `main.py`.

```python main.py {6,13,14,15,21,32,33,36}
import os
import sys
from PySide6.QtWidgets import QApplication, QWidget, QLabel, QPushButton, QVBoxLayout
from PySide6.QtGui import QPixmap

KATALOG = os.path.dirname(os.path.abspath(__file__))


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Obraz i styl. Wykonał: 00000000000")
        self.setStyleSheet(
            "Okno { background-color: #B0C4DE; }"
            "QPushButton { background-color: #4682B4; color: white; border: 1px solid #333333; padding: 4px; }"
        )

        self.obraz = QLabel()
        self.pokaz_obraz("pocztowka.png")
        self.napis_cena = QLabel("Cena: 1 zł")
        self.napis_cena.setStyleSheet("font-weight: bold; font-size: 20px;")
        przycisk = QPushButton("Pokaż list")
        przycisk.clicked.connect(self.pokaz_list)

        uklad = QVBoxLayout()
        uklad.addWidget(self.obraz)
        uklad.addWidget(self.napis_cena)
        uklad.addWidget(przycisk)
        self.setLayout(uklad)

    def pokaz_obraz(self, nazwa_pliku):
        obraz = QPixmap(os.path.join(KATALOG, nazwa_pliku))
        self.obraz.setPixmap(obraz.scaledToHeight(80))

    def pokaz_list(self):
        self.pokaz_obraz("list.png")
        self.napis_cena.setText("Cena: 1,5 zł")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Katalog, w którym leży plik programu, niezależnie od tego, skąd go uruchomiono.
2. Styl całego okna w jednym miejscu.
3. Tło tylko okna: selektor z nazwą klasy.
4. Wszystkie przyciski: tło, biały tekst, obramowanie.
5. Etykieta ceny pogrubiona i większa od reszty (R.3.2 w 2023 cze).
6. Wczytanie obrazu ze ścieżki od pliku programu.
7. Ta sama wysokość dla każdego obrazu, proporcje zachowane.
8. Zmiana obrazu po kliknięciu: ta sama metoda, inny plik. Sprawdzone: pocztówka zamieniła się na list, cena na „1,5 zł”.

## Pułapki

- Brak `border` w stylu przycisku: na części stylów tło przycisku się nie pokaże albo będzie gradientem.
- `self.setStyleSheet("background-color: ...")` bez selektora zmienia też tło pól tekstowych i list. Pola edycyjne z 2024 sty miały mieć ==inny kolor== (Azure) niż okno, więc daj im osobną regułę `QLineEdit { ... }`.
- Brak obrazu nie rzuca błędu, tylko pokazuje pustą etykietę. W 2024 sty to akurat pożądane (R.3.7: przy złym numerze żaden obraz), ale przy literówce w nazwie pliku łatwo tego nie zauważyć.
- Nazwy plików przepisuj dokładnie: `000-zdjecie.jpg`, nie `000_zdjecie.jpg`. Na Windowsie wielkość liter nie ma znaczenia, na innych systemach ma.
- „Obrazy w zasobach aplikacji” (2023 cze) w Pythonie znaczy: pliki w folderze projektu, spakowane razem z nim do archiwum.

## Powiązane

- [Szkielet aplikacji PySide6 i projekt w Qt Creator](#/karta/desktop/01-szkielet-i-qt-creator)
- [Zadanie: paszport](#/karta/desktop/11-zadanie-paszport)
- [Suwaki i kolor RGB](#/karta/desktop/07-suwaki-i-kolor-rgb)
