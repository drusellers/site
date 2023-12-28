'use client'

import Link from 'next/link'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRouter } from 'next/navigation'

type Params = {
  prevHref?: string
  nextHref?: string
}
export default function PageControls({ prevHref, nextHref }: Params) {
  const router = useRouter()

  useHotkeys('leftArrow', () => {
    if (prevHref) router.push(prevHref)
  })

  useHotkeys('rightArrow', () => {
    if (nextHref) router.push(nextHref)
  })

  return (
    <>
      <div className={'flex flex-row justify-between'}>
        <PageButton text={'< Prev'} href={prevHref} />
        <PageButton text={'Next >'} href={nextHref} />
      </div>
    </>
  )
}

type ButtonParams = {
  text: string
  href?: string
}

function PageButton({ href, text }: ButtonParams) {
  if (href == undefined) return <></>

  return (
    <div className={'px-4 py-2 bg-blue-50 rounded'}>
      <Link href={href}>{text}</Link>
    </div>
  )
}
