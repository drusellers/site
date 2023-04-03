import { getStack } from '@/lib/cms'
import PagePage from '@/components/PagePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Stack',
  description: 'A reflection on how I organize my life',
}

export default function Stack({}) {
  const page = getStack()

  return (
    <PagePage title="Stack" date="2023-04-02">
      <div
        className={'prose'}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </PagePage>
  )
}
