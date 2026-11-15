---
tytul: "Układy: pionowy, poziomy, siatka, formularz"
dzial: desktop
tagi: [pyside6, QVBoxLayout, QHBoxLayout, QGridLayout, QFormLayout, QGroupBox, addWidget, addLayout, addRow]
status: do-weryfikacji
zrodla:
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QFormLayout.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QGridLayout.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QGroupBox.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QBoxLayout.html
  - Przykład uruchomiony z PySide6 6.12, wygląd sprawdzony na zrzucie okna
  - Zasady oceniania INF.04 2023 sty (R.3.1, R.3.10), 2023 cze (R.3.6), 2025 cze (R.3.1)
arkusze: [2023 sty, 2023 cze, 2024 sty, 2025 cze]
---

## Po co to jest

Każde zadanie desktopowe miało układ kontrolek „zgodny z obrazem” w arkuszu: grupy z ramką i tytułem („Dane Pracownika”, „Generowanie hasła” w 2023 sty), etykiety przed polami, suwaki z etykietami po obu stronach (2025 cze). Zamiast ustawiać współrzędne, składasz okno z układów, które same rozmieszczają kontrolki.

## Jak to działa

Cztery układy:

| Układ | Rozmieszcza |
| --- | --- |
| `QVBoxLayout` | jedno pod drugim |
| `QHBoxLayout` | obok siebie |
| `QGridLayout` | w tabeli: wiersz, kolumna |
| `QFormLayout` | pary etykieta i pole |

Układy się zagnieżdża. Drzewo okna z przykładu:

```tekst Drzewo okna
Okno
└── QVBoxLayout
    ├── QGroupBox "Dane"
    │   └── QFormLayout
    │       ├── Imię      [pole]
    │       └── Nazwisko  [pole]
    ├── QGridLayout
    │   ├── R  [suwak]  255
    │   └── G  [suwak]  255
    └── QHBoxLayout
        ├── [OK]
        └── [Anuluj]
```

- `addWidget(kontrolka)` wkłada kontrolkę, `addLayout(uklad)` wkłada cały układ.
- `QGroupBox("Dane")` to ramka z tytułem. Dostaje własny układ przez `setLayout`.
- `QFormLayout.addRow("Imię", pole)` sam tworzy etykietę z tekstem i stawia ją przed polem.
- `QGridLayout.addWidget(kontrolka, wiersz, kolumna)`: numeracja od 0. Ta sama kolumna w kolejnych wierszach wyrównuje kontrolki w pionie.

## Składnia do zapamiętania

```python
grupa = QGroupBox("Dane Pracownika")
formularz = QFormLayout()
formularz.addRow("Imię", self.pole_imie)
grupa.setLayout(formularz)

siatka = QGridLayout()
siatka.addWidget(QLabel("R"), 0, 0)
siatka.addWidget(self.suwak_r, 0, 1)

uklad = QVBoxLayout()
uklad.addWidget(grupa)
uklad.addLayout(siatka)
self.setLayout(uklad)
```

## Przykład

```python main.py {12,14,16,18,19,20,21,26,31,32,34}
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QLabel, QLineEdit, QPushButton, QSlider,
                               QGroupBox, QVBoxLayout, QHBoxLayout, QFormLayout, QGridLayout)
from PySide6.QtCore import Qt


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Układy. Wykonał: 00000000000")

        grupa_dane = QGroupBox("Dane")
        formularz = QFormLayout()
        formularz.addRow("Imię", QLineEdit())
        formularz.addRow("Nazwisko", QLineEdit())
        grupa_dane.setLayout(formularz)

        siatka = QGridLayout()
        siatka.addWidget(QLabel("R"), 0, 0)
        siatka.addWidget(QSlider(Qt.Orientation.Horizontal), 0, 1)
        siatka.addWidget(QLabel("255"), 0, 2)
        siatka.addWidget(QLabel("G"), 1, 0)
        siatka.addWidget(QSlider(Qt.Orientation.Horizontal), 1, 1)
        siatka.addWidget(QLabel("255"), 1, 2)

        przyciski = QHBoxLayout()
        przyciski.addWidget(QPushButton("OK"))
        przyciski.addWidget(QPushButton("Anuluj"))

        uklad = QVBoxLayout()
        uklad.addWidget(grupa_dane)
        uklad.addLayout(siatka)
        uklad.addLayout(przyciski)
        self.setLayout(uklad)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Ramka z tytułem „Dane”.
2. Etykieta i pole w jednym wierszu formularza.
3. Formularz przypięty do ramki.
4. Siatka na suwaki.
5. Wiersz 0, kolumna 0: etykieta R.
6. Wiersz 0, kolumna 1: suwak poziomy.
7. Wiersz 0, kolumna 2: wartość suwaka.
8. Przyciski obok siebie.
9. Kontrolkę (ramkę) dodajesz przez `addWidget`.
10. Układ dodajesz przez `addLayout`.
11. Główny układ przypięty do okna.

## Pułapki

- `uklad.addWidget(siatka)` z układem zamiast kontrolki: program pada z `TypeError` („called with wrong argument types”). Układ w układzie: `addLayout`.
- Zasady dopuszczają różnice wyglądu między środowiskami, ale kontrolki i ich kolejność muszą się zgadzać z obrazem (R.3.10 w 2023 sty, R.3.6 w 2023 cze).
- Grupa „w dowolnym elemencie grupującym” (2023 cze) to w Qt `QGroupBox`. Bez niego punkt za zgrupowanie przepada.
- `QFormLayout` sam tworzy etykiety, więc nie dodawaj osobnych `QLabel` z tym samym tekstem.

## Powiązane

- [Szkielet aplikacji PySide6 i projekt w Qt Creator](#/karta/desktop/01-szkielet-i-qt-creator)
- [Radio, checkbox i lista rozwijana](#/karta/desktop/04-radio-checkbox-i-lista)
- [Suwaki i kolor RGB](#/karta/desktop/07-suwaki-i-kolor-rgb)
