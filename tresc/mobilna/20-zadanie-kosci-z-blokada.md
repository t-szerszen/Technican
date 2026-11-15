---
tytul: "Zadanie: kości z blokadą"
dzial: mobilna
tagi: [android, zadanie, gra w kości, klasa Kosc, alpha, przezroczystość, kliknięcie obrazu, suma, backgroundTint, AARRGGBB]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2026 sty, część II (opis i obraz 2 ze stanami w Android Studio)
  - Zasady oceniania INF.04 2026 sty (R.3.1-R.3.10)
  - https://developer.android.com/reference/android/view/View#setAlpha(float)
  - Rozwiązanie zbudowane w emulatorze API 36 z obrazami kosc0..kosc6 z załącznika; rzut, blokada trzech kości, drugi rzut i odblokowanie sprawdzone przez adb
arkusze: [2026 sty]
---

## Po co to jest

Typ zadania: pięć kości, przycisk RZUT i suma oczek. Kliknięcie w kość ==blokuje ją==: robi się w połowie przezroczysta i przy następnym rzucie nie zmienia wartości. Drugie kliknięcie ją odblokowuje. Arkusz pozwalał użyć klasy `Kosc` z części konsolowej i tu właśnie ona trzyma stan każdej kości.

## Jak to działa

Każda kość na ekranie to para: obiekt `Kosc` (oczka, dostępność) i `ImageView` (to, co widać). Ten sam indeks w dwóch tablicach łączy jedno z drugim:

```tekst Dwie tablice, jeden indeks
i = 0   kosci[0] ↔ obrazyKosci[0]
i = 1   kosci[1] ↔ obrazyKosci[1]
i = 2   kosci[2] ↔ obrazyKosci[2]
i = 3   kosci[3] ↔ obrazyKosci[3]
i = 4   kosci[4] ↔ obrazyKosci[4]
```

Po kliknięciu RZUT, dla każdego `i`:

1. `kosci[i].rzuc()`: klasa sama sprawdza dostępność. Zablokowana zostaje bez zmian.
2. Obraz dostaje plik według `idObrazu`.
3. Oczka dodają się do sumy, także z zablokowanych kości.

Po kliknięciu kości `i`: jeśli dostępna, `zablokuj()` i `alpha = 0.5f`. Jeśli nie, `dostepna = true` i `alpha = 1f`.

Stan startowy daje `Kosc(0)`: 0 jest spoza 1..6, więc konstruktor ustawia 0 oczek i obraz `kosc0`. Suma pięciu zer to 0, tak jak w stanie 1 z arkusza.

Ślad z emulatora: pierwszy rzut 1, 1, 5, 5, 2 daje 14. Potem blokada kości 1, 2 i 4. Drugi rzut zmienia tylko kości 3 i 5: 1, 1, 2, 5, 4 daje 13.

## Składnia do zapamiętania

```kotlin
for (i in kosci.indices) {
    kosci[i].rzuc()
    obrazyKosci[i].setImageResource(obrazy[kosci[i].idObrazu])
    suma += kosci[i].oczka
}
obrazyKosci[i].setOnClickListener {
    if (kosci[i].dostepna) {
        kosci[i].zablokuj()
        obrazyKosci[i].alpha = 0.5f
    }
}
```

## Przykład

`Kosc.kt` to klasa z karty o `companion object`, bez funkcji `main` i z `package pl.egzamin.kosci` na górze. Obrazy `kosc0.png`..`kosc6.png` z archiwum leżą w `res/drawable`.

```xml activity_main.xml {6,7,13,17,19,20,62,70}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ED27C121"
    android:gravity="center"
    android:orientation="vertical">

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <ImageView
            android:id="@+id/obrazKosc1"
            android:layout_width="80dp"
            android:layout_height="80dp"
            android:layout_margin="10dp"
            android:src="@drawable/kosc0" />

        <ImageView
            android:id="@+id/obrazKosc2"
            android:layout_width="80dp"
            android:layout_height="80dp"
            android:layout_margin="10dp"
            android:src="@drawable/kosc0" />
    </LinearLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <ImageView
            android:id="@+id/obrazKosc3"
            android:layout_width="80dp"
            android:layout_height="80dp"
            android:layout_margin="10dp"
            android:src="@drawable/kosc0" />

        <ImageView
            android:id="@+id/obrazKosc4"
            android:layout_width="80dp"
            android:layout_height="80dp"
            android:layout_margin="10dp"
            android:src="@drawable/kosc0" />

        <ImageView
            android:id="@+id/obrazKosc5"
            android:layout_width="80dp"
            android:layout_height="80dp"
            android:layout_margin="10dp"
            android:src="@drawable/kosc0" />
    </LinearLayout>

    <Button
        android:id="@+id/przyciskRzut"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:backgroundTint="#ED275021"
        android:text="RZUT" />

    <TextView
        android:id="@+id/napisSuma"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="0"
        android:textSize="40sp" />

</LinearLayout>
```

1. Tło rozkładu `#ED27C121`, z kanałem alfa (R.3.2).
2. `gravity="center"`: wszystko na środku, w pionie i w poziomie (R.3.3).
3. Pierwszy rząd: dwie kości obok siebie, jak na obrazie 2.
4. Rozmiar dobrany do widoku. Arkusz go nie podaje.
5. Margines zewnętrzny obrazu 10 (R.3.3). Tak samo przy każdej kości.
6. Stan początkowy: `kosc0`, bez przezroczystości (R.3.7).
7. Tło przycisku `#ED275021` przez `backgroundTint` (R.3.2), margines 10 linię wyżej.
8. Czcionka sumy 40 (R.3.2), na starcie 0.

```kotlin MainActivity.kt {13,17,41,42,43,45,48,50,52,54}
package pl.egzamin.kosci

import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {
    private val obrazy = arrayOf(
        R.drawable.kosc0, R.drawable.kosc1, R.drawable.kosc2, R.drawable.kosc3,
        R.drawable.kosc4, R.drawable.kosc5, R.drawable.kosc6
    )
    private val kosci = arrayOf(Kosc(0), Kosc(0), Kosc(0), Kosc(0), Kosc(0))

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val obrazyKosci = arrayOf(
            findViewById<ImageView>(R.id.obrazKosc1),
            findViewById<ImageView>(R.id.obrazKosc2),
            findViewById<ImageView>(R.id.obrazKosc3),
            findViewById<ImageView>(R.id.obrazKosc4),
            findViewById<ImageView>(R.id.obrazKosc5)
        )
        val napisSuma = findViewById<TextView>(R.id.napisSuma)

        findViewById<Button>(R.id.przyciskRzut).setOnClickListener {
            var suma = 0
            for (i in kosci.indices) {
                kosci[i].rzuc()
                obrazyKosci[i].setImageResource(obrazy[kosci[i].idObrazu])
                suma += kosci[i].oczka
            }
            napisSuma.text = "$suma"
        }

        for (i in obrazyKosci.indices) {
            obrazyKosci[i].setOnClickListener {
                if (kosci[i].dostepna) {
                    kosci[i].zablokuj()
                    obrazyKosci[i].alpha = 0.5f
                } else {
                    kosci[i].dostepna = true
                    obrazyKosci[i].alpha = 1f
                }
            }
        }
    }
}
```

1. Numery obrazów: indeks równa się oczkom.
2. Pięć obiektów klasy `Kosc`, wszystkie z 0 oczek i dostępne.
3. Rzut: klasa losuje tylko dla dostępnej kości (R.3.8).
4. Obraz według `idObrazu` z klasy.
5. Suma wszystkich pięciu kości.
6. Suma w polu tekstowym pod przyciskiem (R.3.9).
7. Ta sama obsługa dla każdego obrazu (R.3.4). Każdy blok pamięta swoje `i`.
8. Dostępna: blokada.
9. Przezroczystość 50% (R.3.10).
10. Niedostępna: odblokowanie i pełna widoczność.

## Pułapki

- Losowanie wszystkich pięciu kości bez sprawdzania dostępności: zablokowane też się zmieniają i R.3.8 przepada. Tu pilnuje tego `rzuc()` z klasy.
- Przełączanie samej przezroczystości bez zmiany pola `dostepna`: obraz wygląda na zablokowany, a rzut i tak go zmienia.
- Suma liczona tylko z dostępnych kości to nie to, czego chce treść: „suma oczek z wszystkich kości”.
- `#ED27C121` i `#ED275021` przepisz w całości, z `ED` na początku.
- R.3.4 wymaga metody kliknięcia ==dla przycisku i co najmniej jednego obrazu==. Bez obsługi kliknięcia obrazów tracisz też R.3.10.
- Liczba instancji `Kosc` rośnie tu do 5, ale aplikacja mobilna jej nie wyświetla. To wymóg tylko części konsolowej.

## Powiązane

- [Kotlin: companion object i klasa Kosc](#/karta/mobilna/13-kotlin-companion-object-i-kosc)
- [Obrazy i przezroczystość z kodu](#/karta/mobilna/16-obrazy-i-przezroczystosc-z-kodu)
- [Wygląd: kolory, rozmiary, wyrównanie, marginesy](#/karta/mobilna/05-wyglad-kolory-i-wyrownanie)
- [Zadanie: klasa Kosc](#/karta/konsola/45-zadanie-klasa-kosc)
- [Testy klasy Kosc](#/karta/testy/04-test-klasy-kosc)
