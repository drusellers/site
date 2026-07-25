import { createFileRoute } from "@tanstack/react-router";
import {
	faLocationPin,
	faPaperPlaneTop,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Archived from "@/components/oxford/Archived";
import Education from "@/components/oxford/Education";
import Experience from "@/components/oxford/Experience";
import PageTitle from "@/components/oxford/PageTitle";
import PrintSection from "@/components/oxford/PrintSection";
import ResumeSection from "@/components/oxford/ResumeSection";
import { getResumePageData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/resume")({
	loader: async () => getResumePageData(),
	component: ResumeUI,
});

function ResumeUI() {
	const resumeData = Route.useLoaderData();

	return (
		<div
			className={
				"flex flex-col pl-8 pt-9 print:pt-2 gap-y-8 print:gap-y-4 pr-4"
			}
		>
			<PageTitle className={"print:hidden"}>Resume</PageTitle>
			<PrintSection>
				<div className={"flex flex-col"}>
					<div className={"font-bold text-text-primary"}>Dru Sellers</div>
					<div className={"flex justify-between"}>
						<div className={"flex gap-x-2 items-center"}>
							<FontAwesomeIcon icon={faPaperPlaneTop} />
							dru@drusellers.com
						</div>
						<div className={"flex gap-x-2 items-center"}>
							<FontAwesomeIcon icon={faLocationPin} />
							Austin, TX
						</div>
					</div>
				</div>
			</PrintSection>

			<ResumeSection title={"Intro"}>
				<div
					className={"prose prose-drusellers prose-headings:mt-0"}
					// biome-ignore lint/security/noDangerouslySetInnerHtml: rendered from trusted content
					dangerouslySetInnerHTML={{ __html: resumeData.summaryHtml }}
				/>
			</ResumeSection>

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

			<ResumeSection title={"Education"}>
				{resumeData.education.map((j) => {
					return <Education key={j.school} school={j} />;
				})}
			</ResumeSection>

			<ResumeSection title={"Community Activities"}>
				<div className={"flex flex-col space-y-4"}>
					{resumeData.activities.map((a) => {
						return (
							<div key={a} className={"text-text-primary"}>
								{a}
							</div>
						);
					})}
				</div>
			</ResumeSection>
		</div>
	);
}
