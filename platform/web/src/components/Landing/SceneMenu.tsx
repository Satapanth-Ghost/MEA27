"use client";

import { useState } from "react";
import MorphLink from "@components/Common/MorphLink";

const sections = [["01", "HOME", "/"], ["02", "STUDY MATERIALS", "/study"], ["03", "PROJECTS", "/projects"], ["04", "GOOD TO KNOW", "/good-to-know"], ["05", "CAREER CRAFT", "/career-craft"], ["06", "PROCEED", "/proceed"]] as const;

export default function SceneMenu({ isUser }: { isUser: boolean }) {
	const [open, setOpen] = useState(false);
	return <><button className="mea-scene-menu-trigger" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mea-scene-menu"><span /> <span /> <span /> MENU</button>
		<div id="mea-scene-menu" className={`mea-scene-menu ${open ? "mea-scene-menu-open" : ""}`} aria-hidden={!open}>
			<button className="mea-scene-menu-close" onClick={() => setOpen(false)} aria-label="Close navigation menu">CLOSE ×</button>
			<p className="mea-scene-menu-kicker">MECHANICAL ENGINEERING ASSOCIATION // NIT TRICHY</p>
			<nav aria-label="MEA sections">{sections.map(([number, label, href]) => {
				const destination = href === "/study" && !isUser ? "/login" : href;
				return <MorphLink key={label} href={destination} sceneLabel={label} onNavigate={() => setOpen(false)} className="mea-scene-menu-link"><small>{number}</small><span>{label}</span><i>↗</i></MorphLink>;
			})}</nav>
			<div className="mea-scene-menu-footer"><span>SCROLL / CLICK / EXPLORE</span><b>MEA '27</b></div>
		</div></>;
}
