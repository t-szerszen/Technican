import { znajdzKarte } from '../dane/karty'
import { rozstrzygnij, useSporneKarty, useSynchronizacja } from '../chmura/synchronizacja'
import type { Oznaczenie } from '../hooki/useOznaczenia'
import './PytanieOScalenie.css'

const NAZWY: Record<Oznaczenie, string> = { umiem: 'umiem', powtorka: 'do powtórki' }

function nazwa(stan: Oznaczenie | null) {
  return stan ? NAZWY[stan] : 'bez oznaczenia'
}

// Pierwsze logowanie na urządzeniu z własnymi oznaczeniami: resztę scalamy sami,
// pytamy tylko o karty, przy których nie wiadomo, który zapis jest nowszy.
export default function PytanieOScalenie() {
  const stan = useSynchronizacja()
  const sporne = useSporneKarty()
  if (stan !== 'pytanie' || sporne.length === 0) return null

  const pokazane = sporne.slice(0, 5)
  return (
    <div className="scalanie-tlo">
      <div className="scalanie" role="dialog" aria-modal="true" aria-labelledby="scalanie-tytul">
        <h2 id="scalanie-tytul">Które oznaczenia zachować?</h2>
        <p>
          {sporne.length === 1 ? 'Ta karta ma' : 'Te karty mają'} na koncie inne oznaczenie niż na tym urządzeniu i nie
          wiadomo, które jest nowsze. Pozostałe oznaczenia zostaną połączone.
        </p>
        <ul className="scalanie-lista">
          {pokazane.map((karta) => (
            <li key={karta.id}>
              <strong>{znajdzKarte(karta.id)?.tytul ?? karta.id}</strong>
              <span>
                tutaj: {nazwa(karta.tutaj)} · na koncie: {nazwa(karta.naKoncie)}
              </span>
            </li>
          ))}
          {sporne.length > pokazane.length && <li className="scalanie-wiecej">i jeszcze {sporne.length - pokazane.length}</li>}
        </ul>
        <div className="scalanie-przyciski">
          <button type="button" className="przycisk" onClick={() => rozstrzygnij('konto')}>
            Z konta
          </button>
          <button type="button" className="przycisk drugorzedny" onClick={() => rozstrzygnij('urzadzenie')}>
            Z tego urządzenia
          </button>
        </div>
      </div>
    </div>
  )
}
