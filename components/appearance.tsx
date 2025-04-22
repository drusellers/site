import ShortDate from './shortDate'
import Link from 'next/link'

type Props = {
  date: string
  title: string
  href: string
  mentionOnly?: boolean
}
export default function Appearance({ date, title, href, mentionOnly }: Props) {
  return (
    <div className={'flex'}>
      <div className="mr-4">
        <ShortDate dateString={date} />
      </div>
      <div className={'flex flex-col'}>
        <Link href={href}>{title}</Link>
        {mentionOnly ? (
          <div className={'text-xs ml-1 text-gray-500'}>Mentioned</div>
        ) : null}
      </div>
    </div>
  )
}
