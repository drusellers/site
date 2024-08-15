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
      <div className={'flex-col md:flex divide-[#C6D3D5] divide-x'}>
        <div className={'flex-1'}>
          {/* explore the 8 columns here at this level */}
          {children}
          <Footer />
        </div>
        <div className={'flex-none w-[270px]'}>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
