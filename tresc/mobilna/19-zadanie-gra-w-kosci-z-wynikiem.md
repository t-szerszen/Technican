---
tytul: "Zadanie: gra w kości z wynikiem gry"
dzial: mobilna
tagi: [android, zadanie, gra w kości, ImageView, setImageResource, Random, punkty, reset, backgroundTint, layout_weight]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2024 cze, część I (zasada liczenia punktów) i część II
  - Zasady oceniania INF.04 2024 cze (R.3.1-R.3.10)
  - https://developer.android.com/reference/android/widget/ImageView#setImageResource(int)
  - Rozwiązanie zbudowane w emulatorze API 36, trzy rzuty i reset sprawdzone przez adb; funkcja punktów sprawdzona kotlinc na przykładach z arkusza
  - Archiwum pliki1.zip z 2024 cze nie było w materiałach, więc w teście obrazy kości z 2026 sty i zastępczy question.jpg
arkusze: [2024 cze]
---

## Po co to jest

Typ zadania: gra w pięć kości. Przycisk rzuca wszystkimi naraz, obrazy pokazują oczka, jeden napis podaje punkty za ten rzut, a drugi sumę z całej gry. Drugi przycisk resetuje grę i przywraca obraz znaku zapytania. ==Punkty liczy się tą samą regułą co w części konsolowej==: sumuje się oczka, które wypadły co najmniej dwa razy.

## Jak to działa

Plan rozwiązania:

1. XML: pionowy rozkład z tłem Beige, w nim poziomy z białym tłem na pięć obrazów (R.3.1, R.3.3).
2. Pięć `ImageView` z `question` na starcie, waga 1, wysokość 60dp, margines 9dp (R.3.2, R.3.4).
3. Tytuł z tłem Brown i białą, największą czcionką. Przyciski z tłem Chocolate (R.3.3).
4. W Kotlinie: pole `wynikGry`, tablica numerów obrazów, tablica pięciu `ImageView`.
5. RZUĆ KOŚĆMI: losowanie 5 liczb, podmiana obrazów, punkty, dodanie do wyniku gry (R.3.7, R.3.8).
6. RESETUJ WYNIK: obrazy `question`, wynik gry 0, oba napisy z 0 (R.3.9).

Reguła punktów dla rzutu 6, 2, 5, 6, 4 (sprawdzony w emulatorze):

| Oczka | Ile razy w rzucie | Dodane |
| --- | --- | --- |
| 6 | 2 | 6 |
| 2 | 1 | 0 |
| 5 | 1 | 0 |
| 6 | 2 | 6 |
| 4 | 1 | 0 |

Razem 12. Dla przykładów z arkusza funkcja daje 14 (1, 5, 2, 2, 5) i 6 (2, 1, 2, 3, 2).

Tablica obrazów ma `question` na pozycji 0, a ściany kości na pozycjach 1..6. Dzięki temu `obrazy[oczka]` od razu daje właściwy obraz.

## Składnia do zapamiętania

```kotlin
for (i in oczka.indices) {
    oczka[i] = Random.nextInt(1, 7)
    obrazyKosci[i].setImageResource(obrazy[oczka[i]])
}
val punkty = policzPunkty(oczka)
wynikGry += punkty
napisWynikGry.text = "Wynik gry: $wynikGry"
```

## Przykład

Zamiast zer wpisz swój numer zdającego. Nazwy obrazów kości przepisz z archiwum: tu są `kosc1`..`kosc6`, bo archiwum z 2024 nie było pod ręką. Wysokość 60 i margines 9 arkusz podaje dla emulacji Pixel 5.

```xml activity_main.xml {6,14,19,28,34,35,40,41,42,43}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#F5F5DC"
    android:orientation="vertical">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        android:layout_marginBottom="10dp"
        android:background="#A52A2A"
        android:gravity="center"
        android:padding="10dp"
        android:text="Gra w kości. Autor: 00000000000"
        android:textColor="#FFFFFF"
        android:textSize="24sp" />

    <Button
        android:id="@+id/przyciskRzuc"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="10dp"
        android:layout_marginBottom="10dp"
        android:backgroundTint="#D2691E"
        android:text="RZUĆ KOŚĆMI" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#FFFFFF"
        android:orientation="horizontal">

            <ImageView
                android:id="@+id/obrazKosc1"
                android:layout_width="0dp"
                android:layout_height="60dp"
                android:layout_margin="9dp"
                android:layout_weight="1"
                android:src="@drawable/question" />

            <ImageView
                android:id="@+id/obrazKosc2"
                android:layout_width="0dp"
                android:layout_height="60dp"
                android:layout_margin="9dp"
                android:layout_weight="1"
                android:src="@drawable/question" />

            <ImageView
                android:id="@+id/obrazKosc3"
                android:layout_width="0dp"
                android:layout_height="60dp"
                android:layout_margin="9dp"
                android:layout_weight="1"
                android:src="@drawable/question" />

            <ImageView
                android:id="@+id/obrazKosc4"
                android:layout_width="0dp"
                android:layout_height="60dp"
                android:layout_margin="9dp"
                android:layout_weight="1"
                android:src="@drawable/question" />

            <ImageView
                android:id="@+id/obrazKosc5"
                android:layout_width="0dp"
                android:layout_height="60dp"
                android:layout_margin="9dp"
                android:layout_weight="1"
                android:src="@drawable/question" />
    </LinearLayout>

    <TextView
        android:id="@+id/napisWynikLosowania"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="10dp"
        android:layout_marginBottom="10dp"
        android:text="Wynik tego losowania: 0" />

    <TextView
        android:id="@+id/napisWynikGry"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="10dp"
        android:layout_marginBottom="10dp"
        android:text="Wynik gry: 0" />

    <Button
        android:id="@+id/przyciskResetuj"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="10dp"
        android:layout_marginBottom="10dp"
        android:backgroundTint="#D2691E"
        android:text="RESETUJ WYNIK" />

</LinearLayout>
```

1. Tło całej strony: Beige (R.3.3).
2. Tło tytułu: Brown.
3. Tytuł ma największą czcionkę w aplikacji.
4. Tło przycisku: Chocolate, przez `backgroundTint`.
5. Tło rozkładu z obrazami: białe.
6. Rozkład poziomy zagnieżdżony w pionowym (R.3.1).
7. Wysokość obrazu 60dp.
8. Margines 9dp: obrazy się nie stykają (R.3.4).
9. Waga 1: pięć obrazów dzieli szerokość po równo.
10. Stan początkowy: znak zapytania (R.3.2). Pozostałe cztery obrazy tak samo, z id `obrazKosc2`..`obrazKosc5`.

```kotlin MainActivity.kt {14,16,30,41,43,44,46,47,54,56,62,71}
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
    private var wynikGry = 0
    private val obrazy = arrayOf(
        R.drawable.question, R.drawable.kosc1, R.drawable.kosc2, R.drawable.kosc3,
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

        val obrazyKosci = arrayOf(
            findViewById<ImageView>(R.id.obrazKosc1),
            findViewById<ImageView>(R.id.obrazKosc2),
            findViewById<ImageView>(R.id.obrazKosc3),
            findViewById<ImageView>(R.id.obrazKosc4),
            findViewById<ImageView>(R.id.obrazKosc5)
        )
        val napisWynikLosowania = findViewById<TextView>(R.id.napisWynikLosowania)
        val napisWynikGry = findViewById<TextView>(R.id.napisWynikGry)

        findViewById<Button>(R.id.przyciskRzuc).setOnClickListener {
            val oczka = arrayOf(0, 0, 0, 0, 0)
            for (i in oczka.indices) {
                oczka[i] = Random.nextInt(1, 7)
                obrazyKosci[i].setImageResource(obrazy[oczka[i]])
            }
            val punkty = policzPunkty(oczka)
            wynikGry += punkty
            napisWynikLosowania.text = "Wynik tego losowania: $punkty"
            napisWynikGry.text = "Wynik gry: $wynikGry"
        }

        findViewById<Button>(R.id.przyciskResetuj).setOnClickListener {
            for (obraz in obrazyKosci) {
                obraz.setImageResource(R.drawable.question)
            }
            wynikGry = 0
            napisWynikLosowania.text = "Wynik tego losowania: 0"
            napisWynikGry.text = "Wynik gry: 0"
        }
    }

    private fun policzPunkty(oczka: Array<Int>): Int {
        var punkty = 0
        for (wartosc in oczka) {
            var ile = 0
            for (inna in oczka) {
                if (inna == wartosc) {
                    ile++
                }
            }
            if (ile >= 2) {
                punkty += wartosc
            }
        }
        return punkty
    }
}
```

1. Wynik gry: pole klasy, rośnie między rzutami.
2. Pozycja 0 to `question`, pozycje 1..6 to ściany kości.
3. Pięć kontrolek obrazu w tablicy, żeby obsłużyć je pętlą (R.3.6).
4. Miejsce na pięć wyników rzutu.
5. Losowanie od 1 do 6.
6. Obraz odpowiadający oczkom (R.3.7).
7. Punkty za ten rzut z funkcji.
8. Wynik gry powiększony o punkty rzutu (R.3.8).
9. Reset: każdy obraz wraca do `question` (R.3.9).
10. Wynik gry wyzerowany, potem oba napisy z 0.
11. Funkcja z regułą z części konsolowej.
12. Oczka liczą się tylko, gdy wypadły co najmniej dwa razy.

## Pułapki

- Wynik gry nadpisywany (`wynikGry = punkty`) zamiast powiększany (`+=`): przepada R.3.8.
- Reset, który zeruje tylko zmienną, a zostawia stare napisy albo obrazy, nie spełnia R.3.9. Zmień wszystkie trzy rzeczy.
- `android:background` na przyciskach nie da koloru Chocolate w projekcie z szablonu. Używaj `backgroundTint`.
- Obrazy bez marginesu stykają się ze sobą, a bez wagi nie wypełniają szerokości. Oba warunki są w R.3.4.
- Zasady sprawdzają logikę ==obowiązkowo w kodzie==, nawet gdy zrzut pokazuje dobry wynik (R.3.7-R.3.9).

## Powiązane

- [Obrazy i przezroczystość z kodu](#/karta/mobilna/16-obrazy-i-przezroczystosc-z-kodu)
- [Kotlin: pętle i zakresy](#/karta/mobilna/08-kotlin-petle-i-zakresy)
- [Kotlin: kolekcje i losowanie](#/karta/mobilna/10-kotlin-kolekcje-i-losowanie)
- [Zadanie: gra w kości](#/karta/konsola/46-zadanie-gra-w-kosci)
