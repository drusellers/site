import { getSortedQuotesData } from "../lib/quotes";
import ShortDate from "../components/shortDate";
import Link from "next/link";
import Layout from '../components/layout';

export default function Quotes({ allQuotes }) {
  return (
    <Layout title="Quotes">
      {Object.keys(allQuotes).reverse().map((year) => {
        return (
          <div className="archive">
            <h3>{year}</h3>
            {allQuotes[year].map((q) => {
              return (
                  <div id={q.id}>
                    <ShortDate dateString={q.date} />
                    <Link href={`/quotes/${q.id}`}>
                      <a>{q.title}</a>
                    </Link>
                  </div>
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
