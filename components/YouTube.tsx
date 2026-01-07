type Props = {
	src?: string;
};

export default function YouTube({ src }: Props) {
	if (!src) return null;

	return (
		<div>
			<iframe
				width={560}
				height={315}
				title={"YouTube video player"}
				frameBorder={0}
				allow={
					"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				}
				referrerPolicy={"strict-origin-when-cross-origin"}
				allowFullScreen={true}
				src={src}
			/>
		</div>
	);
}
