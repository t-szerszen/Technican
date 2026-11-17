import { useState, type FormEvent } from 'react'
import { chmura } from '../chmura/firebase'
import { komunikatBledu, useUzytkownik, wyloguj, wyslijResetHasla, zaloguj, zarejestruj } from '../chmura/konto'
import Ikona from '../komponenty/Ikona'
import Logo from '../komponenty/Logo'
import Naglowek from '../komponenty/Naglowek'
import StanSynchronizacji from '../komponenty/StanSynchronizacji'
import './Konto.css'

type Tryb = 'logowanie' | 'rejestracja' | 'reset'

const TYTULY: Record<Tryb, string> = {
  logowanie: 'Zaloguj się',
  rejestracja: 'Załóż konto',
  reset: 'Nie pamiętasz hasła?',
}

function Formularz() {
  const [tryb, ustawTryb] = useState<Tryb>('logowanie')
  const [email, ustawEmail] = useState('')
  const [haslo, ustawHaslo] = useState('')
  const [widoczneHaslo, ustawWidoczneHaslo] = useState(false)
  const [blad, ustawBlad] = useState('')
  const [informacja, ustawInformacje] = useState('')
  const [wysylanie, ustawWysylanie] = useState(false)

  function zmienTryb(nowy: Tryb) {
    ustawTryb(nowy)
    ustawBlad('')
    ustawInformacje('')
  }

  async function wyslij(zdarzenie: FormEvent) {
    zdarzenie.preventDefault()
    ustawBlad('')
    ustawInformacje('')
    ustawWysylanie(true)
    try {
      if (tryb === 'logowanie') await zaloguj(email, haslo)
      else if (tryb === 'rejestracja') await zarejestruj(email, haslo)
      else {
        await wyslijResetHasla(email)
        ustawInformacje('Jeśli konto z tym adresem istnieje, wysłaliśmy na nie link do ustawienia nowego hasła.')
      }
    } catch (wyjatek) {
      ustawBlad(komunikatBledu(wyjatek))
    } finally {
      ustawWysylanie(false)
    }
  }

  return (
    <section className="konto-karta" aria-labelledby="konto-tytul">
      <Logo rozmiar={30} />
      <div className="powitanie">
        <h1 id="konto-tytul">{TYTULY[tryb]}</h1>
        <p className="konto-opis">
          {tryb === 'reset'
            ? 'Podaj e-mail konta, a wyślemy link do ustawienia nowego hasła.'
            : 'Konto zapisuje oznaczenia kart i motyw, żeby telefon i komputer pokazywały to samo. Bez konta wszystko działa jak dotąd.'}
        </p>
      </div>

      {tryb !== 'reset' && (
        <div className="segmenty" role="group" aria-label="Rodzaj formularza">
          <button type="button" aria-pressed={tryb === 'logowanie'} onClick={() => zmienTryb('logowanie')}>
            Logowanie
          </button>
          <button type="button" aria-pressed={tryb === 'rejestracja'} onClick={() => zmienTryb('rejestracja')}>
            Nowe konto
          </button>
        </div>
      )}

      <form className="konto-formularz" onSubmit={wyslij}>
        <label className="konto-pole">
          <span>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => ustawEmail(e.target.value)}
            autoComplete="email"
            autoCapitalize="off"
            spellCheck="false"
            inputMode="email"
            required
          />
        </label>

        {tryb !== 'reset' && (
          <label className="konto-pole">
            <span>Hasło</span>
            <span className="konto-haslo">
              <input
                type={widoczneHaslo ? 'text' : 'password'}
                value={haslo}
                onChange={(e) => ustawHaslo(e.target.value)}
                autoComplete={tryb === 'rejestracja' ? 'new-password' : 'current-password'}
                minLength={tryb === 'rejestracja' ? 6 : undefined}
                required
              />
              <button
                type="button"
                className="przycisk-ikona"
                onClick={() => ustawWidoczneHaslo(!widoczneHaslo)}
                aria-label={widoczneHaslo ? 'Ukryj hasło' : 'Pokaż hasło'}
                aria-pressed={widoczneHaslo}
              >
                <Ikona nazwa={widoczneHaslo ? 'oko-zamkniete' : 'oko'} rozmiar={19} />
              </button>
            </span>
            {tryb === 'rejestracja' && <small>Co najmniej 6 znaków.</small>}
          </label>
        )}

        {blad && (
          <p className="konto-komunikat konto-blad" role="alert">
            <Ikona nazwa="ostrzezenie" rozmiar={17} />
            {blad}
          </p>
        )}
        {informacja && (
          <p className="konto-komunikat konto-informacja" role="status">
            <Ikona nazwa="ok" rozmiar={17} />
            {informacja}
          </p>
        )}

        <button type="submit" className="przycisk" disabled={wysylanie}>
          {wysylanie ? 'Chwila…' : tryb === 'reset' ? 'Wyślij link' : TYTULY[tryb]}
        </button>
      </form>

      {tryb === 'logowanie' && (
        <button type="button" className="konto-link" onClick={() => zmienTryb('reset')}>
          Nie pamiętasz hasła?
        </button>
      )}
      {tryb === 'reset' && (
        <button type="button" className="konto-link" onClick={() => zmienTryb('logowanie')}>
          Wróć do logowania
        </button>
      )}
    </section>
  )
}

function Zalogowany({ email }: { email: string }) {
  const [blad, ustawBlad] = useState('')

  async function wylogujSie() {
    ustawBlad('')
    try {
      await wyloguj()
    } catch (wyjatek) {
      ustawBlad(komunikatBledu(wyjatek))
    }
  }

  return (
    <section className="konto-karta" aria-labelledby="konto-tytul">
      <span className="konto-awatar" aria-hidden="true">
        <Ikona nazwa="osoba" rozmiar={24} />
      </span>
      <div className="powitanie">
        <span className="etykieta">Zalogowano jako</span>
        <h1 id="konto-tytul" className="konto-email">
          {email}
        </h1>
      </div>
      <div className="konto-wiersz">
        <Ikona nazwa="chmura" rozmiar={18} />
        <span>Oznaczenia, motyw i ostatnia karta zapisują się na koncie.</span>
      </div>
      <StanSynchronizacji />
      {blad && (
        <p className="konto-komunikat konto-blad" role="alert">
          <Ikona nazwa="ostrzezenie" rozmiar={17} />
          {blad}
        </p>
      )}
      <button type="button" className="przycisk drugorzedny" onClick={wylogujSie}>
        <Ikona nazwa="wyloguj" rozmiar={18} />
        Wyloguj się
      </button>
      <p className="konto-przypis">Po wylogowaniu oznaczenia zostają na tym urządzeniu.</p>
    </section>
  )
}

export default function Konto() {
  const uzytkownik = useUzytkownik()

  let zawartosc
  if (!chmura) {
    zawartosc = (
      <section className="konto-karta">
        <h1>Konta są wyłączone</h1>
        <p className="konto-opis">Ta wersja aplikacji nie ma konfiguracji Firebase. Oznaczenia zapisują się tylko na tym urządzeniu.</p>
      </section>
    )
  } else if (uzytkownik === undefined) {
    zawartosc = <p className="pusto">Sprawdzanie konta…</p>
  } else if (uzytkownik) {
    zawartosc = <Zalogowany email={uzytkownik.email ?? ''} />
  } else {
    zawartosc = <Formularz />
  }

  return (
    <>
      <Naglowek adresRodzica="/" tytul="Konto" sciezka={[{ nazwa: 'Działy', adres: '#/' }, { nazwa: 'Konto' }]} />
      <main className="strona kratka konto">{zawartosc}</main>
    </>
  )
}
