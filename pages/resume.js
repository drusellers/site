import Layout from "../components/layout";
import { getResumeData } from "../lib/data";
import styles from './resume.module.css';
import { Switcher, Stack } from '../components/elo';

export default function Resume({ resumeData }) {
  return (
    <Layout title="Resume">
      <div className={styles.resume}>
        <div>
          <blockquote>{resumeData.summary}</blockquote>

          <h3>Work Experience</h3>
          {resumeData.jobs.map((j) => {
            return (
              <div key={j.employeer} className={styles.experience}>
                <h4>
                  {j.employer}{" "}
                  <small>
                    <a href={j.url} target="_blank">
                      {j.urllabel}{" "}
                      <i className="far fa-external-link-square"></i>
                    </a>
                  </small>
                </h4>
                <Switcher>
                  <div>
                    <div className={styles.title}>{j.title}</div>
                    <div className={styles.duration}>
                      {j.start} - {j.end}
                    </div>
                  </div>
                </Switcher>
                {j.description.map((d,i) => {
                  {
                    /* markdown ify */
                  }
                  return <p key={i}>{d}</p>;
                })}
              </div>
            );
          })}
          <h3 className="measure lh-title">Education</h3>
          {resumeData.education.map((e) => {
            return (
              <div key={e.school} className={styles.education}>
                <h4>
                  {e.school}{" "}
                  <small>
                    <a href={e.url} target="_blank">
                      {e.urllabel}{" "}
                      <i className="far fa-external-link-square"></i>
                    </a>
                  </small>
                </h4>
                <Switcher>
                  <div>
                    <div>
                      {e.major}
                      <br />
                      <small> {e.minor}</small>
                    </div>
                    <div className={styles.resumeDuration}>
                      {e.start} - {e.end}
                    </div>
                  </div>
                </Switcher>
              </div>
            );
          })}

          <h3>Community Activities</h3>
          <Stack>
            {resumeData.activities.map((a, i) => {
              return <div key={i} className={styles.activity}>{a}</div>;
            })}
          </Stack>
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
