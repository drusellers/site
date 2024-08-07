import PageTitle from '@/components/oxford/PageTitle'
import React, { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  sidebar: ReactNode
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
}
export default function PageLayout({
  title,
  sidebar,
  children,
  prev,
  next,
}: Props) {
  return (
    <div className={'flex flex-col pl-8 pt-9 gap-y-4'}>
      <PageTitle>{title}</PageTitle>
      <div className={'grid grid-cols-8 gap-x-4'}>
        <div className={'col-span-3 text-right'}>{sidebar}</div>
        <div className={'col-span-5'}>{children}</div>
      </div>
    </div>
  )
}
