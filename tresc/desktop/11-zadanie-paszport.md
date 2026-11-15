---
tytul: "Zadanie: paszport"
dzial: desktop
tagi: [pyside6, zadanie, editingFinished, QPixmap, isNull, scaledToHeight, QRadioButton, setStyleSheet, QLineEdit, QMessageBox]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2024 sty, część II, obrazy 1-3
  - Zasady oceniania INF.04 2024 sty (R.3.1-R.3.10)
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLineEdit.html (editingFinished)
  - https://doc.qt.io/qtforpython-6/PySide6/QtGui/QPixmap.html (pusty obraz dla brakującego pliku)
  - Rozwiązanie uruchomione z PySide6 6.12; numery 111, 444, 333 wpisane i zatwierdzone klawiszem Tab przez QTest
  - Archiwum materialy.7z z 2024 sty nie było w materiałach, więc w teście zastępcze obrazy 000, 111 i 333
arkusze: [2024 sty]
---

## Po co to jest

Typ zadania: okno danych paszportowych. Trzy pola (numer, imię, nazwisko), grupa „Kolor oczu” z jednym wyborem i dwa obrazy: zdjęcie i odcisk palca. Nowość względem innych lat: obrazy zmieniają się ==po opuszczeniu pola „Numer”==, a nazwy plików buduje się z wpisanego numeru: `333` daje `333-zdjecie.jpg` i `333-odcisk.jpg`. Numer bez plików ma schować oba obrazy.

## Jak to działa

Plan rozwiązania:

1. Tytuł z numerem, tło okna CadetBlue, pola i przycisk Azure (R.3.1, R.3.2).
2. Formularz z trzema polami, grupa z trzema polami radio, „niebieskie” zaznaczone (R.3.3).
3. Na starcie obrazy `000-zdjecie.jpg` i `000-odcisk.jpg`, oba o wysokości 180 (R.3.5, R.3.10).
4. `editingFinished` pola „Numer” podpięte do metody zmiany obrazów (R.3.4).
5. Nazwa pliku sklejona z numeru. Brak pliku: pusta etykieta (R.3.6, R.3.7).
6. „OK”: puste pole daje „Wprowadź dane”, pełne dane dają imię, nazwisko i kolor oczu (R.3.8, R.3.9).

Co się dzieje przy wpisaniu numeru:

```tekst Opuszczenie pola Numer
wpisano 333, Tab albo klik obok
        ↓
editingFinished → zmien_obrazy()
        ↓
"333" + "-zdjecie.jpg" → QPixmap
        ↓
plik jest?  tak → setPixmap, wysokość 180
            nie → clear(), pusta etykieta
```

`QPixmap` dla brakującego pliku nie rzuca błędu, tylko daje pusty obraz (`isNull()` zwraca `True`). Sprawdzone: skalowanie pustego obrazu działa, ale wypisuje ostrzeżenie w konsoli, więc pusty obraz obsłuż osobno przez `clear()`.

Sprawdzone: 111 i 333 pokazują oba obrazy o wysokości 180, 444 chowa oba. Bez nazwiska: „Wprowadź dane”. Jan Nowak z zaznaczonym „piwne”: „Jan Nowak kolor oczu piwne”.

## Składnia do zapamiętania

```python
self.pole_numer.editingFinished.connect(self.zmien_obrazy)

def zmien_obrazy(self):
    numer = self.pole_numer.text()
    obraz = QPixmap(os.path.join(KATALOG, numer + "-zdjecie.jpg"))
    if obraz.isNull():
        self.obraz_zdjecie.clear()
    else:
        self.obraz_zdjecie.setPixmap(obraz.scaledToHeight(180))
```

## Przykład

Obrazy z archiwum leżą obok `main.py`. Zamiast zer wpisz swój numer zdającego.

```python main.py {13,15,16,21,33,60,65,66,68,72,78,80,87}
import os
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QLabel, QLineEdit, QPushButton, QRadioButton,
                               QGroupBox, QMessageBox, QFormLayout, QVBoxLayout, QHBoxLayout)
from PySide6.QtGui import QPixmap

KATALOG = os.path.dirname(os.path.abspath(__file__))


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Wprowadzenie danych do paszportu. Wykonał: 00000000000")
        self.setStyleSheet(
            "Okno { background-color: #5F9EA0; }"
            "QLineEdit { background-color: #F0FFFF; }"
            "QPushButton { background-color: #F0FFFF; border: 1px solid #333333; padding: 4px; }"
        )

        self.pole_numer = QLineEdit()
        self.pole_numer.editingFinished.connect(self.zmien_obrazy)
        self.pole_imie = QLineEdit()
        self.pole_nazwisko = QLineEdit()
        formularz = QFormLayout()
        formularz.addRow("Numer", self.pole_numer)
        formularz.addRow("Imię", self.pole_imie)
        formularz.addRow("Nazwisko", self.pole_nazwisko)

        grupa_oczy = QGroupBox("Kolor oczu")
        self.radio_niebieskie = QRadioButton("niebieskie")
        self.radio_zielone = QRadioButton("zielone")
        self.radio_piwne = QRadioButton("piwne")
        self.radio_niebieskie.setChecked(True)
        uklad_oczy = QVBoxLayout()
        uklad_oczy.addWidget(self.radio_niebieskie)
        uklad_oczy.addWidget(self.radio_zielone)
        uklad_oczy.addWidget(self.radio_piwne)
        grupa_oczy.setLayout(uklad_oczy)

        lewa = QVBoxLayout()
        lewa.addLayout(formularz)
        lewa.addWidget(grupa_oczy)

        self.obraz_zdjecie = QLabel()
        self.obraz_odcisk = QLabel()
        obrazy = QHBoxLayout()
        obrazy.addWidget(self.obraz_zdjecie)
        obrazy.addWidget(self.obraz_odcisk)
        przycisk_ok = QPushButton("OK")
        przycisk_ok.clicked.connect(self.pokaz_dane)
        prawa = QVBoxLayout()
        prawa.addLayout(obrazy)
        prawa.addWidget(przycisk_ok)

        uklad = QHBoxLayout()
        uklad.addLayout(lewa)
        uklad.addLayout(prawa)
        self.setLayout(uklad)

        self.pokaz_obraz(self.obraz_zdjecie, "000-zdjecie.jpg")
        self.pokaz_obraz(self.obraz_odcisk, "000-odcisk.jpg")

    def pokaz_obraz(self, etykieta, nazwa_pliku):
        obraz = QPixmap(os.path.join(KATALOG, nazwa_pliku))
        if obraz.isNull():
            etykieta.clear()
        else:
            etykieta.setPixmap(obraz.scaledToHeight(180))

    def zmien_obrazy(self):
        numer = self.pole_numer.text()
        self.pokaz_obraz(self.obraz_zdjecie, numer + "-zdjecie.jpg")
        self.pokaz_obraz(self.obraz_odcisk, numer + "-odcisk.jpg")

    def pokaz_dane(self):
        imie = self.pole_imie.text()
        nazwisko = self.pole_nazwisko.text()
        if self.pole_numer.text() == "" or imie == "" or nazwisko == "":
            QMessageBox.warning(self, "Paszport", "Wprowadź dane")
            return
        if self.radio_niebieskie.isChecked():
            kolor = "niebieskie"
        elif self.radio_zielone.isChecked():
            kolor = "zielone"
        else:
            kolor = "piwne"
        QMessageBox.information(self, "Paszport", f"{imie} {nazwisko} kolor oczu {kolor}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Tytuł z numerem zdającego (R.3.1).
2. Tło okna CadetBlue (R.3.2).
3. Tło pól edycyjnych Azure. Przycisk ma Azure w linii niżej.
4. Opuszczenie pola „Numer” woła metodę (R.3.4).
5. Stan początkowy: „niebieskie” (R.3.3).
6. Obrazy startowe 000 (R.3.10).
7. Brak pliku: pusty obraz.
8. Pusta etykieta, żaden obraz nie jest widoczny (R.3.7).
9. Ta sama wysokość dla obu obrazów (R.3.5).
10. Nazwa pliku z numeru z pola (R.3.6).
11. Któreś pole puste.
12. `return` kończy metodę: komunikat z danymi się nie pokaże.
13. Komunikat w formacie z treści (R.3.8).

## Pułapki

- `textChanged` zamiast `editingFinished`: obrazy zmieniają się przy każdej cyfrze, a treść mówi o opuszczeniu pola. Zasady przyjmują opuszczenie pola albo przycisk (R.3.4).
- Przy testowaniu wyjdź z pola klawiszem Tab albo kliknięciem w inne pole. Bez tego `editingFinished` nie przyjdzie i obrazy się nie zmienią.
- Obrazy zostają ze starego numeru, gdy nowego pliku nie ma: przepada R.3.7. Brak pliku musi czyścić etykietę.
- `scaledToHeight` tylko na jednym obrazie: zdjęcie i odcisk mają różne proporcje, więc różne wysokości łamią R.3.5. Skaluj oba tą samą metodą.
- `background-color` bez selektora na całym oknie zabarwi pola tym samym kolorem co tło. Pola mają być Azure, okno CadetBlue.
- Komunikat „Wprowadź dane” ma się pokazać zamiast danych, nie razem z nimi. Stąd `return` po ostrzeżeniu.

## Powiązane

- [Obrazy, kolory i czcionka](#/karta/desktop/05-obrazy-kolory-i-czcionka)
- [Sygnały, tekst i QMessageBox](#/karta/desktop/03-sygnaly-tekst-i-komunikaty)
- [Radio, checkbox i lista rozwijana](#/karta/desktop/04-radio-checkbox-i-lista)
