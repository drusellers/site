import Link from 'next/link'
import Image from 'next/image'

type Props = {
  width?: number
  height?: number
}

// 0.3356643357
export default function Logo({ width = 143, height = 48 }: Props) {
  return (
    <Link href="/" className="block">
      <Image
        src={'/images/logo-oxford.svg'}
        alt={'Dru Sellers'}
        width={width}
        height={height}
      />
    </Link>
  )
}
