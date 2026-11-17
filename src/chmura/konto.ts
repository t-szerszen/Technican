import { useSyncExternalStore } from 'react'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { chmura } from './firebase'

// undefined: Firebase jeszcze wczytuje zapamiętaną sesję
let uzytkownik: User | null | undefined = chmura ? undefined : null
const sluchacze = new Set<() => void>()

if (chmura) {
  onAuthStateChanged(chmura.auth, (nowy) => {
    uzytkownik = nowy
    sluchacze.forEach((sluchacz) => sluchacz())
  })
}

function subskrybuj(sluchacz: () => void) {
  sluchacze.add(sluchacz)
  return () => {
    sluchacze.delete(sluchacz)
  }
}

export function useUzytkownik() {
  return useSyncExternalStore(subskrybuj, () => uzytkownik)
}

function auth() {
  if (!chmura) throw new Error('Konta są wyłączone: brak konfiguracji Firebase')
  return chmura.auth
}

export async function zaloguj(email: string, haslo: string) {
  await signInWithEmailAndPassword(auth(), email.trim(), haslo)
}

export async function zarejestruj(email: string, haslo: string) {
  await createUserWithEmailAndPassword(auth(), email.trim(), haslo)
}

export async function wyslijResetHasla(email: string) {
  await sendPasswordResetEmail(auth(), email.trim())
}

export async function wyloguj() {
  await signOut(auth())
}

const KOMUNIKATY: Record<string, string> = {
  'auth/invalid-credential': 'Nieprawidłowy e-mail lub hasło.',
  'auth/wrong-password': 'Nieprawidłowy e-mail lub hasło.',
  'auth/user-not-found': 'Nie ma konta z tym adresem e-mail.',
  'auth/invalid-email': 'To nie wygląda na adres e-mail.',
  'auth/missing-email': 'Wpisz adres e-mail.',
  'auth/missing-password': 'Wpisz hasło.',
  'auth/email-already-in-use': 'Konto z tym adresem już istnieje. Zaloguj się albo zresetuj hasło.',
  'auth/weak-password': 'Hasło jest za słabe. Musi mieć co najmniej 6 znaków.',
  'auth/password-does-not-meet-requirements': 'Hasło nie spełnia wymagań. Dodaj więcej znaków, cyfry albo wielkie litery.',
  'auth/too-many-requests': 'Za dużo prób. Odczekaj chwilę i spróbuj ponownie.',
  'auth/network-request-failed': 'Brak połączenia z internetem. Do logowania potrzebna jest sieć.',
  'auth/user-disabled': 'To konto zostało zablokowane.',
  'auth/operation-not-allowed': 'Logowanie e-mailem nie jest włączone w projekcie Firebase.',
  'auth/invalid-api-key': 'Zły klucz Firebase w konfiguracji aplikacji.',
  'auth/quota-exceeded': 'Wyczerpany limit wiadomości. Spróbuj później.',
  'auth/internal-error': 'Błąd po stronie Firebase. Spróbuj ponownie za chwilę.',
}

export function komunikatBledu(blad: unknown) {
  if (blad instanceof FirebaseError) {
    if (KOMUNIKATY[blad.code]) return KOMUNIKATY[blad.code]
    if (blad.code.startsWith('auth/api-key-not-valid')) return KOMUNIKATY['auth/invalid-api-key']
    return `Coś poszło nie tak (${blad.code}). Spróbuj ponownie.`
  }
  return 'Coś poszło nie tak. Spróbuj ponownie.'
}
