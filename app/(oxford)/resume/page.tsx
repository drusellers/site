import {
	faLocationPin,
	faPaperPlaneTop,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NakedMarkdown } from "@/components/Markdown";
import Archived from "@/components/oxford/Archived";
import Education from "@/components/oxford/Education";
import Experience from "@/components/oxford/Experience";
import PageTitle from "@/components/oxford/PageTitle";
import PrintSection from "@/components/oxford/PrintSection";
import ResumeSection from "@/components/oxford/ResumeSection";
import { getResumeData } from "@/lib/cms.resume";
import { yearsOfExperience } from "@/lib/util";

export default function ResumeUI() {
	const resumeData = getResumeData();

	return (
		<div
			className={
				"flex flex-col pl-8 pt-9 print:pt-2 gap-y-8 print:gap-y-4 pr-4"
			}
		>
			<PageTitle className={"print:hidden"}>Resume</PageTitle>
			<PrintSection>
				<div className={"flex flex-col"}>
					<div className={"font-bold"}>Dru Sellers</div>
					<div className={"flex justify-between"}>
						<div className={"flex gap-x-2 items-center"}>
							<FontAwesomeIcon icon={faPaperPlaneTop} />
							dru@drusellers.com
						</div>
						{/*<div className={"flex gap-x-2 items-center"}>*/}
						{/*  <FontAwesomeIcon icon={faMobileNotch} />*/}
						{/*  785-840-7234*/}
						{/*</div>*/}
						<div className={"flex gap-x-2 items-center"}>
							<FontAwesomeIcon icon={faLocationPin} />
							Austin, TX
						</div>
					</div>
				</div>
			</PrintSection>

			<ResumeSection title={"Intro"}>
				<NakedMarkdown variables={{ years: yearsOfExperience() }}>
					{resumeData.summary}
				</NakedMarkdown>
			</ResumeSection>

			{/* Experience */}
			<ResumeSection title={"Experience"}>
				{resumeData.employers.map((j) => {
					return <Experience key={j.employer} job={j} />;
				})}
				<Archived count={resumeData.archived_employers.length}>
					{resumeData.archived_employers.map((j) => {
						return <Experience key={j.employer} job={j} />;
					})}
				</Archived>
			</ResumeSection>

			{/* Education */}
			<ResumeSection title={"Education"}>
				{resumeData.education.map((j) => {
					return <Education key={j.school} school={j} />;
				})}
			</ResumeSection>

			{/* Activities */}
			<ResumeSection title={"Community Activities"}>
				<div className={"flex flex-col space-y-4"}>
					{resumeData.activities.map((a) => {
						return <div key={a}>{a}</div>;
					})}
				</div>
			</ResumeSection>
		</div>
	);
}
