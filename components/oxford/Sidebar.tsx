import Logo from '@/components/logo'
import { navItems } from '@/lib/nav'
import Link from 'next/link'
import Social from '@/components/Socials'
import { NextPrevButtons } from '@/components/oxford/NextPrevButtons'
import { getAbout } from '@/lib/cms.about'

export default async function Sidebar() {
  const about = getAbout()

  return (
    <div className={'flex flex-col justify-between h-screen'}>
      <div className={'flex flex-col divide-[#C6D3D5] divide-y'}>
        <div className={'flex flex-col space-y-3 px-6 py-4'}>
          <div>
            <Logo width={190} height={64} />
          </div>
          <div
            className={'leading-[140%] text-[#2B4459]'}
            dangerouslySetInnerHTML={{ __html: about.sideBar }}
          />
        </div>
        <div className={'px-6 py-4'}>
          <div className={'grid grid-cols-3 gap-y-3 gap-x-4'}>
            {navItems.map((i) => {
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={'uppercase text-sm'}
                >
                  {i.title}
                </Link>
              )
            })}
          </div>
        </div>

        <div className={'flex flex-col gap-y-4 px-6 py-4'}>
          <div className={'flex flex-row space-x-3'}>
            <Social platform="bluesky" username="@drusellers.com" />
            <Social platform="instagram" username="drusellers" />
            <Social platform="twitter" username="drusellers" />
            <Social platform="github" username="drusellers" />
            <Social platform="reddit" username="drusellers" />
          </div>
          <div className="text-gray-400">Austin, TX</div>
        </div>
      </div>

      <NextPrevButtons />
    </div>
  )
}
