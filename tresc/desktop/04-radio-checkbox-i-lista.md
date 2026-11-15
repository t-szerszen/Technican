---
tytul: "Radio, checkbox i lista rozwijana"
dzial: desktop
tagi: [pyside6, QRadioButton, QGroupBox, QCheckBox, QComboBox, isChecked, setChecked, addItems, currentText, grupa]
status: do-weryfikacji
zrodla:
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QRadioButton.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QCheckBox.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QComboBox.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QGroupBox.html
  - Przykład uruchomiony z PySide6 6.12; zaznaczanie i wybór z listy sprawdzone w kodzie testowym
  - Zasady oceniania INF.04 2023 sty (R.3.4, R.3.7, R.3.10), 2023 cze (R.3.4, R.3.6), 2024 sty (R.3.3)
arkusze: [2023 sty, 2023 cze, 2024 sty]
---

## Po co to jest

Kontrolki wyboru były w trzech arkuszach: pola radio Pocztówka/List/Paczka w grupie (2023 cze), kolor oczu z jednym zaznaczonym polem (2024 sty), trzy pola wyboru i lista stanowisk (2023 sty). Kryteria sprawdzają ==stan początkowy== (zaznaczone pierwsze pole), to, że w grupie da się wybrać tylko jedno pole radio, i odczyt stanu w metodzie przycisku (R.3.4 w 2023 cze).

## Jak to działa

| Kontrolka | Ile naraz | Odczyt |
| --- | --- | --- |
| `QRadioButton` | jedno z grupy | `isChecked()` |
| `QCheckBox` | dowolnie wiele | `isChecked()` |
| `QComboBox` | jeden element listy | `currentText()` |

Pola radio wykluczają się same: dokumentacja Qt mówi, że pola radio z ==tym samym rodzicem== działają jak jedna grupa. Rodzicem jest `QGroupBox`, w którego układzie leżą. Dwie osobne grupy wyboru potrzebują więc dwóch osobnych `QGroupBox`.

Sprawdzone: po kliknięciu „List” pole „Pocztówka” samo się odznaczyło.

Stan początkowy ustawiasz w `__init__`: `setChecked(True)`. Bez tego żadne pole nie jest zaznaczone, a arkusze zawsze chciały zaznaczone pierwsze.

Odczyt w metodzie przycisku to zwykły `if`: sprawdzasz po kolei, które pole radio jest zaznaczone. Lista rozwijana zwraca tekst wybranego elementu, a na starcie wybrany jest pierwszy.

## Składnia do zapamiętania

```python
self.radio_pocztowka = QRadioButton("Pocztówka")
self.radio_pocztowka.setChecked(True)
grupa = QGroupBox("Rodzaj")
grupa.setLayout(uklad_grupy)

self.pole_cyfry = QCheckBox("Cyfry")
self.lista = QComboBox()
self.lista.addItems(["Kierownik", "Tester"])

if self.radio_pocztowka.isChecked():
    ...
stanowisko = self.lista.currentText()
```

## Przykład

```python main.py {11,14,18,20,22,36,40,41}
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QLabel, QPushButton, QRadioButton,
                               QCheckBox, QComboBox, QGroupBox, QVBoxLayout)


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Wybór. Wykonał: 00000000000")

        grupa = QGroupBox("Rodzaj")
        self.radio_pocztowka = QRadioButton("Pocztówka")
        self.radio_list = QRadioButton("List")
        self.radio_pocztowka.setChecked(True)
        uklad_grupy = QVBoxLayout()
        uklad_grupy.addWidget(self.radio_pocztowka)
        uklad_grupy.addWidget(self.radio_list)
        grupa.setLayout(uklad_grupy)

        self.pole_cyfry = QCheckBox("Cyfry")
        self.lista = QComboBox()
        self.lista.addItems(["Kierownik", "Starszy programista", "Młodszy programista", "Tester"])
        przycisk = QPushButton("Pokaż wybór")
        przycisk.clicked.connect(self.pokaz)
        self.napis = QLabel("")

        uklad = QVBoxLayout()
        uklad.addWidget(grupa)
        uklad.addWidget(self.pole_cyfry)
        uklad.addWidget(self.lista)
        uklad.addWidget(przycisk)
        uklad.addWidget(self.napis)
        self.setLayout(uklad)

    def pokaz(self):
        if self.radio_pocztowka.isChecked():
            rodzaj = "pocztówka"
        else:
            rodzaj = "list"
        cyfry = "tak" if self.pole_cyfry.isChecked() else "nie"
        stanowisko = self.lista.currentText()
        self.napis.setText(f"{rodzaj}, cyfry: {cyfry}, {stanowisko}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Ramka grupy. Pola radio w jej układzie mają wspólnego rodzica i wykluczają się.
2. Stan początkowy: zaznaczone pierwsze pole.
3. Układ z polami radio przypięty do ramki.
4. Pole wyboru: zaznaczone albo nie, niezależnie od innych.
5. Elementy listy rozwijanej, tu cztery stanowiska z 2023 sty (R.3.4).
6. Odczyt pola radio i decyzja (R.3.4 w 2023 cze).
7. Odczyt pola wyboru.
8. Tekst wybranego elementu listy.

Sprawdzone: na starcie „pocztówka, cyfry: nie, Kierownik”. Po zaznaczeniu List i Cyfry i wyborze czwartego elementu: „list, cyfry: tak, Tester”.

## Pułapki

- Pola radio bez wspólnej ramki (np. dodane prosto do głównego układu okna razem z innymi) też się wykluczą, ale wtedy dwie grupy w jednym oknie zleją się w jedną. Każda grupa we własnym `QGroupBox`.
- Brak `setChecked(True)` przy pierwszym polu: przepada kryterium stanu początkowego (R.3.6 w 2023 cze, R.3.3 w 2024 sty, R.3.10 w 2023 sty).
- `isChecked` bez nawiasów to metoda, a metoda w `if` zawsze jest prawdą. Warunek wyjdzie zawsze `True`.
- `addItem` dodaje jeden element, `addItems` całą listę. `addItems("Tester")` doda osobno każdą literę.
- „Pola wyboru” w 2024 sty to w treści kolor oczu z jednym zaznaczeniem, czyli w Qt pola radio, nie `QCheckBox`.

## Powiązane

- [Układy: pionowy, poziomy, siatka, formularz](#/karta/desktop/02-uklady)
- [Sygnały, tekst i QMessageBox](#/karta/desktop/03-sygnaly-tekst-i-komunikaty)
- [Zadanie: nadaj przesyłkę](#/karta/desktop/09-zadanie-nadaj-przesylke)
