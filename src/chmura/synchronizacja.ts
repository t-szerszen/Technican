import { useSyncExternalStore } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Timestamp, doc, onSnapshot, serverTimestamp, setDoc, type DocumentSnapshot } from 'firebase/firestore'
import { czytajZPamieci, zapiszWPamieci } from '../hooki/pamiec'
import { jakoMotyw, przyjmijMotyw, wybranyMotyw, type Motyw } from '../hooki/useMotyw'
import { przyjmijOstatnia, ostatniaKarta } from '../hooki/useOstatniaKarta'
import { przyjmijOznaczenia, wpisyOznaczen, type WpisyOznaczen } from '../hooki/useOznaczenia'
import { chmura } from './firebase'
import { scal, type SpornaKarta, type Wybor } from './scalanie'
import { ustawZgraneKonto, wpisDoChmury } from './zapis'

export type StanSynchronizacji =
  | 'bez-konta'
  | 'laczenie'
  | 'pytanie'
  | 'zapisywanie'
  | 'offline'
  | 'zsynchronizowano'
  | 'blad'

// uid konta, z którym localStorage był już scalony. Jeśli loguje się ktoś inny albo to samo
// konto po wylogowaniu, lokalne oznaczenia trzeba najpierw scalić z chmurą.
const KLUCZ_KONTA = 'kratka:konto'

let stan: StanSynchronizacji = 'bez-konta'
let sporne: SpornaKarta[] = []
const sluchacze = new Set<() => void>()

let uid: string | null = null
let zgrane = false
let ostatniOdczyt: DocumentSnapshot | null = null
let przestanSluchac: (() => void) | null = null

function ustawStan(nowy: StanSynchronizacji) {
  stan = nowy
  sluchacze.forEach((sluchacz) => sluchacz())
}

interface Dokument {
  oznaczenia: WpisyOznaczen
  // undefined: pola nie ma w dokumencie, więc nie ma czego przyjmować
  motyw: Motyw | null | undefined
  ostatniaKarta: string | null | undefined
}

// Dokument przychodzi z sieci, więc każde pole sprawdzamy, zamiast ufać typom
function czytajDokument(odczyt: DocumentSnapshot): Dokument {
  const dane = odczyt.data() ?? {}
  const oznaczenia: WpisyOznaczen = {}
  if (dane.oznaczenia && typeof dane.oznaczenia === 'object') {
    for (const [id, wartosc] of Object.entries(dane.oznaczenia)) {
      if (!wartosc || typeof wartosc !== 'object') continue
      const { stan, zmieniono } = wartosc as Record<string, unknown>
      oznaczenia[id] = {
        stan: stan === 'umiem' || stan === 'powtorka' ? stan : null,
        zmieniono: zmieniono instanceof Timestamp ? zmieniono.toMillis() : 0,
      }
    }
  }
  return {
    oznaczenia,
    motyw: 'motyw' in dane ? jakoMotyw(dane.motyw) : undefined,
    ostatniaKarta: typeof dane.ostatniaKarta === 'string' ? dane.ostatniaKarta : undefined,
  }
}

function stanZOdczytu(odczyt: DocumentSnapshot): StanSynchronizacji {
  if (!navigator.onLine) return 'offline'
  if (odczyt.metadata.hasPendingWrites) return 'zapisywanie'
  if (odczyt.metadata.fromCache) return 'laczenie'
  return 'zsynchronizowano'
}

function przyjmij(dokument: Dokument) {
  przyjmijOznaczenia(dokument.oznaczenia)
  if (dokument.motyw !== undefined) przyjmijMotyw(dokument.motyw)
  if (dokument.ostatniaKarta !== undefined) przyjmijOstatnia(dokument.ostatniaKarta)
}

// Scala lokalne dane z kontem i dopiero potem włącza wysyłanie pojedynczych zmian.
// Robimy to przy każdym połączeniu, nie tylko pierwszym, bo zmiana kliknięta zanim
// przyszedł pierwszy odczyt istnieje tylko lokalnie.
function scalZKontem(odczyt: DocumentSnapshot, wybor: Wybor | null) {
  if (!chmura || !uid) return
  const naKoncie = czytajDokument(odczyt)
  const wynik = scal(wpisyOznaczen(), naKoncie.oznaczenia, wybor)
  if (wynik.sporne.length > 0) {
    sporne = wynik.sporne
    ustawStan('pytanie')
    return
  }

  // Motyw i ostatnia karta nie mają czasu zmiany, więc wygrywa to, co już jest na koncie
  const motyw = naKoncie.motyw !== undefined ? naKoncie.motyw : wybranyMotyw()
  const ostatnia = naKoncie.ostatniaKarta ?? ostatniaKarta()

  const zmiany: Record<string, unknown> = {}
  if (wynik.doWyslania.length > 0) {
    zmiany.oznaczenia = Object.fromEntries(wynik.doWyslania.map((id) => [id, wpisDoChmury(wynik.wynik[id])]))
  }
  if (naKoncie.motyw === undefined) zmiany.motyw = motyw
  if (naKoncie.ostatniaKarta === undefined && ostatnia) zmiany.ostatniaKarta = ostatnia
  if (!odczyt.exists()) zmiany.oznaczenia ??= {}

  // merge: true dopisuje tylko podane karty i pola, reszty dokumentu nie rusza,
  // nawet gdy dwa urządzenia scalają się w tym samym momencie
  if (Object.keys(zmiany).length > 0) {
    setDoc(doc(chmura.baza, 'uzytkownicy', uid), { ...zmiany, zmieniono: serverTimestamp() }, { merge: true }).catch(
      (blad) => console.error('Nie udało się scalić oznaczeń z chmurą:', blad),
    )
  }

  przyjmij({ oznaczenia: wynik.wynik, motyw, ostatniaKarta: ostatnia })
  sporne = []
  zgrane = true
  zapiszWPamieci(KLUCZ_KONTA, uid)
  ustawZgraneKonto(uid)
  ustawStan(stanZOdczytu(odczyt))
}

function naOdczyt(odczyt: DocumentSnapshot) {
  ostatniOdczyt = odczyt
  if (zgrane && odczyt.exists()) {
    przyjmij(czytajDokument(odczyt))
    ustawStan(stanZOdczytu(odczyt))
    return
  }
  // Pusta pamięć podręczna nie znaczy, że konto jest puste. Przy pierwszym scaleniu
  // i przy braku dokumentu czekamy na odpowiedź serwera.
  const znaneKonto = czytajZPamieci(KLUCZ_KONTA) === uid
  if (odczyt.metadata.fromCache && (!znaneKonto || !odczyt.exists())) {
    ustawStan(navigator.onLine ? 'laczenie' : 'offline')
    return
  }
  zgrane = false
  ustawZgraneKonto(null)
  scalZKontem(odczyt, null)
}

function rozlacz() {
  przestanSluchac?.()
  przestanSluchac = null
  ostatniOdczyt = null
  zgrane = false
  sporne = []
  ustawZgraneKonto(null)
}

export function uruchomSynchronizacje() {
  if (!chmura) return
  const { auth, baza } = chmura

  onAuthStateChanged(auth, (uzytkownik) => {
    if (uzytkownik && uzytkownik.uid === uid) return
    rozlacz()
    uid = uzytkownik?.uid ?? null
    if (!uid) {
      // Po wylogowaniu oznaczenia zostają na urządzeniu; przy następnym logowaniu zostaną scalone
      zapiszWPamieci(KLUCZ_KONTA, null)
      ustawStan('bez-konta')
      return
    }
    ustawStan('laczenie')
    przestanSluchac = onSnapshot(doc(baza, 'uzytkownicy', uid), { includeMetadataChanges: true }, naOdczyt, (blad) => {
      console.error('Synchronizacja przerwana:', blad)
      ustawStan('blad')
    })
  })

  const odswiez = () => {
    if (zgrane && ostatniOdczyt) ustawStan(stanZOdczytu(ostatniOdczyt))
    else if (stan === 'laczenie' || stan === 'offline') ustawStan(navigator.onLine ? 'laczenie' : 'offline')
  }
  window.addEventListener('online', odswiez)
  window.addEventListener('offline', odswiez)
}

export function rozstrzygnij(wybor: Wybor) {
  if (stan === 'pytanie' && ostatniOdczyt) scalZKontem(ostatniOdczyt, wybor)
}

function subskrybuj(sluchacz: () => void) {
  sluchacze.add(sluchacz)
  return () => {
    sluchacze.delete(sluchacz)
  }
}

export function useSynchronizacja() {
  return useSyncExternalStore(subskrybuj, () => stan)
}

export function useSporneKarty() {
  return useSyncExternalStore(subskrybuj, () => sporne)
}
