---
tytul: "Kotlin: klasa, konstruktor, init"
dzial: mobilna
tagi: [kotlin, class, konstruktor główny, init, constructor, this, wartość domyślna, private, metody, obiekt]
status: do-weryfikacji
zrodla:
  - https://kotlinlang.org/docs/classes.html
  - https://kotlinlang.org/docs/properties.html
  - https://kotlinlang.org/docs/visibility-modifiers.html
  - Przykład skompilowany kotlinc 2.1.21 (z Android Studio)
  - Arkusz INF.04 2026 sty, część I i II („W programie można wykorzystać klasę Kosc z aplikacji konsolowej”)
arkusze: [2026 sty]
---

## Po co to jest

W 2026 sty arkusz pozwalał użyć w aplikacji mobilnej ==klasy `Kosc` z części konsolowej==. Jeśli piszesz w Kotlinie, tę klasę trzeba umieć zapisać w Kotlinie: pola, dwa konstruktory, metody. Składnia jest krótsza niż w Pythonie, ale ma swoje reguły.

## Jak to działa

Konstruktor główny stoi w nagłówku klasy, w nawiasie po nazwie. Od tego, co napiszesz przed parametrem, zależy, czy powstanie pole:

```tekst Parametr konstruktora
class Uczen(val imie: String,
            var punkty: Int = 0,
            kod: Int)

val imie: String
→ pole tylko do odczytu

var punkty: Int = 0
→ pole do zmiany, domyślnie 0

kod: Int
→ zwykły parametr, widać go
  tylko w init i przy polach
```

Co się dzieje przy `Uczen("Ola")`:

1. Parametry dostają wartości, brakujące biorą wartość domyślną (`punkty = 0`).
2. Pola z nagłówka (`val`, `var`) zapisują się w obiekcie.
3. Wykonują się po kolei inicjalizacje pól w ciele i bloki `init`, w kolejności z kodu.
4. Gotowy obiekt trafia do zmiennej. W Kotlinie ==nie piszesz `new`==.

Konstruktor dodatkowy (`constructor`) musi najpierw przekazać wartości do głównego przez `: this(...)`. Dzięki temu `init` wykona się zawsze, niezależnie od tego, którego konstruktora użyto.

| Python | Kotlin |
| --- | --- |
| `def __init__(self, imie):` | `class Uczen(val imie: String)` |
| `self.imie` | `imie` (w klasie) |
| ciało `__init__` | blok `init { }` |
| `wartosc=None` | `wartosc: Int = 0` albo drugi `constructor` |
| `self.__proby` | `private var proby` |
| `def opis(self):` | `fun opis(): String` |

Widoczność: bez słowa przed polem albo metodą jest `public`. `private` widać tylko w środku klasy.

## Składnia do zapamiętania

```kotlin
class Uczen(val imie: String, var punkty: Int = 0) {
    private var proby = 0
    init {
        println("Utworzono $imie")
    }
    constructor(imie: String, nazwisko: String) : this("$imie $nazwisko")
    fun dodajPunkty(ile: Int) {
        punkty += ile
    }
}
val ola = Uczen("Ola")
```

## Przykład

```kotlin Klasa.kt {1,2,5,10,12,23,28,31}
class Uczen(val imie: String, var punkty: Int = 0) {
    private var proby = 0
    val login: String

    init {
        login = imie.lowercase() + "123"
        println("Utworzono ucznia $imie")
    }

    constructor(imie: String, nazwisko: String) : this("$imie $nazwisko")

    fun dodajPunkty(ile: Int) {
        proby++
        punkty += ile
    }

    fun opis(): String {
        return "$imie: $punkty pkt w $proby próbach, login $login"
    }
}

fun main() {
    val ola = Uczen("Ola")
    ola.dodajPunkty(5)
    ola.dodajPunkty(3)
    println(ola.opis())

    val jan = Uczen("Jan", 10)
    println(jan.opis())

    val pelne = Uczen("Anna", "Nowak")
    println(pelne.imie)
    pelne.punkty = 7
    println(pelne.punkty)
}
```

```wynik
Utworzono ucznia Ola
Ola: 8 pkt w 2 próbach, login ola123
Utworzono ucznia Jan
Jan: 10 pkt w 0 próbach, login jan123
Utworzono ucznia Anna Nowak
Anna Nowak
7
```

1. Konstruktor główny: `imie` tylko do odczytu, `punkty` z wartością domyślną 0.
2. Pole prywatne: z `main` go nie odczytasz.
3. `init` działa przy każdym tworzeniu obiektu.
4. Konstruktor dodatkowy skleja imię z nazwiskiem i przekazuje do głównego.
5. Metoda: zwykła funkcja w klasie, widzi pola bez `this`.
6. Obiekt bez `new`. `punkty` dostają wartość domyślną.
7. Wartość domyślną można nadpisać.
8. Ten sam `init` wykonał się też dla konstruktora dodatkowego.

## Pułapki

- `ola.imie = "Ala"` przy polu `val` to błąd kompilacji. Pola, które zmieniasz (oczka, dostępność), deklaruj przez `var`.
- `println(ola.proby)` z zewnątrz: `cannot access 'var proby: Int': it is private`. Tak ma być: prywatne pole czyta tylko klasa.
- Konstruktor dodatkowy bez `: this(...)` się nie skompiluje, gdy klasa ma konstruktor główny.
- Parametr bez `val`/`var` (np. `wartosc` w klasie `Kosc`) nie jest polem. Widać go w `init`, ale nie w metodach.
- `Uczen()` bez argumentów nie zadziała, jeśli `imie` nie ma wartości domyślnej. Do tego służy drugi konstruktor albo wartość domyślna.

## Powiązane

- [Kotlin: companion object i klasa Kosc](#/karta/mobilna/13-kotlin-companion-object-i-kosc)
- [Kotlin: funkcje](#/karta/mobilna/09-kotlin-funkcje)
- [Klasa i `__init__`](#/karta/konsola/13-klasa-i-init)
- [Pola prywatne z __](#/karta/konsola/14-pola-prywatne)
