import type React from "react";
import { DevUnfurlLink } from "@/components/DevUnfurlLink";
import DesignSystemSidebar from "@/components/designSystem/DesignSystemSidebar";

type Props = {
	children: React.ReactNode;
};

export default function PlaygroundLayout({ children }: Props) {
	return (
		<div className={"h-full flex flex-col justify-between"}>
			<div className={"flex flex-col md:flex-row divide-[#C6D3D5] divide-x"}>
				<div className={"flex-1"}>
					{/* Main content area */}
					<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>{children}</div>
				</div>
				<div className={"flex-none w-full md:w-[270px] print:hidden"}>
					<DesignSystemSidebar />
				</div>
			</div>
			<div className={"flex flex-col md:flex-row divide-[#C6D3D5] divide-x"}>
				<div className={"flex-1"}>
					{/* Footer content could go here if needed */}
				</div>
				<div
					className={"hidden md:flex flex-none w-[270px] print:hidden"}
				></div>
			</div>
			<DevUnfurlLink />
		</div>
	);
}
