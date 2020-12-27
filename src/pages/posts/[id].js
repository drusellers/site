import Layout from "../../layouts/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { indexPost } from '../../lib/es';

export default function Post({ postData }) {
  return (
    <Layout title={postData.title}
            subtitle={postData.subtitle}
            date={postData.date}
            tags={postData.tags}
            wordCount={postData.wordCount}
            readingTime={postData.readingTime}>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id);
  await indexPost(postData);

  return {
    props: {
      postData,
    },
  };
}
