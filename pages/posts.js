import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import YearHeading from '../components/yearHeading';
import DateTitle from '../components/dateTitle';

export default function Posts({allPosts}) {
  return (
    <Layout title="Posts">
      {Object.keys(allPosts).reverse().map((year) => {
        return (
          <div key={year} className="my-8">
            <YearHeading year={year} />
            <div className="mt-4 space-y-1">
            {allPosts[year].map((q) => {
              return (
                <DateTitle key={q.id} date={q.date} href={`/posts/${q.id}`} title={q.title} />
              );
            })}
            </div>
          </div>
        );
      })}
      </Layout>
  );
}

export async function getStaticProps() {
  // group by year
  // then sort by date
  const allPosts = getSortedPostsData();
  return {
    props: {
      allPosts: groupBy(allPosts, "year"),
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
