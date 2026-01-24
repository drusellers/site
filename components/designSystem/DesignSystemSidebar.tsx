import Link from "next/link";
import Logo from "@/components/Logo";
import Social from "@/components/Socials";

const playgroundNavItems = [
	{ href: "/design-system", title: "Overview" },
	{ href: "/design-system/colors", title: "Colors" },
	{ title: "Fonts", href: "/design-system/fonts" },
	{ title: "Typography", href: "/design-system/typography" },
	{ href: "/design-system/components", title: "Components" },
];

export default function DesignSystemSidebar() {
	return (
		<div className={"flex flex-col justify-between h-screen"}>
			<div className={"flex flex-col divide-[#C6D3D5] divide-y"}>
				<div className={"flex flex-col space-y-3 px-6 py-4"}>
					<div>
						<Logo width={190} height={64} />
					</div>
					<div className="leading-[140%] text-oxford-500 font-medium">
						Design System
					</div>
				</div>

				<div className={"px-6 py-4"}>
					<div className="mb-4">
						<div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">
							Sections
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							{playgroundNavItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="text-sm text-gray-600 dark:text-gray-400 hover:text-oxford-500 dark:hover:text-oxford-400 transition-colors"
								>
									{item.title}
								</Link>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">
							Quick Links
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<Link
								href="https://oklch.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-xs text-gray-600 dark:text-gray-400 hover:text-oxford-500 dark:hover:text-oxford-400 transition-colors"
							>
								OKLCH Reference ↗
							</Link>
							<Link
								href="https://tailwindcss.com/docs/colors"
								target="_blank"
								rel="noopener noreferrer"
								className="text-xs text-gray-600 dark:text-gray-400 hover:text-oxford-500 dark:hover:text-oxford-400 transition-colors"
							>
								Tailwind Colors ↗
							</Link>
							<Link
								href="https://fonts.google.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-xs text-gray-600 dark:text-gray-400 hover:text-oxford-500 dark:hover:text-oxford-400 transition-colors"
							>
								Google Fonts ↗
							</Link>
						</div>
					</div>
				</div>

				<div className={"flex flex-col gap-y-4 px-6 py-4"}>
					<div className={"flex flex-row space-x-3"}>
						<Social platform="bluesky" username="@drusellers.com" />
						<Social platform="instagram" username="drusellers" />
						<Social platform="twitter" username="drusellers" />
						<Social platform="github" username="drusellers" />
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-400">
						Design Studio
					</div>
				</div>
			</div>
		</div>
	);
}
