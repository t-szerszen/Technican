---
tytul: "Obrazy i przezroczystość z kodu"
dzial: mobilna
tagi: [android, kotlin, ImageView, setImageResource, R.drawable, alpha, przezroczystość, tablica obrazów, kliknięcie obrazu]
status: do-weryfikacji
zrodla:
  - https://developer.android.com/reference/android/widget/ImageView#setImageResource(int)
  - https://developer.android.com/reference/android/view/View#setAlpha(float)
  - https://developer.android.com/guide/topics/resources/drawable-resource
  - Przykład zbudowany w emulatorze API 36 i przeklikany przez adb (losowanie, dwa kliknięcia obrazu)
  - Arkusze INF.04 2024 cze i 2026 sty, część II
  - Zasady oceniania INF.04 2024 cze (R.3.7, R.3.9), 2026 sty (R.3.4, R.3.8, R.3.10)
arkusze: [2024 cze, 2026 sty]
---

## Po co to jest

W obu grach w kości obraz zmienia się z kodu: po rzucie pokazuje wyrzucone oczka (R.3.7 w 2024 cze, R.3.8 w 2026 sty), po resecie wraca do `question.jpg`. W 2026 sty kliknięcie w kość przełączało ==przezroczystość 50%== (R.3.10). Oba efekty to jedna linia Kotlina.

## Jak to działa

`R.drawable.kosc3` to nie obraz, tylko ==liczba całkowita==: numer zasobu nadany przy kompilacji. Dlatego numery obrazów można trzymać w zwykłej tablicy `Int` i wybierać indeksem:

```tekst Tablica numerów obrazów
indeks  0       1       ...  6
        kosc0   kosc1        kosc6
          ↑
obrazy[oczka] → R.drawable.kosc3, gdy oczka = 3
```

Indeks tablicy = liczba oczek. Stąd `kosc0` na pozycji 0: obraz pustej kości przypada na 0 oczek.

`obrazKosc.setImageResource(numer)` podmienia obraz w `ImageView`, który już jest na ekranie.

`alpha` to przezroczystość całego widoku: `1f` pełny, `0.5f` w połowie przezroczysty, `0f` niewidoczny. Litera `f` oznacza typ `Float`, którego wymaga to pole.

Obraz też da się kliknąć. `setOnClickListener` działa na każdym widoku, nie tylko na przycisku.

## Składnia do zapamiętania

```kotlin
private val obrazy = arrayOf(
    R.drawable.kosc0, R.drawable.kosc1, R.drawable.kosc2, R.drawable.kosc3,
    R.drawable.kosc4, R.drawable.kosc5, R.drawable.kosc6
)
obrazKosc.setImageResource(obrazy[oczka])
obrazKosc.alpha = 0.5f
obrazKosc.setOnClickListener { }
```

## Przykład

Layout: `ImageView` `obrazKosc` z `android:src="@drawable/kosc0"`, przycisk `przyciskLosuj`, `TextView` `napisOczka` z tekstem „Oczka: 0”. Obrazy `kosc0.png`..`kosc6.png` z archiwum 2026 sty leżą w `res/drawable`.

```kotlin MainActivity.kt {14,15,33,35,36,39,41}
package pl.egzamin.kosci

import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import kotlin.random.Random

class MainActivity : AppCompatActivity() {
    private val obrazy = arrayOf(
        R.drawable.kosc0, R.drawable.kosc1, R.drawable.kosc2, R.drawable.kosc3,
        R.drawable.kosc4, R.drawable.kosc5, R.drawable.kosc6
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val obrazKosc = findViewById<ImageView>(R.id.obrazKosc)
        val przyciskLosuj = findViewById<Button>(R.id.przyciskLosuj)
        val napisOczka = findViewById<TextView>(R.id.napisOczka)

        przyciskLosuj.setOnClickListener {
            val oczka = Random.nextInt(1, 7)
            obrazKosc.setImageResource(obrazy[oczka])
            napisOczka.text = "Oczka: $oczka"
        }

        obrazKosc.setOnClickListener {
            if (obrazKosc.alpha == 1f) {
                obrazKosc.alpha = 0.5f
            } else {
                obrazKosc.alpha = 1f
            }
        }
    }
}
```

1. Pole klasy: tablica numerów obrazów, widoczna w całej aktywności.
2. Kolejność od `kosc0` do `kosc6`, więc indeks równa się oczkom.
3. Kliknięcie przycisku: rzut.
4. Podmiana obrazu na ten, który pasuje do oczek.
5. Ta sama liczba w napisie. W emulatorze: obraz z trzema oczkami i „Oczka: 3”.
6. Kliknięcie samego obrazu.
7. Przełączanie: pełny → 50% → pełny. Sprawdzone dwoma kliknięciami.

## Pułapki

- `setImageResource("kosc3.png")` się nie skompiluje. Metoda chce numeru `R.drawable.kosc3`, nie nazwy pliku.
- `alpha = 0.5` bez `f` to błąd kompilacji (`Double` zamiast `Float`). Zawsze `0.5f`, `1f`.
- `alpha = 50f` nie da 50%. Skala to 0..1, a nie procenty.
- Tablica bez `kosc0` na początku przesuwa wszystko o jeden: 3 oczka pokażą obraz czterech. Sprawdź, czy `obrazy[1]` to `kosc1`.
- Przezroczystość w XML (`android:alpha`) ustawia tylko stan początkowy. W 2026 sty stan startowy to obrazy ==bez== przezroczystości (R.3.7).

## Powiązane

- [Obrazy i zasoby: drawable, strings, colors](#/karta/mobilna/04-obrazy-i-zasoby)
- [Kliknięcia, tekst i Toast](#/karta/mobilna/15-klikniecia-tekst-i-toast)
- [Kotlin: kolekcje i losowanie](#/karta/mobilna/10-kotlin-kolekcje-i-losowanie)
- [Zadanie: kości z blokadą](#/karta/mobilna/20-zadanie-kosci-z-blokada)
