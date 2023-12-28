import { getSortedQuotesData, Quote } from '@/lib/quotes'
import YearHeading from '@/components/yearHeading'
import DateTitle from '@/components/dateTitle'
import Link from 'next/link'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'
import Header from '@/components/Header'

export default function Index() {
  // group by year
  // then sort by date
  const allQuotes = getSortedQuotesData()
  const groupedQuotes = groupBy(allQuotes, 'year')
  const randomIndex = Math.floor(Math.random() * allQuotes.length)
  const randomQuote = allQuotes[randomIndex]

  return (
    <>
      <Header />
      <TwoColumn
        left={
          <SideColumn
            title={'Quotes'}
            subtitle={'A collection of words that found me'}
          >
            <div className={''}>
              <div className={'text-gray-400'}>A random selection:</div>
              <Link href={`/quotes/${randomQuote.id}`}>
                {randomQuote.title}
              </Link>
            </div>
          </SideColumn>
        }
      >
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
