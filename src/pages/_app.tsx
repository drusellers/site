import Head from 'next/head'
import '../css/index.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { GlobalContext } from '../contexts/GlobalContext'
config.autoAddCss = false
// import '../css/base.css';
// import '../css/typography.css';

// import '../css/brand.css';

// common

// import '../css/footnotes.css'
// import '../css/lists.css'
// import '../css/quotes.css'
// import '../css/archive.css'
// import '../css/article.css'

// pages
// import "../css/pages/resume.css";
// import "../css/pages/allegory.css";

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
