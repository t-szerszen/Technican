---
tytul: "Kotlin: kolekcje i losowanie"
dzial: mobilna
tagi: [kotlin, listOf, mutableListOf, arrayOf, size, add, contains, sum, forEach, Random, nextInt, random]
status: do-weryfikacji
zrodla:
  - https://kotlinlang.org/docs/collections-overview.html
  - https://kotlinlang.org/docs/collection-types.html
  - https://kotlinlang.org/docs/arrays.html
  - https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.random/-random/next-int.html
  - https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/random.html
  - Przykład skompilowany kotlinc 2.1.21; granice losowania sprawdzone 1000 losowaniami każdej wersji
  - Arkusze INF.04 2024 cze i 2026 sty, część II
  - Zasady oceniania INF.04 2024 cze (R.3.7), 2026 sty (R.3.8)
arkusze: [2024 cze, 2026 sty]
---

## Po co to jest

Gra w kości trzyma pięć wartości naraz: oczka, dostępność, obrazy. Do tego losowanie od 1 do 6 (R.3.7 w 2024 cze, R.3.8 w 2026 sty). Lista, tablica i `Random` to cały potrzebny zestaw.

## Jak to działa

Trzy rodzaje zbiorów:

| Tworzenie | Co wolno potem |
| --- | --- |
| `listOf(...)` | tylko czytać |
| `mutableListOf(...)` | zmieniać i dodawać (`add`) |
| `arrayOf(...)` | zmieniać, rozmiar stały |

`listOf` daje listę tylko do odczytu. Dobre na stałe dane, np. nazwy plików kości. Gdy wartości się zmieniają, bierz `mutableListOf` albo `arrayOf`.

Wszystkie trzy indeksujesz od 0 przez `[ ]` i znają `size`, `contains`, `sum` (dla liczb) i `forEach`.

Losowanie:

```tekst Granice losowania
Random.nextInt(1, 7)
→ 1 2 3 4 5 6     7 nie wypada

(1..6).random()
→ 1 2 3 4 5 6

listOf(...).random()
→ jeden z elementów listy
```

`nextInt(od, doBez)` ==nie losuje górnej granicy==, tak jak `range` w Pythonie. Dla kości piszesz 7. Sprawdzone 1000 losowaniami: `nextInt(1, 6)` nigdy nie dał szóstki. Wersja z zakresem `(1..6).random()` bierze obie granice, jak `randint` w Pythonie.

`forEach { wartosc -> ... }` wykonuje blok dla każdego elementu. Blok w klamrach to lambda: przed strzałką nazwa elementu, po niej kod.

## Składnia do zapamiętania

```kotlin
import kotlin.random.Random

val nazwy = listOf("kosc0.png", "kosc1.png")
val oczka = mutableListOf<Int>()
oczka.add(Random.nextInt(1, 7))
val dostepne = arrayOf(true, true, true, true, true)
dostepne[0] = false
println(oczka.size)
println(oczka.sum())
```

## Przykład

```kotlin Losowanie.kt {1,4,10,12,17,20,23}
import kotlin.random.Random

fun main() {
    val nazwyObrazow = listOf("kosc0.png", "kosc1.png", "kosc2.png", "kosc3.png",
        "kosc4.png", "kosc5.png", "kosc6.png")
    println(nazwyObrazow[3])
    println(nazwyObrazow.size)
    println(nazwyObrazow.contains("kosc7.png"))

    val oczka = mutableListOf<Int>()
    for (i in 1..5) {
        oczka.add(Random.nextInt(1, 7))
    }
    println("Rzucono kośćmi: ${oczka.size}")

    val wyniki = mutableListOf(4, 4, 1, 4, 2)
    wyniki[2] = 6
    println(wyniki)
    println(wyniki.sum())
    wyniki.forEach { wartosc -> print("$wartosc ") }
    println()

    val dostepne = arrayOf(true, true, true, true, true)
    dostepne[0] = false
    println(dostepne.contentToString())
}
```

```wynik
kosc3.png
7
false
Rzucono kośćmi: 5
[4, 4, 6, 4, 2]
20
4 4 6 4 2
[false, true, true, true, true]
```

1. Import potrzebny do `Random`. Android Studio dopisze go po Alt+Enter.
2. Lista tylko do odczytu: nazwy plików się nie zmieniają.
3. Pusta lista zmienna. Przy pustej trzeba podać typ w `< >`.
4. Rzut jedną kością: od 1 do 6.
5. Zmiana elementu pod indeksem 2 (trzeci element).
6. Lambda: dla każdego elementu wypisz go ze spacją.
7. Tablica pięciu wartości logicznych: która kość jest dostępna.

## Pułapki

- `Random.nextInt(1, 6)` nigdy nie da 6. Kryterium mówi o zakresie od 1 do 6, więc to błąd w logice gry.
- `listOf(...).add(...)` nie skompiluje się (`unresolved reference 'add'`). Jeśli dodajesz, twórz `mutableListOf`.
- `println(tablica)` wypisze adres w pamięci, np. `[Ljava.lang.Boolean;@1b6d3586`. Treść tablicy: `contentToString()`. Lista wypisuje się normalnie.
- `oczka[5]` przy pięciu elementach rzuca `IndexOutOfBoundsException`. Ostatni indeks to `size - 1`.
- `mutableListOf()` bez typu i bez elementów to błąd kompilacji: Kotlin nie wie, co ma w niej być.

## Powiązane

- [Kotlin: pętle i zakresy](#/karta/mobilna/08-kotlin-petle-i-zakresy)
- [Kotlin: null safety i toIntOrNull](#/karta/mobilna/11-kotlin-null-safety)
- [random: randint, choice, shuffle, sample](#/karta/konsola/20-random)
- [Listy i wycinki](#/karta/konsola/08-listy-i-wycinki)
