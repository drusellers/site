import { getQuoteData } from '@/lib/quotes'
import PagePage from '@/components/PagePage'

export default async function Post({ params }) {
  const postData = await getQuoteData(params.id)
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
    <PagePage title={postData.title}>
      <div className="quote markdown">
        <blockquote
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        ></blockquote>
        <cite>{postData.author}</cite>
      </div>
    </PagePage>
  )
}
