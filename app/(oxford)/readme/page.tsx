import PageTitle from "@/components/oxford/PageTitle";

export default function Readme() {
	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>README</PageTitle>
			<div className={"grid grid-cols-7 gap-x-4"}>
				<div className={"col-span-3 text-right"}></div>
				<div className={"col-span-3"}>
					<div>
						I will push hard for what I want, in an effort to be clear. But I
						like to think that I&apos;m still open to changes even in this
						state.
					</div>
				</div>
			</div>
		</div>
	);
}
