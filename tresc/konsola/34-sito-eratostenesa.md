---
tytul: "Sito Eratostenesa"
dzial: konsola
tagi: [python, sito, liczby pierwsze, lista logiczna, funkcja bez return]
status: do-weryfikacji
zrodla:
  - https://docs.python.org/3.12/library/math.html#math.sqrt
  - https://docs.python.org/3.12/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference
  - Zasady oceniania INF.04 2023 cze (R.1.4, R.1.7, R.2.2-R.2.5)
arkusze: [2023 cze]
---

## Po co to jest

W 2023 cze trzeba było przepisać pseudokod sita na program dla n = 100. Oceniano w kodzie: funkcję z tablicą jako argumentem ==bez return==, pętlę zewnętrzną 2..10 i wewnętrzną wykreślającą wielokrotności. Na ekranie mają być tylko liczby pierwsze od 2 do 97.

## Jak to działa

Lista `A` ma indeksy 0..n i na starcie same `True`. `A[k]` znaczy „k jeszcze nie wykreślone”. Indeksy 0 i 1 pomijamy. Dla każdego `i` od 2 do √n, jeśli `A[i]` jest `True`, ustawiamy `False` na `2*i, 3*i, ...` aż do n.

Ślad dla n = 20. `int(math.sqrt(20))` to 4, więc `i` = 2, 3, 4:

| `i` | `A[i]` | `j` ustawione na `False` | zostają `True` |
| --- | --- | --- | --- |
| start | — | — | 2..20, wszystkie |
| 2 | `True` | 4 6 8 10 12 14 16 18 20 | 2 3 5 7 9 11 13 15 17 19 |
| 3 | `True` | 6 9 12 15 18 | 2 3 5 7 11 13 17 19 |
| 4 | `False` | nic, pomijamy | 2 3 5 7 11 13 17 19 |

Wynik: 8 liczb pierwszych. Do pierwiastka wystarczy, bo każda liczba złożona ≤ n ma dzielnik ≤ √n, więc została już wykreślona.

Funkcja niczego nie zwraca, a zmiany widać w programie głównym. `A` w funkcji i `A` w programie to ==dwie nazwy tej samej listy==, a `A[j] = False` zmienia tę listę w miejscu.

## Składnia do zapamiętania

```python
import math

def wypelnij_sito(A):                  # bez return
    n = len(A) - 1
    for i in range(2, int(math.sqrt(n)) + 1):
        if A[i]:
            for j in range(2 * i, n + 1, i):
                A[j] = False

A = [True] * (n + 1)                   # indeksy 0..n
wypelnij_sito(A)
```

## Przykład

```python sito.py {3,5,7,11,12}
import math

def wypelnij_sito(A):
    n = len(A) - 1
    for i in range(2, int(math.sqrt(n)) + 1):
        if A[i]:
            for j in range(2 * i, n + 1, i):
                A[j] = False

n = 100
A = [True] * (n + 1)
wypelnij_sito(A)
print(f"Liczby pierwsze z przedziału 2..{n}:")
for i in range(2, n + 1):
    if A[i]:
        print(i, end=" ")
print()
```

```wynik
Liczby pierwsze z przedziału 2..100:
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
```

1. Jeden argument, lista, i brak `return` (R.2.2).
2. Dla n = 100: `int(10.0) + 1` to 11, więc `i` idzie od 2 do 10 (R.2.3).
3. Start `2 * i`, krok `i`, stop `n + 1`, żeby n też mogło być wykreślone (R.2.4).
4. `n + 1` elementów, bo indeksy idą od 0 do n.
5. Wynik wywołania nie jest przypisywany. Lista `A` jest już zmieniona.

## Pułapki

- `return A` albo `A = wypelnij_sito(A)` łamie wymóg „nie zwraca żadnej wartości” (R.2.2, 2023 cze).
- `A = [False] * 101` wewnątrz funkcji tworzy nową, lokalną listę i lista z programu głównego zostaje bez zmian. Zmieniaj elementy `A[j]`.
- `range(2 * i, n, i)` bez `+ 1` nie wykreśli 100 i program wypisze 100 jako pierwszą (R.2.5).
- `range(2, int(math.sqrt(n)))` daje `i` tylko do 9. Dla n = 100 wynik wyjdzie dobry, ale R.2.3 sprawdza w kodzie pętlę od 2 do 10.
- `[True] * n` zamiast `n + 1`: pętla wypisująca dochodzi do `A[100]` i kończy się `IndexError: list index out of range`.
- Nazwa `A` jest dopuszczona, bo jest w pseudokodzie (R.1.4). Liczby rozdziel separatorem i poprzedź komunikatem (R.1.7).

## Powiązane

- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
- [Komentarz-nagłówek funkcji](#/karta/dokumentacja/01-komentarz-naglowek)
