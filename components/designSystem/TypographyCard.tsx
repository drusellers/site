import type React from "react";
import Clipboard from "@/components/ui/Clipboard";

interface TypographyCardProps {
	font: string;
	example: string;
	classes: string[];
	fontFamily?: string;
}

const TypographyCard: React.FC<TypographyCardProps> = ({
	font,
	example,
	classes,
	fontFamily = "var(--font-space-g)",
}) => {
	const getFontVariable = (fontName: string) => {
		switch (fontName) {
			case "Humane":
				return "var(--font-humane)";
			case "Open Sans":
				return "var(--font-open-sans)";
			case "Space Grotesk":
			default:
				return "var(--font-space-g)";
		}
	};

	const actualFontFamily = fontFamily || getFontVariable(font);

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between mb-4">
				<div
					style={{ fontFamily: actualFontFamily }}
					className={classes.join(" ")}
				>
					{example}
				</div>
				<div>
					<Clipboard text={classes.join(" ")}></Clipboard>
				</div>
			</div>
		</div>
	);
};

export default TypographyCard;
