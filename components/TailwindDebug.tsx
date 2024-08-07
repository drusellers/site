'use client'

// sits inside the chrome
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function TailwindDebug() {
  const qs = useSearchParams()
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
    return () => {
      window.removeEventListener('resize', () => {
        setWidth(window.innerWidth)
      })
    }
  }, [])

  if (!qs.has('tw')) {
    return null
  }

  // this is the "max" Tailwind Size
  const maxWidth: number = 1536
  let ratio = (width / maxWidth) * 100
  if (ratio > 100) ratio = 100
  const p = `${ratio}%`

  return (
    <div className={'mt-5 space-y-2 pt-5'}>
      <div className={'w-full bg-orange-100'}>
        <div
          className={'bg-orange-500 h-4 text-xs text-white'}
          style={{ width: p }}
        >
          {width}
        </div>
      </div>
      <div className={'flex w-full space-x-2'}>
        <div className={'flex-1 rounded bg-orange-200 p-2 text-center'}>
          <pre className="text-sm">xs</pre>
          <pre className="text-xs text-orange-500">bg-orange-200</pre>
          <pre className="text-xs">&lt; 640</pre>
        </div>
        <div
          className={
            'flex-1 rounded bg-gray-100 p-2 text-center sm:bg-orange-200'
          }
        >
          <pre className="text-sm">sm</pre>
          <pre className="text-xs text-gray-500 sm:text-orange-500">
            sm:bg-orange-200
          </pre>
          <pre className="text-xs">640 ~ 768</pre>
        </div>
        <div
          className={
            'flex-1 rounded bg-gray-100 p-2 text-center md:bg-orange-200'
          }
        >
          <pre className="text-sm">md</pre>
          <pre className="text-xs text-gray-500 md:text-orange-500">
            md:bg-orange-200
          </pre>
          <pre className="text-xs">768 ~ 1,024</pre>
        </div>
        <div
          className={
            'flex-1 rounded bg-gray-100 p-2 text-center lg:bg-orange-200'
          }
        >
          <pre className="text-sm">lg</pre>
          <pre className="text-xs text-gray-500 lg:text-orange-500">
            lg:bg-orange-200
          </pre>
          <pre className="text-xs">1,024 ~ 1,280</pre>
        </div>
        <div
          className={
            'flex-1 rounded bg-gray-100 p-2 text-center xl:bg-orange-200'
          }
        >
          <pre className="text-sm">xl</pre>
          <pre className="text-xs text-gray-500 xl:text-orange-500">
            xl:bg-orange-200
          </pre>
          <pre className="text-xs">1,280 ~ 1,536</pre>
        </div>
        <div
          className={
            'flex-1 rounded bg-gray-100 p-2 text-center 2xl:bg-orange-200'
          }
        >
          <pre className="text-sm">2xl</pre>
          <pre className="text-xs text-gray-500 2xl:text-orange-500">
            2xl:bg-orange-200
          </pre>
          <pre className="text-xs">&gt; 1,536</pre>
        </div>
      </div>
      <div className="text-xs text-stone-400 px-4 pb-4">
        <p>
          The prefixes (sm, md, lg, xl, 2xl) are applied to that size{' '}
          <strong>and larger</strong>. No prefix is the same as &apos;xs&apos;.
        </p>
        <p>
          You ideally start with a setting that works for xs, and then apply
          your modifiers as the screen gets larger.
        </p>
      </div>
    </div>
  )
}
