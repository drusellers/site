import type { Engagement } from "@/lib/cms.resume";
import { toMarkdown } from "@/lib/md";

type Props = {
	engagement: Engagement;
};
export default function EngagementUI({ engagement }: Props) {
	return (
		<div className={"flex flex-col gap-y-1 pl-4"}>
			<div className={"flex flex-row justify-between"}>
				<div className={"font-semibold text-md"}>{engagement.name}</div>
				<div className={"font-light text-sm"}>
					{engagement.start} - {engagement.end}
				</div>
			</div>

			<div className={"flex flex-col space-y-4"}>
				{engagement.description.map((d) => {
					return (
						<div
							key={d}
							// biome-ignore lint/security/noDangerouslySetInnerHtml: that's the whole point
							dangerouslySetInnerHTML={{ __html: toMarkdown(d).html }}
						/>
					);
				})}
			</div>
		</div>
	);
}
