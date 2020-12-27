import Layout from "../layouts/layout";
import { getSortedPostsData } from "../lib/posts";
import Post from "../components/post";
import Placard from '../components/placard';

export default function Home({ beforeFold, afterFold }) {
  return (
    <Layout title="Curiosity is Life" isHome={true}>
      <div className="space-y-4">
        {beforeFold.map(({ id, date, title, description }) => (
            <Post key={id} id={id} title={title} description={description} />
        ))}
      {/*</div>
       insert something here 5 posts in
      <div className="space-y-4">*/}
        {afterFold.map(({ id, date, title, description }) => (
            <Post key={id} id={id} title={title} description={description} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  const beforeFold = posts.slice(0, 5);
  const afterFold = posts.slice(5, 10);
  const allPostsData = getSortedPostsData().slice(0, 5);
  return {
    props: {
      allPostsData,
      beforeFold,
      afterFold
    },
  };
}
