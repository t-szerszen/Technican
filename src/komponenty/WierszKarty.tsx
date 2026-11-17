import { znajdzDzial } from '../dane/dzialy'
import type { Karta, Wycinek } from '../dane/karty'
import type { Oznaczenie } from '../hooki/useOznaczenia'
import { adresKarty } from '../hooki/useTrasa'
import Ikona from './Ikona'
import ZnakOznaczenia from './ZnakOznaczenia'
import './Listy.css'

interface Wlasciwosci {
  karta: Karta
  oznaczenie: Oznaczenie | undefined
  zDzialem?: boolean
  wycinek?: Wycinek | null
}

export default function WierszKarty({ karta, oznaczenie, zDzialem = false, wycinek = null }: Wlasciwosci) {
  // Karty spoza listy działów są odfiltrowane w dane/karty.ts, więc dział zawsze jest
  const dzial = znajdzDzial(karta.dzial)!
  return (
    <li>
      <a href={adresKarty(karta)} className="wiersz">
        {zDzialem ? (
          <span className="kwadrat wiersz-znacznik" style={{ background: dzial.kolor }} />
        ) : (
          <span className="mono wiersz-numer">{karta.numer}</span>
        )}
        <span className="wiersz-tresc">
          <span className="wiersz-tytul">{karta.tytul}</span>
          {wycinek && (
            <span className="wiersz-wycinek">
              {wycinek.przed}
              <mark>{wycinek.trafienie}</mark>
              {wycinek.po}
            </span>
          )}
          <span className="wiersz-meta">
            {zDzialem && <span>{dzial.nazwa}</span>}
            {karta.tagi.length > 0 && <span className="mono">{karta.tagi.join(' · ')}</span>}
            {karta.status === 'do-weryfikacji' && <span className="wiersz-weryfikacja">do weryfikacji</span>}
          </span>
        </span>
        <ZnakOznaczenia oznaczenie={oznaczenie} />
        <Ikona nazwa="dalej" rozmiar={16} className="ic wiersz-strzalka" />
      </a>
    </li>
  )
}
