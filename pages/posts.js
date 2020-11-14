import Layout from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import ShortDate from "../components/shortDate";
import Link from "next/link";

export default function Posts({allPosts}) {
  return (
    <Layout title="Posts">
      {Object.keys(allPosts).reverse().map((year) => {
        return (
          <div className="archive">
            <h3>{year}</h3>
            {allPosts[year].map((q) => {
              return (
                  <div id={q.id}>
                    <ShortDate dateString={q.date} />
                    <Link href={`/posts/${q.id}`}>
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
