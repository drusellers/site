import React from 'react'
import Sidebar from '@/components/oxford/Sidebar'
import Footer from '@/components/oxford/Footer'

type Props = {
  children: React.ReactNode
}

/**
 * The purpose of this layout is to control the main column split
 */
export default function Layout({ children }: Props) {
  return (
    <div className={'h-full flex flex-col justify-between'}>
      <div className={'flex flex-col md:flex-row divide-[#C6D3D5] divide-x'}>
        <div className={'flex-1'}>
          {/* explore the 8 columns here at this level */}
          {children}
        </div>
        <div className={'flex-none w-full md:w-[270px] print:hidden'}>
          <Sidebar />
        </div>
      </div>
      <div className={'flex flex-col md:flex-row divide-[#C6D3D5] divide-x'}>
        <div className={'flex-1'}>
          <Footer />
        </div>
        <div className={'hidden md:flex flex-none w-[270px] print:hidden'}>

        </div>
      </div>
    </div>
  )
}
