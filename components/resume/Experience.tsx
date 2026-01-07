import { faExternalLinkSquare } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Employer } from "@/lib/cms.resume";
import { toMarkdown } from "@/lib/md";

type Props = {
	job: Employer;
};

export default function Experience({ job }: Props) {
	return (
		<div key={job.employer} className="ml-6 space-y-3">
			<h4 className="font-heading text-xl font-bold">
				{job.employer}{" "}
				<small>
					<a
						href={job.url}
						className="text-blue-500"
						target="_blank"
						rel="noreferrer"
					>
						{job.url_label} <FontAwesomeIcon icon={faExternalLinkSquare} />
					</a>
				</small>
			</h4>
			{job.roles.map((role) => {
				return (
					<div key={role.title} className="space-y-3">
						<div className="flex flex-col sm:flex-row">
							<div className="flex-1">{role.title}</div>
							<div className="flex-1 sm:text-right">
								{role.start} - {role.end}
							</div>
						</div>

						{role.description.map((d) => {
							const md = toMarkdown(d);

							return (
								<div
									key={d}
									className="ml-6"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: this is how it works
									dangerouslySetInnerHTML={{ __html: md.html }}
								/>
							);
						})}

						<ul>
							{role.bullets.map((b) => {
								return <li key={b}>{b}</li>;
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
}
