import Layout from '../layouts/layout'
import { getAbout } from '../../lib/cms.ts'

// core: Open, Achievement, Respect, Intellect
export default function About({ bio }) {
  return (
    <Layout title="About">
      <img src={bio.frontMatter.img} />
      <div
        className={'prose'}
        dangerouslySetInnerHTML={{ __html: bio.html }}
      ></div>
    </Layout>
  )
}

export async function getStaticProps() {
  const bio = getAbout()

  return {
    props: {
      bio,
    },
  }
}
