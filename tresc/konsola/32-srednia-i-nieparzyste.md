---
tytul: "Średnia i liczby nieparzyste"
dzial: konsola
tagi: [python, średnia, nieparzyste, modulo, licznik, ZeroDivisionError]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/functions.html#len
  - https://docs.python.org/3/library/functions.html#sum
  - https://docs.python.org/3/library/exceptions.html#ZeroDivisionError
  - Zasady oceniania INF.04 2025 sty (R.2.3, R.2.4, R.2.9, R.2.10)
arkusze: [2025 sty]
---

## Po co to jest

W 2025 sty klasa z tablicą miała dwie metody liczące: jedna wyświetla liczby nieparzyste i ==zwraca, ile ich było==, druga liczy średnią i ją zwraca. Obie to jedna pętla po elementach z licznikiem albo sumą.

## Jak to działa

Liczba jest nieparzysta, gdy reszta z dzielenia przez 2 nie jest zerem: `liczba % 2 != 0`. Średnia to suma podzielona przez liczbę elementów. Operator `/` w Pythonie ==zawsze daje float==, nawet `10 / 5` to `2.0`.

Ślad dla `liczby = [7, 4, 9, 12, 5]`, na starcie `licznik = 0`, `suma = 0`:

| `i` | `liczby[i]` | `% 2` | nieparzysta? | `licznik` | `suma` |
| --- | --- | --- | --- | --- | --- |
| 0 | 7 | 1 | tak, wypisz 7 | 1 | 7 |
| 1 | 4 | 0 | nie | 1 | 11 |
| 2 | 9 | 1 | tak, wypisz 9 | 2 | 20 |
| 3 | 12 | 0 | nie | 2 | 32 |
| 4 | 5 | 1 | tak, wypisz 5 | 3 | 37 |

Po pętli funkcja zwraca `licznik`, czyli 3. Średnia to `37 / 5 = 7.4`. Pusta lista ma `len(liczby)` równe 0, a dzielenie przez zero kończy program błędem `ZeroDivisionError: division by zero`. Dlatego przed dzieleniem sprawdź, czy lista ma elementy.

## Składnia do zapamiętania

```python
suma = 0
licznik = 0
for i in range(len(liczby)):
    suma += liczby[i]
    if liczby[i] % 2 != 0:        # nieparzysta
        licznik += 1
srednia = suma / len(liczby)      # zawsze float
srednia = sum(liczby) / len(liczby)
print(f"Średnia: {srednia:.2f}")
```

## Przykład

```python srednia.py {4,8,11,16}
def wyswietl_nieparzyste(liczby):
    licznik = 0
    for i in range(len(liczby)):
        if liczby[i] % 2 != 0:
            print(liczby[i], end=" ")
            licznik += 1
    print()
    return licznik

def policz_srednia(liczby):
    if len(liczby) == 0:
        return 0.0
    suma = 0
    for i in range(len(liczby)):
        suma += liczby[i]
    return suma / len(liczby)

liczby = [7, 4, 9, 12, 5]
print("Liczby nieparzyste:", end=" ")
ile = wyswietl_nieparzyste(liczby)
print(f"Liczba nieparzystych: {ile}")
print(f"Średnia: {policz_srednia(liczby):.2f}")
print(f"Średnia pustej listy: {policz_srednia([])}")
```

```wynik
Liczby nieparzyste: 7 9 5
Liczba nieparzystych: 3
Średnia: 7.40
Średnia pustej listy: 0.0
```

1. Reszta różna od zera to liczba nieparzysta. Wypisujemy ją i zwiększamy licznik.
2. Funkcja wyświetla, ale też ==zwraca liczbę nieparzystych== (int). Program główny wypisuje ją z opisem.
3. Pusta lista: zwracamy 0.0, zanim dojdzie do dzielenia przez zero.
4. `suma / len(liczby)`: dokładnie wzór „suma / rozmiar”.

## Pułapki

- Metoda od nieparzystych ma być typu całkowitego (R.2.3, 2025 sty). Same `print()` bez `return licznik` to brak zwracanej wartości. Program ma też wypisać tę liczbę z komentarzem (R.2.9).
- Średnia to `suma / rozmiar` (R.2.10, 2025 sty). `//` obcina część ułamkową: `37 // 5` daje 7, a nie 7.4.
- W klasie z 2025 sty pętla ma iść do pola z liczbą elementów: `range(self.__liczba_elementow)`, a nie `range(25)` (R.2.4).
- `return` wcięty pod `for` kończy funkcję po pierwszym obrocie. `return` stoi na poziomie `for`, nie w środku.
- Ujemne: w Pythonie `-3 % 2` to 1, ale w C++, C# i Javie wychodzi -1. Warunek `!= 0` działa wszędzie, `== 1` nie.

## Powiązane

- [//, % i divmod](#/karta/konsola/24-dzielenie-i-reszta)
- [Ręcznie: min, max, suma, liczenie](#/karta/konsola/25-reczne-min-max-suma)
- [Zadanie: klasa z tablicą](#/karta/konsola/44-zadanie-klasa-z-tablica)
