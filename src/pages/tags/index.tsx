import Layout from '../../layouts/layout'
import { getAllTags } from '../../lib/posts'
import Link from 'next/link'

export default function Tags({ allTags }) {
  return (
    <Layout title="Tags">
      <ul className="list">
        {Object.keys(allTags).map((tag) => {
          return (
            <li key={tag}>
              <Link href={`/tags/${tag}`} className="text-blue-500">
                <i className="fal fa-tag"></i> {tag}
              </Link>{' '}
              <span className="text-xs">({allTags[tag]})</span>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export function getStaticProps() {
  const allTags = getAllTags()

  return {
    props: {
      allTags,
    },
  }
}
