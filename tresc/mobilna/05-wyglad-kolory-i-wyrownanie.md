---
tytul: "Wygląd: kolory, rozmiary, wyrównanie, marginesy"
dzial: mobilna
tagi: [android, xml, kolor, AARRGGBB, textSize, sp, dp, textStyle, gravity, layout_gravity, margin, padding, backgroundTint, linia]
status: do-weryfikacji
zrodla:
  - https://developer.android.com/guide/topics/resources/more-resources#Color
  - https://developer.android.com/guide/topics/resources/more-resources#Dimension
  - https://developer.android.com/reference/android/widget/TextView
  - https://developer.android.com/reference/android/widget/LinearLayout
  - https://github.com/material-components/material-components-android/blob/master/docs/components/CommonButton.md
  - Zachowanie android:background i android:backgroundTint na przycisku sprawdzone w emulatorze API 36 (motyw Material3 z szablonu)
  - Arkusze INF.04 2021 cze, 2022 cze, 2024 cze, 2026 sty, część II
  - Zasady oceniania INF.04 2021 cze (R.3.3), 2022 cze (R.3.3, R.3.4, R.3.6), 2024 cze (R.3.3, R.3.4), 2026 sty (R.3.2, R.3.3)
arkusze: [2021 cze, 2022 cze, 2024 cze, 2026 sty]
---

## Po co to jest

Połowa kryteriów mobilnych to wygląd sprawdzany ==w kodzie==: konkretny kolor tła, rozmiar czcionki 40, marginesy 10, pogrubienie, wyrównanie do prawej, linia pozioma. Liczby i kolory z arkusza muszą stać w XML dosłownie.

## Jak to działa

**Kolor** zapisujesz szesnastkowo. Przy ośmiu cyfrach ==pierwsza para to przezroczystość==, nie czerwień:

```tekst Kolor #ED27C121
 ED   27   C1   21
 │    │    │    └ niebieski  33
 │    │    └ zielony  193
 │    └ czerwony  39
 └ alfa  237 z 255
```

`#RRGGBB` (6 cyfr) to kolor bez przezroczystości: Teal `#008080`, Gray `#808080`, biały `#FFFFFF`.

**Jednostki:** `sp` dla rozmiaru tekstu (rośnie razem z ustawieniem czcionki w telefonie), `dp` dla całej reszty. Arkusz pisze „rozmiar czcionki 40” i „marginesy 10” bez jednostek: zapisujesz `40sp` i `10dp`.

**Margines i padding** liczą się od krawędzi widoku w przeciwne strony:

```tekst Margin i padding
┌──────── rodzic ────────┐
│     layout_margin      │
│  ┌───── widok ──────┐  │
│  │     padding      │  │
│  │    [ treść ]     │  │
│  └──────────────────┘  │
└────────────────────────┘
```

Margines to odstęp na zewnątrz, od sąsiadów i od rodzica. Padding to odstęp w środku, między krawędzią widoku a treścią. Tło widoku obejmuje padding, marginesu już nie.

**Wyrównanie** ma dwa atrybuty, które łatwo pomylić:

| Atrybut | Co przesuwa |
| --- | --- |
| `gravity` | zawartość: dzieci kontenera albo tekst w ramce napisu |
| `layout_gravity` | widok sam siebie w rodzicu |

W pionowym `LinearLayout` dziecko przesuniesz `layout_gravity` tylko w poziomie (`center_horizontal`, `end`). Napis z `layout_width="match_parent"` zajmuje całą szerokość, więc tekst w nim wyrównujesz przez `gravity` (`center`, `end`).

## Składnia do zapamiętania

```xml
android:background="#ED27C121"
android:backgroundTint="#ED275021"
android:textColor="#FFFFFF"
android:textSize="40sp"
android:textStyle="bold"
android:layout_margin="10dp"
android:paddingTop="20dp"
android:gravity="center"
android:layout_gravity="center_horizontal"
```

## Przykład

```xml activity_main.xml {7,8,17,19,25,31,37,44}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="#ED27C121"
    android:gravity="center_horizontal">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#008080"
        android:gravity="center"
        android:padding="10dp"
        android:text="Rejestruj konto"
        android:textColor="#FFFFFF"
        android:textSize="30sp"
        android:textStyle="bold" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:backgroundTint="#ED275021"
        android:text="Rzut"
        android:textColor="#FFFFFF" />

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:background="#808080" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="end"
        android:text="0 polubień" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="0"
        android:textSize="40sp" />

</LinearLayout>
```

1. Tło całego rozkładu z kanałem alfa (2026 sty, R.3.2).
2. `gravity` kontenera: wszystkie dzieci na środku w poziomie (2026 sty, R.3.3).
3. Biała czcionka na tle Teal (2021 cze, R.3.3).
4. Pogrubienie (2022 cze, napis „Opis”).
5. Tło przycisku przez `backgroundTint`, nie `background`. Wyjaśnienie w pułapkach.
6. Linia pozioma: pusty `View` o wysokości 1dp z tłem Gray (2022 cze, R.3.6).
7. `gravity="end"`: tekst przy prawej krawędzi (2022 cze, R.3.3).
8. Rozmiar czcionki pola z wynikiem: 40 (2026 sty, R.3.2).

## Pułapki

- ==`android:background` na `<Button>` nie działa== w projekcie z szablonu. Motyw Material3 zamienia `<Button>` na `MaterialButton`, który nakłada swój kolor. Sprawdzone w emulatorze: `background="#008080"` dał fioletowy przycisk, `backgroundTint="#008080"` dał Teal. Kryterium koloru przycisku (2022 cze, 2024 cze, 2026 sty) sprawdzają też na zrzucie.
- `#ED27C121` przepisz w całości, z alfą. Zgubione `ED` to inny zapis niż w arkuszu.
- Napis do prawej przez `layout_gravity="end"` przy `layout_width="match_parent"` nic nie zmieni: widok i tak ma całą szerokość. Wtedy `gravity="end"`.
- „Największa czcionka” tytułu (2021 cze, 2022 cze, 2024 cze) musi być największa w całym pliku. Sprawdź, czy żaden inny `textSize` nie jest większy.
- Linia z `View` musi mieć `layout_height` w `dp` i kolor tła. Bez tła jest niewidoczna.
- `textSize="40"` bez jednostki to błąd kompilacji. Zawsze `sp` albo `dp`.

## Powiązane

- [TextView, Button, EditText](#/karta/mobilna/03-kontrolki-tekst-przycisk-pole)
- [LinearLayout: zagnieżdżanie, wagi, ScrollView](#/karta/mobilna/02-linearlayout-i-wagi)
- [Obrazy i zasoby: drawable, strings, colors](#/karta/mobilna/04-obrazy-i-zasoby)
