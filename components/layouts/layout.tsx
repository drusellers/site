import Nav from '../nav'
import Logo from '../logo'
import Footer from '../footer'
import TagList from '../tagList'
import TitleSubtitle from '../titleSubtitle'
import Stats from '../stats'
import Date from '../date'

type Props = {
  title: string
  subtitle?: string
  children: any
  tags?: string[]
  date?: any
  wordCount?: any
  readingTime?: any
}

// This component carves out sections of the page, and applies sensible padding to
// them.
export default function Layout({
  title,
  subtitle,
  children,
  tags,
  date,
  wordCount,
  readingTime,
}: Props) {
  return (
    <>
      <header className="container mx-auto flex max-w-document flex-col px-6 pt-6 sm:h-24 sm:flex-row">
        <div>
          <Logo />
        </div>
        <div className="my-6 flex-grow">
          <Nav />
        </div>
      </header>

      {/* <div className="container mx-auto max-w-document my-6 p-3">
        <Search />
      </div> */}

      {/* This is the main stage for showing content */}
      <div className="container mx-auto my-6 flex min-h-page max-w-document flex-col sm:flex-row">
        <div className="my-6 space-y-4 px-6 sm:w-1/3 sm:border-t-4 sm:border-black sm:pt-6">
          <TitleSubtitle title={title} subtitle={subtitle} />
          <Stats wordCount={wordCount} readingTime={readingTime} />
          <Date dateString={date} />
          <TagList tags={tags || []} />
        </div>
        <div className="my-6 px-6">
          <article className="max-w-prose">{children}</article>
        </div>
      </div>

      <Footer />
    </>
  )
}
