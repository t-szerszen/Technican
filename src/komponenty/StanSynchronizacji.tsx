import { useSynchronizacja, type StanSynchronizacji as Stan } from '../chmura/synchronizacja'
import './StanSynchronizacji.css'

const OPISY: Record<Stan, string> = {
  'bez-konta': '',
  laczenie: 'Łączenie…',
  pytanie: 'Czeka na decyzję',
  zapisywanie: 'Zapisywanie…',
  offline: 'Offline',
  zsynchronizowano: 'Zsynchronizowano',
  blad: 'Błąd synchronizacji',
}

// Sama kropka (np. na przycisku konta) albo kropka z opisem
export default function StanSynchronizacji({ zOpisem = true }: { zOpisem?: boolean }) {
  const stan = useSynchronizacja()
  if (stan === 'bez-konta') return null
  return (
    <span className={`synchronizacja synchronizacja-${stan}`} title={OPISY[stan]}>
      <span className="synchronizacja-kropka" aria-hidden="true" />
      <span className={zOpisem ? undefined : 'ukryte'}>{OPISY[stan]}</span>
    </span>
  )
}
