import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script src="https://kit.fontawesome.com/d76d002214.js" crossOrigin="anonymous"></script>
           <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />


          <meta name="author" content="Dru Sellers"></meta>
          <link href="https://fonts.googleapis.com/css2?family=Nunito&family=Open+Sans&display=swap" rel="stylesheet"></link>

          {/* !-- Global site tag (gtag.js) - Google Analytics -- */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-81R9YYS482"></script>
          <script  dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-81R9YYS482');
              `,
            }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
