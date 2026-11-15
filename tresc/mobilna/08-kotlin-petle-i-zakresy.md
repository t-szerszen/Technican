---
tytul: "Kotlin: pętle i zakresy"
dzial: mobilna
tagi: [kotlin, for, while, zakres, "..", until, downTo, step, indices, suma]
status: do-weryfikacji
zrodla:
  - https://kotlinlang.org/docs/control-flow.html
  - https://kotlinlang.org/docs/ranges.html
  - https://kotlinlang.org/docs/collection-traversal.html
  - Przykład skompilowany kotlinc 2.1.21 (z Android Studio)
  - Arkusze INF.04 2024 cze i 2026 sty, część II (pięć kości, suma oczek)
  - Zasady oceniania INF.04 2024 cze (R.3.7, R.3.8), 2026 sty (R.3.8, R.3.9)
arkusze: [2024 cze, 2026 sty]
---

## Po co to jest

W grach w kości z 2024 cze i 2026 sty przycisk robi to samo dla ==pięciu kości==: losuje, ustawia obraz, dodaje do sumy. Bez pętli to pięć prawie identycznych bloków kodu. Pętla `for` po zakresie albo po liście robi to w trzech liniach.

## Jak to działa

`for` w Kotlinie zawsze idzie ==po czymś==: po zakresie liczb albo po elementach listy. Nie ma wersji z licznikiem jak w C++ (`i = 0; i < n; i++`).

Zakresy:

| Zapis | Daje |
| --- | --- |
| `1..5` | 1, 2, 3, 4, 5 (koniec włącznie) |
| `0 until 5` | 0, 1, 2, 3, 4 (koniec bez) |
| `10 downTo 1` | 10, 9, ... 1 |
| `10 downTo 1 step 3` | 10, 7, 4, 1 |
| `lista.indices` | 0 .. `size - 1`, indeksy listy |

`0 until 5` to dokładnie `range(5)` z Pythona. `1..5` nie ma odpowiednika jednym słowem: w Pythonie to `range(1, 6)`.

Ślad sumowania dla oczek `[4, 4, 1, 4, 2]`:

| Obrót | `wartosc` | `suma` po dodaniu |
| --- | --- | --- |
| 1 | 4 | 4 |
| 2 | 4 | 8 |
| 3 | 1 | 9 |
| 4 | 4 | 13 |
| 5 | 2 | 15 |

`while` działa jak w Pythonie: powtarza, dopóki warunek jest prawdziwy. `licznik++` i `licznik--` zwiększają i zmniejszają o 1, `suma += x` dodaje.

## Składnia do zapamiętania

```kotlin
for (i in 1..5) { }
for (i in 0 until 5) { }
for (i in 10 downTo 1 step 3) { }
for (wartosc in oczka) { }
for (i in oczka.indices) { }
while (licznik > 0) {
    licznik--
}
```

## Przykład

```kotlin Petle.kt {2,4,6,11,16,21}
fun main() {
    for (i in 1..5) print("$i ")
    println()
    for (i in 0 until 5) print("$i ")
    println()
    for (i in 10 downTo 1 step 3) print("$i ")
    println()

    val oczka = listOf(4, 4, 1, 4, 2)
    var suma = 0
    for (wartosc in oczka) {
        suma += wartosc
    }
    println("Suma: $suma")

    for (i in oczka.indices) {
        println("Kość ${i + 1}: ${oczka[i]}")
    }

    var licznik = 3
    while (licznik > 0) {
        print("$licznik ")
        licznik--
    }
    println("start")
}
```

```wynik
1 2 3 4 5
0 1 2 3 4
10 7 4 1
Suma: 15
Kość 1: 4
Kość 2: 4
Kość 3: 1
Kość 4: 4
Kość 5: 2
3 2 1 start
```

1. `..` bierze oba końce.
2. `until` pomija koniec: idealne do indeksów od 0.
3. W dół co 3. Ostatnia liczba to 1, bo następna byłaby -2.
4. Pętla po elementach, gdy indeks jest niepotrzebny. Suma oczek z 2026 sty (4 + 4 + 1 + 4 + 2 = 15).
5. Pętla po indeksach, gdy potrzebujesz numeru albo drugiej listy z tym samym indeksem (np. kości i ich obrazów).
6. `while` sprawdza warunek przed każdym obrotem.

## Pułapki

- `for (i in 0..oczka.size)` wychodzi o jeden za daleko i rzuca `IndexOutOfBoundsException`. Do indeksów: `until` albo `indices`.
- `for (i in 10..1)` nie wykona się ani razu. W dół zawsze `downTo`.
- Zmiennej pętli `for` nie zmienisz w środku (zachowuje się jak `val`). Gdy musisz sterować licznikiem, użyj `while`.
- Suma liczona w pętli musi startować od 0 ==przed== pętlą. `var suma = 0` w środku pętli zeruje ją w każdym obrocie.

## Powiązane

- [Kotlin: kolekcje i losowanie](#/karta/mobilna/10-kotlin-kolekcje-i-losowanie)
- [Kotlin: funkcje](#/karta/mobilna/09-kotlin-funkcje)
- [Pętla for i range()](#/karta/konsola/05-petla-for-i-range)
- [Pętla while](#/karta/konsola/06-petla-while)
