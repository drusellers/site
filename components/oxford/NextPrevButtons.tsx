'use client'

import { usePathname } from 'next/navigation'
import { classNames } from '@/lib/util'

type Props = {
  prev?: {
    title: string
    href: string
  }
  next?: {
    title: string
    href: string
  }
}

export function NextPrevButtons({ prev, next }: Props) {
  const pathname = usePathname()

  if (pathname === '/about') return null
  if (pathname === '/resume') return null
  if (pathname === '/iron') return null

  // - /posts
  // - /values
  // - /quotes

  return (
    <div
      className={
        'border-t border-[#C6D3D5] flex flex-row divide-x divide-[#C6D3D5] justify-between'
      }
    >
      <Tile tile={prev} mode={'prev'} />
      <Tile tile={next} mode={'next'} />
    </div>
  )
}

function Tile({
  tile,
  mode,
}: {
  tile?: { title: string; href: string }
  mode: 'prev' | 'next'
}) {
  const classes = classNames(
    'flex-1 px-6 py-4',
    mode === 'prev' ? '' : 'text-right'
  )

  if (tile)
    return (
      <div className={classes}>
        <div className={'uppercase'}>{mode}</div>
        <div>{tile.title}</div>
      </div>
    )

  return (
    <div className={classes}>
      <div> </div>
      <div> </div>
    </div>
  )
}
