import type { ReactNode } from "react";
import Link from "@/components/AppLink";

export function NotFound({ children }: { children?: ReactNode }) {
	return (
		<div className="p-8 space-y-4 text-text-primary">
			<div>{children || "The page you are looking for does not exist."}</div>
			<Link href="/">Go home</Link>
		</div>
	);
}
