import { getValueData } from '@/lib/values'
import PagePage from '@/components/PagePage'

export default async function Post({ params }) {
  const postData = await getValueData(params.id)

  return (
    <PagePage title={postData.title} tags={postData.tags}>
      <div className="nested nested-copy-line-height nested-links nested-copy-separator">
        <div className="pa4">
          <blockquote className="athelas ml0 mt0 pl4 black-90">
            <div
              className="f5 f4-m f3-l lh-copy measure mt0"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />

            <cite className="f6 ttu tracked fs-normal">
              - {postData.author}
            </cite>
          </blockquote>
        </div>
      </div>
    </PagePage>
  )
}
