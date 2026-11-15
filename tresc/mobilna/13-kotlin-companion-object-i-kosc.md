---
tytul: "Kotlin: companion object i klasa Kosc"
dzial: mobilna
tagi: [kotlin, companion object, statyczne, licznik instancji, klasa Kosc, konstruktor dodatkowy, Random]
status: do-weryfikacji
zrodla:
  - https://kotlinlang.org/docs/object-declarations.html#companion-objects
  - https://kotlinlang.org/docs/classes.html#secondary-constructors
  - https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.random/-random/next-int.html
  - Przykład skompilowany kotlinc 2.1.21 (z Android Studio)
  - Arkusz INF.04 2026 sty, część I (opis klasy Kosc) i część II
  - Zasady oceniania INF.04 2026 sty (R.2.1-R.2.7)
arkusze: [2026 sty]
---

## Po co to jest

Klasa `Kosc` z 2026 sty miała ==publiczne pole statyczne z liczbą instancji==, cztery pola publiczne, dwa konstruktory i trzy metody (R.2.1-R.2.7). Kotlin nie ma słowa `static`. Pole wspólne dla całej klasy kładziesz w `companion object`. Ta sama klasa przyda się potem w aplikacji mobilnej, bo arkusz na to pozwalał.

## Jak to działa

`companion object` to jeden obiekt przypięty do klasy. Jego pola istnieją ==raz==, a nie w każdej kości osobno. Odczytujesz je przez nazwę klasy: `Kosc.liczbaInstancji`, tak jak pole statyczne w Javie czy C#.

```tekst Gdzie leżą pola
Kosc (klasa)
└── companion object
    └── liczbaInstancji = 2   ← jedna na wszystkie

pierwsza: Kosc                druga: Kosc
  oczka = 5                     oczka = 0
  dostepna = true               dostepna = true
```

Dwa konstruktory jak w treści:

1. `Kosc(8)`: konstruktor główny. `init` sprawdza zakres: 8 jest poza 1..6, więc oczka = 0.
2. `Kosc()`: konstruktor dodatkowy losuje liczbę i ==przekazuje ją do głównego== przez `this(...)`.
3. W obu przypadkach wykonuje się ten sam `init`, więc licznik rośnie dokładnie raz na kość.

Metoda `slownie()` bierze słowo z tablicy pod indeksem równym oczkom: `nazwy[3]` to „trzy”.

## Składnia do zapamiętania

```kotlin
class Kosc(wartosc: Int) {
    var oczka: Int
    init {
        oczka = if (wartosc in 1..6) wartosc else 0
        liczbaInstancji++
    }
    constructor() : this(Random.nextInt(1, 7))
    companion object {
        var liczbaInstancji = 0
    }
}
```

## Przykład

```kotlin Kosc.kt {3,4,11,14,17,20,35,36,42}
import kotlin.random.Random

class Kosc(wartosc: Int) {
    val obrazy = arrayOf("kosc0.png", "kosc1.png", "kosc2.png", "kosc3.png",
        "kosc4.png", "kosc5.png", "kosc6.png")
    var oczka: Int
    var idObrazu: Int
    var dostepna: Boolean

    init {
        oczka = if (wartosc in 1..6) wartosc else 0
        idObrazu = oczka
        dostepna = true
        liczbaInstancji++
    }

    constructor() : this(Random.nextInt(1, 7))

    fun rzuc() {
        if (dostepna) {
            oczka = Random.nextInt(1, 7)
            idObrazu = oczka
        }
    }

    fun zablokuj() {
        dostepna = false
    }

    fun slownie(): String {
        val nazwy = arrayOf("zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć")
        return nazwy[oczka]
    }

    companion object {
        var liczbaInstancji = 0
    }
}

fun main() {
    val pierwsza = Kosc()
    println("Instancji: ${Kosc.liczbaInstancji}, oczka w 1..6: ${pierwsza.oczka in 1..6}")

    val druga = Kosc(8)
    println("Instancji: ${Kosc.liczbaInstancji}")
    println("Oczka: ${druga.oczka} (${druga.slownie()}), plik ${druga.obrazy[druga.idObrazu]}")

    val trzecia = Kosc(3)
    trzecia.zablokuj()
    trzecia.rzuc()
    println("Zablokowana: ${trzecia.oczka} (${trzecia.slownie()}), instancji ${Kosc.liczbaInstancji}")
}
```

```wynik
Instancji: 1, oczka w 1..6: true
Instancji: 2
Oczka: 0 (zero), plik kosc0.png
Zablokowana: 3 (trzy), instancji 3
```

1. Konstruktor jednoargumentowy. `wartosc` nie jest polem, tylko parametrem do `init`.
2. Tablica nazw plików, `kosc0.png` pod indeksem 0 (R.2.2).
3. Spoza 1..6 daje 0 (R.2.3).
4. Licznik w `companion object`, zwiększany przy każdym obiekcie (R.2.4).
5. Konstruktor bezargumentowy: losuje i przekazuje do głównego (R.2.3).
6. Rzut tylko dla dostępnej kości (R.2.5).
7. Blok pól wspólnych dla całej klasy.
8. Pole statyczne, publiczne, startuje od 0 (R.2.1).
9. Odczyt przez nazwę klasy, nie przez obiekt.

## Pułapki

- Licznik jako zwykłe pole `var liczbaInstancji = 0` w klasie: każda kość ma własne 1, a nie wspólną liczbę. To samo, co `self.` zamiast nazwy klasy w Pythonie.
- Licznik zwiększany i w `init`, i w klamrach konstruktora dodatkowego: przy `Kosc()` urośnie o 2, bo konstruktor dodatkowy najpierw uruchamia główny razem z `init`. Zwiększaj w jednym miejscu, w `init`.
- `Random.nextInt(1, 6)` nie wylosuje szóstki. Dla kości górna granica to 7.
- `slownie()` dla oczek spoza 0..6 rzuciłoby wyjątkiem, ale `init` zawsze sprowadza je do 0..6, więc indeks jest bezpieczny.
- Zasady 2026 sty sprawdzały klasę `Kosc` w części konsolowej (Python, Java, C# lub C++). W aplikacji mobilnej była tylko dozwolona, nie wymagana.

## Powiązane

- [Kotlin: klasa, konstruktor, init](#/karta/mobilna/12-kotlin-klasa-i-konstruktor)
- [Zadanie: kości z blokadą](#/karta/mobilna/20-zadanie-kosci-z-blokada)
- [Zadanie: klasa Kosc](#/karta/konsola/45-zadanie-klasa-kosc)
- [Atrybut klasowy jako licznik instancji](#/karta/konsola/15-atrybut-klasowy-licznik)
