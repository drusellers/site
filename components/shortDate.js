import { parseISO, format } from 'date-fns'

export default function ShortDate({ dateString }) {
  if(dateString == undefined) {
    return <></>
  }

  const date = parseISO(dateString)
  return <time className="font-mono text-gray-400 text-sm" dateTime={dateString}>{format(date, 'LLL dd')}</time>
}
