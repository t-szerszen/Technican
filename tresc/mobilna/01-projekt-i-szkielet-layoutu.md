---
tytul: "Projekt Empty Views Activity i szkielet layoutu"
dzial: mobilna
tagi: [android, xml, layout, projekt, szablon, LinearLayout, id, xmlns, activity_main]
status: do-weryfikacji
zrodla:
  - https://developer.android.com/develop/ui/views/layout/declaring-layout
  - https://developer.android.com/develop/ui/views/layout/linear
  - https://developer.android.com/guide/topics/resources/providing-resources
  - Szablony kreatora Android Studio 2025.2.3 (Empty Views Activity, Empty Activity), sprawdzone w plikach programu
  - Arkusze INF.04 2021 cze, 2022 cze, 2024 cze, 2026 sty, część II
  - Zasady oceniania INF.04 2021 cze (R.3.1, R.3.2), 2024 cze (R.3.1), 2026 sty (R.3.1)
arkusze: [2021 cze, 2022 cze, 2024 cze, 2026 sty]
---

## Po co to jest

Każde zadanie mobilne każe zapisać interfejs w XML i wymaga rozkładu liniowego (R.3.1, R.3.2). Zanim napiszesz pierwszy przycisk, potrzebujesz właściwego projektu i pliku `activity_main.xml` z `LinearLayout` zamiast domyślnego `ConstraintLayout`.

## Jak to działa

W kreatorze projektu (File > New > New Project) wybierz ==Empty Views Activity==, język Kotlin. Szablon „Empty Activity” to Jetpack Compose: nie ma w nim pliku XML z widokiem.

Pliki, które zmieniasz na egzaminie:

```tekst Struktura projektu
app/src/main/
├── java/pl/egzamin/kosci/
│   └── MainActivity.kt
├── res/
│   ├── layout/
│   │   └── activity_main.xml
│   ├── drawable/
│   └── values/
│       ├── strings.xml
│       └── colors.xml
└── AndroidManifest.xml
```

- `MainActivity.kt`: logika w Kotlinie.
- `activity_main.xml`: wygląd w XML.
- `drawable/`: obrazy z archiwum arkusza.
- `strings.xml` i `colors.xml`: napisy i kolory z nazwami.

Co się dzieje przy starcie aplikacji:

1. System tworzy `MainActivity` i wywołuje `onCreate`.
2. `setContentView(R.layout.activity_main)` czyta XML i z każdego znacznika robi obiekt: `<LinearLayout>` to obiekt `LinearLayout`, `<Button>` to `Button`. Zagnieżdżenie w XML to drzewo widoków.
3. Każde `android:id="@+id/nazwa"` dodaje stałą `R.id.nazwa`. Po niej Kotlin znajduje widok.

Szablon daje korzeń `ConstraintLayout` z `android:id="@+id/main"`, a `MainActivity` używa `R.id.main`, żeby odsunąć treść od pasków systemowych. Żeby zamienić rozkład na liniowy:

1. Zmień nazwę znacznika otwierającego i zamykającego na `LinearLayout`.
2. Dodaj `android:orientation="vertical"`.
3. Usuń z dzieci atrybuty `app:layout_constraint...`.
4. ==Zostaw `android:id="@+id/main"`==.

Trzy przestrzenie nazw w korzeniu: `android:` to atrybuty systemu (te piszesz prawie zawsze), `app:` to atrybuty bibliotek, `tools:` działa tylko w podglądzie edytora.

## Składnia do zapamiętania

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <!-- kontrolki jedna pod drugą -->

</LinearLayout>
```

## Przykład

`res/layout/activity_main.xml` po zamianie korzenia. `MainActivity.kt` zostaje taki, jak dał szablon.

```xml activity_main.xml {2,5,8,11,20}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/napisTytul"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Rejestruj konto" />

    <Button
        android:id="@+id/przyciskZatwierdz"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Zatwierdź" />

</LinearLayout>
```

1. Korzeń drzewa widoków. `xmlns:android` musi być w nim, inaczej żaden atrybut `android:` nie działa.
2. Każdy widok musi mieć szerokość i wysokość. Korzeń zajmuje cały ekran.
3. `tools:context` mówi tylko podglądowi, która aktywność używa pliku. Można go usunąć.
4. `@+id/` tworzy nowy identyfikator. W Kotlinie to `R.id.napisTytul`.
5. Znacznik bez dzieci zamykasz od razu przez `/>`.

## Pułapki

- Usunięty `android:id="@+id/main"` = błąd kompilacji `Unresolved reference` w `MainActivity.kt`. To błąd w Twoim pliku, więc przepadają kryteria sprawdzane w uruchomionej aplikacji (od R.3.6 w górę w 2021 cze i 2026 sty).
- Projekt z szablonu „Empty Activity” nie ma `activity_main.xml`. Interfejs ma być w XML (R.3.1), więc zaczynaj od Empty Views Activity.
- W `LinearLayout` atrybuty `app:layout_constraint...` nic nie robią. Wytnij je, żeby kod był czysty (R.1.1).
- Znacznik otwarty bez zamknięcia albo atrybut bez cudzysłowu to błąd składni. Kryteria XML liczą się tylko, gdy są „zapisane zgodnie ze składnią”.

## Powiązane

- [LinearLayout: zagnieżdżanie, wagi, ScrollView](#/karta/mobilna/02-linearlayout-i-wagi)
- [TextView, Button, EditText](#/karta/mobilna/03-kontrolki-tekst-przycisk-pole)
- [Obrazy i zasoby: drawable, strings, colors](#/karta/mobilna/04-obrazy-i-zasoby)
- [Foldery i pakowanie](#/karta/dokumentacja/04-foldery-i-pakowanie)
