import { getPostData } from '@/lib/cms.posts'
import PostContent from '@/components/PostContent'
import PostMetadata from '@/components/oxford/PostMetadata'
import PageTitle from '@/components/oxford/PageTitle'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Post({ params }: Props) {
  const id = (await params).id
  const postData = await getPostData(id)

  return (
    <div className={'flex flex-col pl-8 pt-9 gap-y-4'}>
      <PageTitle>{postData.title}</PageTitle>
      <div className={'grid grid-cols-8 gap-x-4'}>
        <div className={'col-span-3 text-right'}>
          <PostMetadata postData={postData} />
        </div>
        <div className={'col-span-4'}>
          <PostContent postData={postData} />
        </div>
        <div className={'col-span-1'}></div>
      </div>
    </div>
  )
}
