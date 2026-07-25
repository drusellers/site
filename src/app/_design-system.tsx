import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DevUnfurlLink } from "@/components/DevUnfurlLink";
import DesignSystemSidebar from "@/components/designSystem/DesignSystemSidebar";

export const Route = createFileRoute("/_design-system")({
	component: DesignSystemLayout,
});

function DesignSystemLayout() {
	return (
		<div className={"h-full flex flex-col justify-between"}>
			<div className={"flex flex-col md:flex-row divide-[#C6D3D5] divide-x"}>
				<div className={"flex-1"}>
					<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
						<Outlet />
					</div>
				</div>
				<div className={"flex-none w-full md:w-[270px] print:hidden"}>
					<DesignSystemSidebar />
				</div>
			</div>
			<div className={"flex flex-col md:flex-row divide-[#C6D3D5] divide-x"}>
				<div className={"flex-1"}></div>
				<div
					className={"hidden md:flex flex-none w-[270px] print:hidden"}
				></div>
			</div>
			<DevUnfurlLink />
		</div>
	);
}
