import { Education } from "@/lib/cms.resume";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/pro-light-svg-icons";

type Props = {
	school: Education;
};

export default function EducationUI({ school }: Props) {
	const e = school;

	return (
		<div>
			<div className={"flex flex-row justify-between"}>
				<div className={"font-bold text-2xl"}>{e.school}</div>
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
					<div>{e.major}</div>
					<div className={"font-light"}>{e.minor}</div>
				</div>
				<div>
					{e.start} - {e.end}
				</div>
			</div>
		</div>
	);
}
