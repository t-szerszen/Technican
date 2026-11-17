import Ikona, { type NazwaIkony } from './Ikona'
import './DolnaNawigacja.css'

const zakladki: { id: string; nazwa: string; ikona: NazwaIkony; adres: string }[] = [
  { id: 'dzialy', nazwa: 'Działy', ikona: 'dzialy', adres: '#/' },
  { id: 'szukaj', nazwa: 'Szukaj', ikona: 'szukaj', adres: '#/szukaj' },
  { id: 'powtorki', nazwa: 'Powtórki', ikona: 'zakladka', adres: '#/powtorki' },
]

export default function DolnaNawigacja({ aktywna }: { aktywna: string }) {
  return (
    <nav className="dolna-nawigacja" aria-label="Nawigacja">
      {zakladki.map((z) => (
        <a key={z.id} href={z.adres} aria-current={z.id === aktywna ? 'page' : undefined}>
          <span className="dolna-ikona">
            <Ikona nazwa={z.ikona} />
          </span>
          {z.nazwa}
        </a>
      ))}
    </nav>
  )
}
