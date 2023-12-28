import { getTagData } from '@/lib/posts'
import YearHeading from '@/components/yearHeading'
import DateTitle from '@/components/dateTitle'
import Header from '@/components/Header'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'

export default async function Tag({ params }) {
  const postData = await getTagData(params.id)
  const allPosts = groupBy(postData.posts, 'year')
  const tag = params.id

  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={tag} />}>
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
      </TwoColumn>
    </>
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
