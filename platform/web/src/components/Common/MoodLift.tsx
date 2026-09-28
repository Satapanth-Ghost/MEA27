"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const jokes = [
	"We don’t have trust issues. We have tolerance limits.",
	"Mechanical engineers don’t procrastinate. We run stress tests under deadline conditions.",
	"My love language is sending you the CAD file before the deadline.",
	"A free-body diagram is just engineering gossip with arrows.",
	"Chai in. Torque out. That’s the process.",
	"Some people see a problem. We see a design iteration.",
	"Sleep is temporary. A correctly constrained assembly is forever.",
	"Keep calm and check the units one more time.",
	"Powered by caffeine, curiosity, and a suspicious amount of fasteners.",
	"It’s not overthinking. It’s a factor of safety.",
];

export default function MoodLift() {
	const pathname = usePathname();
	const [joke, setJoke] = useState<string | null>(null);
	const [open, setOpen] = useState(true);

	useEffect(() => {
		if (pathname.startsWith("/admin") || pathname === "/login") return;
		setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
		setOpen(true);
	}, [pathname]);

	if (!joke || pathname.startsWith("/admin") || pathname === "/login") return null;

	return (
		<aside className={`mea-mood-lift ${open ? "mea-mood-lift-open" : ""}`} aria-label="Mechanical engineering mood lift">
			<button className="mea-mood-lift-toggle" onClick={() => setOpen((current) => !current)} aria-expanded={open}>
				{open ? "×" : "⚙"}
			</button>
			<div className="mea-mood-lift-copy">
				<span>MECH MOOD LIFT</span>
				<p>{joke}</p>
			</div>
		</aside>
	);
}
