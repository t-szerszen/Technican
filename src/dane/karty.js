import { parse } from 'yaml'
import { dzialy } from './dzialy'

const pliki = import.meta.glob('/tresc/*/*.md', { query: '?raw', import: 'default', eager: true })

const STATUSY = ['do-weryfikacji', 'zweryfikowane']

function jakoLista(wartosc) {
  if (!wartosc) return []
  if (Array.isArray(wartosc)) return wartosc.map(String)
  return String(wartosc).split(',').map((s) => s.trim()).filter(Boolean)
}

// Małe litery bez ogonków, żeby "petla" znajdowało "Pętla". Długość tekstu się nie zmienia,
// więc pozycja znaleziona w tej wersji pasuje też do oryginału.
export function normalizuj(tekst) {
  return tekst
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L')
    .toLowerCase()
}

function bezFormatowania(linia) {
  return linia
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/==|\*\*|`/g, '')
}

// Tekst karty bez składni Markdowna: do wyszukiwania i do wycinków w wynikach.
// Kod zostaje taki, jaki jest, bo po nim też się szuka.
function zwyklyTekst(tresc) {
  let wKodzie = false
  const linie = []
  for (const linia of tresc.normalize('NFC').split('\n')) {
    if (linia.startsWith('```')) {
      wKodzie = !wKodzie
      continue
    }
    if (wKodzie) {
      linie.push(linia.replace(/\[\[|\]\]/g, ''))
      continue
    }
    if (/^\s*\|?[\s:|-]+\|?\s*$/.test(linia) && linia.includes('-')) continue
    linie.push(
      bezFormatowania(linia)
        .replace(/^#+\s*/, '')
        .replace(/^>\s*(\[!\w+\])?\s*/, '')
        .replace(/^\s*(\d+\.|[-*])\s+/, '')
        .replace(/\|/g, ' '),
    )
  }
  return linie.join(' ').replace(/\s+/g, ' ').trim()
}

// Nagłówki # i ## to sekcje karty: numerowane w treści i wypisane w spisie "Na tej stronie"
function sekcje(tresc) {
  const wynik = []
  let wKodzie = false
  for (const linia of tresc.split('\n')) {
    if (linia.startsWith('```')) wKodzie = !wKodzie
    else if (!wKodzie && /^#{1,2} /.test(linia)) wynik.push(bezFormatowania(linia.replace(/^#{1,2} /, '')).trim())
  }
  return wynik
}

function wczytajKarte(sciezka, tekst) {
  const [, dzial, plik] = sciezka.match(/\/tresc\/([^/]+)\/([^/]+)\.md$/)
  const frontmatter = tekst.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  let meta = {}
  if (frontmatter) {
    try {
      meta = parse(frontmatter[1]) ?? {}
    } catch (blad) {
      console.error(`Zły frontmatter w ${sciezka}:`, blad.message)
    }
  }

  // Dział wyznacza folder; pole "dzial" we frontmatterze tylko sprawdzamy
  if (meta.dzial && meta.dzial !== dzial) {
    console.error(`${sciezka}: dzial "${meta.dzial}" nie zgadza się z folderem "${dzial}"`)
  }
  if (meta.status && !STATUSY.includes(meta.status)) {
    console.error(`${sciezka}: nieznany status "${meta.status}", dozwolone: ${STATUSY.join(', ')}`)
  }

  const tresc = frontmatter ? tekst.slice(frontmatter[0].length) : tekst
  const tytul = meta.tytul ? String(meta.tytul) : plik
  const tagi = jakoLista(meta.tagi)
  const czysta = zwyklyTekst(tresc)

  return {
    id: `${dzial}/${plik}`,
    dzial,
    tytul,
    tagi,
    status: meta.status === 'zweryfikowane' ? 'zweryfikowane' : 'do-weryfikacji',
    zrodla: jakoLista(meta.zrodla),
    arkusze: jakoLista(meta.arkusze),
    tresc,
    sekcje: sekcje(tresc),
    czysta,
    doSzukania: {
      tytul: normalizuj(tytul),
      tagi: tagi.map(normalizuj),
      tresc: normalizuj(czysta),
    },
  }
}

const wczytane = Object.entries(pliki).map(([sciezka, tekst]) => wczytajKarte(sciezka, tekst))

for (const karta of wczytane) {
  if (!dzialy.some((d) => d.id === karta.dzial)) {
    console.error(`Karta ${karta.id} leży w folderze, którego nie ma w src/dane/dzialy.js, więc jej nie widać`)
  }
}

export const karty = wczytane
  .filter((karta) => dzialy.some((d) => d.id === karta.dzial))
  .sort((a, b) => a.id.localeCompare(b.id, 'pl', { numeric: true }))

// Numer karty w dziale, liczony od 1, wyświetlany jako "01"
for (const dzial of dzialy) {
  karty.filter((k) => k.dzial === dzial.id).forEach((k, i) => (k.numer = String(i + 1).padStart(2, '0')))
}

export function kartyDzialu(idDzialu) {
  return karty.filter((k) => k.dzial === idDzialu)
}

export function znajdzKarte(id) {
  return karty.find((k) => k.id === id)
}

export const wszystkieTagi = [...new Set(karty.flatMap((k) => k.tagi))].sort((a, b) => a.localeCompare(b, 'pl'))

function wycinek(karta, pozycja, dlugosc) {
  const tekst = karta.czysta
  const start = Math.max(0, pozycja - 40)
  const koniec = Math.min(tekst.length, pozycja + dlugosc + 80)
  return {
    przed: (start > 0 ? '…' : '') + tekst.slice(start, pozycja),
    trafienie: tekst.slice(pozycja, pozycja + dlugosc),
    po: tekst.slice(pozycja + dlugosc, koniec) + (koniec < tekst.length ? '…' : ''),
  }
}

// Każde słowo zapytania musi wystąpić w tytule, tagach albo treści.
export function szukaj(zapytanie) {
  const slowa = normalizuj(zapytanie).split(/\s+/).filter(Boolean)
  if (slowa.length === 0) return []

  const wyniki = []
  for (const karta of karty) {
    const { tytul, tagi, tresc } = karta.doSzukania
    let punkty = 0
    let pasuje = true
    for (const slowo of slowa) {
      const wTytule = tytul.includes(slowo)
      const wTagach = tagi.some((tag) => tag.includes(slowo))
      const wTresci = tresc.includes(slowo)
      if (!wTytule && !wTagach && !wTresci) {
        pasuje = false
        break
      }
      punkty += (wTytule ? 10 : 0) + (wTagach ? 5 : 0) + (wTresci ? 1 : 0)
    }
    if (!pasuje) continue

    const pierwszeWTresci = slowa.find((slowo) => tresc.includes(slowo))
    wyniki.push({
      karta,
      punkty,
      wycinek: pierwszeWTresci ? wycinek(karta, tresc.indexOf(pierwszeWTresci), pierwszeWTresci.length) : null,
    })
  }
  return wyniki.sort((a, b) => b.punkty - a.punkty)
}
