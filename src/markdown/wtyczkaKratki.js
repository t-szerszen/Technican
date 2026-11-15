// Wtyczka remark z dwoma dodatkami do zwykłego Markdowna:
// ==tekst== to zakreślacz, a > [!egzamin] na początku cytatu robi z niego ramkę.

// Zakreślony tekst nie może zaczynać się ani kończyć spacją, więc "a == b oraz c == d" zostaje w spokoju.
const ZAKRESLENIE = /==(?=\S)([^=\n]*?\S)==/

function zakreslacz(rodzic) {
  if (!rodzic.children) return

  const nowe = []
  for (const dziecko of rodzic.children) {
    if (dziecko.type !== 'text' || !ZAKRESLENIE.test(dziecko.value)) {
      zakreslacz(dziecko)
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

function ramki(rodzic) {
  if (!rodzic.children) return
  for (const dziecko of rodzic.children) {
    ramki(dziecko)
    if (dziecko.type !== 'blockquote') continue

    const akapit = dziecko.children[0]
    const tekst = akapit?.type === 'paragraph' ? akapit.children[0] : null
    const dopasowanie = tekst?.type === 'text' && tekst.value.match(/^\[!(\w+)\][ \t]*\n?/)
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
  return (drzewo) => {
    ramki(drzewo)
    zakreslacz(drzewo)
  }
}
