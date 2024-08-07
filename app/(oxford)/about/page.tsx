import { getAbout } from '@/lib/cms.about'
import PageTitle from '@/components/oxford/PageTitle'

export default function About() {
  const bio = getAbout()

  return (
    <div className={'flex flex-col pl-8 pt-9 gap-y-4'}>
      <PageTitle>About</PageTitle>
      <div className={'grid grid-cols-7 gap-x-4'}>
        <div className={'col-span-3 text-right'}>
          <img src={bio.img} alt={'Coffee, yum.'} />
        </div>
        <div className={'col-span-3'}>
          <div
            className={'prose'}
            dangerouslySetInnerHTML={{ __html: bio.html }}
          ></div>
        </div>
      </div>
    </div>
  )
}
