// localStorage potrafi rzucić wyjątkiem (tryb prywatny, zablokowane dane strony),
// a aplikacja ma wtedy po prostu działać bez zapamiętywania.
// Odczytana wartość to niesprawdzony JSON, więc wywołujący sam pilnuje jej kształtu.

export function czytajZPamieci(klucz: string): unknown {
  try {
    const wartosc = localStorage.getItem(klucz)
    return wartosc === null ? null : JSON.parse(wartosc)
  } catch {
    return null
  }
}

export function zapiszWPamieci(klucz: string, wartosc: unknown) {
  try {
    if (wartosc === null || wartosc === undefined) localStorage.removeItem(klucz)
    else localStorage.setItem(klucz, JSON.stringify(wartosc))
  } catch {
    // brak miejsca albo zablokowany storage, trudno
  }
}
