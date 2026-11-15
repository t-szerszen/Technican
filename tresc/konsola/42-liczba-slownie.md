---
tytul: "Liczba słownie"
dzial: konsola
tagi: [python, słownie, lista, indeks, słownik, Kosc]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/introduction.html#lists
  - https://docs.python.org/3/library/stdtypes.html#dict.get
  - Zasady oceniania INF.04 2026 sty (R.2.7)
arkusze: [2026 sty]
---

## Po co to jest

W 2026 sty klasa `Kosc` miała metodę zwracającą wyrzucone oczka słowem, np. „trzy”. Najprościej: lista nazw, w której ==indeks to cyfra==. Dla wartości spoza 1..6 zasady pozwalały zwrócić cokolwiek (R.2.7).

## Jak to działa

`NAZWY[3]` to czwarty element listy. Jeśli na indeksie 0 stoi `"zero"`, to indeks i cyfra się pokrywają: `NAZWY[3]` daje „trzy”, `NAZWY[6]` daje „sześć”.

Dla liczb 0..99 potrzebne są trzy listy: jedności (0..9), nastki (10..19, bo mają własne nazwy) i dziesiątki (indeks to `liczba // 10`, pola 0 i 1 puste). Kroki:

1. Poniżej 10: nazwa z jedności.
2. Od 10 do 19: `NASTKI[liczba - 10]`.
3. Od 20: dziesiątki z `liczba // 10`, a gdy `liczba % 10` nie jest zerem, dopisz spację i jedności.

| `liczba` | gałąź | `liczba // 10` | `liczba % 10` | wynik |
| --- | --- | --- | --- | --- |
| 7 | jedności | — | — | siedem |
| 14 | nastki, indeks 4 | — | — | czternaście |
| 40 | dziesiątki | 4 | 0 | czterdzieści |
| 73 | dziesiątki | 7 | 3 | siedemdziesiąt trzy |

## Składnia do zapamiętania

```python
NAZWY = ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć"]
oczka = 3
print(NAZWY[oczka])                  # trzy
if 0 <= oczka < len(NAZWY):
    slowo = NAZWY[oczka]
else:
    slowo = "spoza zakresu"
NAZWY_SLOWNIK = {1: "jeden", 2: "dwa", 3: "trzy"}
slowo = NAZWY_SLOWNIK.get(oczka, "nieznana")
```

## Przykład

```python slownie.py {17,18,19,20}
JEDNOSCI = ["zero", "jeden", "dwa", "trzy", "cztery",
            "pięć", "sześć", "siedem", "osiem", "dziewięć"]
NASTKI = ["dziesięć", "jedenaście", "dwanaście", "trzynaście",
          "czternaście", "piętnaście", "szesnaście",
          "siedemnaście", "osiemnaście", "dziewiętnaście"]
DZIESIATKI = ["", "", "dwadzieścia", "trzydzieści", "czterdzieści",
              "pięćdziesiąt", "sześćdziesiąt", "siedemdziesiąt",
              "osiemdziesiąt", "dziewięćdziesiąt"]


def slownie(liczba):
    if liczba < 0 or liczba > 99:
        return "spoza zakresu"
    if liczba < 10:
        return JEDNOSCI[liczba]
    if liczba < 20:
        return NASTKI[liczba - 10]
    tekst = DZIESIATKI[liczba // 10]
    if liczba % 10 > 0:
        tekst = tekst + " " + JEDNOSCI[liczba % 10]
    return tekst


for liczba in [0, 7, 14, 40, 73, 99, 120]:
    print(f"{liczba}: {slownie(liczba)}")
```

```wynik
0: zero
7: siedem
14: czternaście
40: czterdzieści
73: siedemdziesiąt trzy
99: dziewięćdziesiąt dziewięć
120: spoza zakresu
```

1. Nastki zaczynają się od 10, więc indeks to `liczba - 10`.
2. Cyfra dziesiątek jako indeks: 73 // 10 daje 7.
3. Przy pełnych dziesiątkach (40) nie dopisujemy „zero”.
4. Jedności z tej samej listy co dla liczb 0..9.

## Pułapki

- Lista zaczęta od `"jeden"` przesuwa wszystko o jeden: `NAZWY[3]` da „cztery”. Albo `"zero"` na indeksie 0, albo `NAZWY[oczka - 1]`.
- Indeks ujemny nie rzuca błędu: `NAZWY[-1]` to „sześć”. Zakres sprawdź warunkiem przed odczytem.
- Indeks za duży rzuca `IndexError` i program pada. W `Kosc` konstruktor ustawia 0 dla złej wartości, więc lista musi mieć pole 0 (R.2.3, 2026 sty).
- Metoda ma słowo zwracać `return`, nie wypisywać (R.2.7, 2026 sty). Wypisuje program główny razem z wartością liczbową (R.2.9).

## Powiązane

- [Zadanie: klasa Kosc](#/karta/konsola/45-zadanie-klasa-kosc)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [Słowniki](#/karta/konsola/10-slowniki)
- [Dzielenie całkowite i reszta](#/karta/konsola/24-dzielenie-i-reszta)
