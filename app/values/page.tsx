import { getSortedValuesData } from '@/lib/values'
import Link from 'next/link'
import PagePage from '@/components/PagePage'

export default function Values() {
  const allValues = getSortedValuesData()
  return (
    <PagePage title="Values">
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
    </PagePage>
  )
}
