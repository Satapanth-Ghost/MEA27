import type { ReactNode } from "react";

type SectionFrameProps = {
	index: string;
	kicker: string;
	title: string;
	children: ReactNode;
};

/** A presentation-style scene frame for content pages. It uses the existing global video layer. */
export default function SectionFrame({ index, kicker, title, children }: SectionFrameProps) {
	return <main className="mea-content-scene">
		<div className="mea-content-grid" aria-hidden="true" />
		<div className="mea-content-index" aria-hidden="true">{index}</div>
		<div className="mea-content-rail" aria-hidden="true">MEA '27 / {title}</div>
		<section className="mea-content-inner">
			<p className="mea-content-kicker">{kicker}</p>
			<h1>{title}</h1>
			<div className="mea-content-rule"><i /><i /><i /></div>
			<div className="mea-content-panel">{children}</div>
		</section>
	</main>;
}
