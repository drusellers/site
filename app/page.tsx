import { getSortedPostsData } from '@/lib/posts'
import Post from '@/components/post'
import React from 'react'
import Header from '@/components/Header'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'

export default function Home() {
  const posts = getSortedPostsData()
  const beforeFold = posts.slice(0, 5)
  const afterFold = posts.slice(5, 10)
  const allPostsData = getSortedPostsData().slice(0, 5)

  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={'Curiosity is Life'} />}>
        <div className="my-2 sm:my-6 px-6 w-full">
          <article className="max-w-prose">
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
          </article>
        </div>
      </TwoColumn>
    </>
  )
}
