import Head from 'next/head'
import '../css/index.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { GlobalContext } from '../contexts/GlobalContext'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dru Sellers</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
