import OneColumnGrid from "@/components/oxford/OneColumnGrid";
import PageTitle from "@/components/oxford/PageTitle";
import { getAllegoryData } from "@/lib/cms.allegory";
import { toMarkdown } from "@/lib/md";

export default function Allegory() {
	const data = getAllegoryData();

	return (
		<div className={"flex flex-col pl-8 pt-9 gap-y-4"}>
			<PageTitle>Allegory of the Cave</PageTitle>
			<OneColumnGrid>
				<div className="allegory">
					<header className="mb-6">
						<h1 className="text-text-primary text-3xl">
							The Republic - Book VII
						</h1>
						<h3 className="pr-4 text-text-primary">
							by Plato{" "}
							<small>
								via{" "}
								<a href="http://www.gutenberg.org/files/1497/1497-h/1497-h.htm">
									Gutenberg
								</a>
							</small>
						</h3>
					</header>
					<div className="space-y-4">
						{data.prose.map((s, i) => {
							let note = <></>;
							if (s.characterNote) {
								const md = toMarkdown(s.characterNote);
								note = (
									<div
										className={"text-xs text-text-secondary"}
										// biome-ignore lint/security/noDangerouslySetInnerHtml: that's the point
										dangerouslySetInnerHTML={{ __html: md.html }}
									/>
								);
							}
							return (
								// biome-ignore lint/suspicious/noArrayIndexKey: this is static
								<dl key={i}>
									<dt
										className={`flex items-baseline gap-4 font-semibold ${i > 1 ? "text-text-primary" : "text-text-secondary"}`}
									>
										{s.character}
										{note}
									</dt>
									<dd className="pl-4 text-text-primary">{s.content}</dd>
								</dl>
							);
						})}
					</div>

					<footer className="mt-6 space-y-6">
						<hr />
						<p>
							<i>
								<small>The rest is the rest</small>
							</i>
						</p>
						<hr />

						<p className="source">
							<a href="http://en.wikipedia.org/wiki/Plato">Plato&apos;s</a> Book
							VII is a part of The Republic (514a–520a)
						</p>
					</footer>
				</div>
			</OneColumnGrid>
		</div>
	);
}
