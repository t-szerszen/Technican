---
tytul: "Obrazy i zasoby: drawable, strings, colors"
dzial: mobilna
tagi: [android, xml, ImageView, drawable, scaleType, adjustViewBounds, alpha, strings.xml, colors.xml, zasoby]
status: do-weryfikacji
zrodla:
  - https://developer.android.com/reference/android/widget/ImageView
  - https://developer.android.com/reference/android/widget/ImageView.ScaleType
  - https://developer.android.com/guide/topics/resources/providing-resources
  - https://developer.android.com/guide/topics/resources/more-resources#Color
  - https://developer.android.com/guide/topics/resources/string-resource
  - Reguły nazw plików sprawdzone kompilacją (Android Gradle Plugin 9.0)
  - Arkusze INF.04 2022 cze, 2024 cze, 2026 sty, część II
  - Zasady oceniania INF.04 2022 cze (R.3.5), 2024 cze (R.3.2), 2026 sty (R.3.7)
arkusze: [2022 cze, 2024 cze, 2026 sty]
---

## Po co to jest

Trzy z czterech zadań mobilnych dawały obrazy w archiwum: `obraz.jpg` (2022 cze), `question.jpg` i kości (2024 cze), `kosc0.png`..`kosc6.png` (2026 sty). Obraz trzeba wrzucić do projektu, pokazać w `ImageView` i często rozciągnąć na całą szerokość (R.3.5, 2022 cze).

## Jak to działa

Wszystko w folderze `res/` to zasób. Przy kompilacji Android robi z każdego zasobu stałą w klasie `R`:

```tekst Zasób i jego nazwy
res/drawable/kosc3.png
   XML     @drawable/kosc3
   Kotlin  R.drawable.kosc3

<string name="tytul"> w strings.xml
   XML     @string/tytul
   Kotlin  R.string.tytul

<color name="bezowy"> w colors.xml
   XML     @color/bezowy
   Kotlin  R.color.bezowy

android:id="@+id/obrazKosc"
   XML     @id/obrazKosc
   Kotlin  R.id.obrazKosc
```

Rozszerzenie pliku znika: `obraz.jpg` to `@drawable/obraz`.

Dodanie obrazu: skopiuj pliki z rozpakowanego archiwum (w Eksploratorze Ctrl+C), w Android Studio kliknij folder `res/drawable` w widoku Android i wklej (Ctrl+V). Pliki lądują w `app/src/main/res/drawable`.

Atrybuty `ImageView`:

- `src`: który obraz.
- `scaleType`: jak obraz ma się zmieścić w ramce. Domyślnie `fitCenter`, czyli cały obraz, z zachowaniem proporcji, na środku. `centerCrop` wypełnia ramkę i obcina brzegi, `fitXY` rozciąga bez proporcji.
- `adjustViewBounds="true"`: ramka dopasowuje wysokość do proporcji obrazu. Z `layout_width="match_parent"` i `layout_height="wrap_content"` daje obraz na całą szerokość bez pustych pasów.
- `alpha`: przezroczystość od `0` (niewidoczny) do `1` (pełny). `0.5` to 50% z 2026 sty.

## Składnia do zapamiętania

```xml
<ImageView
    android:id="@+id/obrazDomek"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:adjustViewBounds="true"
    android:src="@drawable/obraz" />

<string name="tytul">Domek w górach</string>
<color name="bezowy">#F5F5DC</color>
```

## Przykład

Trzy pliki. Najpierw zasoby w `res/values`:

```xml strings.xml {3}
<resources>
    <string name="app_name">Kosci</string>
    <string name="tytul">Domek w górach</string>
</resources>
```

1. Napis dostępny jako `@string/tytul`.

```xml colors.xml {3}
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="bezowy">#F5F5DC</color>
    <color name="brazowy">#A52A2A</color>
</resources>
```

1. Kolor dostępny jako `@color/bezowy`.

I widok, który z nich korzysta:

```xml activity_main.xml {7,12,19,20,26,27}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="@color/bezowy">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/tytul"
        android:textColor="@color/brazowy" />

    <ImageView
        android:id="@+id/obrazDomek"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:adjustViewBounds="true"
        android:src="@drawable/obraz" />

    <ImageView
        android:id="@+id/obrazKosc"
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:alpha="0.5"
        android:src="@drawable/kosc3" />

</LinearLayout>
```

1. Kolor tła z `colors.xml`.
2. Napis z `strings.xml`.
3. Ramka dopasowana do proporcji: obraz na całą szerokość, bez pustych pasów.
4. Plik `res/drawable/obraz.jpg`, bez rozszerzenia.
5. Przezroczystość 50%.
6. Druga kość z archiwum 2026 sty, `kosc3.png`.

## Pułapki

- Nazwy plików w `res/`: tylko małe litery, cyfry i `_`, na początku litera. `Kosc1.png`, `kosc-1.png`, `kosc 1.png` i `1kosc.png` dają błąd kompilacji. Nazwy z arkuszy są poprawne, nie zmieniaj ich.
- Obraz wrzucony do `res/` zamiast do `res/drawable/` to błąd kompilacji.
- `@drawable/obraz.jpg` z rozszerzeniem to błąd. Rozszerzenie zawsze pomijasz.
- Obraz na całą szerokość: `layout_width="match_parent"`. Zasady z 2022 cze uznawały kilka sposobów (`adjustViewBounds`, `fitCenter` i inne), byle obraz miał szerokość ekranu (R.3.5).
- Przezroczystość w XML to `android:alpha`, nie kolor z kanałem alfa. Kolor `#80...` zmienia tło, a nie obraz.

## Powiązane

- [Wygląd: kolory, rozmiary, wyrównanie, marginesy](#/karta/mobilna/05-wyglad-kolory-i-wyrownanie)
- [Projekt Empty Views Activity i szkielet layoutu](#/karta/mobilna/01-projekt-i-szkielet-layoutu)
- [LinearLayout: zagnieżdżanie, wagi, ScrollView](#/karta/mobilna/02-linearlayout-i-wagi)
