import { getSortedValuesData } from '../lib/values'
import ShortDate from '../components/shortDate'
import Link from 'next/link'
import Layout from '../components/layouts/layout'

export default function Values({ allValues }) {
  return (
    <Layout title="Values">
      {allValues.map((v) => {
        return (
          <div key={v.id} className="archive">
            <ul>
              <div className="mv2">
                <Link href={`/values/${v.id}`} className="link blue post-link">
                  {v.title}
                </Link>
              </div>
            </ul>
          </div>
        )
      })}
    </Layout>
  )
}

export async function getStaticProps() {
  const allValues = getSortedValuesData()
  return {
    props: {
      allValues,
    },
  }
}