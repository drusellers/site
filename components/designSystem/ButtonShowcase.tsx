"use client";

import type React from "react";
import Button, {
	type ButtonSize,
	type ButtonVariant,
} from "@/components/ui/Button";

const ButtonShowcase: React.FC = () => {
	const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
	const variants: ButtonVariant[] = [
		"default",
		"primary",
		"secondary",
		"danger",
		"success",
		"warning",
	];

	const handleDemoClick = () => {
		console.log("Button clicked!");
	};

	return (
		<div className="space-y-8">
			<div>
				<h3 className="text-lg font-medium mb-4">Button Sizes</h3>
				<div className="space-y-4">
					{sizes.map((size) => (
						<div key={size} className="grid grid-cols-4 items-center space-x-4">
							<div className="w-16 text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
								{size}
							</div>

							<Button size={size} onClick={handleDemoClick}>
								Default
							</Button>
							<Button size={size} variant="primary" onClick={handleDemoClick}>
								Primary
							</Button>
							<Button size={size} variant="danger" onClick={handleDemoClick}>
								Danger
							</Button>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-4">Button Variants</h3>
				<div className="space-y-4">
					{variants.map((variant) => (
						<div
							key={variant}
							className="grid grid-cols-4 items-center space-x-4"
						>
							<div className="w-16 text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
								{variant}
							</div>

							<Button variant={variant} onClick={handleDemoClick}>
								{variant}
							</Button>
							<Button variant={variant} onClick={handleDemoClick} disabled>
								Disabled
							</Button>
							<Button variant={variant} onClick={handleDemoClick}>
								→ Icon
							</Button>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-lg font-medium mb-4">Interactive Examples</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
						<h4 className="font-medium mb-3">Form Actions</h4>
						<div className="flex space-x-2">
							<Button variant="default" onClick={handleDemoClick}>
								Cancel
							</Button>
							<Button variant="primary" onClick={handleDemoClick}>
								Save Changes
							</Button>
						</div>
					</div>

					<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
						<h4 className="font-medium mb-3">Delete Actions</h4>
						<div className="flex space-x-2">
							<Button variant="default" onClick={handleDemoClick}>
								Cancel
							</Button>
							<Button variant="danger" onClick={handleDemoClick}>
								Delete Item
							</Button>
						</div>
					</div>

					<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
						<h4 className="font-medium mb-3">Navigation</h4>
						<div className="flex space-x-2">
							<Button variant="secondary" onClick={handleDemoClick}>
								← Back
							</Button>
							<Button variant="primary" onClick={handleDemoClick}>
								Next →
							</Button>
						</div>
					</div>

					<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
						<h4 className="font-medium mb-3">Status Actions</h4>
						<div className="flex space-x-2">
							<Button variant="success" onClick={handleDemoClick}>
								✓ Approve
							</Button>
							<Button variant="warning" onClick={handleDemoClick}>
								! Review
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
				<h3 className="text-lg font-medium mb-3">Button Guidelines</h3>
				<div className="prose max-w-none text-sm text-gray-900 dark:text-gray-100">
					<ul className="list-disc list-inside space-y-1">
						<li>
							<strong>Primary:</strong> Main action on the page (Save, Submit,
							Continue)
						</li>
						<li>
							<strong>Secondary:</strong> Alternative actions (Cancel, Back,
							Reset)
						</li>
						<li>
							<strong>Danger:</strong> Destructive actions (Delete, Remove,
							Clear)
						</li>
						<li>
							<strong>Success:</strong> Positive actions (Approve, Confirm,
							Complete)
						</li>
						<li>
							<strong>Warning:</strong> Cautionary actions (Review, Edit,
							Modify)
						</li>
						<li>
							<strong>Default:</strong> Neutral actions (View, Download, Export)
						</li>
					</ul>
					<p className="mt-3">
						Size should be used based on importance: <strong>md</strong> for
						standard buttons,
						<strong>lg/xl</strong> for primary CTAs, and <strong>xs/sm</strong>{" "}
						for secondary actions.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ButtonShowcase;
