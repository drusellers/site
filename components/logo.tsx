import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="block h-12">
      <Image
        src={'/images/logo.svg'}
        alt={'Dru Sellers'}
        width={143}
        height={48}
      />
    </Link>
  )
}
