import { getStack } from '@/lib/cms'
import PagePage from '@/components/PagePage'

export default function Stack({}) {
  const page = getStack()

  return (
    <PagePage title="Stack" date="2019-10-28">
      <div
        className={'prose'}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </PagePage>
  )
}
