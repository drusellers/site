import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquare } from '@fortawesome/pro-light-svg-icons'
import Markdoc from '@markdoc/markdoc'
import { Employer } from '@/lib/types'

type Props = {
  job: Employer
}
export default function Experience({ job }: Props) {
  return (
    <div key={job.employer} className="ml-6 space-y-3">
      <h4 className="font-heading text-xl font-bold">
        {job.employer}{' '}
        <small>
          <a
            href={job.url}
            className="text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            {job.urllabel} <FontAwesomeIcon icon={faExternalLinkSquare} />
          </a>
        </small>
      </h4>
      {job.roles.map((role) => {
        return (
          <div key={role.title} className="space-y-3">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1">{role.title}</div>
              <div className="flex-1 sm:text-right">
                {role.start} - {role.end}
              </div>
            </div>

            {role.description.map((d, i) => {
              const ast = Markdoc.parse(d)
              const content = Markdoc.transform(ast)
              const html = Markdoc.renderers.html(content)

              return (
                <div
                  key={i}
                  className="ml-6"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
