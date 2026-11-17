# Technican — notatki INF.04

Osobista ściąga ze składni na egzamin INF.04 (technik programista). PWA na telefon, działa offline.
React 19 + Vite + TypeScript (strict), vite-plugin-pwa, czysty CSS. Opcjonalne konta:
Firebase Auth (e-mail i hasło) i Firestore z synchronizacją postępu na żywo.
Polecenia: `npm run dev`, `npm run build` (najpierw `npm run typy`), `npm run typy`, `npm run preview`,
`npm run lint`, `npm run emulator` i `npm run dev:emulator` (testy na emulatorze Firebase),
`npm run reguly -- --project <id>` (wdrożenie `firestore.rules`).

## Treść
- Karty to pliki `tresc/<dzial>/<temat>.md`. Dodanie karty = dodanie pliku, bez ruszania kodu.
- Frontmatter: `tytul`, `dzial`, `tagi`, `status` (`do-weryfikacji` albo `zweryfikowane`), `zrodla`, `arkusze`.
  Dział wyznacza folder (lista w `src/dane/dzialy.ts`); błędy we frontmatterze lecą do konsoli.
- Kolejność kart w dziale wyznacza nazwa pliku, więc zaczynaj ją od numeru, np. `01-petle.md`.
- Sekcje karty to nagłówki `##`, numerowane i wypisane w spisie treści.
- Blok kodu: ` ```python petle.py {1,3-4} ` (język, opcjonalnie plik i wyróżnione linie). Wyróżnione
  linie dostają po kolei pinezki 1, 2, 3; lista numerowana pod kodem objaśnia je w tej kolejności.
  Języki: python, kotlin, xml, html, js, jsx, css, sql, cpp, json, ts, tsx (C#, Java i PHP bez kolorów).
- Wynik programu: blok ` ```wynik ` zaraz pod kodem; `[[5]]` na końcu linii (bez `[ ]` w środku) to dane
  z klawiatury, `$ ` na początku linii to polecenie. Jednowierszowej listy list `[[1, 2]]` nie wypisuj samej w linii.
- Ramki: `> [!egzamin]`, `> [!blad]`, `> [!wskazowka]`. Zakreślacz: `==tekst==` (bez kodu w środku);
  operator `==` w tekście pisz w backtickach.

## Zasady pracy
- Wszystko po polsku: interfejs, komentarze, komunikaty commitów.
- Własne nazwy (pliki, foldery, komponenty, funkcje, zmienne) po polsku, bez polskich znaków,
  np. `ListaTematow`, `szukaj`, `oznaczUmiem`. Nazwy narzucone przez framework zostają po angielsku.
- Komentarze rzadko, tylko przy rzeczach nieoczywistych, zwyczajnym językiem. Bez JSDoc.
- Zero dokumentacji: bez README, docs, CHANGELOG, opisów architektury. Jedyne pliki .md to karty
  w `tresc/` i ten plik.
- Commity po polsku, krótkie, małe i częste, opisują, co faktycznie zrobiono,
  np. "dodaję wyszukiwarkę po tagach". Bez prefiksów feat:/fix:/chore:, bez ogólników
  ("update", "fixes", "wip", "zmiany"). Bez linii Co-Authored-By i "Generated with Claude Code".
- Tylko gałąź main. Push po każdym ukończonym etapie.
- Foldery `design/` i `Arkusze INF.04/` to materiały robocze, zostają poza repo.
- Bez emoji w kodzie i commitach, bez TODO i tekstów zastępczych.
- Kod prosty, jak pisany przez człowieka: bez nadmiaru abstrakcji i warstw.
- TypeScript strict: bez `any` i `@ts-ignore`; dane z localStorage i Firestore sprawdzaj, zanim im zaufasz.

## Firebase
- Klucze w `.env.local` (poza repo): `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`,
  `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`; wzór w `.env.example`. Bez nich konta znikają,
  a aplikacja działa na samym localStorage. Na GitHub Pages te same nazwy są zmiennymi repozytorium
  (Actions, Variables).
- Kod Firebase tylko w `src/chmura/`, importy tylko z `firebase/app`, `firebase/auth`, `firebase/firestore`.
- Jeden dokument `uzytkownicy/{uid}`: `oznaczenia` (idKarty -> `{ stan, zmieniono }`, `stan: null` to zdjęte
  oznaczenie), `motyw`, `ostatniaKarta`, `zmieniono`. Pojedyncze zmiany zapisuj przez `updateDoc` z `FieldPath`,
  nigdy nie nadpisuj całego dokumentu. Zmiana kształtu dokumentu = zmiana `firestore.rules`.
- localStorage to szybka kopia i tryb bez konta; po zalogowaniu źródłem prawdy jest Firestore.
- Testuj na emulatorze (`.env.emulator`, projekt `demo-technican`, potrzebna Java 21), nie na produkcyjnej bazie.

## Design
- Źródło: `design/Kratka — notatki INF.04.html` (paczka kilku ekranów). Tokeny kolorów
  i motyw ciemny są w `src/index.css`; trzymaj się ich zamiast wymyślać nowe kolory.
- Wynik programu jest zawsze ciemny jak terminal, w obu motywach.
- Na wąskim ekranie przewija się poziomo tylko blok kodu, nigdy cała strona.
