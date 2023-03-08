import { getSortedQuotesData, Quote } from '@/lib/quotes'
import YearHeading from '@/components/yearHeading'
import DateTitle from '@/components/dateTitle'
import PagePage from '@/components/PagePage'

type Props = {
  allQuotes: { [key: string]: Quote[] }
}
export default function Index() {
  // group by year
  // then sort by date
  const allQuotes = groupBy(getSortedQuotesData(), 'year')

  return (
    <PagePage title="Index">
      {Object.keys(allQuotes)
        .reverse()
        .map((year) => {
          return (
            <div key={year} className="mb-8">
              <YearHeading year={year} />
              <div className={'mt-2 space-y-1'}>
                {allQuotes[year].map((q) => {
                  return (
                    <DateTitle
                      key={q.id}
                      date={q.date}
                      href={`/quotes/${q.id}`}
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
