import PageTitle from "@/components/oxford/PageTitle";
import TwoColumnGrid from "@/components/oxford/TwoColumnGrid";

export default function Readme() {
	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>README</PageTitle>
			<TwoColumnGrid>
				<div>
					I will push hard for what I want, in an effort to be clear. But I like
					to think that I&apos;m still open to changes even in this state.
				</div>
			</TwoColumnGrid>
		</div>
	);
}
