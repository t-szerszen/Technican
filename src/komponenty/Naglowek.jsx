import { Fragment } from 'react'
import { useMotyw, przelaczMotyw } from '../hooki/useMotyw'
import { wroc } from '../hooki/useTrasa'
import Ikona from './Ikona'

// Na telefonie: wstecz, tytuł i przyciski. Na desktopie ścieżka okruszków jak w designie.
export default function Naglowek({ adresRodzica, maly, tytul, sciezka, postep, children }) {
  const motyw = useMotyw()
  return (
    <header className="naglowek">
      <button type="button" className="przycisk-ikona wstecz" onClick={() => wroc(adresRodzica)} aria-label="Wróć">
        <Ikona nazwa="wstecz" rozmiar={21} />
      </button>
      <div className="naglowek-tytul">
        {maly && <small>{maly}</small>}
        <strong>{tytul}</strong>
      </div>
      <nav className="sciezka" aria-label="Ścieżka">
        {sciezka.map((element, i) => (
          <Fragment key={i}>
            {i > 0 && <Ikona nazwa="dalej" rozmiar={14} />}
            {element.adres ? <a href={element.adres}>{element.nazwa}</a> : <span>{element.nazwa}</span>}
          </Fragment>
        ))}
      </nav>
      <button
        type="button"
        className="przycisk-ikona tylko-telefon"
        onClick={przelaczMotyw}
        aria-label={motyw === 'ciemny' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'}
      >
        <Ikona nazwa={motyw === 'ciemny' ? 'slonce' : 'ksiezyc'} />
      </button>
      {children}
      {postep !== undefined && (
        <div className="postep-czytania" aria-hidden="true">
          <div style={{ transform: `scaleX(${postep})` }} />
        </div>
      )}
    </header>
  )
}
