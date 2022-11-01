import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/pro-light-svg-icons'

export default function Post({ id, title, description, video }) {
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
        <h2 className={'font-heading'}>{title}</h2>
      </Link>
      {d}
      {video ? (
        <p>
          <FontAwesomeIcon icon={faFilm} />
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}
