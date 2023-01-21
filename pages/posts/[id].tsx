import Layout from '../../components/layouts/layout'
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
      <Video video={postData.video} />
      <div
        className="prose"
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

function Video({ video }) {
  if (video === null) {
    return null
  }

  if (video.youtube) {
    return (
      <iframe
        width="560"
        height="315"
        src={video.youtube}
        title="YouTube video player"
        className={'mb-5'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    )
  }

  if (video.loom) {
    return (
      <div
        style={{ position: 'relative', paddingBottom: '56.25%', width: 560 }}
        className={'mb-5'}
      >
        <iframe
          src={video.loom}
          frameBorder="0"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        ></iframe>
      </div>
    )
  }

  return <></>
}
