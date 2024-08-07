import { getSortedQuotesData, Quote } from '@/lib/quotes'
import YearHeading from '@/components/yearHeading'
import DateTitle from '@/components/dateTitle'
import Link from 'next/link'
import PageLayout from '@/components/oxford/PageLayout'

export default function Index() {
  // group by year
  // then sort by date
  const allQuotes = getSortedQuotesData()
  const groupedQuotes = groupBy(allQuotes, 'year')
  const randomIndex = Math.floor(Math.random() * allQuotes.length)
  const randomQuote = allQuotes[randomIndex]

  const sideBar = (
    <div className={''}>
      <div className={'text-gray-400'}>A random selection:</div>
      <Link href={`/quotes/${randomQuote.id}`}>{randomQuote.title}</Link>
    </div>
  )

  return (
    <PageLayout title={'Quotes'} sidebar={sideBar}>
      <article className="max-w-prose">
        {Object.keys(groupedQuotes)
          .reverse()
          .map((year) => {
            return (
              <div key={year} className="mb-8">
                <YearHeading year={year} />
                <div className={'mt-2 space-y-1'}>
                  {groupedQuotes[year].map((q) => {
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
      </article>
    </PageLayout>
  )
}

function groupBy(items: Quote[], key: string) {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )
}
