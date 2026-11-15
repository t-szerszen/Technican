---
tytul: "Kliknięcia, tekst i Toast"
dzial: mobilna
tagi: [android, kotlin, setOnClickListener, onClick, EditText, text, toString, setText, Toast, lambda]
status: do-weryfikacji
zrodla:
  - https://developer.android.com/develop/ui/views/components/button
  - https://developer.android.com/reference/android/view/View#setOnClickListener(android.view.View.OnClickListener)
  - Plik attrs.xml z Android SDK 36 (opis android:onClick)
  - https://developer.android.com/guide/topics/ui/notifiers/toasts
  - Przykład zbudowany w emulatorze API 36 i przeklikany przez adb (pusty napis, wpisane imię, czyszczenie)
  - Zasady oceniania INF.04 2021 cze (R.3.5), 2024 cze (R.3.5), 2026 sty (R.3.4)
arkusze: [2021 cze, 2022 cze, 2024 cze, 2026 sty]
---

## Po co to jest

Każde zadanie mobilne ma kryterium za ==powiązanie przycisku z funkcją obsługi kliknięcia== (R.3.5 w 2021 cze i 2024 cze, R.3.4 w 2026 sty). W 2021 cze zasady pisały wprost „zdarzenie onClick”, a w 2024 cze „w sposób właściwy dla danego środowiska”. Android ma na to dwa sposoby i oba się liczą.

## Jak to działa

Kliknięcie to zdarzenie. Ty tylko ==rejestrujesz funkcję==, a system wywoła ją później, gdy użytkownik dotknie przycisku:

```tekst Co się dzieje po kliknięciu
onCreate: przycisk.setOnClickListener { ... }
          (blok zapamiętany, jeszcze nie działa)
                 ⋮
użytkownik dotyka przycisku
                 ↓
system wywołuje zapamiętany blok
                 ↓
blok czyta pole, zmienia napis
```

Sposób 1, w kodzie: `przycisk.setOnClickListener { ... }`. Blok w klamrach to lambda: kod do wykonania przy kliknięciu.

Sposób 2, w XML: `android:onClick="wyczysc"` przy przycisku i w `MainActivity` funkcja `fun wyczysc(view: View)`. System szuka funkcji ==po nazwie== w chwili kliknięcia. Musi być publiczna i mieć dokładnie jeden parametr typu `View`. Dokumentacja oznacza ten sposób jako przestarzały, ale nadal działa (sprawdzone na API 36).

Tekst:

- odczyt z pola: `poleImie.text.toString()`. Samo `text` to typ `Editable`, a nie `String`.
- zapis w `TextView`: `napis.text = "Witaj"`.
- zapis w `EditText`: `pole.setText("")`. Przypisanie `pole.text = "..."` się nie skompiluje, bo pole oczekuje `Editable`.

`Toast` to dymek na dole ekranu, który sam znika: `Toast.makeText(this, "tekst", Toast.LENGTH_SHORT).show()`. Bez `.show()` nic się nie pokaże.

## Składnia do zapamiętania

```kotlin
przyciskPowitaj.setOnClickListener {
    val imie = poleImie.text.toString()
    napisWynik.text = "Witaj $imie"
}
Toast.makeText(this, "Wpisz imię", Toast.LENGTH_SHORT).show()

// w XML: android:onClick="wyczysc"
fun wyczysc(view: View) {
    findViewById<EditText>(R.id.poleImie).setText("")
}
```

## Przykład

Layout: `EditText` `poleImie`, przycisk `przyciskPowitaj`, przycisk `przyciskWyczysc` z `android:onClick="wyczysc"` i `TextView` `napisWynik` z tekstem „Podaj imię”.

```kotlin MainActivity.kt {29,30,32,34,39,40}
package pl.egzamin.kosci

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val poleImie = findViewById<EditText>(R.id.poleImie)
        val przyciskPowitaj = findViewById<Button>(R.id.przyciskPowitaj)
        val napisWynik = findViewById<TextView>(R.id.napisWynik)

        przyciskPowitaj.setOnClickListener {
            val imie = poleImie.text.toString()
            if (imie.isEmpty()) {
                Toast.makeText(this, "Wpisz imię", Toast.LENGTH_SHORT).show()
            } else {
                napisWynik.text = "Witaj $imie"
            }
        }
    }

    fun wyczysc(view: View) {
        findViewById<EditText>(R.id.poleImie).setText("")
        findViewById<TextView>(R.id.napisWynik).text = "Podaj imię"
    }
}
```

1. Rejestracja obsługi kliknięcia. Kod w klamrach wykona się dopiero po dotknięciu przycisku.
2. Odczyt pola jako `String`.
3. Pusty napis: dymek „Wpisz imię”.
4. Wpisane „Ola”: napis zmienia się na „Witaj Ola”.
5. Funkcja dla `android:onClick="wyczysc"`: publiczna, jeden parametr `View`.
6. Czyszczenie pola przez `setText`.

## Pułapki

- `fun wyczysc()` bez parametru `View` się kompiluje, ale ==aplikacja pada przy kliknięciu==: `Could not find method wyczysc(View)`. To samo przy `private fun` i przy literówce w nazwie. Sprawdzone w emulatorze.
- Odczyt pola przy starcie (w `onCreate`, poza blokiem kliknięcia) daje pusty napis: użytkownik jeszcze nic nie wpisał. Czytaj w środku obsługi kliknięcia.
- `napisWynik.text = 5` się nie skompiluje. Liczbę wstaw w szablon: `"$licznik polubień"`.
- `Toast.makeText(...)` bez `.show()` niczego nie pokaże.
- Kryterium sprawdza powiązanie przycisku z funkcją w kodzie. Funkcja bez `setOnClickListener` i bez `android:onClick` nigdy się nie wykona.

## Powiązane

- [MainActivity, onCreate i findViewById](#/karta/mobilna/14-mainactivity-i-findviewbyid)
- [Obrazy i przezroczystość z kodu](#/karta/mobilna/16-obrazy-i-przezroczystosc-z-kodu)
- [Zadanie: formularz rejestracji](#/karta/mobilna/17-zadanie-formularz-rejestracji)
- [TextView, Button, EditText](#/karta/mobilna/03-kontrolki-tekst-przycisk-pole)
