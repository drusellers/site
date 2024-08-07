import { PostData } from '@/lib/cms.posts'
import Date from '@/components/date'
import React from 'react'
import Stats from '@/components/stats'

type Props = {
  postData: PostData
}

export default function PostMetadata({ postData }: Props) {
  return (
    <div className={'flex flex-col font-light pt-[2px]'}>
      <div className={'font-light'}>
        <Date dateString={postData.date} />
      </div>
      <div className={'flex flex-row justify-end'}>
        <Stats
          wordCount={postData.wordCount}
          readingTime={postData.readingTime}
        />
      </div>
    </div>
  )
}
