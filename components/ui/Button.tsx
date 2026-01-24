import type React from "react";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant =
	| "default"
	| "primary"
	| "secondary"
	| "danger"
	| "success"
	| "warning";

interface ButtonProps {
	children: React.ReactNode;
	size?: ButtonSize;
	variant?: ButtonVariant;
	disabled?: boolean;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	size = "md",
	variant = "default",
	disabled = false,
	onClick,
	type = "button",
	className = "",
}) => {
	const baseClasses =
		"font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

	const sizeClasses = {
		xs: "px-2 py-1 text-xs",
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
		xl: "px-8 py-4 text-lg",
	};

	const variantClasses = {
		default:
			"bg-oxford-100 text-oxford-500 hover:bg-oxford-200 focus:ring-oxford-500",
		primary:
			"bg-oxford-500 text-white hover:bg-oxford-600 focus:ring-oxford-500",
		secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
		danger:
			"bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500",
		success:
			"bg-success-500 text-white hover:bg-success-600 focus:ring-success-500",
		warning:
			"bg-warning-500 text-white hover:bg-warning-600 focus:ring-warning-500",
	};

	const disabledClasses = disabled
		? "opacity-50 cursor-not-allowed"
		: "cursor-pointer";

	const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
