import ShortDate from './shortDate'
import Link from 'next/link'

export default function DateTitle({ date, title, href }) {
  return (
    <div>
      <div className="mr-4 inline">
        <ShortDate dateString={date} />
      </div>
      <div className="inline">
        <Link href={href}>{title}</Link>
      </div>
    </div>
  )
}
