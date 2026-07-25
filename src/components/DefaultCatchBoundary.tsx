import { ErrorComponent, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();

	return (
		<div className="min-w-0 flex-1 p-8 flex flex-col gap-4 text-text-primary">
			<ErrorComponent error={error} />
			<button
				type="button"
				onClick={() => router.invalidate()}
				className="px-3 py-2 bg-oxford-500 rounded-sm text-white uppercase font-semibold"
			>
				Try Again
			</button>
		</div>
	);
}
