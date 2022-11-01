import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="block h-12">
      <img width="143" height="48" src="/images/logo.svg" alt="Dru Sellers" />
    </Link>
  )
}
