import { getSortedValuesData } from "../lib/values";
import ShortDate from "../components/shortDate";
import Link from "next/link";
import Layout from "../components/layout";

export default function Values({ allValues }) {
  return (
    <Layout title="Values">
      {allValues.map((v) => {
        return (
          <div class="archive">
            <ul>
              <div className="mv2">
                <Link href={`/values/${v.id}`}>
                  <a className="link blue post-link">{v.title}</a>
                </Link>
              </div>
            </ul>
          </div>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const allValues = getSortedValuesData();
  return {
    props: {
      allValues,
    },
  };
}
