import Head from 'next/head';
import '../css/base.css';
import '../css/typography.css';

// elo
// import '../elo/elo.css';
// import '../elo/Box.css';
// import '../elo/Box.js';
// import '../elo/Center.css';
// import '../elo/Center.js';
// import '../elo/Cluster.css';
// import '../elo/Cluster.js';
// import '../elo/Cover.css';
// import '../elo/Cover.js';
// import '../elo/Frame.css';
// import '../elo/Frame.js';
// import '../elo/Grid.css';
// import '../elo/Grid.js';
// import '../elo/Imposter.css';
// import '../elo/Imposter.js';
// import '../elo/Reel.css';
// import '../elo/Reel.js';
// import '../elo/Sidebar.css';
// import '../elo/Sidebar.js';
// import '../elo/Stack.css';
// import '../elo/Stack.js';
// import '../elo/Switcher.css';
// import '../elo/Switcher.js';

import '../css/brand.css';

// common
import '../css/markdown.css'
import '../css/footnotes.css'
import '../css/lists.css'
import '../css/quotes.css'
import '../css/archive.css'
import '../css/article.css'

// pages
// import "../css/pages/resume.css";
import "../css/pages/allegory.css";



function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
