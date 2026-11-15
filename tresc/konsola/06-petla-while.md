---
tytul: "Pętla while"
dzial: konsola
tagi: [python, while, break, pętla, walidacja, t/n]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/reference/compound_stmts.html#the-while-statement
  - Zasady oceniania INF.04 2024 cze (R.2.4, R.2.7, R.2.10) i 2023 sty (R.2.2, R.2.3)
arkusze: [2023 sty, 2024 cze]
---

## Po co to jest

`while` powtarza, ==dopóki warunek jest prawdziwy==, gdy nie wiadomo z góry, ile będzie obrotów. Na egzaminie: wczytuj liczbę kostek, aż trafi w <3, 10>, i graj, dopóki gracz odpowiada „t” (2024 cze), NWD przez odejmowanie (2023 sty).

## Jak to działa

1. Sprawdź warunek.
2. Prawdziwy: wykonaj całe wcięte ciało i wróć do kroku 1.
3. Fałszywy: wyjdź i idź do kodu pod pętlą. Gdy warunek jest fałszywy od razu, ciało nie wykona się ani razu.

Ślad wczytywania „do skutku”: `while liczba < 3 or liczba > 10`, kolejno wpisano 2, 11, 3.

| Krok | `liczba` | Warunek | Co dalej |
| --- | --- | --- | --- |
| przed pętlą | 2 | `True` (2 < 3) | ciało: wczytaj znowu |
| obrót 1 | 11 | `True` (11 > 10) | ciało: wczytaj znowu |
| obrót 2 | 3 | `False` | koniec pętli |

Ślad NWD z 2023 sty, `while a != b`, start `a = 12`, `b = 18`:

| Obrót | `a > b`? | Działanie | `a` | `b` |
| --- | --- | --- | --- | --- |
| 1 | nie | `b = b - a` | 12 | 6 |
| 2 | tak | `a = a - b` | 6 | 6 |
| koniec | | `a == b`, wynik 6 | 6 | 6 |

Wyjście w środku obrotu daje `break` (np. `while True:` przy wczytywaniu z `try`). `break` przerywa tylko najbliższą pętlę.

## Składnia do zapamiętania

```python
liczba = int(input("Podaj liczbę (3 - 10): "))
while liczba < 3 or liczba > 10:
    liczba = int(input("Podaj liczbę (3 - 10): "))
odpowiedz = "t"
while odpowiedz == "t":
    print("Gramy")
    odpowiedz = input("Jeszcze raz? (t/n) ")
```

## Przykład

```python gra.py {2,3,6,9}
liczba = int(input("Ile kostek chcesz rzucić? (3 - 10) "))
while liczba < 3 or liczba > 10:
    liczba = int(input("Ile kostek chcesz rzucić? (3 - 10) "))
runda = 1
odpowiedz = "t"
while odpowiedz == "t":
    print(f"Runda {runda}")
    runda += 1
    odpowiedz = input("Jeszcze raz? (t/n) ")
print("Koniec gry.")
```

```wynik
$ python gra.py
Ile kostek chcesz rzucić? (3 - 10) [[2]]
Ile kostek chcesz rzucić? (3 - 10) [[11]]
Ile kostek chcesz rzucić? (3 - 10) [[3]]
Runda 1
Jeszcze raz? (t/n) [[t]]
Runda 2
Jeszcze raz? (t/n) [[n]]
Koniec gry.
```

1. Warunek opisuje ==złą== liczbę: kręcimy się, dopóki jest poza przedziałem.
2. Ponowne wczytanie w ciele. Bez niego warunek nigdy się nie zmieni.
3. `odpowiedz = "t"` przed pętlą sprawia, że pierwsza runda zawsze się wykona.
4. Pytanie na końcu obrotu: „t” daje kolejną rundę, „n” kończy pętlę (R.2.10, 2024 cze).

## Pułapki

- Egzaminator wpisuje 2 i 11 (mają być odrzucone) oraz 3 i 10 (przyjęte) (R.2.7, 2024 cze). `liczba <= 3` w warunku odrzuci poprawną 3.
- Za samą pętlę do liczby kostek albo do pytania t/n jest punkt (R.2.4, 2024 cze), więc nie pomijaj jej nawet przy braku czasu.
- Zapomniane wczytanie albo zmiana zmiennej w ciele to pętla bez końca. Program wisi i nie ma czego wrzucić na zrzut ekranu.
- NWD z 2023 sty to `while a != b` i odejmowanie w środku, jak w śladzie wyżej (R.2.2, R.2.3), nie `%`.

## Powiązane

- [if, elif, else](#/karta/konsola/04-if-elif-else)
- [NWD algorytmem Euklidesa](#/karta/konsola/35-nwd-euklides)
- [Zadanie: gra w kości](#/karta/konsola/46-zadanie-gra-w-kosci)
