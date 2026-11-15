---
tytul: "Suwaki i kolor RGB"
dzial: desktop
tagi: [pyside6, QSlider, setRange, setValue, valueChanged, rgb, setStyleSheet, prostokąt, kolor]
status: do-weryfikacji
zrodla:
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QSlider.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QAbstractSlider.html
  - https://doc.qt.io/qt-6/stylesheet-reference.html
  - Przykład uruchomiony z PySide6 6.12; kolor prostokąta odczytany z pikseli zrzutu po każdej zmianie suwaka; obie kolejności connect i setValue sprawdzone
  - Arkusz INF.04 2025 cze, część II
  - Zasady oceniania INF.04 2025 cze (R.3.2, R.3.4, R.3.5)
arkusze: [2025 cze]
---

## Po co to jest

W 2025 cze były trzy suwaki R, G, B: każdy od 0 do 255, na starcie 255, z wartością wypisaną obok (R.3.2, R.3.4). Ruch dowolnego suwaka od razu zmieniał kolor dużego prostokąta (R.3.5). Potrzebujesz `QSlider`, sygnału `valueChanged` i koloru ustawionego stylem.

## Jak to działa

Suwak trzyma liczbę całkowitą z zakresu. Domyślny zakres to 0..99 (sprawdzone na nowym `QSlider`), więc dla koloru trzeba `setRange(0, 255)`.

```tekst Ruch suwaka
użytkownik przesuwa suwak R na 245
        ↓
valueChanged(245)
        ↓
zmien_kolor(245)
  napis obok:  "245"
  prostokąt:   rgb(245, 0, 0)
```

- `valueChanged` przekazuje nową wartość jako argument metody. Nie musisz jej odczytywać.
- Prostokąt to zwykły `QLabel` bez tekstu z ustalonym minimalnym rozmiarem. Zasady 2025 cze dopuszczały dowolną kontrolkę, „która daje efekt”.
- Kolor z trzech liczb w stylu: `background-color: rgb(255, 128, 0);`. Napis budujesz f-stringiem.
- `setValue` spoza zakresu Qt przycina: `setValue(300)` dało 255.

Sprawdzone: start 255 i biały prostokąt. Po klawiszu PageDown suwak skoczył na 245, napis „245”, kolor #f50000. Po `setValue(100)` napis „100”, kolor #640000.

## Składnia do zapamiętania

```python
self.suwak_r = QSlider(Qt.Orientation.Horizontal)
self.suwak_r.setRange(0, 255)
self.suwak_r.setValue(255)
self.suwak_r.valueChanged.connect(self.zmien_kolor)

def zmien_kolor(self):
    r = self.suwak_r.value()
    self.napis_r.setText(str(r))
    self.prostokat.setStyleSheet(f"background-color: rgb({r}, {g}, {b});")
```

## Przykład

Jeden suwak, żeby było widać mechanizm. Pełne zadanie z trzema suwakami jest w osobnej karcie.

```python main.py {11,12,13,15,16,17,18,31,32,33}
import sys
from PySide6.QtWidgets import QApplication, QWidget, QLabel, QSlider, QHBoxLayout, QVBoxLayout
from PySide6.QtCore import Qt


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Suwak. Wykonał: 00000000000")

        self.prostokat = QLabel()
        self.prostokat.setMinimumSize(200, 80)
        self.prostokat.setStyleSheet("background-color: rgb(255, 255, 255);")

        self.suwak = QSlider(Qt.Orientation.Horizontal)
        self.suwak.setRange(0, 255)
        self.suwak.setValue(255)
        self.suwak.valueChanged.connect(self.zmien_kolor)
        self.napis_wartosc = QLabel("255")

        wiersz = QHBoxLayout()
        wiersz.addWidget(QLabel("R"))
        wiersz.addWidget(self.suwak)
        wiersz.addWidget(self.napis_wartosc)

        uklad = QVBoxLayout()
        uklad.addWidget(self.prostokat)
        uklad.addLayout(wiersz)
        self.setLayout(uklad)

    def zmien_kolor(self, wartosc):
        self.napis_wartosc.setText(str(wartosc))
        self.prostokat.setStyleSheet(f"background-color: rgb({wartosc}, 0, 0);")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Prostokąt: pusta etykieta.
2. Minimalny rozmiar, inaczej pusta etykieta ma rozmiar zero.
3. Kolor startowy: biały.
4. Suwak poziomy.
5. Zakres 0..255 (R.3.2).
6. Wartość startowa 255, ustawiona przed podpięciem sygnału.
7. Każda zmiana wartości woła `zmien_kolor`.
8. Metoda dostaje nową wartość w argumencie.
9. Wartość obok suwaka jako tekst (R.3.4).
10. Nowy kolor prostokąta (R.3.5).

## Pułapki

- Bez `setRange(0, 255)` suwak kończy się na 99 i kolor nigdy nie dojdzie do białego.
- `connect` przed `setValue(255)`: metoda rusza już w `__init__`. Sprawdzone: gdy etykiety z wartością jeszcze nie było, program wypisał `AttributeError`, a gdy była, prostokąt na starcie był czerwony zamiast biały. Najpierw zakres i wartość, potem `connect`.
- `setText(wartosc)` z liczbą to błąd `TypeError`. Tekst zawsze przez `str(...)`.
- Kolor z trzech suwaków: w metodzie odczytaj ==wszystkie trzy== przez `value()`. Sam argument z sygnału to tylko wartość suwaka, który się ruszył.
- `rgb(255,255,255)` w stylu, a nie `#255255255`. Zapis szesnastkowy to coś innego.

## Powiązane

- [Zadanie: wzornik kolorów RGB](#/karta/desktop/12-zadanie-wzornik-rgb)
- [Obrazy, kolory i czcionka](#/karta/desktop/05-obrazy-kolory-i-czcionka)
- [Układy: pionowy, poziomy, siatka, formularz](#/karta/desktop/02-uklady)
