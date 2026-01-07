import { getValues } from "@/lib/cms.values";
import Link from "next/link";
import PageTitle from "@/components/oxford/PageTitle";

export default function Values() {
	const allValues = getValues();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>Values</PageTitle>
			<div className={"grid grid-cols-7 gap-x-4"}>
				<div className={"col-span-3 text-right"}></div>
				<div className={"col-span-3 flex flex-col space-y-8"}>
					{allValues.map((v) => {
						return (
							<div key={v.id} className={"flex flex-col"}>
								<Link href={`/values/${v.id}`} className={"text-xl"}>
									{v.title}
								</Link>
								<div className={"text-light text-gray-600"}>{v.preview}</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
