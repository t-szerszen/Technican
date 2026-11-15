// localStorage potrafi rzucić wyjątkiem (tryb prywatny, zablokowane dane strony),
// a aplikacja ma wtedy po prostu działać bez zapamiętywania.

export function czytajZPamieci(klucz, domyslnie = null) {
  try {
    const wartosc = localStorage.getItem(klucz)
    return wartosc === null ? domyslnie : JSON.parse(wartosc)
  } catch {
    return domyslnie
  }
}

export function zapiszWPamieci(klucz, wartosc) {
  try {
    if (wartosc === null || wartosc === undefined) localStorage.removeItem(klucz)
    else localStorage.setItem(klucz, JSON.stringify(wartosc))
  } catch {
    // brak miejsca albo zablokowany storage, trudno
  }
}
