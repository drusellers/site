import { getSortedValuesData } from '@/lib/values'
import Link from 'next/link'
import TwoColumn from '@/components/TwoColumn'
import Header from '@/components/Header'
import SideColumn from '@/components/SideColumn'

export default function Values() {
  const allValues = getSortedValuesData()
  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={'Values'} />}>
        {allValues.map((v) => {
          return (
            <div key={v.id} className="archive">
              <ul>
                <div className="mv2">
                  <Link
                    href={`/values/${v.id}`}
                    className="link blue post-link"
                  >
                    {v.title}
                  </Link>
                </div>
              </ul>
            </div>
          )
        })}
      </TwoColumn>
    </>
  )
}
