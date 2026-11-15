---
tytul: "Kotlin: if, when, operatory"
dzial: mobilna
tagi: [kotlin, if, else, when, wyrażenie, operatory, "&&", "||", porównanie napisów, contains]
status: do-weryfikacji
zrodla:
  - https://kotlinlang.org/docs/control-flow.html
  - https://kotlinlang.org/docs/equality.html
  - https://kotlinlang.org/docs/strings.html
  - Przykład skompilowany kotlinc 2.1.21 (z Android Studio)
  - Arkusze INF.04 2021 cze i 2022 cze, część II
  - Zasady oceniania INF.04 2021 cze (R.3.8-R.3.10), 2022 cze (R.3.8)
arkusze: [2021 cze, 2022 cze]
---

## Po co to jest

Warunki w zadaniach mobilnych: sprawdzenie, czy e-mail ma `@`, czy hasła są równe (2021 cze, R.3.8-R.3.10), czy licznik nie zejdzie poniżej zera (2022 cze, R.3.8). Kotlin ma `if` jak w każdym języku i `when` zamiast długiego łańcucha `elif`.

## Jak to działa

`if` w Kotlinie może być ==wyrażeniem==: cała konstrukcja daje wartość, którą od razu przypisujesz. Wartością gałęzi jest jej ostatnia linia.

```tekst if jako wyrażenie
val komunikat = if (warunek1) {
    "A"             ← gdy warunek1
} else if (warunek2) {
    "B"             ← gdy warunek2
} else {
    "C"             ← w pozostałych
}
```

Gdy `if` coś zwraca, ==`else` jest obowiązkowy==: zmienna musi dostać wartość w każdym przypadku.

`when` sprawdza jedną wartość po kolei z gałęziami i bierze ==pierwszą pasującą==. Gałąź może być liczbą (`50 ->`), zakresem (`in 30..49 ->`) albo `else`.

Operatory:

| Kotlin | Znaczenie |
| --- | --- |
| `==`, `!=` | równe, różne (także dla napisów) |
| `<`, `<=`, `>`, `>=` | porównania |
| `&&`, `\|\|`, `!` | i, lub, nie |
| `%` | reszta z dzielenia |
| `in 1..6` | czy w zakresie |
| `s.contains("@")` | czy napis zawiera tekst |

Napisy porównujesz zwykłym `==`. Kotlin porównuje wtedy treść, nie miejsce w pamięci jak `==` w Javie.

## Składnia do zapamiętania

```kotlin
if (licznik > 0) {
    licznik--
} else {
    licznik = 0
}
val tekst = if (haslo == powtorzone) "OK" else "Hasła się różnią"
when (oczka) {
    in 1..6 -> println("poprawne")
    else -> println("spoza zakresu")
}
```

## Przykład

```kotlin Warunki.kt {2,3,21,23,31}
fun ocenaSlownie(punkty: Int): String {
    return when (punkty) {
        in 0..29 -> "niedostateczny"
        in 30..49 -> "dopuszczający"
        50 -> "równo połowa"
        else -> "co najmniej dostateczny"
    }
}

fun main() {
    val wiek = 17
    if (wiek >= 18) {
        println("Pełnoletni")
    } else {
        println("Niepełnoletni")
    }

    val email = "ola@szkola.pl"
    val haslo = "abc123"
    val powtorzone = "abc124"
    val komunikat = if (!email.contains("@")) {
        "Nieprawidłowy adres e-mail"
    } else if (haslo != powtorzone) {
        "Hasła się różnią"
    } else {
        "Witaj $email"
    }
    println(komunikat)

    val licznik = 0
    val nowy = if (licznik > 0) licznik - 1 else 0
    println(nowy)

    println(ocenaSlownie(42))
    println(ocenaSlownie(50))
    println(wiek % 2 == 0 && wiek > 10)
    println("kot" == "kot")
}
```

```wynik
Niepełnoletni
Hasła się różnią
0
dopuszczający
równo połowa
false
true
```

1. `when` jako wartość zwracana z funkcji.
2. Gałąź z zakresem: pasuje każda liczba od 0 do 29 włącznie.
3. `!` odwraca wynik: brak `@` to błąd adresu. Kolejność sprawdzeń jak w treści z 2021 cze.
4. `!=` porównuje treść napisów.
5. Licznik, który nie schodzi poniżej zera, w jednej linii.

## Pułapki

- `if` jako wyrażenie bez `else` to błąd kompilacji. Ten sam błąd daje `when` bez `else`, gdy nie pokrywa wszystkich przypadków.
- Kolejność gałęzi ma znaczenie: wygrywa pierwsza prawdziwa. Arkusz 2021 cze nie mówi, który komunikat pokazać przy dwóch błędach naraz, więc sprawdzaj w kolejności z treści (najpierw `@`, potem hasła), a powitanie daj dopiero w `else`.
- `if (licznik > 0) licznik--` sprawdzaj ==przed== zmniejszeniem. Zmniejszenie, a potem poprawka na 0, też działa, ale jest mniej czytelne (R.3.8, 2022 cze).
- `when` nie przechodzi do następnej gałęzi jak `switch` w C++. Nie piszesz `break`.
- `contains` rozróżnia wielkość liter. Dla `@` to bez znaczenia, ale `"Kot".contains("k")` da `false`.

## Powiązane

- [Kotlin: val, var, typy i szablony napisów](#/karta/mobilna/06-kotlin-zmienne-i-typy)
- [Kotlin: pętle i zakresy](#/karta/mobilna/08-kotlin-petle-i-zakresy)
- [if, elif, else](#/karta/konsola/04-if-elif-else)
