import { Link as RouterLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ComponentType, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
	href: string;
	children?: ReactNode;
};

export default function Link({ href, children, ...props }: Props) {
	const isExternal =
		href.startsWith("http://") ||
		href.startsWith("https://") ||
		href.startsWith("mailto:") ||
		href.startsWith("tel:") ||
		href.startsWith("#");

	if (isExternal) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	}

	const InternalLink = RouterLink as unknown as ComponentType<
		Omit<Props, "href"> & { to: string }
	>;

	return (
		<InternalLink to={href} {...props}>
			{children}
		</InternalLink>
	);
}
