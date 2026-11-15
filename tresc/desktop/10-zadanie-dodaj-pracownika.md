---
tytul: "Zadanie: dodaj pracownika z hasłem"
dzial: desktop
tagi: [pyside6, zadanie, QGroupBox, QComboBox, QCheckBox, random, hasło, setStyleSheet, pole obiektu, QMessageBox]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2023 sty, część II, obrazy 1-3
  - Zasady oceniania INF.04 2023 sty (R.3.1-R.3.10)
  - https://docs.python.org/3/library/random.html#random.choice
  - https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QComboBox.html
  - Rozwiązanie uruchomione z PySide6 6.12; dwa hasła, hasło ze znakami specjalnymi i zatwierdzenie sprawdzone kliknięciami QTest
arkusze: [2023 sty]
---

## Po co to jest

Typ zadania: okno dodawania pracownika. Grupa „Dane pracownika” (imię, nazwisko, lista stanowisk) i grupa „Generowanie hasła” (długość, trzy pola wyboru, przycisk). „Generuj hasło” losuje hasło i pokazuje je w okienku. „Zatwierdź”, wyraźnie dłuższy, pokazuje dane pracownika ==razem z wygenerowanym wcześniej hasłem==, więc hasło musi przetrwać między dwiema metodami (R.3.8).

## Jak to działa

Plan rozwiązania:

1. Tytuł z numerem, tło okna LightSteelBlue, przyciski SteelBlue z białym tekstem (R.3.1, R.3.3).
2. Dwie grupy `QGroupBox` obok siebie, w każdej `QFormLayout` (R.3.1, R.3.2).
3. Lista z czterema stanowiskami (R.3.4), pierwsze pole wyboru zaznaczone (R.3.10).
4. „Zatwierdź” w głównym układzie, na całą szerokość, więc dłuższy niż „Generuj hasło” (R.3.2).
5. Hasło w polu obiektu `self.haslo`, widocznym dla obu metod (R.3.8).
6. Generowanie: same małe litery, a potem podmiana stałych pozycji, jeśli zaznaczono pole (R.3.6, R.3.7).

Treść pozwala ustalić pozycje na sztywno („np. pierwszy znak losowany z cyfr”). Tu:

```tekst Hasło z 5 znaków, przykładowe litery
krok 1: same małe     s q s g z
krok 2: wielka na 0   P q s g z
krok 3: cyfra na 1    P 2 s g z
wynik:  P2sgz
```

Dlaczego `self.haslo`, a nie zwykła zmienna? Zmienna utworzona w `generuj_haslo` znika po wyjściu z metody. Pole obiektu żyje tak długo jak okno, więc `zatwierdz` je widzi.

Sprawdzone: dwa kliknięcia „Generuj hasło” przy 5 znakach dały `P2sgz` i `X8lsl` (różne, po 5 znaków). Ze znakami specjalnymi przy 8 znakach: `N0$tdwti`. „Zatwierdź”: „Dane pracownika: Zofia Kowalska Tester Hasło: N0$tdwti”.

## Składnia do zapamiętania

```python
self.haslo = ""

znaki = []
for i in range(ile_znakow):
    znaki.append(random.choice(male))
if self.pole_cyfry.isChecked():
    znaki[1] = random.choice(cyfry)
self.haslo = "".join(znaki)
QMessageBox.information(self, "Hasło", self.haslo)
```

## Przykład

Zamiast zer wpisz swój numer zdającego.

```python main.py {10,12,13,15,21,31,52,56,60,64,66,72,80}
import random
import sys
from PySide6.QtWidgets import (QApplication, QWidget, QLineEdit, QPushButton, QCheckBox, QComboBox,
                               QGroupBox, QMessageBox, QFormLayout, QVBoxLayout, QHBoxLayout)


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Dodaj pracownika, numer: 00000000000")
        self.setStyleSheet(
            "Okno { background-color: #B0C4DE; }"
            "QPushButton { background-color: #4682B4; color: white; border: 1px solid #333333; padding: 4px; }"
        )
        self.haslo = ""

        grupa_dane = QGroupBox("Dane pracownika")
        self.pole_imie = QLineEdit()
        self.pole_nazwisko = QLineEdit()
        self.lista_stanowisk = QComboBox()
        self.lista_stanowisk.addItems(["Kierownik", "Starszy programista", "Młodszy programista", "Tester"])
        formularz_dane = QFormLayout()
        formularz_dane.addRow("Imię", self.pole_imie)
        formularz_dane.addRow("Nazwisko", self.pole_nazwisko)
        formularz_dane.addRow("Stanowisko", self.lista_stanowisk)
        grupa_dane.setLayout(formularz_dane)

        grupa_haslo = QGroupBox("Generowanie hasła")
        self.pole_ile = QLineEdit()
        self.pole_wielkie = QCheckBox("Małe i wielkie litery")
        self.pole_wielkie.setChecked(True)
        self.pole_cyfry = QCheckBox("Cyfry")
        self.pole_specjalne = QCheckBox("Znaki specjalne")
        przycisk_generuj = QPushButton("Generuj hasło")
        przycisk_generuj.clicked.connect(self.generuj_haslo)
        formularz_haslo = QFormLayout()
        formularz_haslo.addRow("Ile znaków?", self.pole_ile)
        formularz_haslo.addRow(self.pole_wielkie)
        formularz_haslo.addRow(self.pole_cyfry)
        formularz_haslo.addRow(self.pole_specjalne)
        formularz_haslo.addRow(przycisk_generuj)
        grupa_haslo.setLayout(formularz_haslo)

        grupy = QHBoxLayout()
        grupy.addWidget(grupa_dane)
        grupy.addWidget(grupa_haslo)
        przycisk_zatwierdz = QPushButton("Zatwierdź")
        przycisk_zatwierdz.clicked.connect(self.zatwierdz)

        uklad = QVBoxLayout()
        uklad.addLayout(grupy)
        uklad.addWidget(przycisk_zatwierdz)
        self.setLayout(uklad)

    def generuj_haslo(self):
        male = "abcdefghijklmnopqrstuvwxyz"
        wielkie = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        cyfry = "0123456789"
        specjalne = "!@#$%^&*()_+-="
        ile_znakow = int(self.pole_ile.text())

        znaki = []
        for i in range(ile_znakow):
            znaki.append(random.choice(male))
        if self.pole_wielkie.isChecked():
            znaki[0] = random.choice(wielkie)
        if self.pole_cyfry.isChecked():
            znaki[1] = random.choice(cyfry)
        if self.pole_specjalne.isChecked():
            znaki[2] = random.choice(specjalne)

        self.haslo = "".join(znaki)
        QMessageBox.information(self, "Hasło", self.haslo)

    def zatwierdz(self):
        imie = self.pole_imie.text()
        nazwisko = self.pole_nazwisko.text()
        stanowisko = self.lista_stanowisk.currentText()
        QMessageBox.information(self, "Pracownik",
                                f"Dane pracownika: {imie} {nazwisko} {stanowisko} Hasło: {self.haslo}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Tytuł z numerem zdającego (R.3.1).
2. Tło tylko okna (R.3.3).
3. Wszystkie przyciski: tło, biały tekst, obramowanie (R.3.3).
4. Hasło jako pole obiektu, puste na starcie (R.3.8).
5. Cztery stanowiska (R.3.4).
6. Pierwsze pole wyboru zaznaczone na starcie (R.3.10).
7. „Zatwierdź” na całą szerokość okna, dłuższy niż „Generuj hasło” (R.3.2).
8. Zestawy znaków w zmiennych napisowych (R.3.8).
9. Długość hasła z pola. Treść zwalnia ze sprawdzania, czy pole jest wypełnione.
10. Każdy znak losowany z małych liter (R.3.7).
11. Zaznaczone pierwsze pole: wielka litera na pozycji 0.
12. Lista znaków sklejona w napis i zapisana w polu obiektu.
13. Komunikat z danymi i hasłem w nowym okienku (R.3.9).

## Pułapki

- `haslo = ...` bez `self.` w `generuj_haslo`: metoda `zatwierdz` nie zobaczy hasła i R.3.8 przepada (w Pythonie dostaniesz `NameError` albo puste hasło).
- `random.choice(male)` wywołane raz przed pętlą daje hasło z jednej powtórzonej litery. Losuj w każdym obrocie.
- `znaki[2]` przy haśle krótszym niż 3 znaki rzuca `IndexError`. Treść tego nie wymaga, a zasady sprawdzają hasła dłuższe niż 4 znaki.
- Napis w liście zamiast znaków: `"abc"[0] = "X"` nie działa, bo napisów nie da się zmieniać. Dlatego lista i `join` na końcu.
- Komunikat z hasłem ma być w nowym okienku (`QMessageBox`), a nie w etykiecie w oknie (R.3.9).
- R.3.6 sprawdza dwa kolejne hasła i oczekuje, że będą różne. Bez `random.seed(...)` w kodzie tak będzie.

## Powiązane

- [Zadanie: generator haseł](#/karta/konsola/48-zadanie-generator-hasel)
- [Radio, checkbox i lista rozwijana](#/karta/desktop/04-radio-checkbox-i-lista)
- [Obrazy, kolory i czcionka](#/karta/desktop/05-obrazy-kolory-i-czcionka)
- [random: randint, choice, shuffle, sample](#/karta/konsola/20-random)
