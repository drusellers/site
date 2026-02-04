import type { ReactNode } from "react";
import PageTitle from "@/components/oxford/PageTitle";

type Props = {
	title: string;
	children: ReactNode;
	sidebar: ReactNode;
	prev?: { title: string; href: string };
	next?: { title: string; href: string };
};

export default function PageLayout({ title, sidebar, children }: Props) {
	return (
		<div className={"flex flex-col pl-6 md:pl-8 pt-9 gap-y-4"}>
			<PageTitle>{title}</PageTitle>
			<div className={"grid grid-cols-8 gap-x-4"}>
				<div className={"col-span-8 md:col-span-3 text-right"}>{sidebar}</div>
				<div className={"col-span-8 md:col-span-5"}>{children}</div>
			</div>
		</div>
	);
}
