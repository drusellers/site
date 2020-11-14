import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import Post from "../components/post";

export default function Home({ allPostsData }) {
  return (
    <Layout title="Curiosity is Life" isHome={true}>
      <div id="post-list">
        {allPostsData.map(({ id, date, title, description }) => (
            <Post key={id} id={id} title={title} description={description} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData().slice(0, 5);
  return {
    props: {
      allPostsData,
    },
  };
}
