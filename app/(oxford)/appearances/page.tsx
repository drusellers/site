import PageLayout from '@/components/oxford/PageLayout'
import YearHeading from '@/components/yearHeading'
import DateTitle from '@/components/dateTitle'
import { Appearance, getSortedAppearancesData } from '@/lib/cms.appearances'

export default function Page() {
  const allItems = getSortedAppearancesData()
  const groupedItems = groupBy(allItems, 'year')

  return (
    <PageLayout title={'Appearances'} sidebar={<Sidebar />}>
      <article className="max-w-prose">
        {Object.keys(groupedItems)
          .reverse()
          .map((year) => {
            return (
              <div key={year} className="mb-8">
                <YearHeading year={year} />
                <div className={'mt-2 space-y-1'}>
                  {groupedItems[year].map((item) => {
                    return (
                      <DateTitle
                        key={item.id}
                        date={item.date}
                        href={item.url}
                        title={item.title}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
      </article>
    </PageLayout>
  )
}

function groupBy(
  items: Appearance[],
  key: string
): Record<string, Appearance[]> {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )
}

function Sidebar() {
  return (
    <div className={''}>
      <div className={'text-gray-400'}>
        Recorded and Published Conversations
      </div>
    </div>
  )
}
