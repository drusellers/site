import { getQuoteData, getSiblingQuotes } from '@/lib/quotes'
import PageControls from '@/components/PageControls'
import Header from '@/components/Header'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'

type PageParams = {
  params: {
    id: string
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
  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={postData.title} />}>
        <div className="quote markdown mb-8">
          <blockquote
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          ></blockquote>
          {cite}
        </div>
        <PageControls
          nextHref={siblings.nextQuote?.href}
          prevHref={siblings.prevQuote?.href}
        />
      </TwoColumn>
    </>
  )
}
