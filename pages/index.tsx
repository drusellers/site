import Layout from '../components/layouts/layout'
import { getSortedPostsData } from '../lib/posts'
import Post from '../components/post'
import Placard from '../components/placard'

export default function Home({ beforeFold, afterFold }) {
  return (
    <Layout title="Curiosity is Life">
      <div className="space-y-4">
        {beforeFold.map(({ id, date, title, description, video }) => (
          <Post
            key={id}
            id={id}
            title={title}
            description={description}
            video={video}
            date={date}
          />
        ))}
        {/*</div>*/}
        {/*<Placard />*/}
        {/*insert something here 5 posts in*/}
        {/*<div className="space-y-4">*/}
        {afterFold.map(({ id, date, title, description, video }) => (
          <Post
            key={id}
            id={id}
            title={title}
            description={description}
            video={video}
            date={date}
          />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getSortedPostsData()
  const beforeFold = posts.slice(0, 5)
  const afterFold = posts.slice(5, 10)
  const allPostsData = getSortedPostsData().slice(0, 5)
  return {
    props: {
      allPostsData,
      beforeFold,
      afterFold,
    },
  }
}