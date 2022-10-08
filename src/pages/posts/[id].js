import Layout from '../../layouts/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout
      title={postData.title}
      subtitle={postData.subtitle}
      date={postData.date}
      tags={postData.tags}
      wordCount={postData.wordCount}
      readingTime={postData.readingTime}
    >
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </Layout>
  )
}

// Support Static Site Generation
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id)
  // TODO: Comment out when searching is solved
  // await indexPost(postData);
  return {
    props: {
      postData,
    },
  }
}
