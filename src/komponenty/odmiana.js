// 1 karta, 2 karty, 5 kart, 22 karty, 12 kart
export function liczbaKart(liczba) {
  const jednosci = liczba % 10
  const dziesiatki = liczba % 100
  if (liczba === 1) return '1 karta'
  if (jednosci >= 2 && jednosci <= 4 && (dziesiatki < 12 || dziesiatki > 14)) return `${liczba} karty`
  return `${liczba} kart`
}
