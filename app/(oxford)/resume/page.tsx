import { getResumeData } from '@/lib/data'
import Experience from '@/components/oxford/Experience'
import PageTitle from '@/components/oxford/PageTitle'
import Education from '@/components/oxford/Education'
import { ReactNode } from 'react'
import PrintSection from '@/components/oxford/PrintSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationPin,
  faMobileNotch,
  faPaperPlaneTop,
} from '@fortawesome/pro-light-svg-icons'

export default function ResumeUI() {
  const resumeData = getResumeData()

  return (
    <div
      className={
        'flex flex-col pl-8 pt-9 print:pt-2 gap-y-12 print:gap-y-4 pr-4'
      }
    >
      <PageTitle className={'print:hidden'}>Resume</PageTitle>
      <PrintSection>
        <div className={'flex flex-col'}>
          <div className={'font-bold'}>Dru Sellers</div>
          <div className={'flex justify-between'}>
            <div className={'flex gap-x-2 items-center'}>
              <FontAwesomeIcon icon={faPaperPlaneTop} />
              dru@drusellers.com
            </div>
            {/*<div className={"flex gap-x-2 items-center"}>*/}
            {/*  <FontAwesomeIcon icon={faMobileNotch} />*/}
            {/*  785-840-7234*/}
            {/*</div>*/}
            <div className={'flex gap-x-2 items-center'}>
              <FontAwesomeIcon icon={faLocationPin} />
              Austin, TX
            </div>
          </div>
        </div>
      </PrintSection>

      <ResumeSection title={'Intro'}>{resumeData.summary}</ResumeSection>

      {/* Experience */}
      <ResumeSection title={'Experience'}>
        {resumeData.employers.map((j) => {
          return <Experience key={j.employer} job={j} />
        })}
      </ResumeSection>

      {/* Education */}
      <ResumeSection title={'Education'}>
        {resumeData.education.map((j) => {
          return <Education key={j.school} school={j} />
        })}
      </ResumeSection>

      {/* Activities */}
      <ResumeSection title={'Community Activities'}>
        <div className={'flex flex-col space-y-4'}>
          {resumeData.activities.map((a, i) => {
            return <div key={i}>{a}</div>
          })}
        </div>
      </ResumeSection>
    </div>
  )
}

function ResumeSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className={'grid grid-cols-8 print:grid-cols-1 gap-x-4 pr-4'}>
      <div
        className={
          'col-span-3 print:col-span-1 text-right print:text-left uppercase font-bold  leading-8'
        }
      >
        {title}
      </div>
      <div
        className={
          'col-span-5 print:col-span-1 flex flex-col space-y-8 print:space-y-4'
        }
      >
        {children}
      </div>
    </div>
  )
}
