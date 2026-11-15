---
tytul: "Kotlin: null safety i toIntOrNull"
dzial: mobilna
tagi: [kotlin, "null", "?", "?.", "?:", "!!", toIntOrNull, trim, NullPointerException, findViewById]
status: do-weryfikacji
zrodla:
  - https://kotlinlang.org/docs/null-safety.html
  - https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.text/to-int-or-null.html
  - https://kotlinlang.org/docs/java-interop.html#null-safety-and-platform-types
  - Źródła Android SDK 36, Activity.findViewById (komentarz o nieokreślonej nullowalności)
  - Przykład skompilowany kotlinc 2.1.21 (z Android Studio)
arkusze: [2021 cze, 2026 sty]
---

## Po co to jest

Kotlin pilnuje, żeby zmienna nie była przypadkiem pusta (`null`). Na egzaminie spotkasz to w dwóch miejscach: przy ==zamianie tekstu z pola na liczbę== (użytkownik może wpisać cokolwiek) i przy znaku `?` w typach podpowiadanych przez Android Studio. Wystarczy minimum: `?`, `?.`, `?:`, `!!` i `toIntOrNull()`.

## Jak to działa

Typ bez znaku zapytania nigdy nie jest `null`. Typ z `?` może być:

```tekst Typ z ? i bez
String     zawsze jakiś napis
String?    napis albo null
Int?       liczba albo null
```

Do zmiennej typu `String?` nie możesz od razu napisać `imie.length`: kompilator nie pozwoli, bo mogłoby tam nie być napisu. Masz trzy wyjścia:

| Zapis | Gdy jest `null` |
| --- | --- |
| `imie?.length` | wynik to `null`, bez awarii |
| `imie?.length ?: 0` | wynik to wartość po `?:` |
| `imie!!.length` | awaria `NullPointerException` |

`"tekst".toIntOrNull()` zwraca `Int?`: liczbę albo `null`, gdy tekst nie jest liczbą. Dzięki temu nie wysypuje aplikacji jak `toInt()`. Po sprawdzeniu `if (liczba == null)` w gałęzi `else` Kotlin wie, że to już zwykły `Int`.

A `findViewById`? W źródłach Androida jego wynik ma celowo nieokreśloną nullowalność, więc Kotlin traktuje go jak zwykły typ i nie każe pisać `?`. Jeśli jednak podasz id, którego nie ma w layoucie, dostaniesz `null` i awarię przy pierwszym użyciu.

## Składnia do zapamiętania

```kotlin
var imie: String? = null
println(imie?.length)
val ilosc = poleIlosc.text.toString().toIntOrNull() ?: 0
val liczba = tekst.toIntOrNull()
if (liczba == null) {
    komunikat.text = "Podaj liczbę"
} else {
    komunikat.text = "Wynik: ${liczba * 2}"
}
```

## Przykład

```kotlin Null.kt {4,5,8,12,15,16,19,21}
fun main() {
    val wpisy = listOf("12", "", "abc", " 7")
    for (wpis in wpisy) {
        val liczba = wpis.toIntOrNull()
        if (liczba == null) {
            println("\"$wpis\" to nie liczba")
        } else {
            println("\"$wpis\" + 1 = ${liczba + 1}")
        }
    }

    val ilosc = "abc".toIntOrNull() ?: 0
    println("Ilość: $ilosc")

    var imie: String? = null
    println(imie?.length)
    imie = "Ola"
    println(imie?.length)
    println(imie!!.length)

    val zeSpacja = " 7".trim().toIntOrNull()
    println(zeSpacja)
}
```

```wynik
"12" + 1 = 13
"" to nie liczba
"abc" to nie liczba
" 7" to nie liczba
Ilość: 0
null
3
3
7
```

1. Tekst na liczbę bez ryzyka awarii. Typ wyniku: `Int?`.
2. Sprawdzenie, czy się udało.
3. Tu `liczba` jest już zwykłym `Int`, więc `+ 1` działa.
4. `?:` podaje wartość zastępczą, gdy po lewej jest `null`.
5. `String?`: zmienna może być pusta.
6. `?.` zamiast awarii daje `null`.
7. `!!` mówi „wiem, że nie jest null”. Tu prawda, więc działa.
8. `trim()` obcina spacje z brzegów. Bez niego `" 7"` nie jest liczbą.

## Pułapki

- `!!` na wartości `null` to `NullPointerException` i zamknięcie aplikacji w emulatorze. Używaj tylko, gdy masz pewność.
- `toIntOrNull()` nie przyjmie spacji ani przecinka: `" 7"` i `"2,5"` dają `null`. Przy polach liczbowych dodaj `trim()`.
- Pusty `EditText` daje `""`, a nie `null`. `"".toIntOrNull()` to `null`, więc `?: 0` obsłuży oba przypadki naraz.
- `findViewById(R.id.literowka)` się kompiluje, jeśli takie id jest w jakimkolwiek layoucie, ale w tym layoucie zwróci `null`. Sprawdzaj, czy id w Kotlinie zgadza się z `android:id` w `activity_main.xml`.

## Powiązane

- [Kotlin: val, var, typy i szablony napisów](#/karta/mobilna/06-kotlin-zmienne-i-typy)
- [Kotlin: if, when, operatory](#/karta/mobilna/07-kotlin-if-i-when)
- [Dane z klawiatury: input() i int()](#/karta/konsola/02-input-i-int)
