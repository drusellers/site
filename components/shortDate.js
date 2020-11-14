import { parseISO, format } from 'date-fns'

export default function ShortDate({ dateString }) {
  if(dateString == undefined) {
    return <></>
  }

  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLL dd')}</time>
}
