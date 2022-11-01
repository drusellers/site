import Layout from '../layouts/layout'
import { getAbout } from '../../lib/cms'

// core: Open, Achievement, Respect, Intellect
export default function About({ bio }) {
  return (
    <Layout title="About">
      <img src={bio.img} />
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
