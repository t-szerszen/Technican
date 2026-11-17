import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, connectAuthEmulator, indexedDBLocalPersistence, initializeAuth } from 'firebase/auth'
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'

const env = import.meta.env

const konfiguracja = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
}

function polacz() {
  const aplikacja = initializeApp(konfiguracja)

  // Ta sama trwałość sesji co w getAuth(), ale bez obsługi okienek logowania przez Google itp.,
  // która ładuje dodatkowy iframe z serwera i offline tylko by przeszkadzała.
  const auth = initializeAuth(aplikacja, { persistence: [indexedDBLocalPersistence, browserLocalPersistence] })
  auth.languageCode = 'pl'

  // Pamięć podręczna w IndexedDB: odczyt bez sieci i kolejka zapisów, wspólna dla kart przeglądarki
  const baza = initializeFirestore(aplikacja, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  })

  if (env.VITE_FIREBASE_EMULATOR === 'tak') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    connectFirestoreEmulator(baza, '127.0.0.1', 8080)
  }
  return { auth, baza }
}

// Bez kluczy w .env.local aplikacja działa jak dawniej, tylko bez kont.
export const chmura = Object.values(konfiguracja).every(Boolean) ? polacz() : null
