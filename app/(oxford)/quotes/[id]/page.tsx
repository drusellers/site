import {
  getAllQuotesIds,
  getQuoteData,
  getSiblingQuotes,
} from '@/lib/cms.quotes'
import PageLayout from '@/components/oxford/PageLayout'
import type { Metadata, ResolvingMetadata } from 'next'
import Quote from '@/components/Quote'

type PageParams = {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const quotes = getAllQuotesIds()

  return quotes.map((q) => ({
    id: q.params.id,
  }))
}

export async function generateMetadata(
  { params }: PageParams,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id

  const postData = await getQuoteData(id)

  return {
    title: `Quotes: ${postData.title}`,
    description: `A quote by ${postData.author}`,
    openGraph: {
      title: `Quotes: ${postData.title}`,
      description: `A quote by ${postData.author}`,
    },
    twitter: {
      title: `Quotes: ${postData.title}`,
      description: `A quote by ${postData.author}`,
    },
  }
}

export default async function Post({ params }: PageParams) {
  const id = (await params).id

  const postData = await getQuoteData(id)
  const siblings = await getSiblingQuotes(id)

  let cite = <cite>- {postData.author}</cite>
  if (postData.author_link) {
    cite = (
      <cite>
        -{' '}
        <a
          href={postData.author_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {postData.author}
        </a>
      </cite>
    )
  }

  const sidebar = <></>
  return (
    <PageLayout
      title={postData.title}
      sidebar={sidebar}
      prev={siblings.prevQuote}
      next={siblings.nextQuote}
    >
      <Quote cite={cite} html={postData.contentHtml} />
    </PageLayout>
  )
}
