---
tytul: "Liczba słownie"
dzial: konsola
tagi: [python, słownie, lista, indeks, Kosc]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/tutorial/introduction.html#lists
  - Zasady oceniania INF.04 2026 sty (R.2.3, R.2.7, R.2.9)
arkusze: [2026 sty]
---

## Po co to jest

W 2026 sty klasa `Kosc` miała metodę zwracającą wyrzucone oczka słowem, np. „trzy”. Najprościej: lista nazw, w której ==indeks to liczba oczek==. Dla wartości spoza 1..6 zasady pozwalały zwrócić cokolwiek (R.2.7).

## Jak to działa

Lista liczy indeksy od 0. Jeśli na indeksie 0 stoi `"zero"`, to indeks i liczba się pokrywają: `NAZWY[3]` daje „trzy”, `NAZWY[6]` daje „sześć”. Pole 0 jest potrzebne, bo w `Kosc` konstruktor ustawia 0 dla złej wartości (R.2.3).

Odczyt sprawdzony warunkiem `0 <= oczka < len(NAZWY)`, czyli 0..6:

| `oczka` | warunek | wynik | bez warunku |
| --- | --- | --- | --- |
| 0 | prawda | zero | zero |
| 3 | prawda | trzy | trzy |
| 6 | prawda | sześć | sześć |
| 7 | fałsz | spoza zakresu | `IndexError`, program pada |
| -1 | fałsz | spoza zakresu | sześć, po cichu źle |

## Składnia do zapamiętania

```python
NAZWY = ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć"]
oczka = 3
if 0 <= oczka < len(NAZWY):
    slowo = NAZWY[oczka]
else:
    slowo = "spoza zakresu"
print(slowo)
```

## Przykład

```python slownie.py {1,5,6}
NAZWY = ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć"]


def slownie(oczka):
    if 0 <= oczka < len(NAZWY):
        return NAZWY[oczka]
    return "spoza zakresu"


for oczka in [0, 3, 6, 7, -1]:
    print(f"{oczka}: {slownie(oczka)}")
```

```wynik
0: zero
3: trzy
6: sześć
7: spoza zakresu
-1: spoza zakresu
```

1. Pole 0 zajęte przez „zero”, więc indeks równa się liczbie oczek.
2. Warunek łapie i za duże, i ujemne indeksy.
3. `return` słowa, bez `print` w środku: wypisuje program główny.

## Pułapki

- Lista zaczęta od `"jeden"` przesuwa wszystko o jeden: `NAZWY[3]` da „cztery”. Albo `"zero"` na indeksie 0, albo `NAZWY[oczka - 1]`.
- Metoda ma słowo zwracać, nie wypisywać (R.2.7, 2026 sty). Program główny pokazuje oczka liczbą i słownie (R.2.9).

## Powiązane

- [Zadanie: klasa Kosc](#/karta/konsola/45-zadanie-klasa-kosc)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
