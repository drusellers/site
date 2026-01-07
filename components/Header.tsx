import Logo from "@/components/logo";
import Nav from "@/components/nav";
import React from "react";

export default function Header() {
	return (
		<header className="container mx-auto flex max-w-document flex-col px-6 pt-6 sm:h-24 sm:flex-row">
			<div>
				<Logo />
			</div>
			<div className="my-6 grow">
				<Nav />
			</div>
		</header>
	);
}
