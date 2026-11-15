---
tytul: "Zadanie: nadaj przesyłkę"
dzial: desktop
tagi: [pyside6, zadanie, QRadioButton, QGroupBox, QPixmap, cena, kod pocztowy, walidacja, isdigit, QMessageBox]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2023 cze, część II, obraz 1 i archiwum materialy.zip (pocztowka.png, list.png, paczka.png)
  - Zasady oceniania INF.04 2023 cze (R.3.1-R.3.10)
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QRadioButton.html
  - https://doc.qt.io/qtforpython-6/PySide6/QtGui/QPixmap.html
  - Rozwiązanie uruchomione z PySide6 6.12 z obrazami z archiwum; trzy ceny i trzy kody sprawdzone kliknięciami QTest, wygląd porównany z obrazem 1
arkusze: [2023 cze]
---

## Po co to jest

Typ zadania: okno nadawania przesyłki. Po lewej grupa pól radio (Pocztówka, List, Paczka), przycisk „Sprawdź Cenę”, obraz i pogrubiona cena. Po prawej grupa z adresem: ulica, kod pocztowy, miasto. Na dole szeroki przycisk „Zatwierdź”, który ==sprawdza kod pocztowy==. Dwa przyciski, dwie metody.

## Jak to działa

Plan rozwiązania:

1. Tytuł okna z numerem zdającego (R.3.1). Szerokość okna układy dopasują same do kontrolek.
2. `QGroupBox` z trzema polami radio, Pocztówka zaznaczona na starcie (R.3.6).
3. Obraz `pocztowka.png` na starcie, etykieta ceny pogrubiona i większa (R.3.2).
4. `QGroupBox` z trzema etykietami i polami adresu.
5. „Sprawdź Cenę”: `if`/`elif`/`else` po polach radio, zmiana obrazu i ceny (R.3.4, R.3.7, R.3.8).
6. „Zatwierdź”: długość kodu, potem cyfry, potem sukces (R.3.5, R.3.9, R.3.10).

Układ okna:

```tekst Drzewo okna
QVBoxLayout
├── QHBoxLayout (góra)
│   ├── QVBoxLayout (lewa)
│   │   ├── QGroupBox Rodzaj przesyłki
│   │   ├── [Sprawdź Cenę]
│   │   └── obraz + Cena:
│   └── QGroupBox Dane adresowe
└── [Zatwierdź]
```

Sprawdzone:

| Akcja | Wynik |
| --- | --- |
| Pocztówka, Sprawdź Cenę | Cena: 1 zł |
| List, Sprawdź Cenę | Cena: 1,5 zł, obraz koperty |
| Paczka, Sprawdź Cenę | Cena: 10 zł |
| kod 65124, Zatwierdź | Dane przesyłki zostały wprowadzone |
| kod 6512 | Nieprawidłowa liczba cyfr w kodzie pocztowym |
| kod 65a24 | Kod pocztowy powinien się składać z samych cyfr |

## Składnia do zapamiętania

```python
def sprawdz_cene(self):
    if self.radio_pocztowka.isChecked():
        self.pokaz_obraz("pocztowka.png")
        self.napis_cena.setText("Cena: 1 zł")
    elif self.radio_list.isChecked():
        self.pokaz_obraz("list.png")
        self.napis_cena.setText("Cena: 1,5 zł")
    else:
        self.pokaz_obraz("paczka.png")
        self.napis_cena.setText("Cena: 10 zł")
```

## Przykład

Pliki `pocztowka.png`, `list.png`, `paczka.png` z archiwum leżą obok `main.py`. Zamiast zer wpisz swój numer zdającego.

```python main.py {13,15,19,27,31,41,56,58,70,73,82,84}
import os
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QLabel, QLineEdit, QPushButton, QRadioButton,
                               QGroupBox, QMessageBox, QVBoxLayout, QHBoxLayout)
from PySide6.QtGui import QPixmap

KATALOG = os.path.dirname(os.path.abspath(__file__))


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Nadaj Przesyłkę, numer: 00000000000")

        grupa_rodzaj = QGroupBox("Rodzaj przesyłki")
        self.radio_pocztowka = QRadioButton("Pocztówka")
        self.radio_list = QRadioButton("List")
        self.radio_paczka = QRadioButton("Paczka")
        self.radio_pocztowka.setChecked(True)
        uklad_rodzaj = QVBoxLayout()
        uklad_rodzaj.addWidget(self.radio_pocztowka)
        uklad_rodzaj.addWidget(self.radio_list)
        uklad_rodzaj.addWidget(self.radio_paczka)
        grupa_rodzaj.setLayout(uklad_rodzaj)

        przycisk_cena = QPushButton("Sprawdź Cenę")
        przycisk_cena.clicked.connect(self.sprawdz_cene)
        self.obraz = QLabel()
        self.pokaz_obraz("pocztowka.png")
        self.napis_cena = QLabel("Cena: ")
        self.napis_cena.setStyleSheet("font-weight: bold; font-size: 16px;")

        wiersz_cena = QHBoxLayout()
        wiersz_cena.addWidget(self.obraz)
        wiersz_cena.addWidget(self.napis_cena)
        lewa = QVBoxLayout()
        lewa.addWidget(grupa_rodzaj)
        lewa.addWidget(przycisk_cena)
        lewa.addLayout(wiersz_cena)

        grupa_adres = QGroupBox("Dane adresowe")
        self.pole_ulica = QLineEdit()
        self.pole_kod = QLineEdit()
        self.pole_miasto = QLineEdit()
        uklad_adres = QVBoxLayout()
        uklad_adres.addWidget(QLabel("Ulica z numerem"))
        uklad_adres.addWidget(self.pole_ulica)
        uklad_adres.addWidget(QLabel("Kod pocztowy"))
        uklad_adres.addWidget(self.pole_kod)
        uklad_adres.addWidget(QLabel("Miasto"))
        uklad_adres.addWidget(self.pole_miasto)
        grupa_adres.setLayout(uklad_adres)

        gora = QHBoxLayout()
        gora.addLayout(lewa)
        gora.addWidget(grupa_adres)
        przycisk_zatwierdz = QPushButton("Zatwierdź")
        przycisk_zatwierdz.clicked.connect(self.zatwierdz)

        uklad = QVBoxLayout()
        uklad.addLayout(gora)
        uklad.addWidget(przycisk_zatwierdz)
        self.setLayout(uklad)

    def pokaz_obraz(self, nazwa_pliku):
        obraz = QPixmap(os.path.join(KATALOG, nazwa_pliku))
        self.obraz.setPixmap(obraz.scaledToHeight(60))

    def sprawdz_cene(self):
        if self.radio_pocztowka.isChecked():
            self.pokaz_obraz("pocztowka.png")
            self.napis_cena.setText("Cena: 1 zł")
        elif self.radio_list.isChecked():
            self.pokaz_obraz("list.png")
            self.napis_cena.setText("Cena: 1,5 zł")
        else:
            self.pokaz_obraz("paczka.png")
            self.napis_cena.setText("Cena: 10 zł")

    def zatwierdz(self):
        kod = self.pole_kod.text()
        if len(kod) != 5:
            QMessageBox.warning(self, "Błąd", "Nieprawidłowa liczba cyfr w kodzie pocztowym")
        elif not kod.isdigit():
            QMessageBox.warning(self, "Błąd", "Kod pocztowy powinien się składać z samych cyfr")
        else:
            QMessageBox.information(self, "Przesyłka", "Dane przesyłki zostały wprowadzone")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Tytuł z numerem zdającego (R.3.1).
2. Grupa pól radio: jeden rodzic, więc wybrać można tylko jedno (R.3.6).
3. Stan początkowy: Pocztówka.
4. Pierwszy przycisk i jego metoda (R.3.3).
5. Cena pogrubiona i większa od reszty napisów (R.3.2).
6. Druga grupa na dane adresowe.
7. Grupa adresu obok lewej kolumny, jak na obrazie 1.
8. Drugi przycisk i jego metoda.
9. Odczyt pól radio i wybór (R.3.4).
10. Kolejny przypadek. Ostatni obsługuje `else`.
11. Sprawdzenie, czy kod ma 5 znaków (R.3.5, R.3.9).
12. Sprawdzenie, czy to same cyfry (R.3.10).

## Pułapki

- Pola radio bez `QGroupBox` albo z niezaznaczoną Pocztówką na starcie: przepada R.3.6.
- Obraz na starcie pusty: kryterium R.3.6 wymaga `pocztowka.png` od razu po uruchomieniu. Wywołaj `pokaz_obraz` w `__init__`.
- „Cena: 1,5 zł” z przecinkiem, tak jak w treści. To napis, nie liczba, więc nie licz jej.
- `int(kod)` zamiast `isdigit()` wysypie program przy literze w kodzie zamiast pokazać komunikat.
- Etykieta ceny bez pogrubienia albo z tym samym rozmiarem co reszta: przepada R.3.2.

## Powiązane

- [Radio, checkbox i lista rozwijana](#/karta/desktop/04-radio-checkbox-i-lista)
- [Walidacja pola: długość i cyfry](#/karta/desktop/06-walidacja-pola)
- [Obrazy, kolory i czcionka](#/karta/desktop/05-obrazy-kolory-i-czcionka)
