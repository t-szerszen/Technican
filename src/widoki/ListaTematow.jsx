import { znajdzDzial } from '../dane/dzialy'
import { kartyDzialu } from '../dane/karty'
import { pasujeDoFiltra, useOznaczenia } from '../hooki/useOznaczenia'
import { podmienAdres } from '../hooki/useTrasa'
import FiltrOznaczen from '../komponenty/FiltrOznaczen'
import Ikona from '../komponenty/Ikona'
import Naglowek from '../komponenty/Naglowek'
import WierszKarty from '../komponenty/WierszKarty'
import { liczbaKart } from '../komponenty/odmiana'
import NieZnaleziono from './NieZnaleziono'

export default function ListaTematow({ idDzialu, filtr }) {
  const oznaczenia = useOznaczenia()
  const dzial = znajdzDzial(idDzialu)
  if (!dzial) return <NieZnaleziono />

  const karty = kartyDzialu(dzial.id)
  const aktywnyFiltr = filtr ?? 'wszystkie'
  const widoczne = karty.filter((k) => pasujeDoFiltra(k, aktywnyFiltr, oznaczenia))
  const umiem = karty.filter((k) => oznaczenia[k.id] === 'umiem').length

  function zmienFiltr(nowy) {
    podmienAdres(`/dzial/${dzial.id}${nowy === 'wszystkie' ? '' : `?filtr=${nowy}`}`)
  }

  return (
    <>
      <Naglowek adresRodzica="/" maly="Dział" tytul={dzial.nazwa} sciezka={[{ nazwa: 'Działy', adres: '#/' }, { nazwa: dzial.nazwa }]} />
      <main className="strona kratka">
        <div className="powitanie">
          <span className="plakietka" style={{ alignSelf: 'flex-start' }}>
            <span className="kwadrat" style={{ background: dzial.kolor }} />
            {dzial.opis}
          </span>
          <h1>{dzial.nazwa}</h1>
          <div className="podtytul">
            <Ikona nazwa="lista" rozmiar={16} />
            {liczbaKart(karty.length)} · umiem {umiem}
          </div>
        </div>

        {karty.length > 0 && (
          <FiltrOznaczen aktywny={aktywnyFiltr} karty={karty} oznaczenia={oznaczenia} zmien={zmienFiltr} />
        )}

        {widoczne.length > 0 ? (
          <ul className="lista-kart">
            {widoczne.map((karta) => (
              <WierszKarty key={karta.id} karta={karta} oznaczenie={oznaczenia[karta.id]} />
            ))}
          </ul>
        ) : (
          <p className="pusto">{karty.length === 0 ? 'W tym dziale nie ma jeszcze kart.' : 'Żadna karta nie pasuje do filtra.'}</p>
        )}
      </main>
    </>
  )
}
