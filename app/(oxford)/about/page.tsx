import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import PageTitle from "@/components/oxford/PageTitle";
import { getAbout } from "@/lib/cms.about";
import { BASE_URL } from "@/lib/consts";
import { buildMetadata } from "@/lib/metadata";
import { resolveUrl } from "@/lib/util";

export async function generateMetadata(
	_,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const bio = getAbout();

	return buildMetadata(
		{
			title: bio.title,
			description: bio.description,
			url: `${BASE_URL}/about`,
			imageUrl: resolveUrl(bio.img),
			publishedTime: bio.date,
			tags: bio.tags,
		},
		await parent,
	);
}
export default function About() {
	const bio = getAbout();

	return (
		<div className={"flex flex-col pl-8 pr-8 lg:pr-0 pt-9 gap-y-4"}>
			<PageTitle>About</PageTitle>
			<div className={"grid grid-cols-1 lg:grid-cols-7 gap-x-4"}>
				<div className={"lg:col-span-3 text-right"}>
					<Image
						src={bio.img}
						width={2048}
						height={1365}
						alt={"Coffee, yum."}
					/>
				</div>
				<div className={"md:col-span-3"}>
					<div>Hello 👋</div>
					<div
						className={"prose"}
						// biome-ignore lint/security/noDangerouslySetInnerHtml: this is the whole point
						dangerouslySetInnerHTML={{ __html: bio.html }}
					></div>
				</div>
			</div>
		</div>
	);
}
