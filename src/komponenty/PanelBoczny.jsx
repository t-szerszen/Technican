import { dzialy } from '../dane/dzialy'
import { kartyDzialu } from '../dane/karty'
import { useOznaczenia } from '../hooki/useOznaczenia'
import { useMotyw, ustawMotyw } from '../hooki/useMotyw'
import { adresKarty } from '../hooki/useTrasa'
import Ikona from './Ikona'
import Logo from './Logo'
import ZnakOznaczenia from './ZnakOznaczenia'
import './PanelBoczny.css'

export default function PanelBoczny({ trasa }) {
  const oznaczenia = useOznaczenia()
  const motyw = useMotyw()
  const [rodzaj, idDzialu, plik] = trasa.czesci
  const otwartyDzial = rodzaj === 'dzial' || rodzaj === 'karta' ? idDzialu : null
  const otwartaKarta = rodzaj === 'karta' ? `${idDzialu}/${plik}` : null

  return (
    <nav className="panel-boczny" aria-label="Działy i karty">
      <a href="#/" className="panel-logo">
        <Logo />
        <span className="disp">kratka</span>
        <span className="mono panel-egzamin">INF.04</span>
      </a>

      <a href="#/szukaj" className="panel-szukaj">
        <Ikona nazwa="szukaj" rozmiar={17} />
        <span>Szukaj składni, kart…</span>
        <kbd>⌘K</kbd>
      </a>

      <div className="panel-dzialy">
        <div className="etykieta panel-etykieta">Działy</div>
        {dzialy.map((dzial) => {
          const otwarty = dzial.id === otwartyDzial
          const karty = kartyDzialu(dzial.id)
          return (
            <div key={dzial.id}>
              <a
                href={`#/dzial/${dzial.id}`}
                className={otwarty ? 'panel-dzial otwarty' : 'panel-dzial'}
                aria-current={otwarty && rodzaj === 'dzial' ? 'page' : undefined}
              >
                <span className="kwadrat" style={{ background: dzial.kolor }} />
                <span className="panel-nazwa">{dzial.nazwa}</span>
                <Ikona nazwa={otwarty ? 'w-dol' : 'dalej'} rozmiar={14} />
              </a>
              {otwarty && karty.length > 0 && (
                <div className="panel-karty">
                  {karty.map((karta) => (
                    <a
                      key={karta.id}
                      href={adresKarty(karta)}
                      aria-current={karta.id === otwartaKarta ? 'page' : undefined}
                    >
                      <span className="mono panel-numer">{karta.numer}</span>
                      <span className="panel-nazwa">{karta.tytul}</span>
                      <ZnakOznaczenia oznaczenie={oznaczenia[karta.id]} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="panel-dol">
        <a href="#/powtorki" className="panel-dzial" aria-current={rodzaj === 'powtorki' ? 'page' : undefined}>
          <Ikona nazwa="zakladka" rozmiar={16} />
          <span className="panel-nazwa">Powtórki</span>
        </a>
        <div className="segmenty" role="group" aria-label="Motyw">
          <button type="button" aria-pressed={motyw === 'jasny'} onClick={() => ustawMotyw('jasny')}>
            <Ikona nazwa="slonce" rozmiar={15} />
            Jasny
          </button>
          <button type="button" aria-pressed={motyw === 'ciemny'} onClick={() => ustawMotyw('ciemny')}>
            <Ikona nazwa="ksiezyc" rozmiar={15} />
            Ciemny
          </button>
        </div>
      </div>
    </nav>
  )
}
