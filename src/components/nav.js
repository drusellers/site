import Link from 'next/link'

export default function Nav() {
  let linkStyle = 'text-gray-500'
  return (
    <div>
      <nav className="sm:float-right">
        <aside className="space-x-4">
          <Link href="/about">
            <a title="About" className={linkStyle}>
              About
            </a>
          </Link>{' '}
          <Link href="/posts">
            <a title="Archive" className={linkStyle}>
              Archive
            </a>
          </Link>{' '}
          <Link href="/iron">
            <a title="Iron and the Soul" className={linkStyle}>
              Iron and the Soul
            </a>
          </Link>{' '}
          <Link href="/tags">
            <a title="Tags" className={linkStyle}>
              Tags
            </a>
          </Link>{' '}
          <Link href="/resume">
            <a title="Resume" className={linkStyle}>
              Resume
            </a>
          </Link>
        </aside>
      </nav>
    </div>
  )
}
