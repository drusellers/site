import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DevUnfurlLink } from "@/components/DevUnfurlLink";
import Footer from "@/components/oxford/Footer";
import Sidebar from "@/components/oxford/Sidebar";
import { getShellData } from "@/src/data/content";

export const Route = createFileRoute("/_oxford")({
	loader: async () => getShellData(),
	component: OxfordLayout,
});

function OxfordLayout() {
	const { sideBarHtml } = Route.useLoaderData();

	return (
		<div className={"h-full flex flex-col justify-between"}>
			<div
				className={"flex flex-col md:flex-row divide-layout-divider divide-x"}
			>
				<div className={"flex-1"}>
					<Outlet />
				</div>
				<div className={"flex-none w-full md:w-[270px] print:hidden"}>
					<Sidebar sideBarHtml={sideBarHtml} />
				</div>
			</div>
			<div
				className={"flex flex-col md:flex-row divide-layout-divider divide-x"}
			>
				<div className={"flex-1"}>
					<Footer />
				</div>
				<div
					className={"hidden md:flex flex-none w-[270px] print:hidden"}
				></div>
			</div>
			<DevUnfurlLink />
		</div>
	);
}
