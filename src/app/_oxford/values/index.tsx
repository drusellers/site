import { createFileRoute } from "@tanstack/react-router";
import Link from "@/components/AppLink";
import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";
import { getValuesIndexData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford/values/")({
	loader: async () => getValuesIndexData(),
	component: Values,
});

function Values() {
	const allValues = Route.useLoaderData();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>Values</PageTitle>
			<TwoColumnGrid>
				{allValues.map((v) => {
					return (
						<div key={v.id} className={"flex flex-col"}>
							<Link href={`/values/${v.id}`} className={"text-xl"}>
								{v.title}
							</Link>
							<div className={"font-body-text text-text-secondary"}>
								{v.preview}
							</div>
						</div>
					);
				})}
			</TwoColumnGrid>
		</div>
	);
}
