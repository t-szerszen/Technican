---
tytul: "Kotlin: funkcje"
dzial: mobilna
tagi: [kotlin, fun, parametry, return, wartość domyślna, funkcja jednolinijkowa, Unit]
status: do-weryfikacji
zrodla:
  - https://kotlinlang.org/docs/functions.html
  - https://kotlinlang.org/docs/basic-syntax.html#functions
  - Przykład skompilowany kotlinc 2.1.21 (z Android Studio)
  - Arkusz INF.04 2024 cze, część I i II (funkcja licząca punkty, użyta potem w aplikacji mobilnej)
  - Zasady oceniania INF.04 2021 cze (R.1.3), 2024 cze (R.3.8)
arkusze: [2021 cze, 2024 cze, 2026 sty]
---

## Po co to jest

W 2024 cze aplikacja mobilna liczyła punkty ==tym samym algorytmem co konsolowa== („można wykorzystać fragmenty kodu z aplikacji konsolowej”). Logikę wydzielasz do funkcji, a obsługa kliknięcia tylko ją wywołuje. Znacząca nazwa funkcji to też osobne kryterium (R.1.3).

## Jak to działa

```tekst Budowa funkcji
fun suma(lista: List<Int>): Int
 1    2    3      4          5
```

1. `fun`: słowo kluczowe.
2. Nazwa funkcji.
3. Nazwa parametru.
4. Typ parametru, po dwukropku.
5. Typ wyniku, po nawiasie i dwukropku.

W Kotlinie ==typ jest po nazwie==, po dwukropku. Typ każdego parametru musisz napisać. Typ wyniku też, chyba że funkcja nic nie zwraca: wtedy go pomijasz (to typ `Unit`, odpowiednik `void`).

Wywołanie `sumaOczek(listOf(4, 4, 1, 4, 2))`:

1. Lista trafia do parametru `oczka`.
2. Ciało liczy sumę w zmiennej lokalnej.
3. `return suma` kończy funkcję i oddaje 15 w miejsce wywołania.

Funkcja z jednym wyrażeniem może pominąć klamry i `return`: `fun podwoj(x: Int) = x * 2`. Typ wyniku Kotlin wtedy wylicza sam.

Wartość domyślna (`znak: String = "!"`) sprawia, że parametr można pominąć. To ten sam mechanizm, którym w klasie zastąpisz dwa konstruktory.

## Składnia do zapamiętania

```kotlin
fun sumaOczek(oczka: List<Int>): Int {
    var suma = 0
    for (wartosc in oczka) suma += wartosc
    return suma
}
fun podwoj(x: Int) = x * 2
fun powitanie(imie: String, znak: String = "!"): String = "Witaj $imie$znak"
fun wypiszLinie(dlugosc: Int) { println("-".repeat(dlugosc)) }
```

## Przykład

```kotlin Funkcje.kt {1,6,9,11,15}
fun sumaOczek(oczka: List<Int>): Int {
    var suma = 0
    for (wartosc in oczka) {
        suma += wartosc
    }
    return suma
}

fun podwoj(x: Int) = x * 2

fun powitanie(imie: String, znak: String = "!"): String {
    return "Witaj $imie$znak"
}

fun wypiszLinie(dlugosc: Int) {
    println("-".repeat(dlugosc))
}

fun main() {
    println(sumaOczek(listOf(4, 4, 1, 4, 2)))
    println(podwoj(21))
    println(powitanie("Ola"))
    println(powitanie("Ola", "?"))
    wypiszLinie(10)
}
```

```wynik
15
42
Witaj Ola!
Witaj Ola?
----------
```

1. Parametr typu „lista liczb”, wynik typu `Int`.
2. `return` oddaje wynik i kończy funkcję.
3. Funkcja jednolinijkowa: `=` zamiast klamer i `return`.
4. Drugi parametr ma wartość domyślną, więc `powitanie("Ola")` też działa.
5. Bez typu wyniku: funkcja tylko coś robi, niczego nie zwraca.

## Pułapki

- `fun suma(a, b)` bez typów to błąd kompilacji. Każdy parametr ma typ.
- Funkcja z `: Int` w nagłówku musi zwrócić `Int` w każdej ścieżce. Brakujący `return` to błąd kompilacji.
- Parametry są tylko do odczytu: `oczka = ...` w środku funkcji się nie skompiluje. Skopiuj do `var`, jeśli musisz zmieniać.
- Nazwy jak `f`, `x`, `fun1` łamią R.1.3. Nazwa ma mówić, co funkcja robi: `sumaOczek`, `policzPunkty`, `rzucKoscmi`.

## Powiązane

- [Kotlin: klasa, konstruktor, init](#/karta/mobilna/12-kotlin-klasa-i-konstruktor)
- [Kotlin: kolekcje i losowanie](#/karta/mobilna/10-kotlin-kolekcje-i-losowanie)
- [Funkcje: def, parametry, return](#/karta/konsola/11-funkcje)
