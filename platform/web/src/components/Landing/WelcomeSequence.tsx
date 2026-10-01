"use client";

import { useEffect, useState } from "react";

export default function WelcomeSequence() {
	const [phase, setPhase] = useState<"intro" | "break" | "done">("intro");
	const [isLeaving, setIsLeaving] = useState(false);
	const joke = "We don’t have trust issues. We have tolerance limits.";
	const finishSequence = () => {
		if (isLeaving) return;
		setIsLeaving(true);
		window.setTimeout(() => setPhase("done"), 680);
	};

	useEffect(() => {
		if (phase !== "intro") return;
		const timeout = window.setTimeout(() => setPhase("break"), 3200);
		return () => window.clearTimeout(timeout);
	}, [phase]);

	useEffect(() => {
		if (phase !== "break") return;
		const finishTimer = window.setTimeout(finishSequence, 6400);
		return () => {
			window.clearTimeout(finishTimer);
		};
	}, [phase]);

	if (phase === "done") return null;

	if (phase === "break") {
		return (
			<section className={`mea-mech-break ${isLeaving ? "mea-welcome-leaving" : ""}`} aria-label="Mechanical engineering intermission">
				<video className="mea-mech-break-video" autoPlay muted loop playsInline preload="auto">
					<source src="/media/mech-break.mp4" type="video/mp4" />
				</video>
				<div className="mea-mech-break-tint" />
				<div className="mea-mech-break-content">
					<p className="mea-mech-break-kicker">MECH BREAK // 2027</p>
					<div className="mea-mech-break-badge">⚙</div>
					<p className="mea-mech-break-joke">{joke}</p>
					<div className="mea-mech-break-meter"><i /><i /><i /><i /></div>
					<button onClick={finishSequence}>SKIP TO MEA ’27 ↗</button>
				</div>
			</section>
		);
	}

	return (
		<div className={`mea-welcome ${isLeaving ? "mea-welcome-leaving" : ""}`} role="dialog" aria-label="Welcome to MEA 27">
			<video className="mea-welcome-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
				<source src="/media/welcome-motion.mp4" type="video/mp4" />
			</video>
			<div className="mea-welcome-video-tint" aria-hidden="true" />
			<div className="mea-welcome-orbit mea-welcome-orbit-one" />
			<div className="mea-welcome-orbit mea-welcome-orbit-two" />
			<p>MECHANICAL ENGINEERING ASSOCIATION · NIT TRICHY</p>
			<div className="mea-welcome-mark">M<span>27</span></div>
			<h1>MAKE<br /><em>MOTION</em><br />MATTER.</h1>
			<button onClick={() => setPhase("break")}>ENTER MEA ’27 <span>↗</span></button>
		</div>
	);
}
