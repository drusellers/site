import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function PageTitle({ children }: Props) {
  let length = 0
  if (typeof children == 'string') {
    length = Math.max(...children.split(' ').map((w) => w.length))
  }

  let fontSize = 'text-[312px] leading-[75%] pb-6'
  if (length > 14) {
    fontSize = 'text-[252px] leading-[75%] pb-4'
  }

  const base = 'font-bold font-heading text-oxford-500 uppercase'

  return <div className={classNames(fontSize, base)}>{children}</div>
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
