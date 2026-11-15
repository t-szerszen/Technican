---
tytul: "Zadanie: licznik polubień"
dzial: mobilna
tagi: [android, zadanie, licznik, LinearLayout, zagnieżdżony, layout_weight, ImageView, View, linia, backgroundTint, textStyle]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2022 cze, część II
  - Zasady oceniania INF.04 2022 cze (R.3.1-R.3.10)
  - https://developer.android.com/develop/ui/views/layout/linear
  - Rozwiązanie zbudowane w emulatorze API 36 z obraz.jpg z załącznika; sprawdzone przez adb (USUŃ przy 0, 5 x POLUB, USUŃ)
arkusze: [2022 cze]
---

## Po co to jest

Typ zadania: karta oferty turystycznej. Tytuł, zdjęcie na całą szerokość, trzy przyciski obok siebie na kolorowym pasku, licznik polubień wyrównany do prawej, szara linia, pogrubiony nagłówek „Opis” i szary opis. Logika jest jedna: ==licznik rośnie i maleje, ale nie schodzi poniżej zera==.

## Jak to działa

Drzewo widoków:

```tekst Drzewo widoków
ScrollView (id main)
└── LinearLayout vertical, paddingTop 20dp
    ├── TextView "Domek w górach"  30sp
    ├── ImageView obraz.jpg
    ├── LinearLayout horizontal, tło Teal
    │   ├── Button POLUB
    │   ├── Button USUŃ
    │   └── Button ZAPISZ
    ├── TextView "0 polubień"  gravity end
    ├── View  1dp, tło Gray
    ├── TextView "Opis"  bold
    └── TextView "Odwiedź..."  Gray
```

Stan aplikacji to jedna liczba. Trzymasz ją w ==polu klasy== `MainActivity`, bo musi przetrwać między kliknięciami:

| Akcja | `licznikPolubien` | Napis |
| --- | --- | --- |
| start | 0 | 0 polubień |
| USUŃ | 0 (warunek nie przepuścił) | 0 polubień |
| POLUB x5 | 5 | 5 polubień |
| USUŃ | 4 | 4 polubień |

Każda obsługa kliknięcia robi dwie rzeczy: zmienia liczbę, a potem ==wypisuje ją na nowo== w napisie. Sama zmiana zmiennej niczego na ekranie nie odświeży.

## Składnia do zapamiętania

```kotlin
private var licznikPolubien = 0

przyciskUsun.setOnClickListener {
    if (licznikPolubien > 0) {
        licznikPolubien--
    }
    napisPolubienia.text = "$licznikPolubien polubień"
}
```

## Przykład

Plik `obraz.jpg` z archiwum leży w `res/drawable`.

```xml activity_main.xml {11,17,22,28,29,35,36,62,68,74,80}
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:paddingTop="20dp">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Domek w górach"
            android:textSize="30sp" />

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:adjustViewBounds="true"
            android:src="@drawable/obraz" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="#008080"
            android:orientation="horizontal">

            <Button
                android:id="@+id/przyciskPolub"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:backgroundTint="#008080"
                android:text="POLUB"
                android:textColor="#FFFFFF" />

            <Button
                android:id="@+id/przyciskUsun"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:backgroundTint="#008080"
                android:text="USUŃ"
                android:textColor="#FFFFFF" />

            <Button
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:backgroundTint="#008080"
                android:text="ZAPISZ"
                android:textColor="#FFFFFF" />
        </LinearLayout>

        <TextView
            android:id="@+id/napisPolubienia"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="end"
            android:text="0 polubień" />

        <View
            android:layout_width="match_parent"
            android:layout_height="1dp"
            android:background="#808080" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Opis"
            android:textStyle="bold" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Odwiedź komfortowy domek w Sudetach, blisko do szlaków turystycznych"
            android:textColor="#808080" />
    </LinearLayout>

</ScrollView>
```

1. Margines wewnętrzny górny 20dp na rozkładzie pionowym (R.3.2). Na korzeniu z `id=main` zniknąłby, patrz karta o LinearLayout.
2. Tytuł: największa czcionka w aplikacji (R.3.3).
3. Obraz na całą szerokość ekranu (R.3.5).
4. Tło Teal rozkładu z przyciskami (R.3.4).
5. Zagnieżdżony rozkład poziomy dla przycisków (R.3.2).
6. Waga 1: trzy równe przyciski obok siebie.
7. Tło przycisku przez `backgroundTint`. `background` dałby kolor motywu.
8. Licznik wyrównany do prawej (R.3.3).
9. Linia horyzontalna Gray (R.3.6).
10. „Opis” pogrubiony (R.3.3).
11. Szary kolor opisu (R.3.4).

```kotlin MainActivity.kt {12,28,29,30,34,35,37}
package pl.egzamin.kosci

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {
    private var licznikPolubien = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val przyciskPolub = findViewById<Button>(R.id.przyciskPolub)
        val przyciskUsun = findViewById<Button>(R.id.przyciskUsun)
        val napisPolubienia = findViewById<TextView>(R.id.napisPolubienia)

        przyciskPolub.setOnClickListener {
            licznikPolubien++
            napisPolubienia.text = "$licznikPolubien polubień"
        }

        przyciskUsun.setOnClickListener {
            if (licznikPolubien > 0) {
                licznikPolubien--
            }
            napisPolubienia.text = "$licznikPolubien polubień"
        }
    }
}
```

1. Zmienna całkowita, na starcie 0 (R.3.7). Pole klasy, więc żyje przez cały czas działania aplikacji.
2. Obsługa POLUB.
3. Inkrementacja (R.3.7).
4. Nowa wartość w napisie (R.3.9).
5. Blokada: przy 0 nie zmniejszaj (R.3.8). Sprawdzone: USUŃ na starcie zostawia „0 polubień”.
6. Dekrementacja (R.3.7).
7. Napis odświeżany po każdym kliknięciu.

## Pułapki

- Bez zagnieżdżonego poziomego rozkładu (przyciski jeden pod drugim) przepada R.3.2.
- Tło Teal ma mieć ==i rozkład, i przyciski== (R.3.4). Sam rozkład z tłem przy przyciskach w kolorze motywu nie wystarczy.
- `licznikPolubien--`, a potem `if (licznikPolubien < 0)` też da poprawny napis, ale łatwo zapomnieć o poprawce. Warunek przed zmniejszeniem jest pewniejszy (R.3.8).
- Napis musi mieć format „<x> polubień” ze spacją. „5polubień” albo „Polubienia: 5” to inny tekst niż w treści.
- R.3.10 wymaga co najmniej 7 elementów i zrzutu ekranu ze stanem „0 polubień”. Zrób zrzut zaraz po uruchomieniu.

## Powiązane

- [LinearLayout: zagnieżdżanie, wagi, ScrollView](#/karta/mobilna/02-linearlayout-i-wagi)
- [Wygląd: kolory, rozmiary, wyrównanie, marginesy](#/karta/mobilna/05-wyglad-kolory-i-wyrownanie)
- [Kliknięcia, tekst i Toast](#/karta/mobilna/15-klikniecia-tekst-i-toast)
- [Obrazy i zasoby: drawable, strings, colors](#/karta/mobilna/04-obrazy-i-zasoby)
