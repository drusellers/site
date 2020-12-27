import Layout from "../layouts/layout";
import { getResumeData } from "../lib/data";
import Experience from "../components/resume/experience";
import Education from "../components/resume/education";

export default function Resume({ resumeData }) {
  let headingClasses = "text-2xl my-4 font-bold font-heading";
  return (
    <Layout title="Resume">
      <div className="space-y-6">
        <blockquote className="ml-6">{resumeData.summary}</blockquote>

        <h3 className={headingClasses}>Work Experience</h3>
        {resumeData.employeers.map((j) => {
          return <Experience job={j} />;
        })}

        <h3 className={headingClasses}>Education</h3>
        <div className="ml-6">
          {resumeData.education.map((e) => {
            return <Education school={e} />;
          })}
        </div>

        <h3 className={headingClasses}>Community Activities</h3>
        <div className="ml-6 space-y-4">
          {resumeData.activities.map((a, i) => {
            return (
              <div key={i}>
                {a}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const resumeData = getResumeData();
  return {
    props: {
      resumeData,
    },
  };
}
