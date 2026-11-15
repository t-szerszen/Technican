import { useEffect, useRef, useState } from 'react'
import { Highlight } from 'prism-react-renderer'
import Ikona from '../komponenty/Ikona'

const JEZYKI = {
  python: { prism: 'python', nazwa: 'Python', kolor: 'var(--t-py)' },
  py: { prism: 'python', nazwa: 'Python', kolor: 'var(--t-py)' },
  kotlin: { prism: 'kotlin', nazwa: 'Kotlin', kolor: 'var(--t-kt)' },
  kt: { prism: 'kotlin', nazwa: 'Kotlin', kolor: 'var(--t-kt)' },
  xml: { prism: 'markup', nazwa: 'XML', kolor: 'var(--t-xml)' },
  html: { prism: 'markup', nazwa: 'HTML', kolor: 'var(--t-xml)' },
  javascript: { prism: 'javascript', nazwa: 'JavaScript', kolor: 'var(--t-py)' },
  js: { prism: 'javascript', nazwa: 'JavaScript', kolor: 'var(--t-py)' },
  jsx: { prism: 'jsx', nazwa: 'JSX', kolor: 'var(--t-re)' },
  css: { prism: 'css', nazwa: 'CSS', kolor: 'var(--t-bs)' },
  sql: { prism: 'sql', nazwa: 'SQL', kolor: 'var(--t-and)' },
}

// Typy tokenów Prisma na klasy palety z designu (słowo kluczowe, funkcja, napis...)
const KLASY = {
  keyword: 'k',
  atrule: 'k',
  important: 'k',
  function: 'f',
  'function-variable': 'f',
  string: 's',
  char: 's',
  'attr-value': 's',
  'template-string': 's',
  url: 's',
  number: 'n',
  boolean: 'n',
  comment: 'c',
  prolog: 'c',
  doctype: 'c',
  cdata: 'c',
  builtin: 'b',
  'class-name': 'b',
  constant: 'b',
  annotation: 'b',
  decorator: 'b',
  operator: 'o',
  punctuation: 'o',
  'attr-name': 'at',
  property: 'at',
  tag: 'tg',
  selector: 'tg',
}

// Bierzemy najbardziej szczegółowy typ, ale interpunkcję tylko wtedy, gdy nic innego nie pasuje,
// żeby np. nawiasy ostre znacznika XML miały kolor znacznika.
function klasaTokenu(typy) {
  for (let i = typy.length - 1; i >= 0; i--) {
    if (typy[i] !== 'punctuation' && KLASY[typy[i]]) return KLASY[typy[i]]
  }
  return typy.includes('punctuation') ? 'o' : undefined
}

// "petle.py {1,3-5}" -> nazwa pliku i zbiór wyróżnionych linii
function czytajMeta(meta) {
  const linie = new Set()
  const zakres = meta.match(/\{([\d,\s-]+)\}/)
  if (zakres) {
    for (const czesc of zakres[1].split(',')) {
      const [od, doLinii = od] = czesc.split('-').map((n) => parseInt(n, 10))
      for (let n = od; n <= doLinii; n++) linie.add(n)
    }
  }
  const plik = meta.replace(/\{[^}]*\}/, '').trim()
  return { plik, linie }
}

async function kopiujDoSchowka(tekst) {
  try {
    await navigator.clipboard.writeText(tekst)
    return true
  } catch {
    // Starsze przeglądarki albo brak HTTPS: kopiowanie przez zaznaczenie ukrytego pola
    const pole = document.createElement('textarea')
    pole.value = tekst
    pole.setAttribute('readonly', '')
    pole.style.position = 'fixed'
    pole.style.opacity = '0'
    document.body.appendChild(pole)
    pole.select()
    const udalo = document.execCommand('copy')
    pole.remove()
    return udalo
  }
}

export default function BlokKodu({ kod, jezyk, meta = '' }) {
  const [skopiowano, ustawSkopiowano] = useState(false)
  const zegar = useRef(null)
  const info = JEZYKI[jezyk] ?? { prism: 'text', nazwa: jezyk || 'Kod', kolor: 'var(--text-3)' }
  const { plik, linie } = czytajMeta(meta)

  useEffect(() => () => clearTimeout(zegar.current), [])

  async function kopiuj() {
    if (!(await kopiujDoSchowka(kod))) return
    ustawSkopiowano(true)
    clearTimeout(zegar.current)
    zegar.current = setTimeout(() => ustawSkopiowano(false), 1600)
  }

  // Pinezki numerujemy po kolei na wyróżnionych liniach; pod kodem lista numerowana je objaśnia.
  const pinezki = [...linie].sort((a, b) => a - b)

  return (
    <section className="kod" aria-label={plik ? `Kod: ${plik}` : `Kod: ${info.nazwa}`}>
      <div className="kod-pasek">
        <span className="kwadrat" style={{ background: info.kolor }} />
        <span className="mono kod-plik">{plik || info.nazwa}</span>
        <span className="kod-skopiowano" aria-live="polite">
          {skopiowano ? 'Skopiowano' : ''}
        </span>
        <button type="button" className="przycisk-ikona" onClick={kopiuj} aria-label="Kopiuj kod">
          <Ikona nazwa={skopiowano ? 'ok' : 'kopiuj'} rozmiar={17} />
        </button>
      </div>
      <Highlight code={kod} language={info.prism}>
        {({ tokens }) => (
          <div className="mono kod-przewijany">
            <pre className="kod-linie">
              {tokens.map((linia, i) => {
                const numer = i + 1
                const wyrozniona = linie.has(numer)
                return (
                  <div key={i} className={wyrozniona ? 'cl hl' : 'cl'}>
                    <span className="no" aria-hidden="true">
                      {numer}
                    </span>
                    <code className="cx">
                      {linia.map((token, j) => (
                        <span key={j} className={klasaTokenu(token.types)}>
                          {token.content}
                        </span>
                      ))}
                    </code>
                    {wyrozniona && (
                      <span className="pin" aria-hidden="true">
                        {pinezki.indexOf(numer) + 1}
                      </span>
                    )}
                  </div>
                )
              })}
            </pre>
          </div>
        )}
      </Highlight>
    </section>
  )
}
