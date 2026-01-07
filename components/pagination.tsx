type Props = {
	hasPrev: boolean;
	prevUrl: string;
	hasNext: boolean;
	nextUrl: string;
};

export default function Pagination({
	hasPrev,
	prevUrl,
	hasNext,
	nextUrl,
}: Props) {
	if (!hasPrev || !hasNext) {
		return <></>;
	}

	let prev = <></>;
	if (hasPrev) {
		prev = (
			<span className="prev">
				<a href={prevUrl}>
					<span className="arrow">←</span>Newer Posts
				</a>
			</span>
		);
		let next = <></>;
		if (hasNext) {
			next = (
				<span className="next">
					<a className="link blue" href={nextUrl}>
						Older Posts <span className="arrow">→</span>
					</a>
				</span>
			);
		}
		return (
			<nav id="post-nav">
				{prev}
				{next}
			</nav>
		);
	}
}
