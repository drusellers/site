import { getAbout } from '@/lib/cms'
import PagePage from '@/components/PagePage'

// core: Open, Achievement, Respect, Intellect
export default function About() {
  const bio = getAbout()

  return (
    <PagePage title="About">
      <img src={bio.img} alt={'Coffee, yum.'} />
      <div
        className={'prose'}
        dangerouslySetInnerHTML={{ __html: bio.html }}
      ></div>
    </PagePage>
  )
}
