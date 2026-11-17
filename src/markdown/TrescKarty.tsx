import type { CSSProperties } from 'react'
import type { ElementContent } from 'hast'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import wtyczkaKratki from './wtyczkaKratki'
import BlokKodu from './BlokKodu'
import BlokWyniku from './BlokWyniku'
import Ikona, { type NazwaIkony } from '../komponenty/Ikona'
import './TrescKarty.css'

function tekstWezla(wezel: ElementContent): string {
  if (wezel.type === 'text') return wezel.value
  if (wezel.type === 'element') return wezel.children.map(tekstWezla).join('')
  return ''
}

const RAMKI: Record<string, { tytul: string; ikona: NazwaIkony }> = {
  egzamin: { tytul: 'Na egzaminie', ikona: 'flaga' },
  blad: { tytul: 'Częsty błąd', ikona: 'ostrzezenie' },
  wskazowka: { tytul: 'Wskazówka', ikona: 'zarowka' },
}

const komponenty: Components = {
  pre({ node, children }) {
    const kod = node?.children[0]
    if (kod?.type !== 'element') return <pre>{children}</pre>
    const tekst = tekstWezla(kod).replace(/\n$/, '')
    const klasa = (kod.properties?.className ?? []).find((k) => String(k).startsWith('language-'))
    const jezyk = klasa ? String(klasa).slice('language-'.length).toLowerCase() : ''
    if (jezyk === 'wynik') return <BlokWyniku tekst={tekst} />
    return <BlokKodu kod={tekst} jezyk={jezyk} meta={kod.data?.meta ?? ''} />
  },
  h1({ node: _node, ...reszta }) {
    return <h2 {...reszta} />
  },
  table({ node: _node, ...reszta }) {
    return (
      <div className="tabela">
        <table {...reszta} />
      </div>
    )
  },
  a({ node: _node, href = '', ...reszta }) {
    const zewnetrzny = /^https?:/.test(href)
    return <a href={href} {...(zewnetrzny ? { target: '_blank', rel: 'noreferrer' } : {})} {...reszta} />
  },
  aside({ node, children }) {
    const rodzaj = String(node?.properties.dataRamka ?? '')
    const ramka = RAMKI[rodzaj]
    // Nieznany rodzaj, np. literówka w [!egzmain], zostaje zwykłym cytatem
    if (!ramka) return <blockquote>{children}</blockquote>
    return (
      <aside className={`ramka ramka-${rodzaj}`} aria-label={ramka.tytul}>
        <Ikona nazwa={ramka.ikona} rozmiar={19} />
        <div>
          <strong className="ramka-tytul">{ramka.tytul}</strong>
          {children}
        </div>
      </aside>
    )
  },
}

export default function TrescKarty({ tresc, numer }: { tresc: string; numer: string }) {
  return (
    <div className="tresc-karty" style={{ '--rozdzial': `"${parseInt(numer, 10)}"` } as CSSProperties}>
      <Markdown remarkPlugins={[remarkGfm, wtyczkaKratki]} components={komponenty}>
        {tresc}
      </Markdown>
    </div>
  )
}
