import { getQuoteData, getSiblingQuotes } from '@/lib/quotes'
import PageLayout from '@/components/oxford/PageLayout'
import type { Metadata, ResolvingMetadata } from 'next'

type PageParams = {
  params: {
    id: string
  }
}

export async function generateMetadata(
  { params }: PageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  const postData = await getQuoteData(params.id)

  return {
    title: `Quotes: ${postData.title}`,
  }
}

export default async function Post({ params }: PageParams) {
  const postData = await getQuoteData(params.id)
  const siblings = await getSiblingQuotes(params.id)
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
      <div className="quote markdown mb-8">
        <blockquote
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        ></blockquote>
        {cite}
      </div>
    </PageLayout>
  )
}
