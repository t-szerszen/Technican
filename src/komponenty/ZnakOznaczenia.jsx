import Ikona from './Ikona'

export default function ZnakOznaczenia({ oznaczenie }) {
  if (oznaczenie === 'umiem') {
    return (
      <span className="znak-oznaczenia znak-umiem">
        <Ikona nazwa="ok" rozmiar={16} />
        <span className="ukryte">umiem</span>
      </span>
    )
  }
  if (oznaczenie === 'powtorka') {
    return (
      <span className="znak-oznaczenia znak-powtorka">
        <Ikona nazwa="zakladka" rozmiar={15} wypelniona />
        <span className="ukryte">do powtórki</span>
      </span>
    )
  }
  return null
}
