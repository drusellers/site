import { getValueData } from '@/lib/cms.values'
import PageTitle from '@/components/oxford/PageTitle'

type Props = {
  params: Promise<{ id: string }>
}
export default async function Post({ params }: Props) {
  const id = (await params).id

  const postData = await getValueData(id)

  return (
    <div className={'flex flex-col pl-8 pt-9 gap-y-4'}>
      <PageTitle>{postData.title}</PageTitle>
      <div className={'grid grid-cols-7 gap-x-4'}>
        <div className={'col-span-3 text-right'}></div>
        <div className={'col-span-3'}>
          <div className="nested nested-copy-line-height nested-links nested-copy-separator">
            <div className="pa4">
              <div
                className="f5 f4-m f3-l lh-copy measure mt0 prose"
                dangerouslySetInnerHTML={{ __html: postData.html }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
