import Link from 'next/link'

export default function Nav() {
  let linkStyle = 'text-gray-500'
  return (
    <div>
      <nav className="sm:float-right">
        <aside className="space-x-4">
          <Link href="/about" title="About" className={linkStyle}>
            About
          </Link>{' '}
          <Link href="/posts" title="Archive" className={linkStyle}>
            Archive
          </Link>{' '}
          <Link href="/iron" title="Iron and the Soul" className={linkStyle}>
            Iron and the Soul
          </Link>{' '}
          <Link href="/resume" title="Resume" className={linkStyle}>
            Resume
          </Link>
        </aside>
      </nav>
    </div>
  )
}
