"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SceneTransition() {
	const pathname = usePathname();
	const [scene, setScene] = useState<string | null>(null);
	const [leaving, setLeaving] = useState(false);
	const timers = useRef<number[]>([]);
	const clearTimers = () => {
		timers.current.forEach((timer) => window.clearTimeout(timer));
		timers.current = [];
	};
	const playTransition = (label: string) => {
		clearTimers();
		setLeaving(false);
		setScene(label);
		// This fallback also clears the overlay when a link targets the current route.
		timers.current = [
			window.setTimeout(() => setLeaving(true), 620),
			window.setTimeout(() => setScene(null), 1260),
		];
	};
	useEffect(() => {
		const start = (event: Event) => {
			window.sessionStorage.removeItem("mea-next-scene");
			playTransition((event as CustomEvent<string>).detail || "MEA '27");
		};
		window.addEventListener("mea-scene-start", start);
		return () => { window.removeEventListener("mea-scene-start", start); clearTimers(); };
	}, []);
	useEffect(() => {
		const nextScene = window.sessionStorage.getItem("mea-next-scene");
		if (!nextScene) return;
		window.sessionStorage.removeItem("mea-next-scene");
		playTransition(nextScene);
	}, [pathname]);
	if (!scene) return null;
	return <div className={`mea-scene-transition ${leaving ? "mea-scene-leaving" : ""}`} aria-live="polite" aria-label={`Opening ${scene}`}>
		<div className="mea-scene-ring mea-scene-ring-one" /><div className="mea-scene-ring mea-scene-ring-two" />
		<p>MEA '27 // NEXT SCENE</p><strong>{scene}</strong><span>ENGINEER / IMAGINE / EVOLVE</span>
	</div>;
}
