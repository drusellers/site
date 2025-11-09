import { ReactNode } from 'react'

export default function ResumeSection({
                         title,
                         children,
                       }: {
  title: string
  children: ReactNode
}) {
  return (
    <div className={'grid grid-cols-8 print:grid-cols-1 gap-x-4 pr-4'}>
      <div
        className={
          'col-span-3 print:col-span-1 text-right print:text-left uppercase font-bold  leading-8'
        }
      >
        {title}
      </div>
      <div
        className={
          'col-span-5 print:col-span-1 flex flex-col space-y-8 print:space-y-4'
        }
      >
        {children}
      </div>
    </div>
  )
}