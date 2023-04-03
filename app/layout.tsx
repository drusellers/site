import Nav from '../components/nav'
import Logo from '../components/logo'
import Footer from '../components/footer'
import { Metadata } from 'next'
import '../css/index.css'
import localFont from 'next/font/local'
import { Open_Sans } from '@next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'

config.autoAddCss = false

const nunito = localFont({
  src: '../public/fonts/Nunito-VariableFont_wght.ttf',
  variable: '--font-nunito',
})
const osans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'Dru Sellers',
  authors: [{ name: 'Dru Sellers', url: 'https://drusellers.com' }],
  description: "Dru's thoughts",
  icons: [{ rel: 'icon', url: '/images/favicon.png' }],
  openGraph: {
    title: 'Dru Sellers',
    siteName: 'Dru Sellers',
    description: 'Personal website for Dru Sellers',
    url: 'https://drusellers.com',
    authors: 'Dru Sellers',
    images: [
      {
        url: 'https://drusellers.com/images/dru-serious-2x600.png',
        width: 600,
        height: 312,
      },
    ],
    locale: 'en-US',
  },
}

type Props = {
  children: React.ReactNode
}

// This component carves out sections of the page, and applies sensible padding to
// them.
export default function Layout({ children }: Props) {
  return (
    <html lang={'en'}>
      <body className={`${nunito.variable} ${osans.variable}`}>
        <header className="container mx-auto flex max-w-document flex-col px-6 pt-6 sm:h-24 sm:flex-row">
          <div>
            <Logo />
          </div>
          <div className="my-6 flex-grow">
            <Nav />
          </div>
        </header>

        {children}

        <Footer />
      </body>
    </html>
  )
}
