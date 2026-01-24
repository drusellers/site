import { faArrowUpRightFromSquare } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EngagementUI from "@/components/oxford/Engagement";
import type { Employer } from "@/lib/cms.resume";
import { toMarkdown } from "@/lib/md";

type Props = {
	job: Employer;
};

export default function Experience({ job }: Props) {
	return (
		<div className={"flex flex-col space-y-2"}>
			<div className={"flex flex-row justify-between"}>
				<div className={"font-bold text-2xl text-text-primary"}>
					{job.employer}
				</div>
				<div className={"flex items-end"}>
					{job.url ? (
						<a
							href={job.url}
							className="text-blue-600 flex items-center gap-x-1"
							target="_blank"
							rel="noreferrer"
						>
							{job.url_label}{" "}
							<FontAwesomeIcon size={"xs"} icon={faArrowUpRightFromSquare} />
						</a>
					) : null}
				</div>
			</div>
			<Roles job={job} />
			<Engagements job={job} />
		</div>
	);
}

function Roles({ job }: { job: Employer }) {
	return (
		<div className={"flex flex-col space-y-8"}>
			{job.roles.map((r) => {
				return (
					<div key={r.title} className={"flex flex-col gap-y-1 pl-4"}>
						<div className={"flex flex-row justify-between"}>
							<div className={"font-semibold text-md text-text-primary"}>
								{r.title}
							</div>
							<div className={"text-text-primary text-sm"}>
								{r.start} - {r.end}
							</div>
						</div>

						<div className={"flex flex-col space-y-4"}>
							{r.description.map((d) => {
								return (
									<div
										key={d}
										className={"prose prose-drusellers"}
										// biome-ignore lint/security/noDangerouslySetInnerHtml: that's the whole point
										dangerouslySetInnerHTML={{ __html: toMarkdown(d).html }}
									/>
								);
							})}
						</div>
						<ul>
							{r.bullets.map((b) => {
								return (
									<li key={b} className={"text-text-primary"}>
										{b}
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
}

function Engagements({ job }: Props) {
	if (!job.engagements) return null;

	return (
		<div className={"flex flex-col gap-y-1 pl-4"}>
			<h5 className={"font-semibold text-md text-text-primary"}>Engagements</h5>

			{job.engagements.map((e) => {
				return <EngagementUI key={e.name} engagement={e} />;
			})}
		</div>
	);
}
