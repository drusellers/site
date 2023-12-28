import { getAllTags } from '@/lib/posts'
import Link from 'next/link'
import Header from '@/components/Header'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'

export default function Tags({}) {
  const allTags = getAllTags()
  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={'Tags'} />}>
        <ul className="list">
          {Object.keys(allTags).map((tag) => {
            return (
              <li key={tag}>
                <Link href={`/tags/${tag}`} className="text-blue-500">
                  <i className="fal fa-tag"></i> {tag}
                </Link>{' '}
                <span className="text-xs">({allTags[tag]})</span>
              </li>
            )
          })}
        </ul>
      </TwoColumn>
    </>
  )
}
