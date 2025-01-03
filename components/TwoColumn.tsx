import React from 'react'

type Props = {
  left: React.ReactNode
  children: React.ReactNode
}

export default function TwoColumn({ left, children }: Props) {
  return (
    <div className={'grid grid-cols-1 md:grid-cols-2cols'}>
      <div>{left}</div>
      <div className={'my-2 sm:my-6 px-6 w-full'}>{children}</div>
    </div>
  )
}
