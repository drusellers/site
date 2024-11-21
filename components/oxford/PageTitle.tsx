import React from 'react'
import { classNames } from '@/lib/util'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function PageTitle({ children, className = '' }: Props) {
  let length = 0
  if (typeof children == 'string') {
    length = Math.max(...children.split(' ').map((w) => w.length))
  }

  let fontSize = 'text-8xl xl:text-[312px] leading-[75%] pb-6'
  if (length > 14) {
    fontSize = 'text-8xl xl:text-[252px] leading-[75%] pb-4'
  }

  const base = 'font-bold font-heading text-oxford-500 uppercase'

  return <div className={classNames(fontSize, base, className)}>{children}</div>
}
