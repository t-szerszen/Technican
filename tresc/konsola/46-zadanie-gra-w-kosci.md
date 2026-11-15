---
tytul: "Zadanie: gra w kości"
dzial: konsola
tagi: [python, zadanie, funkcje, while, random, lista, count, t/n]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/random.html#random.randint
  - https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
  - Arkusz INF.04 2024 cze, część I
  - Zasady oceniania INF.04 2024 cze (R.1.1-R.1.7, R.2.1-R.2.10)
arkusze: [2024 cze]
---

## Po co to jest

Typ zadania: gra konsolowa w pętli. Gracz podaje liczbę kostek z ograniczonego zakresu, program rzuca nimi, wypisuje oczka, liczy punkty według reguły z treści i pyta, czy grać dalej. Podejście strukturalne: dwie funkcje z parametrami i program główny.

## Jak to działa

Plan rozwiązania:

1. `rzuc_kostkami(liczba_kostek)`: pętla `append(random.randint(1, 6))`, zwraca listę. Liczba kostek przychodzi parametrem, nie ze zmiennej globalnej (R.2.5).
2. `policz_punkty(wyniki)`: dodaje oczka tych wartości, które są w liście co najmniej 2 razy, i ==zwraca int== (R.2.2, R.2.6).
3. Wczytanie liczby kostek w `while` do skutku, aż wpadnie w 3..10 (R.2.4, R.2.7).
4. Pętla gry `while odpowiedz == "t"`: rzut, `Kostka <nr>: <oczka>` w pętli, punkty, pytanie t/n (R.2.3, R.2.8-R.2.10).
5. Po `t` gra wraca do rzutu z tą samą liczbą kostek, nie pyta o nią od nowa.

Reguła punktów: idź po każdej kostce i dodaj jej oczka, jeśli ta sama wartość występuje w liście 2 lub więcej razy. Ślad dla `[1, 5, 2, 2, 5]`:

| Kostka | Oczka | `wyniki.count(oczka)` | Dodane | `punkty` |
| --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 0 | 0 |
| 2 | 5 | 2 | 5 | 5 |
| 3 | 2 | 2 | 2 | 7 |
| 4 | 2 | 2 | 2 | 9 |
| 5 | 5 | 2 | 5 | 14 |

Ślad dla `[2, 1, 2, 3, 2]`:

| Kostka | Oczka | `wyniki.count(oczka)` | Dodane | `punkty` |
| --- | --- | --- | --- | --- |
| 1 | 2 | 3 | 2 | 2 |
| 2 | 1 | 1 | 0 | 2 |
| 3 | 2 | 3 | 2 | 4 |
| 4 | 3 | 1 | 0 | 4 |
| 5 | 2 | 3 | 2 | 6 |

Wychodzi 14 i 6, tak jak w przykładach z treści.

## Składnia do zapamiętania

```python
liczba_kostek = 0
while liczba_kostek < 3 or liczba_kostek > 10:
    liczba_kostek = int(input("Ile kostek chcesz rzucić? (3 - 10) "))

odpowiedz = "t"
while odpowiedz == "t":
    wyniki = rzuc_kostkami(liczba_kostek)
    print(f"Liczba uzyskanych punktów: {policz_punkty(wyniki)}")
    odpowiedz = ""
    while odpowiedz != "t" and odpowiedz != "n":
        odpowiedz = input("Jeszcze raz? (t/n) ")
```

## Przykład

`random.seed(9038)` jest tylko po to, żeby wynik na karcie był zawsze ten sam (pierwszy rzut daje oczka z przykładu w treści). Na egzaminie go nie pisz.

```python kosci.py {4,14,16,21,28,31}
import random


def rzuc_kostkami(liczba_kostek):
    wyniki = []
    for i in range(liczba_kostek):
        wyniki.append(random.randint(1, 6))
    return wyniki


def policz_punkty(wyniki):
    punkty = 0
    for oczka in wyniki:
        if wyniki.count(oczka) >= 2:
            punkty += oczka
    return punkty


random.seed(9038)  # tylko na potrzeby karty
liczba_kostek = 0
while liczba_kostek < 3 or liczba_kostek > 10:
    liczba_kostek = int(input("Ile kostek chcesz rzucić? (3 - 10) "))

odpowiedz = "t"
while odpowiedz == "t":
    wyniki = rzuc_kostkami(liczba_kostek)
    for i in range(liczba_kostek):
        print(f"Kostka {i + 1}: {wyniki[i]}")
    print(f"Liczba uzyskanych punktów: {policz_punkty(wyniki)}")
    odpowiedz = ""
    while odpowiedz != "t" and odpowiedz != "n":
        odpowiedz = input("Jeszcze raz? (t/n) ")
```

```wynik
$ python kosci.py
Ile kostek chcesz rzucić? (3 - 10) [[2]]
Ile kostek chcesz rzucić? (3 - 10) [[11]]
Ile kostek chcesz rzucić? (3 - 10) [[5]]
Kostka 1: 1
Kostka 2: 5
Kostka 3: 2
Kostka 4: 2
Kostka 5: 5
Liczba uzyskanych punktów: 14
Jeszcze raz? (t/n) [[t]]
Kostka 1: 1
Kostka 2: 1
Kostka 3: 2
Kostka 4: 4
Kostka 5: 1
Liczba uzyskanych punktów: 3
Jeszcze raz? (t/n) [[n]]
```

1. Liczba kostek jest parametrem, więc funkcja nie sięga do zmiennych globalnych.
2. `count()` mówi, ile razy dana wartość jest w liście. Dwa lub więcej to punkty.
3. Funkcja zwraca sumę, a wypisuje ją program główny.
4. Warunek „poza zakresem” to `< 3 or > 10`. Pętla pyta, dopóki jest prawdziwy.
5. Numer kostki to `i + 1`, bo indeksy liczą się od 0.
6. Pytanie się powtarza przy literze innej niż `t` i `n`. Po `n` obie pętle się kończą.

## Pułapki

- Egzaminator sprawdza granice: 2 i 11 mają być odrzucone, 3 i 10 przyjęte (R.2.7). Warunek `<= 3` albo `and` zamiast `or` psuje któryś koniec. Zrób zrzut dla każdej z tych prób.
- Funkcja czytająca `liczba_kostek` z programu głównego bez parametru używa zmiennej globalnej i traci R.2.5.
- `policz_punkty` musi mieć `return`. Samo `print` w środku nie daje R.2.2.
- Dodawanie samej wartości raz (2 + 5 = 7 zamiast 14) to błąd reguły. Dodaje się oczka z każdej kostki w parze (R.2.6).
- `input()` zwraca napis: bez `int()` porównanie `"5" < 3` rzuca `TypeError` (R.1.5).
- Zamiast `count()` można liczyć w liście `ile = [0] * 7`, gdzie `ile[oczka] += 1`. Oba sposoby są w porządku.
- Nazwa `tab` dla listy wyników nie spełnia R.1.4 w tym arkuszu. Pisz `wyniki`, `oczka`.
- Nie zapomnij komentarza-nagłówka do wybranej funkcji według wzoru z części III.

## Powiązane

- [Pętla while](#/karta/konsola/06-petla-while)
- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
- [random: randint, choice, shuffle, sample](#/karta/konsola/20-random)
- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
