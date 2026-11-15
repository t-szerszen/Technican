---
tytul: "Sygnały, tekst i QMessageBox"
dzial: desktop
tagi: [pyside6, sygnał, slot, clicked, connect, QLineEdit, text, setText, QLabel, QMessageBox, information, warning, editingFinished]
status: do-weryfikacji
zrodla:
  - https://doc.qt.io/qtforpython-6/tutorials/basictutorial/clickablebutton.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLineEdit.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QMessageBox.html
  - Przykład uruchomiony z PySide6 6.12; kliknięcia i wpisywanie zasymulowane QTest, okna komunikatów przechwycone
  - Zasady oceniania INF.04 2023 sty (R.3.5, R.3.9), 2023 cze (R.3.3, R.3.9), 2024 sty (R.3.4, R.3.8, R.3.9)
arkusze: [2023 sty, 2023 cze, 2024 sty, 2025 cze]
---

## Po co to jest

We wszystkich czterech arkuszach desktopowych było kryterium „po wciśnięciu przycisku wywoływana jest funkcja” (R.3.3 lub R.3.5), a w trzech wynik pokazywał się w ==oknie komunikatu==: dane pracownika (2023 sty), wynik walidacji kodu (2023 cze), dane z paszportu (2024 sty). W Qt robi to para: sygnał `clicked` podpięty przez `connect` i `QMessageBox`.

## Jak to działa

Kontrolka wysyła ==sygnał==, gdy coś się z nią stanie. Ty podpinasz do niego swoją metodę (slot):

```tekst Sygnał i slot
przycisk.clicked.connect(self.powitaj)
1        2               3
```

1. Kto wysyła: przycisk.
2. Sygnał: kliknięto.
3. Co wywołać: Twoja metoda, bez nawiasów.

Sygnały z arkuszy:

| Sygnał | Kiedy |
| --- | --- |
| `QPushButton.clicked` | kliknięcie przycisku |
| `QLineEdit.editingFinished` | Enter albo wyjście z pola |
| `QLineEdit.textChanged` | każda zmiana tekstu |
| `QSlider.valueChanged` | przesunięcie suwaka |

`editingFinished` to „opuszczenie pola” z 2024 sty. Dokumentacja dodaje, że przy wyjściu z pola bez zmiany tekstu sygnał nie przychodzi.

Tekst: `pole.text()` odczytuje, `napis.setText("...")` zapisuje. Odczyt zawsze daje napis (`str`), także dla cyfr.

`QMessageBox.information(self, "Tytuł", "Treść")` otwiera okienko z przyciskiem OK i czeka, aż je zamkniesz. `warning` wygląda tak samo, ale z ikoną ostrzeżenia. Pierwszy argument to okno-rodzic, czyli `self`.

## Składnia do zapamiętania

```python
self.pole_imie = QLineEdit()
przycisk.clicked.connect(self.powitaj)
self.pole_numer.editingFinished.connect(self.zmien_obrazy)

def powitaj(self):
    imie = self.pole_imie.text()
    self.napis.setText("Witaj " + imie)
    QMessageBox.information(self, "Powitanie", f"Witaj {imie}")
```

## Przykład

```python main.py {11,12,15,23,24,25,26,28,29}
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QLabel, QLineEdit, QPushButton,
                               QMessageBox, QVBoxLayout)


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Powitanie. Wykonał: 00000000000")

        self.pole_imie = QLineEdit()
        self.pole_imie.setPlaceholderText("Twoje imię")
        self.napis = QLabel("Podaj imię")
        przycisk = QPushButton("Powitaj")
        przycisk.clicked.connect(self.powitaj)

        uklad = QVBoxLayout()
        uklad.addWidget(self.pole_imie)
        uklad.addWidget(przycisk)
        uklad.addWidget(self.napis)
        self.setLayout(uklad)

    def powitaj(self):
        imie = self.pole_imie.text()
        if imie == "":
            QMessageBox.warning(self, "Błąd", "Wprowadź dane")
        else:
            self.napis.setText("Witaj " + imie)
            QMessageBox.information(self, "Powitanie", f"Witaj {imie}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Pole tekstowe jako pole obiektu, żeby `powitaj` mogła je odczytać.
2. Szara podpowiedź w pustym polu.
3. Kliknięcie podpięte do metody.
4. Metoda obsługi kliknięcia.
5. Odczyt tekstu z pola: zawsze `str`.
6. Puste pole.
7. Okno ostrzeżenia. Sprawdzone: przy pustym polu „Wprowadź dane”.
8. Zmiana tekstu etykiety w oknie.
9. Okno informacji. Sprawdzone: po wpisaniu „Ola” „Witaj Ola”.

## Pułapki

- `self.pole_imie.text` bez nawiasów to metoda, a nie tekst. `"Witaj " + self.pole_imie.text` rzuca `TypeError`.
- Liczba z pola to napis: `self.pole_ile.text() + 1` to błąd. Zamień przez `int(...)`, najlepiej po sprawdzeniu `isdigit()`.
- `QMessageBox.information("Treść")` bez rodzica i tytułu to błąd. Kolejność: rodzic, tytuł, treść.
- Komunikat w nowym oknie był wymagany wprost (R.3.9 w 2023 sty). Tekst w etykiecie zamiast `QMessageBox` tego nie spełni.
- Metoda podpięta do `editingFinished` nie ruszy, jeśli w teście nie wyjdziesz z pola (Tab, klik gdzie indziej) albo nie naciśniesz Enter.

## Powiązane

- [Szkielet aplikacji PySide6 i projekt w Qt Creator](#/karta/desktop/01-szkielet-i-qt-creator)
- [Walidacja pola: długość i cyfry](#/karta/desktop/06-walidacja-pola)
- [Radio, checkbox i lista rozwijana](#/karta/desktop/04-radio-checkbox-i-lista)
