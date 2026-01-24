import type { ReactNode } from "react";

type Props = {
	cite?: ReactNode;
	html: string;
};

export default function Quote({ cite, html }: Props) {
	return (
		<div className="quote mb-8">
			<blockquote
				// biome-ignore lint/security/noDangerouslySetInnerHtml: that's the whole point
				dangerouslySetInnerHTML={{ __html: html }}
			></blockquote>
			{cite}
		</div>
	);
}
