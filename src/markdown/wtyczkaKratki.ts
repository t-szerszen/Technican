import type { Parent, Root, RootContent } from 'mdast'

// Wtyczka remark z dwoma dodatkami do zwykłego Markdowna:
// ==tekst== to zakreślacz, a > [!egzamin] na początku cytatu robi z niego ramkę.

// Zakreślony tekst nie może zaczynać się ani kończyć spacją, więc "a == b oraz c == d" zostaje w spokoju.
const ZAKRESLENIE = /==(?=\S)([^=\n]*?\S)==/

function zakreslacz(rodzic: Parent) {
  const nowe: RootContent[] = []
  for (const dziecko of rodzic.children) {
    if (dziecko.type !== 'text' || !ZAKRESLENIE.test(dziecko.value)) {
      if ('children' in dziecko) zakreslacz(dziecko)
      nowe.push(dziecko)
      continue
    }
    const kawalki = dziecko.value.split(new RegExp(ZAKRESLENIE.source))
    kawalki.forEach((kawalek, i) => {
      if (!kawalek) return
      if (i % 2 === 0) nowe.push({ type: 'text', value: kawalek })
      else nowe.push({ type: 'emphasis', data: { hName: 'mark' }, children: [{ type: 'text', value: kawalek }] })
    })
  }
  rodzic.children = nowe
}

function ramki(rodzic: Parent) {
  for (const dziecko of rodzic.children) {
    if (!('children' in dziecko)) continue
    ramki(dziecko)
    if (dziecko.type !== 'blockquote') continue

    const akapit = dziecko.children[0]
    if (akapit?.type !== 'paragraph') continue
    const tekst = akapit.children[0]
    if (tekst?.type !== 'text') continue
    const dopasowanie = tekst.value.match(/^\[!(\w+)\][ \t]*\n?/)
    if (!dopasowanie) continue

    tekst.value = tekst.value.slice(dopasowanie[0].length)
    if (!tekst.value) akapit.children.shift()
    // Twarde łamanie (dwie spacje) po znaczniku zostawiłoby pustą linię pod tytułem ramki
    if (akapit.children[0]?.type === 'break') akapit.children.shift()
    if (akapit.children.length === 0) dziecko.children.shift()
    dziecko.data = { hName: 'aside', hProperties: { dataRamka: dopasowanie[1] } }
  }
}

export default function wtyczkaKratki() {
  return (drzewo: Root) => {
    ramki(drzewo)
    zakreslacz(drzewo)
  }
}
