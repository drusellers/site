import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  if (dateString === undefined) {
    return <></>
  }

  const date = parseISO(dateString)
  return (
    <time className="block" dateTime={dateString}>
      {format(date, 'LLL d, yyyy')}
    </time>
  )
}
