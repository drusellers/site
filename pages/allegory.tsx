import Layout from '../components/layouts/layout'
import { getAllegoryData } from '../lib/data'
import { remark } from 'remark'
import html from 'remark-html'

const platoClassNames = 'font-semibold'
const glauconClassNames = 'font-semibold'

export default function Allegory({ data }) {
  return (
    <Layout title="Allegory of the Cave">
      <div className="allegory">
        <header className="mb-6">
          <h1 className="font-heading text-3xl">The Republic - Book VII</h1>
          <h3 className="pr-4">
            by Plato{' '}
            <small>
              via{' '}
              <a href="http://www.gutenberg.org/files/1497/1497-h/1497-h.htm">
                Gutenberg
              </a>
            </small>
          </h3>
        </header>
        <div className="space-y-4">
          {data.prose.map((s, i) => {
            let note = <></>
            if (s.characterNote) {
              note = (
                <small dangerouslySetInnerHTML={{ __html: s.characterNote }} />
              )
            }
            return (
              <dl key={i}>
                <dt className={`font-semibold ${i > 1 ? 'text-gray-400' : ''}`}>
                  {s.character}
                  {note}
                </dt>
                <dd className="pl-4">{s.content}</dd>
              </dl>
            )
          })}
        </div>

        <footer className="mt-6 space-y-6">
          <hr />
          <p>
            <i>
              <small>The rest is the rest</small>
            </i>
          </p>
          <hr />

          <p className="source">
            <a href="http://en.wikipedia.org/wiki/Plato">Plato&apos;s</a> Book
            VII is a part of The Republic (514a–520a)
          </p>
        </footer>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = getAllegoryData()

  async function processNote(p) {
    if (p.characterNote) {
      let x = await remark().use(html).process(p.characterNote)
      let y = x.toString().replace('<p>', '').replace('</p>', '')
      p.characterNote = ` (${y})`
    }
  }

  data.prose.forEach(processNote)

  return {
    props: {
      data,
    },
  }
}
