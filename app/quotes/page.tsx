import { getSortedQuotesData, Quote } from '@/lib/quotes'
import YearHeading from '@/components/yearHeading'
import DateTitle from '@/components/dateTitle'
import TitleSubtitle from '@/components/titleSubtitle'
import Link from 'next/link'

export default function Index() {
  // group by year
  // then sort by date
  const allQuotes = getSortedQuotesData()
  const groupedQuotes = groupBy(allQuotes, 'year')
  const randomIndex = Math.floor(Math.random() * allQuotes.length)
  const randomQuote = allQuotes[randomIndex]

  return (
    <div className="container mx-auto my-6 flex min-h-page max-w-document flex-col sm:flex-row">
      <div className="my-6 space-y-4 px-6 sm:w-1/3 sm:border-t-4 sm:border-black sm:pt-6">
        <TitleSubtitle
          title={'Quotes'}
          subtitle={'A collection of words that found me.'}
        />

        <div className={''}>
          <div className={'text-gray-400'}>A random selection:</div>
          <Link href={`/quotes/${randomQuote.id}`}>{randomQuote.title}</Link>
        </div>
      </div>
      <div className="my-6 px-6">
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
