---
tytul: "Zadanie: wzornik kolorów RGB"
dzial: desktop
tagi: [pyside6, zadanie, QSlider, valueChanged, QGridLayout, rgb, setStyleSheet, prostokąt, przycisk Pobierz]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2025 cze, część II, obrazy 2-5
  - Zasady oceniania INF.04 2025 cze (R.3.1-R.3.8)
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QAbstractSlider.html
  - https://doc.qt.io/qt-6/stylesheet-reference.html
  - Rozwiązanie uruchomione z PySide6 6.12; stany z obrazów 2-5 odtworzone, kolor dużego prostokąta odczytany z pikseli zrzutu
arkusze: [2025 cze]
---

## Po co to jest

Typ zadania: wybieranie koloru suwakami. Trzy suwaki R, G, B od 0 do 255, na starcie 255, z wartością obok. Ruch suwaka od razu zmienia kolor dużego prostokąta u góry. Przycisk „Pobierz” kopiuje aktualny kolor i jego liczby do małego prostokąta na dole. Później ruch suwaków ==już małego prostokąta nie zmienia== (R.3.6).

## Jak to działa

Dwa zdarzenia, dwie metody:

```tekst Kto co zmienia
ruch dowolnego suwaka
  → zmien_kolor()
      napisy przy suwakach
      duży prostokąt

klik Pobierz
  → pobierz_kolor()
      tekst małego prostokąta
      kolor małego prostokąta
```

Mały prostokąt zmienia tylko `pobierz_kolor`. Dlatego po kliknięciu „Pobierz” zostaje z tamtym kolorem, choć duży zmienia się dalej.

Trzy suwaki są prawie takie same, więc tworzy je pętla. Suwaki i napisy trafiają do list, a `QGridLayout` układa je w trzech wierszach: litera, suwak, wartość. Wszystkie trzy suwaki wołają tę samą metodę `zmien_kolor`, a ona odczytuje wartości ==wszystkich trzech==.

Sprawdzone (stany z arkusza):

| Stan | Duży | Mały |
| --- | --- | --- |
| start | biały | 255, 255, 255, biały |
| suwaki 66, 113, 185 | #4271b9 (niebieski) | bez zmian |
| Pobierz | bez zmian | 66, 113, 185, niebieski |
| suwaki 188, 97, 179 | #bc61b3 (fioletowy) | dalej 66, 113, 185 |

## Składnia do zapamiętania

```python
for wiersz, nazwa in enumerate(["R", "G", "B"]):
    suwak = QSlider(Qt.Orientation.Horizontal)
    suwak.setRange(0, 255)
    suwak.setValue(255)
    suwak.valueChanged.connect(self.zmien_kolor)
    siatka.addWidget(QLabel(nazwa), wiersz, 0)
    siatka.addWidget(suwak, wiersz, 1)
    self.suwaki.append(suwak)
```

## Przykład

Zamiast zer wpisz swój numer zdającego.

```python main.py {10,12,13,25,26,27,30,36,37,54,56,58,62}
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QLabel, QSlider, QPushButton,
                               QGridLayout, QVBoxLayout)
from PySide6.QtCore import Qt


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Wzornik kolorów RGB. Wykonał 00000000000")
        self.setStyleSheet(
            "Okno { background-color: #FFF8DC; }"
            "QPushButton { background-color: #CD853F; border: 1px solid #333333; padding: 4px; }"
        )

        self.duzy_prostokat = QLabel()
        self.duzy_prostokat.setMinimumSize(400, 60)
        self.duzy_prostokat.setStyleSheet("background-color: rgb(255, 255, 255);")

        siatka = QGridLayout()
        self.suwaki = []
        self.napisy_wartosci = []
        for wiersz, nazwa in enumerate(["R", "G", "B"]):
            suwak = QSlider(Qt.Orientation.Horizontal)
            suwak.setRange(0, 255)
            suwak.setValue(255)
            suwak.valueChanged.connect(self.zmien_kolor)
            napis_wartosci = QLabel("255")
            siatka.addWidget(QLabel(nazwa), wiersz, 0)
            siatka.addWidget(suwak, wiersz, 1)
            siatka.addWidget(napis_wartosci, wiersz, 2)
            self.suwaki.append(suwak)
            self.napisy_wartosci.append(napis_wartosci)

        przycisk_pobierz = QPushButton("Pobierz")
        przycisk_pobierz.clicked.connect(self.pobierz_kolor)
        self.maly_prostokat = QLabel("255, 255, 255")
        self.maly_prostokat.setStyleSheet("background-color: rgb(255, 255, 255);")

        uklad = QVBoxLayout()
        uklad.addWidget(self.duzy_prostokat)
        uklad.addWidget(QLabel("Dobierz kolor suwakami i zapisz przyciskiem:"))
        uklad.addLayout(siatka)
        uklad.addWidget(przycisk_pobierz, alignment=Qt.AlignmentFlag.AlignCenter)
        uklad.addWidget(self.maly_prostokat, alignment=Qt.AlignmentFlag.AlignCenter)
        self.setLayout(uklad)

    def wartosci_rgb(self):
        r = self.suwaki[0].value()
        g = self.suwaki[1].value()
        b = self.suwaki[2].value()
        return r, g, b

    def zmien_kolor(self):
        r, g, b = self.wartosci_rgb()
        for i in range(3):
            self.napisy_wartosci[i].setText(str(self.suwaki[i].value()))
        self.duzy_prostokat.setStyleSheet(f"background-color: rgb({r}, {g}, {b});")

    def pobierz_kolor(self):
        r, g, b = self.wartosci_rgb()
        self.maly_prostokat.setText(f"{r}, {g}, {b}")
        self.maly_prostokat.setStyleSheet(f"background-color: rgb({r}, {g}, {b});")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Tytuł z numerem zdającego.
2. Tło okna Cornsilk.
3. Przycisk w kolorze Peru, z obramowaniem, żeby kolor na pewno się pokazał.
4. Zakres 0..255 (R.3.2).
5. Wartość startowa 255, ustawiona przed `connect`.
6. Każdy suwak woła tę samą metodę.
7. Suwak w środkowej kolumnie siatki, litera po lewej, wartość po prawej (R.3.1).
8. Przycisk i jego metoda (R.3.3).
9. Mały prostokąt: na starcie tekst „255, 255, 255” i białe tło (R.3.2).
10. Metoda dla suwaków.
11. Napisy przy suwakach (R.3.4).
12. Kolor dużego prostokąta z trzech wartości (R.3.5).
13. Tylko przycisk zmienia tekst i kolor małego prostokąta (R.3.6, R.3.7).

## Pułapki

- `valueChanged` małego prostokąta podpięty do suwaków: zmienia się przy każdym ruchu, a ma tylko po kliknięciu (R.3.6).
- Kolor tylko z jednego suwaka (z argumentu sygnału) zamiast z trzech: duży prostokąt ma zły kolor, R.3.5 przepada.
- Brak `setRange(0, 255)`: domyślny zakres to 0..99.
- `connect` przed `setValue(255)` uruchomi `zmien_kolor`, zanim powstaną napisy, i program wypisze błąd. Najpierw zakres i wartość.
- Etykiety „R”, „G”, „B” po lewej i wartości po prawej to część układu zgodnego z obrazem 2 (R.3.1). Siatka pilnuje, żeby stały w równych kolumnach.

## Powiązane

- [Suwaki i kolor RGB](#/karta/desktop/07-suwaki-i-kolor-rgb)
- [Układy: pionowy, poziomy, siatka, formularz](#/karta/desktop/02-uklady)
- [Obrazy, kolory i czcionka](#/karta/desktop/05-obrazy-kolory-i-czcionka)
