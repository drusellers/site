import { faArrowUpRightFromSquare } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Education } from "@/lib/cms.resume";

type Props = {
	school: Education;
};

export default function EducationUI({ school }: Props) {
	const e = school;

	return (
		<div>
			<div className={"flex flex-row justify-between"}>
				<div className={"font-bold text-2xl text-text-primary"}>{e.school}</div>
				<div>
					<a
						href={e.url}
						className="text-blue-600"
						target="_blank"
						rel="noreferrer"
					>
						{e.url_label}{" "}
						<FontAwesomeIcon
							className={"text-xxs"}
							icon={faArrowUpRightFromSquare}
						/>
					</a>
				</div>
			</div>

			<div className={"flex justify-between"}>
				<div className={"flex flex-col"}>
					<div className={"text-text-primary"}>{e.major}</div>
					<div className={"text-text-secondary"}>{e.minor}</div>
				</div>
				<div className={"text-text-primary"}>
					{e.start} - {e.end}
				</div>
			</div>
		</div>
	);
}
