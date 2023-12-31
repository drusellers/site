import { getValueData } from '@/lib/values'
import Header from '@/components/Header'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'

export default async function Post({ params }) {
  const postData = await getValueData(params.id)

  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={postData.title} />}>
        <div className="nested nested-copy-line-height nested-links nested-copy-separator">
          <div className="pa4">

              <div
                className="f5 f4-m f3-l lh-copy measure mt0 prose"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
              />

          </div>
        </div>
      </TwoColumn>
    </>
  )
}
