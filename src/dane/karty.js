import { parse } from 'yaml'
import { dzialy } from './dzialy'

const pliki = import.meta.glob('/tresc/*/*.md', { query: '?raw', import: 'default', eager: true })

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

// Identyfikator nagłówka do spisu treści, liczony tak samo z Markdowna i z gotowego tekstu
export function kotwica(tekst) {
  return normalizuj(tekst).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function bezSkladniMarkdown(tresc) {
  return tresc
    .normalize('NFC')
    .replace(/^```.*$/gm, '')
    .replace(/^#+\s*/gm, '')
    .replace(/^>\s*(\[!\w+\])?\s*/gm, '')
    .replace(/\[\[|\]\]|==|\*\*|`/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function sekcje(tresc) {
  const wynik = []
  let wKodzie = false
  for (const linia of tresc.split('\n')) {
    if (linia.startsWith('```')) wKodzie = !wKodzie
    else if (!wKodzie && linia.startsWith('## ')) wynik.push(linia.slice(3).trim())
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
  const tresc = frontmatter ? tekst.slice(frontmatter[0].length) : tekst
  const czysta = bezSkladniMarkdown(tresc)

  return {
    id: `${dzial}/${plik}`,
    plik,
    dzial,
    tytul: meta.tytul ? String(meta.tytul) : plik,
    tagi: jakoLista(meta.tagi),
    status: meta.status === 'zweryfikowane' ? 'zweryfikowane' : 'do-weryfikacji',
    zrodla: jakoLista(meta.zrodla),
    arkusze: jakoLista(meta.arkusze),
    tresc,
    sekcje: sekcje(tresc),
    czysta,
    doSzukania: {
      tytul: normalizuj(meta.tytul ? String(meta.tytul) : plik),
      tagi: jakoLista(meta.tagi).map(normalizuj),
      tresc: normalizuj(czysta),
    },
  }
}

export const karty = Object.entries(pliki)
  .map(([sciezka, tekst]) => wczytajKarte(sciezka, tekst))
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
