import { Employer } from '@/lib/types'
import { toMarkdown } from '@/lib/md'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/pro-light-svg-icons'

type Props = {
  job: Employer
}

export default function Experience({ job }: Props) {
  return (
    <div className={'flex flex-col space-y-2'}>
      <div className={'flex flex-row justify-between'}>
        <div className={'font-bold text-2xl'}>{job.employer}</div>
        <div>
          <a
            href={job.url}
            className="text-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            {job.urllabel}{' '}
            <FontAwesomeIcon
              className={'text-xxs'}
              icon={faArrowUpRightFromSquare}
            />
          </a>
        </div>
      </div>
      <div className={'flex flex-col space-y-8'}>
        {job.roles.map((r) => {
          return (
            <div key={r.title} className={'flex flex-col gap-y-1'}>
              <div className={'flex flex-row justify-between'}>
                <div className={'font-bold'}>{r.title}</div>
                <div className={'font-light'}>
                  {r.start} - {r.end}
                </div>
              </div>

              <div className={'flex flex-col space-y-4 pl-4'}>
                {r.description.map((d, i) => {
                  return (
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{ __html: toMarkdown(d).html }}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
