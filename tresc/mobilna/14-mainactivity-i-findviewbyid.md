---
tytul: "MainActivity, onCreate i findViewById"
dzial: mobilna
tagi: [android, kotlin, MainActivity, onCreate, setContentView, findViewById, R.id, text, ViewBinding]
status: do-weryfikacji
zrodla:
  - https://developer.android.com/guide/components/activities/activity-lifecycle#oncreate
  - https://developer.android.com/develop/ui/views/layout/declaring-layout#load
  - https://developer.android.com/topic/libraries/view-binding
  - Kod szablonu Empty Views Activity (Android Studio 2025.2.3)
  - Przykład zbudowany i uruchomiony w emulatorze API 36
  - Zasady oceniania INF.04 2021 cze (R.3.7), 2024 cze (R.3.6), 2026 sty (R.3.5)
arkusze: [2021 cze, 2022 cze, 2024 cze, 2026 sty]
---

## Po co to jest

Kryterium z 2024 cze i 2026 sty: „program odwołuje się do kontrolek w sposób właściwy dla danego środowiska” (R.3.6 i R.3.5). Na Androidzie z XML to ==`findViewById`==. Bez tego Kotlin nie zmieni żadnego napisu ani obrazu.

## Jak to działa

Co się dzieje po uruchomieniu aplikacji:

```tekst Start aplikacji
system tworzy MainActivity
        ↓
onCreate(...)
        ↓
setContentView(R.layout.activity_main)
  XML → drzewo obiektów widoków
        ↓
findViewById(R.id.napisTytul)
  szuka w drzewie widoku o tym id
        ↓
napisTytul.text = "Gra w kości"
  zmiana widoczna na ekranie
```

`findViewById` działa tylko ==po== `setContentView`. Wcześniej drzewa jeszcze nie ma.

Typ widoku musisz podać jednym z dwóch zapisów. Oba robią to samo:

- `val napis = findViewById<TextView>(R.id.napis)`: typ w ostrych nawiasach.
- `val napis: TextView = findViewById(R.id.napis)`: typ przy zmiennej.

Typ to nazwa znacznika z XML: `<TextView>` to `TextView`, `<Button>` to `Button`, `<ImageView>` to `ImageView`. Każdy trzeba zaimportować (`import android.widget.TextView`). Android Studio podpowie import po Alt+Enter.

`napis.text = "..."` w Kotlinie to to samo, co `napis.setText("...")` w Javie. Kotlin zamienia parę `getText`/`setText` w pole `text`.

ViewBinding to inna droga do kontrolek, ale ==trzeba go włączyć== w `build.gradle.kts` (`buildFeatures { viewBinding = true }`). `findViewById` działa od razu, bez zmian w konfiguracji.

## Składnia do zapamiętania

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    val napisTytul = findViewById<TextView>(R.id.napisTytul)
    napisTytul.text = "Gra w kości"
}
```

## Przykład

Layout ma dwa puste `TextView` z id `napisTytul` i `napisAutor`. Tekst nadaje dopiero kod.

```kotlin MainActivity.kt {4,11,14,15,21,22,24}
package pl.egzamin.kosci

import android.os.Bundle
import android.widget.TextView
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

        val napisTytul = findViewById<TextView>(R.id.napisTytul)
        val napisAutor: TextView = findViewById(R.id.napisAutor)

        napisTytul.text = "Gra w kości"
        napisAutor.text = "Autor: 00000000000"
    }
}
```

1. Import klasy widoku, którego używasz.
2. `onCreate`: tu przygotowujesz ekran.
3. XML zamieniony w drzewo widoków.
4. Blok z szablonu: odsuwa treść od pasków systemu. Zostaw go.
5. Odwołanie do kontrolki: typ w ostrych nawiasach.
6. To samo, z typem przy zmiennej.
7. Ustawienie tekstu z kodu. Na emulatorze widać „Gra w kości” i „Autor: 00000000000”.

## Pułapki

- `findViewById` przed `setContentView` zwraca `null` i aplikacja pada przy pierwszym użyciu widoku.
- `R.id.nazwa` musi być dokładnie jak `android:id="@+id/nazwa"` w XML, z wielkością liter.
- Typ niezgodny ze znacznikiem (`findViewById<Button>` dla `<TextView>`) kompiluje się, ale wysypuje aplikację `ClassCastException` przy starcie.
- Zmienne z `val` w `onCreate` istnieją tylko w `onCreate`. Jeśli widok potrzebny jest w osobnej funkcji, pobierz go tam jeszcze raz `findViewById` albo zrób z niego pole klasy.
- Brak importu: `Unresolved reference 'TextView'`. Błąd w Twoim pliku, więc aplikacja się nie uruchomi.

## Powiązane

- [Kliknięcia, tekst i Toast](#/karta/mobilna/15-klikniecia-tekst-i-toast)
- [Obrazy i przezroczystość z kodu](#/karta/mobilna/16-obrazy-i-przezroczystosc-z-kodu)
- [Projekt Empty Views Activity i szkielet layoutu](#/karta/mobilna/01-projekt-i-szkielet-layoutu)
- [Kotlin: null safety i toIntOrNull](#/karta/mobilna/11-kotlin-null-safety)
