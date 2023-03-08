import { getSortedPostsData } from '@/lib/posts'
import YearHeading from '@/components/yearHeading'
import DateTitle from '@/components/dateTitle'
import PagePage from '@/components/PagePage'

export default function Posts({}) {
  // group by year
  // then sort by date
  const allPosts = groupBy(getSortedPostsData(), 'year')

  return (
    <PagePage title="Posts">
      {Object.keys(allPosts)
        .reverse()
        .map((year) => {
          return (
            <div key={year} className="mb-8">
              <YearHeading year={year} />
              <div className="mt-2 space-y-1">
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
