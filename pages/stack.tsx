import Layout from '../components/layouts/layout'
import { getStack } from '../lib/cms'

export default function Stack({ page }) {
  return (
    <Layout title="Stack" date="2019-10-28">
      <div
        className={'prose'}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const page = getStack()

  return {
    props: {
      page,
    },
  }
}
