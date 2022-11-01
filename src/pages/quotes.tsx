import { getSortedQuotesData, Quote } from '../lib/quotes'
import Layout from '../layouts/layout'
import YearHeading from '../components/yearHeading'
import DateTitle from '../components/dateTitle'

type Props = {
  allQuotes: { [key: string]: Quote[] }
}
export default function Quotes({ allQuotes }: Props) {
  return (
    <Layout title="Quotes">
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
    </Layout>
  )
}

export async function getStaticProps() {
  // group by year
  // then sort by date
  const allQuotes = getSortedQuotesData()
  return {
    props: {
      allQuotes: groupBy(allQuotes, 'year'),
    },
  }
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
