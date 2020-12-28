import { getSortedQuotesData } from "../lib/quotes";
import Layout from '../layouts/layout';
import YearHeading from '../components/yearHeading';
import DateTitle from '../components/dateTitle';

export default function Quotes({ allQuotes }) {
  return (
    <Layout title="Quotes">
      {Object.keys(allQuotes).reverse().map((year) => {
        return (
          <div className="mb-8">
            <YearHeading year={year} />
            {allQuotes[year].map((q) => {
              return (
                <DateTitle key={q.id} date={q.date} href={`/quotes/${q.id}`} title={q.title} />
              );
            })}
          </div>
        );
      })}
      </Layout>
  );
}

export async function getStaticProps() {
  // group by year
  // then sort by date
  const allQuotes = getSortedQuotesData();
  return {
    props: {
      allQuotes: groupBy(allQuotes, "year"),
    },
  };
}

function groupBy(items, key) {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );
}
