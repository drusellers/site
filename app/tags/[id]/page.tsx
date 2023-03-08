import Layout from '@/components/layouts/layout'
import { getAllTagIds, getTagData } from '@/lib/posts'
import ShortDate from '@/components/shortDate'
import Link from 'next/link'
import YearHeading from '@/components/yearHeading'
import DateTitle from '@/components/dateTitle'
import PagePage from '@/components/PagePage'

export default async function Tag({ params }) {
  const postData = await getTagData(params.id)
  const allPosts = groupBy(postData.posts, 'year')
  const tag = params.id

  return (
    <PagePage title={tag}>
      {Object.keys(allPosts)
        .reverse()
        .map((year) => {
          return (
            <div key={year} className="mb-8">
              <YearHeading year={year} />
              <div className={'mt-2 space-y-1'}>
                {allPosts[year].map((q) => {
                  return (
                    <DateTitle
                      key={q.id}
                      date={q.date}
                      href={`/posts/${q.id}`}
                      title={q.title}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
    </PagePage>
  )
}

function groupBy(items, key) {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )
}
