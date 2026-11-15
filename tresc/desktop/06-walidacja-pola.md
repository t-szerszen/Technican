---
tytul: "Walidacja pola: długość i cyfry"
dzial: desktop
tagi: [pyside6, walidacja, len, isdigit, strip, kod pocztowy, puste pole, QMessageBox, elif]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/stdtypes.html#str.isdigit
  - https://docs.python.org/3/library/stdtypes.html#str.strip
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QLineEdit.html
  - Przykład uruchomiony z PySide6 6.12; siedem przypadków wejścia sprawdzonych kliknięciem QTest
  - Arkusze INF.04 2023 cze i 2024 sty, część II
  - Zasady oceniania INF.04 2023 cze (R.3.5, R.3.9, R.3.10), 2024 sty (R.3.8, R.3.9)
arkusze: [2023 cze, 2024 sty]
---

## Po co to jest

W 2023 cze przycisk „Zatwierdź” sprawdzał kod pocztowy: ==dokładnie 5 znaków== i ==same cyfry==, każdy błąd z innym komunikatem (R.3.5, R.3.9, R.3.10). W 2024 sty puste imię albo nazwisko dawało komunikat „Wprowadź dane” (R.3.9). To dwa wzorce walidacji, które składasz z `len`, `isdigit` i `strip` w jednym łańcuchu `if`/`elif`.

## Jak to działa

Najpierw odczyt: `text()` daje napis. Potem sprawdzenia po kolei, a pierwszy niespełniony warunek kończy sprawdzanie:

```tekst Kolejność sprawdzeń
imię puste?          → „Wprowadź dane”
długość kodu ≠ 5?    → „Nieprawidłowa liczba cyfr...”
nie same cyfry?      → „Kod pocztowy powinien...”
wszystko dobrze      → „Dane przesyłki zostały...”
```

- `len(kod)` liczy znaki napisu, także spacje i myślnik.
- `kod.isdigit()` daje `True` tylko wtedy, gdy napis nie jest pusty i każdy znak jest cyfrą.
- `tekst.strip()` usuwa spacje z brzegów, więc pole z samymi spacjami też jest puste.

Sprawdzone w oknie:

| Imię | Kod | Komunikat |
| --- | --- | --- |
| Ola | 12345 | Dane przesyłki zostały wprowadzone |
| Ola | 1234 | Nieprawidłowa liczba cyfr... |
| Ola | 123456 | Nieprawidłowa liczba cyfr... |
| Ola | 12a45 | ...powinien się składać z samych cyfr |
| Ola | 12-45 | ...powinien się składać z samych cyfr |
| trzy spacje | 12345 | Wprowadź dane |
| Ola | pusty | Nieprawidłowa liczba cyfr... |

## Składnia do zapamiętania

```python
kod = self.pole_kod.text()
if len(kod) != 5:
    QMessageBox.warning(self, "Błąd", "Nieprawidłowa liczba cyfr w kodzie pocztowym")
elif not kod.isdigit():
    QMessageBox.warning(self, "Błąd", "Kod pocztowy powinien się składać z samych cyfr")
else:
    QMessageBox.information(self, "Sukces", "Dane przesyłki zostały wprowadzone")
```

## Przykład

```python main.py {23,24,25,27,29,31}
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QLineEdit, QPushButton, QMessageBox,
                               QFormLayout)


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Walidacja. Wykonał: 00000000000")

        self.pole_kod = QLineEdit()
        self.pole_imie = QLineEdit()
        przycisk = QPushButton("Zatwierdź")
        przycisk.clicked.connect(self.zatwierdz)

        uklad = QFormLayout()
        uklad.addRow("Kod pocztowy", self.pole_kod)
        uklad.addRow("Imię", self.pole_imie)
        uklad.addRow(przycisk)
        self.setLayout(uklad)

    def zatwierdz(self):
        kod = self.pole_kod.text()
        imie = self.pole_imie.text().strip()
        if imie == "":
            QMessageBox.warning(self, "Błąd", "Wprowadź dane")
        elif len(kod) != 5:
            QMessageBox.warning(self, "Błąd", "Nieprawidłowa liczba cyfr w kodzie pocztowym")
        elif not kod.isdigit():
            QMessageBox.warning(self, "Błąd", "Kod pocztowy powinien się składać z samych cyfr")
        else:
            QMessageBox.information(self, "Sukces", "Dane przesyłki zostały wprowadzone")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Odczyt kodu jako napisu.
2. `strip()`: imię z samych spacji liczy się jako puste.
3. Puste pole: komunikat jak w 2024 sty.
4. Za mało albo za dużo znaków.
5. Długość dobra, ale nie same cyfry.
6. Wszystkie warunki spełnione.

## Pułapki

- `int(kod)` do sprawdzenia, czy to cyfry, wysypie program przy `12a45` (`ValueError`). Sprawdzaj `isdigit()` przed zamianą.
- Osobne `if` zamiast `elif`: przy kodzie `12a4` pokażą się dwa komunikaty jeden po drugim.
- `len(kod) == 5` sprawdza tylko długość. Kryterium R.3.5 chce sprawdzenia długości „odpowiednią instrukcją”, a R.3.10 osobno cyfr. Potrzebne są oba warunki.
- Komunikaty przepisuj z arkusza. Literówki zasady dopuszczają, ale komunikat musi odpowiadać przypadkowi.
- `QLineEdit.setMaxLength(5)` też ograniczy długość, ale wtedy komunikat o zbyt długim kodzie nigdy się nie pokaże.

## Powiązane

- [Sygnały, tekst i QMessageBox](#/karta/desktop/03-sygnaly-tekst-i-komunikaty)
- [join, split, strip, isdigit, count, in](#/karta/konsola/23-metody-napisow)
- [Zadanie: nadaj przesyłkę](#/karta/desktop/09-zadanie-nadaj-przesylke)
- [if, elif, else](#/karta/konsola/04-if-elif-else)
