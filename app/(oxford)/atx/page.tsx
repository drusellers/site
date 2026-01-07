import { getAtx } from "@/lib/cms.atx";
import PageTitle from "@/components/oxford/PageTitle";

export default function AtxPage() {
	const atx = getAtx();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>ATX</PageTitle>

			<div className={"grid grid-cols-8 gap-x-4"}>
				<div className={"col-span-3 text-right"}></div>
				<div className={"col-span-5"}>
					<div
						className={"prose"}
						dangerouslySetInnerHTML={{ __html: atx.html }}
					/>
				</div>
			</div>
		</div>
	);
}
