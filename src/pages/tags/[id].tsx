import Layout from '../../layouts/layout'
import { getAllTagIds, getTagData } from '../../lib/posts'
import ShortDate from '../../components/shortDate'
import Link from 'next/link'
import YearHeading from '../../components/yearHeading'
import DateTitle from '../../components/dateTitle'

export default function Tag({ tag, allPosts }) {
  return (
    <Layout title={tag}>
      {Object.keys(allPosts)
        .reverse()
        .map((year) => {
          return (
            <div key={year} className="mb-8">
              <YearHeading year={year} />
              <div className={'mt-2 space-y-1'}>
                {allPosts[year].map((q) => {
                  return (
                    <DateTitle
                      key={q.id}
                      date={q.date}
                      href={`/posts/${q.id}`}
                      title={q.title}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllTagIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getTagData(params.id)

  return {
    props: {
      tag: params.id,
      allPosts: groupBy(postData.posts, 'year'),
    },
  }
}

function groupBy(items, key) {
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )
}
