import Layout from '../components/layout';
import { getAllTags } from '../lib/posts';
import ShortDate from "../components/shortDate";
import Link from "next/link";

export default function Tags({allTags}) {
  return (
    <Layout title="Tags">
      <ul className="list">
      {Object.keys(allTags).map((tag) => {
        return (
            <li key={tag}>
              <Link href={`/tags/${tag}`}>
                <a >
                  <i className="fal fa-tag"></i>{" "}
                  {tag}
                </a>
              </Link>{" "}
              <span style={{'fontSize': 'var(--font-s-2)'}}>
                ({allTags[tag]})
              </span>
            </li>
            );
      })}
      </ul>

      </Layout>
  );
}

export async function getStaticProps() {
  // group by year
  // then sort by date
  const allTags = getAllTags();
  console.log('tags', allTags);
  return {
    props: {
      allTags,
    },
  };
}
