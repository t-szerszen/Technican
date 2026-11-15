---
tytul: "Zadanie: generator haseł"
dzial: konsola
tagi: [python, zadanie, funkcje, random, napisy, wycinki, hasło]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3/library/random.html#random.choice
  - https://docs.python.org/3/library/random.html#random.randint
  - https://docs.python.org/3/library/random.html#random.shuffle
  - https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
  - Arkusz INF.04 2026 cze, część I
  - Zasady oceniania INF.04 2026 cze (R.1.1-R.1.7, R.2.1-R.2.7)
arkusze: [2026 cze]
---

## Po co to jest

Typ zadania: funkcja składa hasło z określonej liczby znaków z kilku zestawów (małe, wielkie, polskie litery, cyfry, znaki specjalne), każdy znak ląduje w losowym miejscu, a program wypisuje kilka takich haseł. Gotowej funkcji, która generuje całe hasło, użyć nie wolno.

## Jak to działa

Plan rozwiązania:

1. Zestawy znaków jako napisy w kodzie. Polskie litery i znaki specjalne dokładnie takie jak w treści, najlepiej skopiowane z pliku `znaki.txt` (R.2.2).
2. Lista par `(zestaw, ile)`: 3 + 3 + 2 + 2 + 2 = 12 znaków (R.2.3).
3. Każdy znak wybiera `random.choice(zestaw)`, a `wstaw_losowo()` wkłada go w ==losowe miejsce== w haśle (R.2.4).
4. Hasło to cały czas napis (`str`), a funkcja go zwraca (R.2.1, R.2.5).
5. Program główny w pętli 5 razy wywołuje funkcję i wypisuje hasło z opisem (R.2.7).

Wstawianie w losowe miejsce: `random.randint(0, len(haslo))` daje numer szczeliny. Przy długości 3 są 4 szczeliny: przed pierwszym znakiem, między znakami i za ostatnim. Napis `haslo[:pozycja] + znak + haslo[pozycja:]` rozcina hasło w szczelinie i wkłada znak.

| Krok | Znak | `len(haslo)` | Wylosowana pozycja | `haslo` po kroku |
| --- | --- | --- | --- | --- |
| 1 | `k` | 0 | 0 | `k` |
| 2 | `R` | 1 | 0 | `Rk` |
| 3 | `7` | 2 | 1 | `R7k` |
| 4 | `#` | 3 | 3 | `R7k#` |
| 5 | `ż` | 4 | 2 | `R7żk#` |

Znaki są dobierane po kolei zestawami, ale pozycje są losowe, więc w gotowym haśle nie widać kolejności zestawów.

Druga, też poprawna droga: zbierz 12 znaków w liście, wymieszaj ją `random.shuffle(znaki)` i złącz przez `"".join(znaki)`. Wynik to napis.

## Składnia do zapamiętania

```python
def wstaw_losowo(haslo, znak):
    pozycja = random.randint(0, len(haslo))
    return haslo[:pozycja] + znak + haslo[pozycja:]


def generuj_haslo():
    haslo = ""
    for zestaw, ile in [("abc", 3), ("!@#", 2)]:
        for i in range(ile):
            haslo = wstaw_losowo(haslo, random.choice(zestaw))
    return haslo
```

## Przykład

`random.seed(12)` jest tylko po to, żeby wynik na karcie był zawsze ten sam. Na egzaminie go nie pisz.

```python hasla.py {6,12,16,19,20}
import random


def wstaw_losowo(haslo, znak):
    pozycja = random.randint(0, len(haslo))
    return haslo[:pozycja] + znak + haslo[pozycja:]


def generuj_haslo():
    male = "abcdefghijklmnopqrstuvwxyz"
    wielkie = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    polskie = "ąęłńóśżźĄĘŁŃÓŚŻŹ"
    cyfry = "0123456789"
    specjalne = "!@#$%^&*()_+"
    haslo = ""
    zestawy = [(male, 3), (wielkie, 3), (polskie, 2), (cyfry, 2), (specjalne, 2)]
    for zestaw, ile in zestawy:
        for i in range(ile):
            haslo = wstaw_losowo(haslo, random.choice(zestaw))
    return haslo


random.seed(12)  # tylko na potrzeby karty
print("Wygenerowane hasła:")
for i in range(5):
    print(f"Hasło {i + 1}: {generuj_haslo()}")
```

```wynik
$ python hasla.py
Wygenerowane hasła:
Hasło 1: $pe)ąPU27źAv
Hasło 2: +HA(zŚcvńV25
Hasło 3: qrmł@_N45MąP
Hasło 4: Ś#9N(ą6hZlAq
Hasło 5: LLŁ#7w(iQ2bŻ
```

1. Wycinki rozcinają napis w miejscu `pozycja`, a znak trafia w środek.
2. Zestaw polskich liter dokładnie z treści zadania.
3. Ile znaków z którego zestawu: od razu widać 3 + 3 + 2 + 2 + 2.
4. Losowy znak z zestawu, wstawiony w losowe miejsce.
5. Funkcja zwraca gotowy napis, wypisuje go program główny.

## Pułapki

- Doklejanie znaków zawsze na koniec (`haslo += znak`) daje stały układ: najpierw małe, potem wielkie i tak dalej. Brak losowych miejsc kosztuje R.2.4.
- Napisy w Pythonie są niezmienne: `haslo[3] = "x"` rzuca `TypeError`. Dlatego wstawianie robi się przez sklejenie wycinków albo na liście.
- `randint(0, len(haslo) - 1)` nigdy nie wstawi znaku na sam koniec. Górna granica to `len(haslo)`.
- `random.choices(zestaw, k=3)` losuje z powtórzeniami, a `random.sample` bez nich. Pojedyncze `choice` w pętli jest najprostsze i zgodne z treścią.
- Funkcja ma zwracać napis, a nie listę znaków. Po `shuffle` nie zapomnij `"".join()` (R.2.1, R.2.5).
- Sprawdź na wyniku: każde hasło ma 12 znaków, w tym 2 polskie i 2 specjalne.
- Nie zapomnij jednego komentarza-nagłówka do dowolnej funkcji według wzoru z części III.

## Powiązane

- [random: randint, choice, shuffle, sample](#/karta/konsola/20-random)
- [join, split, strip, isdigit, count, in](#/karta/konsola/23-metody-napisow)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
