import { FieldPath, Timestamp, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import type { WpisOznaczenia } from '../hooki/useOznaczenia'
import type { Motyw } from '../hooki/useMotyw'
import { chmura } from './firebase'

// Konto, z którym to urządzenie jest już zgrane. Dopóki go nie ma (brak logowania albo
// trwa pierwsze scalanie), zmiany zostają tylko w localStorage i dojdą przy scalaniu.
let uid: string | null = null

export function ustawZgraneKonto(nowe: string | null) {
  uid = nowe
}

export function wpisDoChmury(wpis: WpisOznaczenia) {
  return { stan: wpis.stan, zmieniono: Timestamp.fromMillis(wpis.zmieniono) }
}

// Zmieniamy jedno pole, a nie cały dokument, więc dwa urządzenia ruszające różne karty
// nie nadpisują sobie danych. Offline zapis czeka w kolejce Firestore, dlatego bez await.
function zmienPole(pole: string | FieldPath, wartosc: unknown) {
  if (!chmura || !uid) return
  updateDoc(doc(chmura.baza, 'uzytkownicy', uid), pole, wartosc, 'zmieniono', serverTimestamp()).catch((blad) =>
    console.error('Nie udało się zapisać zmiany w chmurze:', blad),
  )
}

export function wyslijOznaczenie(idKarty: string, wpis: WpisOznaczenia) {
  // FieldPath zamiast "oznaczenia.konsola/01-petle", bo ukośnik w ścieżce z kropkami jest niedozwolony
  zmienPole(new FieldPath('oznaczenia', idKarty), wpisDoChmury(wpis))
}

export function wyslijMotyw(motyw: Motyw | null) {
  zmienPole('motyw', motyw)
}

export function wyslijOstatnia(idKarty: string) {
  zmienPole('ostatniaKarta', idKarty)
}
