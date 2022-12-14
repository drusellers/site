import Layout from '../layouts/layout'
import { getResumeData } from '../lib/data'
import Experience from '../components/resume/experience'
import Education from '../components/resume/education'
import { Resume } from '../../lib/types'

type Props = {
  resumeData: Resume
}
export default function ResumeUI({ resumeData }) {
  let headingClasses = 'text-2xl my-4 font-bold font-heading'
  return (
    <Layout title="Resume">
      <div className="space-y-6">
        <blockquote className="ml-6">{resumeData.summary}</blockquote>

        <h3 className={headingClasses}>Work Experience</h3>
        {resumeData.employers.map((j) => {
          return <Experience key={j.employer} job={j} />
        })}

        <h3 className={headingClasses}>Education</h3>
        <div className="ml-6">
          {resumeData.education.map((e) => {
            return <Education key={e.school} school={e} />
          })}
        </div>

        <h3 className={headingClasses}>Community Activities</h3>
        <div className="ml-6 space-y-4">
          {resumeData.activities.map((a, i) => {
            return <div key={i}>{a}</div>
          })}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const resumeData = getResumeData()
  return {
    props: {
      resumeData,
    },
  }
}
