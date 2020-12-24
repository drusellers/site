import Layout from "../../components/layout";
import { getAllQuotesIds, getQuoteData } from "../../lib/quotes";

export default function Post({ postData }) {
  let cite = <cite>- {postData.author}</cite>;
  if (postData.author_link) {
    cite = (
      <cite>
        -{" "}
        <a href={postData.author_link} target="_blank" rel="noopener">
          {postData.author}
        </a>
      </cite>
    );
  }
  return (
    <Layout title={postData.title}>
      <div className="quote">
        <blockquote
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        ></blockquote>
        <cite>{postData.author}</cite>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllQuotesIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getQuoteData(params.id);
  return {
    props: {
      postData,
    },
  };
}
