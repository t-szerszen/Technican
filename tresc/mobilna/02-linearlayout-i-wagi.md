---
tytul: "LinearLayout: zagnieżdżanie, wagi, ScrollView"
dzial: mobilna
tagi: [android, xml, LinearLayout, orientation, match_parent, wrap_content, layout_weight, ScrollView, padding]
status: do-weryfikacji
zrodla:
  - https://developer.android.com/develop/ui/views/layout/linear
  - https://developer.android.com/reference/android/widget/LinearLayout
  - https://developer.android.com/reference/android/widget/ScrollView
  - Kod szablonu Empty Views Activity (Android Studio 2025.2.3) i test w emulatorze API 36
  - Arkusze INF.04 2022 cze i 2024 cze, część II
  - Zasady oceniania INF.04 2022 cze (R.3.2), 2024 cze (R.3.1, R.3.4)
arkusze: [2021 cze, 2022 cze, 2024 cze]
---

## Po co to jest

W 2022 cze i 2024 cze kryterium brzmiało tak samo: ==rozkład liniowy wertykalny z zagłębionym poziomym== (dla trzech przycisków albo pięciu obrazów). Do tego szerokości „na cały ekran” i równe odstępy. Wszystko to robi `LinearLayout` i trzy atrybuty.

## Jak to działa

`LinearLayout` układa dzieci w jednej linii: `vertical` to kolumna (jedno pod drugim), `horizontal` to wiersz (obok siebie). Bez `orientation` jest ==poziomo==, więc zawsze pisz ją jawnie.

Drzewo widoków z 2022 cze:

```tekst Drzewo widoków
ScrollView (id main)
└── LinearLayout vertical
    ├── TextView "Domek w górach"
    ├── LinearLayout horizontal
    │   ├── Button  waga 1
    │   ├── Button  waga 1
    │   └── Button  waga 1
    └── TextView "0 polubień"
```

`ScrollView` dostaje od szablonu odstęp od pasków systemu. Pionowy `LinearLayout` to kolumna z paddingiem 20dp, poziomy to wiersz, w którym każdy przycisk dostaje 1/3 szerokości.

Rozmiar każdego widoku:

| Wartość | Znaczenie |
| --- | --- |
| `match_parent` | tyle, ile ma rodzic (cała szerokość) |
| `wrap_content` | tyle, ile potrzebuje treść |
| `0dp` + `layout_weight` | reszta miejsca dzielona według wag |

Wagi krok po kroku: rodzic ma 360dp szerokości. Trzy przyciski mają `0dp`, więc zajęte jest 0dp. Wolne 360dp dzieli się w proporcji wag 1:1:1, czyli po 120dp. Waga 2:1:1 dałaby 180, 90 i 90.

Po co `ScrollView`? Szablon w `MainActivity` ustawia korzeniowi z `id=main` padding równy wysokości pasków systemu i ==nadpisuje padding z XML==. Sprawdzone w emulatorze: `paddingTop="200dp"` na korzeniu nie dał żadnego odstępu. Padding z arkusza daj więc rozkładowi w środku. `ScrollView` przy okazji przewija treść, która nie mieści się na ekranie. Może mieć tylko jedno dziecko.

## Składnia do zapamiętania

```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="Polub" />
</LinearLayout>
```

## Przykład

```xml activity_main.xml {2,11,22,25,27}
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

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <Button
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Polub" />

            <Button
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Usuń" />

            <Button
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Zapisz" />
        </LinearLayout>

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="0 polubień" />
    </LinearLayout>

</ScrollView>
```

1. Korzeń `ScrollView` z `id=main`, którego używa kod szablonu.
2. Margines wewnętrzny górny 20dp na rozkładzie pionowym, tak jak w 2022 cze (R.3.2). Tu kod szablonu go nie nadpisze.
3. Zagnieżdżony rozkład poziomy: przyciski stają obok siebie.
4. Szerokość `0dp`: przycisk nie bierze miejsca dla siebie, czeka na podział.
5. Waga 1 przy każdym z trzech przycisków: wolne miejsce dzieli się na trzy równe części.

## Pułapki

- Brak zagnieżdżonego poziomego rozkładu albo przyciski w pionie = niespełnione R.3.2 (2022 cze) i R.3.1 (2024 cze). Jeden pionowy rozkład nie wystarczy.
- `orientation` pominięte w zewnętrznym rozkładzie: wszystko staje w jednym wierszu i ucieka za ekran.
- `layout_weight` przy `layout_width="wrap_content"` dzieli tylko nadwyżkę miejsca, więc przyciski z dłuższym napisem są szersze. Dla równych części pisz `0dp`.
- W pionowym rozkładzie wagi działają na wysokość: wtedy `layout_height="0dp"`.
- `ScrollView` z dwoma dziećmi to błąd w czasie działania. Zawsze jedno dziecko, w nim cała reszta.

## Powiązane

- [Projekt Empty Views Activity i szkielet layoutu](#/karta/mobilna/01-projekt-i-szkielet-layoutu)
- [Wygląd: kolory, rozmiary, wyrównanie, marginesy](#/karta/mobilna/05-wyglad-kolory-i-wyrownanie)
- [Obrazy i zasoby: drawable, strings, colors](#/karta/mobilna/04-obrazy-i-zasoby)
