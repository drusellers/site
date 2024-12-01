import { getAbout } from '@/lib/cms.about'
import PageTitle from '@/components/oxford/PageTitle'
import Image from "next/image";

export default function About() {
  const bio = getAbout()

  return (
    <div className={'flex flex-col pl-8 pr-8 lg:pr-0 pt-9 gap-y-4'}>
      <PageTitle>About</PageTitle>
      <div className={'grid grid-cols-1 lg:grid-cols-7 gap-x-4'}>
        <div className={'lg:col-span-3 text-right'}>
            <Image src={bio.img}
                   width={2048}
                   height={1365}
                   alt={'Coffee, yum.'} />
        </div>
        <div className={'md:col-span-3'}>
          <div
            className={'prose'}
            dangerouslySetInnerHTML={{ __html: bio.html }}
          ></div>
        </div>
      </div>
    </div>
  )
}
