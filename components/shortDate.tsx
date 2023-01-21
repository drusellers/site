import { parseISO, format } from 'date-fns'

type Props = {
  dateString?: string
}

export default function ShortDate({ dateString }: Props) {
  if (dateString == undefined) {
    return <></>
  }

  const date = parseISO(dateString)
  return (
    <time className="font-mono text-sm text-gray-400" dateTime={dateString}>
      {format(date, 'LLL dd')}
    </time>
  )
}
