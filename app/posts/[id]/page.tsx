import { getPostData } from '@/lib/posts'
import Header from '@/components/Header'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'
import PostContent from '@/components/PostContent'

export default async function Post({ params }) {
  const postData = await getPostData(params.id)

  return (
    <>
      <Header />
      <TwoColumn
        left={
          <SideColumn
            title={postData.title}
            subtitle={postData.subtitle}
            date={postData.date}
            tags={postData.tags}
            wordCount={postData.wordCount}
            readingTime={postData.readingTime}
          />
        }
      >
        <Video video={postData.video} />
        <PostContent postData={postData} />
      </TwoColumn>
    </>
  )
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
