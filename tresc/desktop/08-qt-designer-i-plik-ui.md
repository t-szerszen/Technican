---
tytul: "Qt Designer: plik .ui, pyside6-uic i QUiLoader"
dzial: desktop
tagi: [pyside6, qt designer, ui, pyside6-uic, QUiLoader, setupUi, objectName, Ui_]
status: do-weryfikacji
zrodla:
  - https://doc.qt.io/qtforpython-6/tutorials/basictutorial/uifiles.html
  - https://doc.qt.io/qtcreator/creator-python-development.html
  - Plik form.ui skompilowany pyside6-uic z PySide6 6.12 i wczytany QUiLoader; obie wersje uruchomione, kliknięcie zasymulowane QTest
arkusze: [2023 sty, 2023 cze, 2024 sty, 2025 cze]
---

## Po co to jest

Okno można narysować myszą w Qt Designerze (w Qt Creator: dwuklik na pliku `.ui`) zamiast pisać układy w kodzie. Arkusze tego nie wymagają, a zasady oceniania patrzą na kod, więc podstawą jest okno pisane ręcznie. Ta karta jest na wypadek, gdy projekt z kreatora ma już plik `.ui`: musisz wiedzieć, jak z niego dostać kontrolki w Pythonie.

## Jak to działa

Plik `.ui` to XML z opisem okna. Każda kontrolka ma w nim nazwę (`objectName`, w Designerze w panelu Property Editor). Po tej nazwie odwołujesz się do niej w kodzie.

Dwie drogi z pliku `.ui` do okna:

```tekst Od .ui do okna
A) pyside6-uic form.ui -o ui_form.py
   → klasa Ui_Okno, metoda setupUi(okno)
   → kontrolki: self.ui.przycisk_powitaj

B) QUiLoader().load(plik_ui)
   → gotowe okno w czasie działania
   → kontrolki: okno.przycisk_powitaj
```

- Droga A tworzy zwykły plik Pythona. Dokumentacja Qt nazywa ją standardową. Po każdej zmianie w Designerze trzeba ==ponownie uruchomić `pyside6-uic`==.
- Droga B czyta `.ui` przy starcie programu, bez kompilacji.

Nazwa klasy w wygenerowanym pliku to `Ui_` i nazwa okna z `.ui` (tu `Okno`, więc `Ui_Okno`).

## Składnia do zapamiętania

```python
from ui_form import Ui_Okno

self.ui = Ui_Okno()
self.ui.setupUi(self)
self.ui.przycisk_powitaj.clicked.connect(self.powitaj)

plik = QFile(os.path.join(KATALOG, "form.ui"))
plik.open(QFile.OpenModeFlag.ReadOnly)
okno = QUiLoader().load(plik)
plik.close()
```

## Przykład

Plik `form.ui` z polem `pole_imie`, przyciskiem `przycisk_powitaj` i etykietą `napis`, skompilowany poleceniem `pyside6-uic form.ui -o ui_form.py` w terminalu Qt Creatora.

```python main.py {3,9,10,11,14}
import sys
from PySide6.QtWidgets import QApplication, QWidget
from ui_form import Ui_Okno


class Okno(QWidget):
    def __init__(self):
        super().__init__()
        self.ui = Ui_Okno()
        self.ui.setupUi(self)
        self.ui.przycisk_powitaj.clicked.connect(self.powitaj)

    def powitaj(self):
        self.ui.napis.setText("Witaj " + self.ui.pole_imie.text())


if __name__ == "__main__":
    app = QApplication(sys.argv)
    okno = Okno()
    okno.show()
    sys.exit(app.exec())
```

1. Import klasy wygenerowanej przez `pyside6-uic`.
2. Obiekt z opisem wyglądu.
3. `setupUi` tworzy wszystkie kontrolki z `.ui` w tym oknie.
4. Kontrolki są polami `self.ui`, pod nazwami z Designera.
5. Odczyt i zapis jak w oknie pisanym ręcznie. Sprawdzone: po wpisaniu „Ola” i kliknięciu napis „Witaj Ola”.

## Pułapki

- Edytowanie `ui_form.py` ręcznie nie ma sensu: plik zaczyna się ostrzeżeniem, że zmiany przepadną przy ponownej kompilacji. Logikę pisz w `main.py`.
- Kontrolki z domyślnymi nazwami (`pushButton`, `lineEdit_2`) łamią wymóg z treści arkusza: „należy stosować znaczące nazwy zmiennych”. Zmień `objectName` w Designerze.
- Zmiana w `.ui` bez ponownego `pyside6-uic` (droga A): w programie dalej stary wygląd.
- Do archiwum dołącz `.ui`, wygenerowany `.py` i `main.py`. Arkusze kazały kopiować obok archiwum ==pliki interfejsu i logiki==.

## Powiązane

- [Szkielet aplikacji PySide6 i projekt w Qt Creator](#/karta/desktop/01-szkielet-i-qt-creator)
- [Układy: pionowy, poziomy, siatka, formularz](#/karta/desktop/02-uklady)
- [Foldery i pakowanie](#/karta/dokumentacja/04-foldery-i-pakowanie)
