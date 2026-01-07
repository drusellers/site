import { Employer } from "@/lib/cms.resume";
import { toMarkdown } from "@/lib/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/pro-light-svg-icons";

type Props = {
	job: Employer;
};

export default function Experience({ job }: Props) {
	return (
		<div className={"flex flex-col space-y-2"}>
			<div className={"flex flex-row justify-between"}>
				<div className={"font-bold text-2xl"}>{job.employer}</div>
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
			<div className={"flex flex-col space-y-8"}>
				{job.roles.map((r) => {
					return (
						<div key={r.title} className={"flex flex-col gap-y-1 pl-4"}>
							<div className={"flex flex-row justify-between"}>
								<div className={"font-semibold text-md"}>{r.title}</div>
								<div className={"font-light text-sm"}>
									{r.start} - {r.end}
								</div>
							</div>

							<div className={"flex flex-col space-y-4"}>
								{r.description.map((d, i) => {
									return (
										<div
											key={i}
											dangerouslySetInnerHTML={{ __html: toMarkdown(d).html }}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
