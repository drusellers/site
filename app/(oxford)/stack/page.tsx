import { getStack } from '@/lib/cms.stack'
import { Metadata } from 'next'
import PageTitle from '@/components/oxford/PageTitle'

export const metadata: Metadata = {
  title: 'The Stack',
  description: 'A reflection on how I organize my life',
}

export default function Stack({}) {
  const page = getStack()

  return (
    <div className={'flex flex-col pl-8 pt-9 gap-y-4'}>
      <PageTitle>Stack</PageTitle>
      <div className={'grid grid-cols-7 gap-x-4'}>
        <div className={'col-span-3 text-right'}>as of 2023-12-17</div>
        <div className={'col-span-3'}>
          <div
            className={'prose'}
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </div>
      </div>
    </div>
  )
}
