---
tytul: "Szkielet aplikacji PySide6 i projekt w Qt Creator"
dzial: desktop
tagi: [pyside6, qt creator, QApplication, QWidget, show, exec, setWindowTitle, projekt, Empty Window]
status: do-weryfikacji
zrodla:
  - https://doc.qt.io/qtforpython-6/tutorials/basictutorial/widgets.html
  - https://doc.qt.io/qtforpython-6/tutorials/basictutorial/clickablebutton.html
  - https://doc.qt.io/qtcreator/creator-tutorial-python-application-qt-widgets.html
  - https://doc.qt.io/qtcreator/creator-python-development.html
  - Przykład uruchomiony z PySide6 6.12 (Python 3.14, QT_QPA_PLATFORM=offscreen), kliknięcie zasymulowane QTest
  - Zasady oceniania INF.04 2023 sty, 2023 cze, 2024 sty (R.3.1), 2025 cze (R.3.8)
arkusze: [2023 sty, 2023 cze, 2024 sty, 2025 cze]
---

## Po co to jest

Aplikacja desktopowa była w czterech arkuszach (2023 sty, 2023 cze, 2024 sty, 2025 cze). Za każdym razem pierwsze kryterium dotyczyło ==tytułu okna z numerem zdającego== (R.3.1), a zrzut działającego okna był osobnym punktem (R.3.6-R.3.10, zależnie od roku). Okno w PySide6 piszesz w kodzie, w jednej klasie.

## Jak to działa

Projekt w Qt Creator: File > New Project > Application (Qt for Python) > Empty Window. Kreator pyta o nazwę klasy (klasa bazowa `QWidget`) i wersję PySide, na stronie wyboru zestawu domyślnie tworzy środowisko wirtualne w folderze projektu, a przy pierwszym otwarciu pliku `.py` proponuje Install, czyli instalację PySide6. Powstają trzy pliki: `pyproject.toml`, plik `.py` z klasą okna i `requirements.txt`. Uruchomienie: przycisk Run.

Co się dzieje po uruchomieniu:

```tekst Start aplikacji
QApplication(sys.argv)   jedna na program
        ↓
Okno()                   __init__ buduje kontrolki
        ↓
okno.show()              okno pojawia się na ekranie
        ↓
app.exec()               pętla zdarzeń: czeka
        ↓ klik
self.kliknieto()         Qt woła podpiętą metodę
        ↓ zamknięcie okna
sys.exit(...)            koniec programu
```

`app.exec()` nie kończy się od razu. Program stoi w tej linii, dopóki okno jest otwarte, i obsługuje kliknięcia. Dlatego cały wygląd budujesz wcześniej, w `__init__`.

Każda kontrolka to obiekt: `QLabel` to napis, `QPushButton` to przycisk. Układ (`QVBoxLayout`) ustawia je jedna pod drugą, a `self.setLayout(...)` przypina układ do okna.

## Składnia do zapamiętania

```python
import sys
from PySide6.QtWidgets import QApplication, QWidget, QLabel, QPushButton, QVBoxLayout


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Tytuł. Wykonał: 00000000000")


app = QApplication(sys.argv)
okno = Okno()
okno.show()
sys.exit(app.exec())
```

## Przykład

```python main.py {5,7,8,12,17,19,24,26,27}
import sys
from PySide6.QtWidgets import QApplication, QWidget, QLabel, QPushButton, QVBoxLayout


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Pierwsze okno. Wykonał: 00000000000")

        self.napis = QLabel("Witaj")
        self.przycisk = QPushButton("Kliknij")
        self.przycisk.clicked.connect(self.kliknieto)

        uklad = QVBoxLayout()
        uklad.addWidget(self.napis)
        uklad.addWidget(self.przycisk)
        self.setLayout(uklad)

    def kliknieto(self):
        self.napis.setText("Kliknięto przycisk")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Okno to klasa dziedzicząca po `QWidget`.
2. Wywołanie konstruktora klasy bazowej. Bez tego program pada z `RuntimeError` przy pierwszym `self.setWindowTitle`.
3. Tytuł okna z numerem zdającego (R.3.1).
4. Kliknięcie przycisku podpięte do metody. Bez nawiasów po `kliknieto`.
5. Układ przypięty do okna.
6. Metoda wywoływana przy kliknięciu. Sprawdzone: po kliknięciu napis zmienia się na „Kliknięto przycisk”.
7. Jedna aplikacja Qt na cały program, przed utworzeniem okna.
8. Okno jest niewidoczne, dopóki nie wywołasz `show()`.
9. Pętla zdarzeń. Program działa, dopóki okno jest otwarte.

## Pułapki

- `connect(self.kliknieto())` z nawiasami wywołuje metodę od razu w `__init__`, a program pada: `TypeError: Expected signal or callable, got "NoneType"`. Podajesz metodę, nie jej wynik.
- Kontrolka zapisana w zmiennej lokalnej (`napis = QLabel(...)`) jest niedostępna w innych metodach. Do tego, co zmieniasz po kliknięciu, używaj `self.napis`.
- Brak `self.setLayout(uklad)`: kontrolki nie pojawią się w oknie.
- Tytuł bez numeru zdającego albo z innym tekstem niż w treści traci R.3.1. Literówki w napisach zasady dopuszczają, brak numeru już nie.
- Zrzut ekranu ma pokazywać uruchomione okno i Qt Creator z paskiem zadań. Bez zrzutu przepada kryterium uruchomienia.

## Powiązane

- [Układy: pionowy, poziomy, siatka, formularz](#/karta/desktop/02-uklady)
- [Sygnały, tekst i QMessageBox](#/karta/desktop/03-sygnaly-tekst-i-komunikaty)
- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [Zrzuty ekranu](#/karta/dokumentacja/02-zrzuty-ekranu)
