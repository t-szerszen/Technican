import { filtry, pasujeDoFiltra } from '../hooki/useOznaczenia'
import './Listy.css'

export default function FiltrOznaczen({ aktywny, karty, oznaczenia, zmien, dostepne = filtry }) {
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
