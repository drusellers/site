import Layout from "../../layouts/layout";
import { getAllTagIds, getTagData } from "../../lib/posts";
import ShortDate from "../../components/shortDate";
import Link from "next/link";

export default function Tag({ tag, allPosts }) {
  return (
    <Layout title={tag}>
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

export async function getStaticPaths() {
  const paths = getAllTagIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getTagData(params.id);

  return {
    props: {
      tag: params.id,
      allPosts: groupBy(postData.posts, 'year'),
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
