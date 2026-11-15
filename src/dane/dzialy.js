// Kolejność taka jak na liście działów. Kolory to znaczniki z palety designu.
export const dzialy = [
  { id: 'konsola', nazwa: 'Konsola', opis: 'Python', kolor: 'var(--t-py)' },
  { id: 'web-frontend', nazwa: 'Web front-end', opis: 'HTML, CSS, JS, React', kolor: 'var(--t-re)' },
  { id: 'web-backend', nazwa: 'Web back-end', opis: 'Serwer i bazy danych', kolor: 'var(--t-bs)' },
  { id: 'desktop', nazwa: 'Desktop', opis: 'Aplikacje okienkowe', kolor: 'var(--t-qt)' },
  { id: 'mobilna', nazwa: 'Mobilna', opis: 'Android, Kotlin, XML', kolor: 'var(--t-and)' },
  { id: 'testy', nazwa: 'Testy', opis: 'Testy jednostkowe', kolor: 'var(--t-xml)' },
  { id: 'dokumentacja', nazwa: 'Dokumentacja i pakowanie', opis: 'Komentarze, zrzuty, archiwum', kolor: 'var(--t-kt)' },
]

export function znajdzDzial(id) {
  return dzialy.find((d) => d.id === id)
}
