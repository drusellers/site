import { getSortedPostsData } from '@/lib/cms.posts'
import YearHeading from '@/components/yearHeading'
import DateTitle from '@/components/dateTitle'
import PageTitle from '@/components/oxford/PageTitle'

export default function Posts({}) {
  // group by year
  // then sort by date
  const allPosts = groupBy(getSortedPostsData(), 'year')

  return (
    <div className={'flex flex-col pl-8 pt-9 gap-y-4'}>
      <PageTitle>Posts</PageTitle>

      <div className={'grid grid-cols-8 gap-x-4'}>
        <div className={'col-span-3 text-right'}></div>
        <div className={'col-span-5'}>
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
        </div>
      </div>
    </div>
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
