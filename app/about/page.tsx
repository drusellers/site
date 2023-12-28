import { getAbout } from '@/lib/cms'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'
import Header from '@/components/Header'

// core: Open, Achievement, Respect, Intellect
export default function About() {
  const bio = getAbout()

  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={'About'} />}>
        <img src={bio.img} alt={'Coffee, yum.'} />
        <div
          className={'prose'}
          dangerouslySetInnerHTML={{ __html: bio.html }}
        ></div>
      </TwoColumn>
    </>
  )
}
