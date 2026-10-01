"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type MorphLinkProps = {
	href: string;
	children: ReactNode;
	className?: string;
	sceneLabel?: string;
	onNavigate?: () => void;
};

/** Delays internal navigation so the global scene overlay can cover the page. */
export default function MorphLink({ href, children, className, sceneLabel, onNavigate }: MorphLinkProps) {
	const router = useRouter();
	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();
		onNavigate?.();
		const label = sceneLabel ?? String(children);
		window.sessionStorage.setItem("mea-next-scene", label);
		window.dispatchEvent(new CustomEvent("mea-scene-start", { detail: label }));
		window.setTimeout(() => router.push(href), 480);
	};
	return <a href={href} onClick={handleClick} className={className}>{children}</a>;
}
