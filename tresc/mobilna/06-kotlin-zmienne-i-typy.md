---
tytul: "Kotlin: val, var, typy i szablony napisów"
dzial: mobilna
tagi: [kotlin, val, var, Int, String, Double, Boolean, toInt, toString, szablon napisu, komentarze]
status: do-weryfikacji
zrodla:
  - https://kotlinlang.org/docs/basic-syntax.html
  - https://kotlinlang.org/docs/basic-types.html
  - https://kotlinlang.org/docs/strings.html
  - https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.text/to-int.html
  - Przykłady skompilowane kotlinc 2.1.21 (z Android Studio)
  - Zasady oceniania INF.04 2022 cze (R.3.7), 2024 cze i 2026 sty (dopuszczenie Kotlina w Android Studio)
arkusze: [2022 cze, 2024 cze, 2026 sty]
---

## Po co to jest

Zasady oceniania z 2024 cze i 2026 sty piszą wprost: „Dla Android Studio dopuszcza się także rozwiązanie w języku Kotlin”. Licznik polubień z 2022 cze wymagał ==zmiennej liczbowej całkowitej równej 0 na starcie== (R.3.7). To pierwsza rzecz do opanowania: jak w Kotlinie powstaje zmienna i jakiego jest typu.

## Jak to działa

Dwa słowa tworzą zmienną:

- `val`: wartość raz ustawiona zostaje na zawsze. Używaj domyślnie.
- `var`: wartość możesz zmieniać. Liczniki, sumy, stan gry.

Typ Kotlin ==ustala sam z pierwszej wartości== i potem go pilnuje. `var punkty = 0` ma typ `Int` na zawsze, więc `punkty = "x"` nie skompiluje się. Typ możesz też napisać jawnie: `val cena: Double = 2.5`.

| Python | Kotlin |
| --- | --- |
| `x = 5` | `var x = 5` albo `val x = 5` |
| `int`, `float`, `str`, `bool` | `Int`, `Double`, `String`, `Boolean` |
| `True`, `False` | `true`, `false` |
| `int("42")` | `"42".toInt()` |
| `str(42)` | `42.toString()` |
| `f"{x}"` | `"$x"` albo `"${x * 2}"` |
| `len(s)` | `s.length` |
| `# komentarz` | `// komentarz` i `/* blok */` |

Szablon napisu: po `$` stoi nazwa zmiennej. Gdy chcesz wstawić wyrażenie (działanie, pole, wywołanie), weź je w `${ }`.

Dzielenie dwóch `Int` daje `Int` (część po przecinku ucieka), tak jak `//` w Pythonie. Jedna liczba z kropką wystarczy, żeby wynik był `Double`.

## Składnia do zapamiętania

```kotlin
val imie = "Ola"
var punkty = 0
punkty = punkty + 5
val cena: Double = 2.5
val liczba = "42".toInt()
val napis = liczba.toString()
println("$imie ma $punkty pkt, dwa razy: ${punkty * 2}")
```

## Przykład

```kotlin Zmienne.kt {2,3,9,10,12,13,16}
fun main() {
    val imie = "Ola"           // val: nie zmienisz
    var punkty = 0             // var: zmienisz
    punkty = punkty + 5
    val cena: Double = 2.5
    val zdal: Boolean = punkty > 3

    val tekstLiczby = "42"
    val liczba = tekstLiczby.toInt()
    val napis = liczba.toString()

    println("$imie ma $punkty pkt")
    println("Dwa razy: ${punkty * 2}")
    println("Długość imienia: ${imie.length}")
    println(liczba + 1)
    println(napis + 1)
    println("Cena: $cena, zdał: $zdal")
    println(7 / 2)
    println(7 / 2.0)
}
```

```wynik
Ola ma 5 pkt
Dwa razy: 10
Długość imienia: 3
43
421
Cena: 2.5, zdał: true
3
3.5
```

1. `val` na rzeczy, które się nie zmieniają.
2. `var` na licznik. Typ `Int` wynika z zera.
3. Tekst na liczbę.
4. Liczba na tekst.
5. Sama zmienna w napisie: `$nazwa`.
6. Wyrażenie w napisie: `${...}`.
7. `String + Int` skleja napisy: wynik `421`, nie `43`.

## Pułapki

- `val` zmieniony później: błąd kompilacji `'val' cannot be reassigned`. Licznik zawsze jako `var`.
- `"abc".toInt()` kompiluje się, ale wysypuje aplikację (`NumberFormatException`). Tekst z pola zamieniaj przez `toIntOrNull()`, opisane w karcie o null safety.
- `"Wynik: $punkty * 2"` wypisze `Wynik: 5 * 2`. Działanie musi być w `${ }`.
- `"$imie.length"` wstawi tylko `imie`, a `.length` zostanie zwykłym tekstem. Pole obiektu też w `${ }`.
- Średnia z `Int` przez `/` traci część ułamkową. Zamień jedną stronę na `Double`: `suma.toDouble() / ile`.

## Powiązane

- [Kotlin: if, when, operatory](#/karta/mobilna/07-kotlin-if-i-when)
- [Kotlin: null safety i toIntOrNull](#/karta/mobilna/11-kotlin-null-safety)
- [Zmienne i typy](#/karta/konsola/01-zmienne-i-typy)
- [f-stringi i print()](#/karta/konsola/03-f-stringi)
