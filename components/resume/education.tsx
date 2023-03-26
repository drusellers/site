import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquare } from '@fortawesome/pro-light-svg-icons'
import { Education } from '@/lib/types'

type Props = {
  school: Education
}

export default function EducationUI({ school }) {
  let e = school
  return (
    <div key={e.school} className="space-y-3">
      <h4 className="font-heading text-xl font-bold">
        {e.school}{' '}
        <small>
          <a
            href={e.url}
            className="text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            {e.urllabel} <FontAwesomeIcon icon={faExternalLinkSquare} />
          </a>
        </small>
      </h4>
      <div className="flex">
        <div className="">
          {e.major}
          <br />
          <small> {e.minor}</small>
        </div>
        <div className="flex-1 text-right">
          {e.start} - {e.end}
        </div>
      </div>
    </div>
  )
}
