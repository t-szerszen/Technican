import type { Karta } from '../dane/karty'
import { filtry, pasujeDoFiltra, type Filtr, type Oznaczenia } from '../hooki/useOznaczenia'
import './Listy.css'

interface Wlasciwosci {
  aktywny: string
  karty: Karta[]
  oznaczenia: Oznaczenia
  zmien: (filtr: Filtr) => void
  dostepne?: typeof filtry
}

export default function FiltrOznaczen({ aktywny, karty, oznaczenia, zmien, dostepne = filtry }: Wlasciwosci) {
  return (
    <div className="filtr" role="group" aria-label="Filtr oznaczeń">
      {dostepne.map((f) => (
        <button key={f.id} type="button" aria-pressed={aktywny === f.id} onClick={() => zmien(f.id)}>
          {f.nazwa}
          <span className="mono">{karty.filter((k) => pasujeDoFiltra(k, f.id, oznaczenia)).length}</span>
        </button>
      ))}
    </div>
  )
}
