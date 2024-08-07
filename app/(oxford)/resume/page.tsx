import { getResumeData } from '@/lib/data'
import Experience from '@/components/oxford/Experience'
import PageTitle from '@/components/oxford/PageTitle'
import Education from '@/components/oxford/Education'

export default function ResumeUI() {
  const resumeData = getResumeData()

  return (
    <div className={'flex flex-col pl-8 pt-9 gap-y-12 pr-4'}>
      <PageTitle>Resume</PageTitle>
      <div className={'grid grid-cols-8 gap-x-4'}>
        <div className={'col-span-3 text-right uppercase font-bold'}>Intro</div>
        <div className={'col-span-5'}>
          <div>{resumeData.summary}</div>
        </div>
      </div>

      {/* Experience */}
      <div className={'grid grid-cols-8 gap-x-4 pr-4'}>
        <div className={'col-span-3 text-right uppercase font-bold'}>
          Experience
        </div>
        <div className={'col-span-5 flex flex-col space-y-8'}>
          {resumeData.employers.map((j) => {
            return <Experience key={j.employer} job={j} />
          })}
        </div>
      </div>

      {/* Education */}
      <div className={'grid grid-cols-8 gap-x-4 pr-4'}>
        <div className={'col-span-3 text-right uppercase font-bold'}>
          Education
        </div>
        <div className={'col-span-5 flex flex-col space-y-8'}>
          {resumeData.education.map((j) => {
            return <Education key={j.school} school={j} />
          })}
        </div>
      </div>

      {/* Activities */}
      <div className={'grid grid-cols-8 gap-x-4 pr-4'}>
        <div className={'col-span-3 text-right uppercase font-bold'}>
          Community Activities
        </div>
        <div className={'col-span-5 flex flex-col space-y-4'}>
          {resumeData.activities.map((a, i) => {
            return <div key={i}>{a}</div>
          })}
        </div>
      </div>
    </div>
  )
}
