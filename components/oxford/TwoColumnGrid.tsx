import type { ReactNode } from "react";

type Props = {
	sidebar?: ReactNode | null;
	children: ReactNode;
};

export default function TwoColumnGrid({ sidebar, children }: Props) {
	return (
		<div className={"grid grid-cols-1 lg:grid-cols-7 gap-x-4"}>
			<div className={"lg:col-span-3 text-right"}>{sidebar}</div>
			<div className={"md:col-span-3"}>{children}</div>
			<div className={"hidden lg:col-span-1"}></div>
		</div>
	);
}
