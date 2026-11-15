---
tytul: "Metody i metoda tylko dla klasy"
dzial: konsola
tagi: [python, klasa, metoda, self, return, prywatna, private]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/classes.html#method-objects
  - https://docs.python.org/3/tutorial/classes.html#private-variables
  - Zasady oceniania INF.04 2021 cze (R.2.4) i 2025 sty (R.2, R.2.3)
arkusze: [2021 cze, 2025 sty]
---

## Po co to jest

Metody to większość punktów w zadaniu z klasą. W 2025 sty liczył się typ zwracany każdej metody (R.2.3). W 2021 cze metoda szukająca maksimum miała być ==widoczna tylko w klasie== (R.2.4: zasięg prywatny lub protected).

## Jak to działa

Python nie deklaruje typu zwracanego. O „typie” metody decyduje jej `return`. Wymagania z 2025 sty (R.2.3):

| Metoda | Co robi | `return` | Typ wg zasad |
| --- | --- | --- | --- |
| wyświetlająca | tylko `print` | brak (wychodzi `None`) | bez typu, jak `void` |
| wyszukująca | szuka | indeks albo `-1` | całkowity |
| wyświetlająca nieparzyste | `print` i liczy | ich liczba | całkowity |
| licząca średnią | liczy | `suma / rozmiar` | liczbowy |

Metoda prywatna to nazwa z ==dwoma podkreślnikami na początku==, tak samo jak pole prywatne i z tego samego powodu: Python zmienia tę nazwę tylko w kodzie klasy. W metodach klasy `self.__szukaj_max()` działa, a poza klasą `wyniki.__szukaj_max()` kończy się `AttributeError`.

## Składnia do zapamiętania

```python
class Wyniki:
    def __init__(self, punkty):
        self.__punkty = punkty

    def wyswietl(self):              # nic nie zwraca
        print(self.__punkty)

    def __szukaj_max(self):          # widoczna tylko w klasie
        return 0                     # tu pętla, zwraca indeks

    def najwyzszy(self):             # zwraca liczbę
        return self.__punkty[self.__szukaj_max()]
```

## Przykład

```python wyniki.py {6,20,23}
class Wyniki:
    def __init__(self, punkty):
        self.__punkty = punkty
        self.__ile = len(punkty)

    def __szukaj_max(self):
        indeks_max = 0
        for i in range(1, self.__ile):
            if self.__punkty[i] > self.__punkty[indeks_max]:
                indeks_max = i
        return indeks_max

    def wyswietl_nieparzyste(self):
        ile = 0
        for i in range(self.__ile):
            if self.__punkty[i] % 2 != 0:
                print(self.__punkty[i], end=" ")
                ile += 1
        print()
        return ile

    def najwyzszy(self):
        return self.__punkty[self.__szukaj_max()]


wyniki = Wyniki([12, 7, 31, 18])
ile = wyniki.wyswietl_nieparzyste()
print("Nieparzystych:", ile)
print("Najwyższy wynik:", wyniki.najwyzszy())
```

```wynik
7 31
Nieparzystych: 2
Najwyższy wynik: 31
```

1. Metoda prywatna: dwa podkreślniki, `self` jako parametr, zwraca indeks maksimum.
2. Wyświetla i zwraca: wypisuje liczby, a wynik (ich liczbę) oddaje programowi głównemu.
3. Wewnątrz klasy prywatną wołasz zwyczajnie, przez `self.`. Program główny korzysta tylko z metod publicznych.

## Pułapki

- Metoda wyświetlająca z `return` albo licząca bez `return` to zły typ (R.2.3, 2025 sty). `print(obiekt.wyswietl())` wypisze na końcu `None`.
- `__szukaj_max()` bez `self.` w środku klasy to `NameError`. Metodę zawsze wołasz przez `self.`.
- W 2021 cze zasady dopuszczały „prywatny lub protected” (R.2.4). W Pythonie protected to tylko umowne `_szukaj`; pewniejsze jest `__szukaj_max`.
- Zasady 2025 sty i 2026 sty nie liczą `self` do parametrów. „Metoda bezparametrowa” z 2026 sty to `def zablokuj(self)`.

## Powiązane

- [Pola prywatne z `__`](#/karta/konsola/14-pola-prywatne)
- [Ręcznie: min, max, suma, liczenie](#/karta/konsola/25-reczne-min-max-suma)
- [Zadanie: sortowanie w klasie](#/karta/konsola/49-zadanie-sortowanie-w-klasie)
