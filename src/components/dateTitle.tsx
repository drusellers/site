import ShortDate from './shortDate'
import Link from 'next/link'

type Props = {
  date: string
  title: string
  href: string
}
export default function DateTitle({ date, title, href }: Props) {
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
