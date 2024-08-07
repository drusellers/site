import Highlight from '@/components/Highlight'
import { PostData } from '@/lib/cms.posts'

type Props = {
  postData: PostData
}

export default function PostContent({ postData }: Props) {
  return (
    <>
      <div
        className="prose prose-headings:mt-0"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      <Highlight />
    </>
  )
}
