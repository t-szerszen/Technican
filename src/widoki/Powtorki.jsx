import { karty } from '../dane/karty'
import { filtry, pasujeDoFiltra, useOznaczenia } from '../hooki/useOznaczenia'
import { podmienAdres } from '../hooki/useTrasa'
import FiltrOznaczen from '../komponenty/FiltrOznaczen'
import Ikona from '../komponenty/Ikona'
import WierszKarty from '../komponenty/WierszKarty'

const filtryPowtorek = filtry.filter((f) => f.id === 'powtorka' || f.id === 'umiem').reverse()

export default function Powtorki({ filtr }) {
  const oznaczenia = useOznaczenia()
  const aktywnyFiltr = filtr === 'umiem' ? 'umiem' : 'powtorka'
  const widoczne = karty.filter((k) => pasujeDoFiltra(k, aktywnyFiltr, oznaczenia))

  return (
    <main className="strona kratka od-gory">
      <div className="powitanie">
        <h1>Powtórki</h1>
        <div className="podtytul">
          <Ikona nazwa="zakladka" rozmiar={16} />
          Karty, które oznaczasz w trakcie czytania
        </div>
      </div>

      <FiltrOznaczen
        aktywny={aktywnyFiltr}
        karty={karty}
        oznaczenia={oznaczenia}
        dostepne={filtryPowtorek}
        zmien={(nowy) => podmienAdres(nowy === 'umiem' ? '/powtorki?filtr=umiem' : '/powtorki')}
      />

      {widoczne.length > 0 ? (
        <ul className="lista-kart">
          {widoczne.map((karta) => (
            <WierszKarty key={karta.id} karta={karta} oznaczenie={oznaczenia[karta.id]} zDzialem />
          ))}
        </ul>
      ) : (
        <p className="pusto">
          {aktywnyFiltr === 'powtorka'
            ? 'Nic do powtórki. Kartę dodasz zakładką w jej nagłówku.'
            : 'Nie masz jeszcze kart oznaczonych jako „umiem”.'}
        </p>
      )}
    </main>
  )
}
