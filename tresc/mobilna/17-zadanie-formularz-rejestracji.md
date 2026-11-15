---
tytul: "Zadanie: formularz rejestracji"
dzial: mobilna
tagi: [android, zadanie, formularz, EditText, textPassword, hint, walidacja, contains, onClick]
status: do-weryfikacji
zrodla:
  - Arkusz INF.04 2021 cze, część II
  - Zasady oceniania INF.04 2021 cze (R.3.1-R.3.10)
  - https://developer.android.com/reference/android/widget/TextView#attr_android:inputType
  - Rozwiązanie zbudowane w emulatorze API 36 i sprawdzone przez adb we wszystkich czterech stanach
arkusze: [2021 cze]
---

## Po co to jest

Typ zadania: ekran rejestracji konta. Nagłówek na kolorowym tle, trzy pola (e-mail z podpowiedzią i dwa hasła z ukrytymi znakami), wyśrodkowany przycisk i wyśrodkowany obszar komunikatów. Na starcie w komunikacie stoi autor z numerem zdającego, po kliknięciu jeden z trzech komunikatów zależnie od tego, co wpisano.

## Jak to działa

Plan rozwiązania:

1. XML: pionowy `LinearLayout` (R.3.2), w nim napisy, pola, przycisk i napis na komunikaty.
2. Nagłówek: tło `#008080`, biała czcionka, `textSize` większy niż reszta (R.3.3).
3. Pola `match_parent`, e-mail z `hint="email"`, hasła z `inputType="textPassword"` (R.3.4).
4. Przycisk i komunikat z `layout_gravity="center_horizontal"` (R.3.6). Komunikat startuje z tekstem „Autor: ” i numerem (R.3.7).
5. Kliknięcie: `android:onClick="zatwierdz"` (R.3.5), w funkcji odczyt trzech pól i `if`/`else if`/`else`.

Co się dzieje po kliknięciu ZATWIERDŹ:

```tekst Decyzja po kliknięciu
email.contains("@") ?
├── nie → "Nieprawidłowy adres e-mail"
└── tak → haslo == powtorzone ?
          ├── nie → "Hasła się różnią"
          └── tak → "Witaj <e-mail>"
```

## Składnia do zapamiętania

```kotlin
fun zatwierdz(view: View) {
    val email = findViewById<EditText>(R.id.poleEmail).text.toString()
    if (!email.contains("@")) {
        napisKomunikat.text = "Nieprawidłowy adres e-mail"
    } else if (haslo != powtorzone) {
        napisKomunikat.text = "Hasła się różnią"
    } else {
        napisKomunikat.text = "Witaj $email"
    }
}
```

## Przykład

Zamiast zer wpisz swój numer zdającego.

```xml activity_main.xml {6,11,13,15,27,40,58,59,66,67}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#008080"
        android:padding="10dp"
        android:text="Rejestruj konto"
        android:textColor="#FFFFFF"
        android:textSize="30sp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Podaj e-mail:"
        android:textColor="#000000" />

    <EditText
        android:id="@+id/poleEmail"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="email"
        android:inputType="textEmailAddress" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Podaj hasło:"
        android:textColor="#000000" />

    <EditText
        android:id="@+id/poleHaslo"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textPassword" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Powtórz hasło:"
        android:textColor="#000000" />

    <EditText
        android:id="@+id/polePowtorz"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textPassword" />

    <Button
        android:id="@+id/przyciskZatwierdz"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:onClick="zatwierdz"
        android:text="ZATWIERDŹ" />

    <TextView
        android:id="@+id/napisKomunikat"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:text="Autor: 00000000000"
        android:textColor="#000000" />

</LinearLayout>
```

1. Rozkład liniowy pionowy (R.3.2).
2. Tło Teal pod napisem (R.3.3).
3. Treść nagłówka.
4. Największa czcionka w aplikacji. Pozostałe napisy mają domyślny rozmiar, mniejszy.
5. Podpowiedź „email” w pustym polu (R.3.4).
6. Hasło ukryte kropkami. Drugie pole tak samo (R.3.4).
7. Przycisk wyśrodkowany (R.3.6).
8. Powiązanie przycisku z funkcją `zatwierdz` (R.3.5).
9. Obszar komunikatów wyśrodkowany.
10. Stan początkowy: autor i numer zdającego (R.3.7).

```kotlin MainActivity.kt {24,25,31,33,35}
package pl.egzamin.kosci

import android.os.Bundle
import android.view.View
import android.widget.EditText
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
    }

    fun zatwierdz(view: View) {
        val email = findViewById<EditText>(R.id.poleEmail).text.toString()
        val haslo = findViewById<EditText>(R.id.poleHaslo).text.toString()
        val powtorzone = findViewById<EditText>(R.id.polePowtorz).text.toString()
        val napisKomunikat = findViewById<TextView>(R.id.napisKomunikat)

        if (!email.contains("@")) {
            napisKomunikat.text = "Nieprawidłowy adres e-mail"
        } else if (haslo != powtorzone) {
            napisKomunikat.text = "Hasła się różnią"
        } else {
            napisKomunikat.text = "Witaj $email"
        }
    }
}
```

1. Funkcja z XML: publiczna, parametr `View`.
2. Wartości pól czytane w chwili kliknięcia.
3. Brak `@`: „Nieprawidłowy adres e-mail” (R.3.8). Sprawdzone dla `ola.szkola.pl`.
4. Różne hasła: „Hasła się różnią” (R.3.9). Sprawdzone dla `abc` i `abd`.
5. Wszystko dobrze: „Witaj ola@szkola.pl” (R.3.10). Adres wstawia szablon napisu.

## Pułapki

- Komunikaty przepisuj co do znaku, z polskimi literami: „Hasła się różnią”, nie „Hasla sie roznia”. Kryteria R.3.8-R.3.10 je cytują.
- Bez numeru zdającego w komunikacie startowym przepada R.3.7.
- Hasła porównuj zwykłym `==`/`!=`. W Kotlinie to porównanie treści.
- Pola z `wrap_content` są wąskie: arkusz chciał „rozciągniętych na całą szerokość ekranu” (R.3.4).
- Przy pustym e-mailu też ma wyjść „Nieprawidłowy adres e-mail”, bo pusty tekst nie zawiera `@`.

## Powiązane

- [TextView, Button, EditText](#/karta/mobilna/03-kontrolki-tekst-przycisk-pole)
- [Kliknięcia, tekst i Toast](#/karta/mobilna/15-klikniecia-tekst-i-toast)
- [Kotlin: if, when, operatory](#/karta/mobilna/07-kotlin-if-i-when)
- [Wygląd: kolory, rozmiary, wyrównanie, marginesy](#/karta/mobilna/05-wyglad-kolory-i-wyrownanie)
