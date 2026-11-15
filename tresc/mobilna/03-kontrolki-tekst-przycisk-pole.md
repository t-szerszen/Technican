---
tytul: "TextView, Button, EditText"
dzial: mobilna
tagi: [android, xml, TextView, Button, EditText, hint, inputType, textPassword, textEmailAddress]
status: do-weryfikacji
zrodla:
  - https://developer.android.com/reference/android/widget/TextView
  - https://developer.android.com/reference/android/widget/EditText
  - https://developer.android.com/develop/ui/views/components/button
  - Plik attrs.xml z Android SDK 36 (wartości android:inputType)
  - Arkusz INF.04 2021 cze, część II
  - Zasady oceniania INF.04 2021 cze (R.3.3, R.3.4, R.3.6)
arkusze: [2021 cze, 2022 cze, 2024 cze, 2026 sty]
---

## Po co to jest

Trzy kontrolki, z których składa się prawie każdy ekran z arkusza: napis, przycisk i pole do wpisywania. W 2021 cze był formularz rejestracji, a punkty szły za pole z podpowiedzią „email” i ==pola haseł, które ukrywają znaki== (R.3.4).

## Jak to działa

| Znacznik | Co robi |
| --- | --- |
| `TextView` | wyświetla napis |
| `Button` | przycisk do kliknięcia |
| `EditText` | pole, w które wpisuje użytkownik |

`EditText` to w środku `TextView`, który da się edytować, więc ma te same atrybuty wyglądu.

`hint` to szary napis widoczny tylko wtedy, gdy pole jest puste. Znika przy pierwszym znaku i nie jest wartością pola: odczytane puste pole daje `""`, a nie tekst podpowiedzi.

`inputType` mówi systemowi, jaką klawiaturę pokazać i czy ukrywać znaki:

| `android:inputType` | Efekt |
| --- | --- |
| `text` | zwykły tekst |
| `textPassword` | kropki zamiast liter |
| `textEmailAddress` | klawiatura z `@` |
| `number` | tylko cyfry |
| `numberPassword` | cyfry ukryte kropkami |

Kolejność w `LinearLayout` pionowym = kolejność na ekranie. Napis nad polem to po prostu `TextView` przed `EditText`.

## Składnia do zapamiętania

```xml
<EditText
    android:id="@+id/poleEmail"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="email"
    android:inputType="textEmailAddress" />
```

## Przykład

Formularz w stylu 2021 cze (bez drugiego hasła, żeby karta była krótka).

```xml activity_main.xml {15,17,18,29,35}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Podaj e-mail:" />

    <EditText
        android:id="@+id/poleEmail"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="email"
        android:inputType="textEmailAddress" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Podaj hasło:" />

    <EditText
        android:id="@+id/poleHaslo"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:inputType="textPassword" />

    <Button
        android:id="@+id/przyciskZatwierdz"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:text="Zatwierdź" />

    <TextView
        android:id="@+id/napisKomunikat"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:text="Autor: 00000000000" />

</LinearLayout>
```

1. `match_parent`: pole rozciągnięte na całą szerokość ekranu (R.3.4).
2. Podpowiedź w pustym polu.
3. Klawiatura do adresów e-mail.
4. Hasło ukryte kropkami (R.3.4).
5. Przycisk wyśrodkowany w poziomie (R.3.6). Dokładniej o tym w karcie o wyglądzie.

## Pułapki

- Podpowiedź wpisana jako `android:text="email"` zamiast `hint`: pole startuje z tekstem, który trzeba skasować, a kryterium mówi o podpowiedzi (R.3.4).
- Pole hasła bez `inputType="textPassword"` pokazuje hasło jawnie i traci R.3.4.
- `EditText` z `wrap_content` w szerokości jest wąskie jak jego treść. Arkusz chciał pól „rozciągniętych na całą szerokość ekranu”.
- Polskie znaki w `android:text` są w porządku, plik jest w UTF-8. Napisy przepisuj z arkusza dokładnie, bo kryteria cytują je co do znaku („Hasła się różnią”).
- Studio podkreśla wpisany na sztywno tekst i proponuje `strings.xml`. To tylko ostrzeżenie, aplikacja się kompiluje.

## Powiązane

- [Wygląd: kolory, rozmiary, wyrównanie, marginesy](#/karta/mobilna/05-wyglad-kolory-i-wyrownanie)
- [Obrazy i zasoby: drawable, strings, colors](#/karta/mobilna/04-obrazy-i-zasoby)
- [Projekt Empty Views Activity i szkielet layoutu](#/karta/mobilna/01-projekt-i-szkielet-layoutu)
