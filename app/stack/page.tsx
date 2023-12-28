import { getStack } from '@/lib/cms'
import { Metadata } from 'next'
import Header from '@/components/Header'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'

export const metadata: Metadata = {
  title: 'The Stack',
  description: 'A reflection on how I organize my life',
}

export default function Stack({}) {
  const page = getStack()

  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={'Stack'} date={'2023-12-17'} />}>
        <div
          className={'prose'}
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </TwoColumn>
    </>
  )
}
