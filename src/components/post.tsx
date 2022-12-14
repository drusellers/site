import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/pro-light-svg-icons'
import Date from './date'

type Props = {
  id: string
  title: string
  description?: string
  video?: string
  date: string
}
export default function Post({ id, title, description, video, date }: Props) {
  let d = <></>
  if (description) {
    d = <p className={'prose'}>{description}</p>
  }
  return (
    <div>
      <Link
        href={`/posts/${id}`}
        className="font-heading text-2xl text-blue-500"
      >
        <h2 className={'font-heading'}>
          {title}
          <Video video={video} />
        </h2>
      </Link>
      {d}
      <div
        className={
          'align-center flex flex-row justify-start text-sm text-gray-500'
        }
      >
        <Date dateString={date} />
      </div>
    </div>
  )
}

function Video({ video }) {
  if (!video) return <></>

  return (
    <FontAwesomeIcon icon={faFilm} className={'ml-2 text-sm text-gray-400'} />
  )
}
