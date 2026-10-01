"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

type Project = { id: string; professor: string; emailID: string; researchInterests: string; laboratryOrLocation?: string | null };
type Highlight = { id: string; description: string; url: string };
type Initiative = { id: string; title: string; description: string };
export type SceneData = { about: string; highlights: Highlight[]; initiatives: Initiative[]; goodToKnow: string; careerCraft: string; proceed: string; projects: Project[] };
type Scene = { id: string; label: string; video: string; kicker: string; title: string; copy: string; details: string[]; requiresLogin?: boolean };

const scenes: Scene[] = [
	{ id: "home", label: "Home", video: "/media/mea-motion.mp4", kicker: "01 / MEA '27", title: "Build what's next.", copy: "Your live MEA home base — announcements, community updates and the message managed from the CMS.", details: ["Live association message", "Latest highlights", "MEA initiatives"] },
	{ id: "study", label: "Study materials", video: "/media/mea-motion.mp4", kicker: "02 / LEARN", title: "Study with momentum.", copy: "Your course libraries and document collections are available from the MEA study hub.", details: ["IRs / PCs / PEs", "OEs", "Minors"], requiresLogin: true },
	{ id: "books", label: "Books", video: "/media/mech-break.mp4", kicker: "03 / LIBRARY", title: "Find the right reference.", copy: "Reference material and curated resources students can return to while preparing for courses.", details: ["Core references", "Reading lists", "Resource shelf"], requiresLogin: true },
	{ id: "good", label: "Good to know", video: "/media/welcome-motion.mp4", kicker: "04 / DISCOVER", title: "Know more. Build better.", copy: "Department news and useful engineering context, edited directly in the CMS.", details: ["Department updates", "Opportunities", "Engineer toolkit"] },
	{ id: "projects", label: "Projects", video: "/media/projects-motion.mp4", kicker: "05 / MAKE", title: "Turn ideas into objects.", copy: "Live professor research interests and project directions from the MEA CMS.", details: ["Research interests", "Professor labs", "Project directions"] },
	{ id: "career", label: "Career craft", video: "/media/mea-motion.mp4", kicker: "06 / GROW", title: "Shape your next move.", copy: "Career guidance and opportunities, directly editable in the CMS.", details: ["Career signals", "Skill building", "Next steps"] },
	{ id: "proceed", label: "Proceed", video: "/media/welcome-motion.mp4", kicker: "07 / MOVE", title: "Ready when you are.", copy: "The latest next steps and action points published by the MEA team.", details: ["Take action", "Stay connected", "Keep building"] },
];

const videoSources = Array.from(new Set(scenes.map((scene) => scene.video)));
const blankData: SceneData = { about: "", highlights: [], initiatives: [], goodToKnow: "", careerCraft: "", proceed: "", projects: [] };

function sceneForPath(pathname: string) {
	if (pathname.startsWith("/study/core")) return "books";
	if (pathname.startsWith("/study")) return "study";
	if (pathname.startsWith("/good-to-know")) return "good";
	if (pathname.startsWith("/projects")) return "projects";
	if (pathname.startsWith("/career-craft")) return "career";
	if (pathname.startsWith("/proceed")) return "proceed";
	return "home";
}

function CmsHtml({ html, empty }: { html: string; empty: string }) {
	if (!html) return <p className="mea-radial-empty">{empty}</p>;
	return <div className="mea-radial-cms lexical-content" dangerouslySetInnerHTML={{ __html: html.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ') }} />;
}

function SceneContent({ scene, data, isUser }: { scene: Scene; data: SceneData; isUser: boolean }) {
	if (scene.id === "home") return <>
		<CmsHtml html={data.about} empty="The MEA home message will appear here after it is published in the CMS." />
		<div className="mea-radial-live-list">{data.highlights.slice(0, 3).map((item) => <article key={item.id}><b>NEWS</b><span>{item.description}</span></article>)}</div>
		<div className="mea-radial-mini-list">{data.initiatives.slice(0, 3).map((item) => <span key={item.id}>{item.title}</span>)}</div>
	</>;
	if (scene.id === "good") return <CmsHtml html={data.goodToKnow} empty="Department updates will appear here after the Good to Know CMS content is published." />;
	if (scene.id === "career") return <CmsHtml html={data.careerCraft} empty="Career content will appear here after it is published in the CMS." />;
	if (scene.id === "proceed") return <CmsHtml html={data.proceed} empty="Proceed content will appear here after it is published in the CMS." />;
	if (scene.id === "projects") return <div className="mea-radial-projects">{data.projects.length ? data.projects.slice(0, 5).map((project) => <article key={project.id}><b>{project.professor}</b><span>{project.researchInterests}</span><small>{project.laboratryOrLocation || project.emailID}</small></article>) : <p className="mea-radial-empty">Project and research updates will appear here after they are added in the CMS.</p>}</div>;
	if (!isUser && scene.requiresLogin) return <p className="mea-radial-empty">Sign in with DAuth to reveal your personal course documents and material library.</p>;
	return <div className="mea-radial-mini-list"><span>IRs / PCs / PEs</span><span>Open electives</span><span>Minor courses</span></div>;
}

export default function Navigation({ isUser, initialData }: { isUser: boolean; initialData?: SceneData }) {
	const pathname = usePathname();
	const [activeId, setActiveId] = useState("home");
	const [data, setData] = useState<SceneData>(initialData ?? blankData);
	const navRef = useRef<HTMLElement>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pendingIdRef = useRef("home");
	const activeIdRef = useRef("home");
	const lastPointerMoveRef = useRef(0);
	const wheelStepAtRef = useRef(0);
	const refreshData = useCallback(async () => {
		try {
			const response = await fetch("/api/scene-data", { cache: "no-store" });
			if (response.ok) setData(await response.json() as SceneData);
		} catch { /* The canvas keeps the server-rendered CMS data if the CMS is temporarily unavailable. */ }
	}, []);

	useEffect(() => {
		const nextScene = sceneForPath(pathname);
		pendingIdRef.current = nextScene;
		activeIdRef.current = nextScene;
		setActiveId(nextScene);
	}, [pathname]);
	useEffect(() => { activeIdRef.current = activeId; }, [activeId]);
	useEffect(() => { void refreshData(); }, [refreshData]);
	useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

	const activeScene = useMemo(() => scenes.find((scene) => scene.id === activeId) ?? scenes[0], [activeId]);
	const activeIndex = scenes.findIndex((scene) => scene.id === activeId);
	const queueScene = useCallback((id: string) => {
		if (timerRef.current) clearTimeout(timerRef.current);
		pendingIdRef.current = id;
		timerRef.current = setTimeout(() => { setActiveId(id); void refreshData(); }, 160);
	}, [refreshData]);
	const stepArc = useCallback((direction: 1 | -1) => {
		const pendingIndex = scenes.findIndex((scene) => scene.id === pendingIdRef.current);
		const currentIndex = pendingIndex >= 0 ? pendingIndex : scenes.findIndex((scene) => scene.id === activeIdRef.current);
		queueScene(scenes[(currentIndex + direction + scenes.length) % scenes.length].id);
	}, [queueScene]);
	const requestHover = useCallback((id: string) => {
		// A layout animation can fire mouseenter while the pointer is stationary.
		// Only accept a hover when the user has actually moved their pointer recently.
		if (Date.now() - lastPointerMoveRef.current < 110) queueScene(id);
	}, [queueScene]);
	useEffect(() => {
		const nav = navRef.current;
		if (!nav) return;
		const onWheel = (event: WheelEvent) => {
			if (Math.abs(event.deltaY) < 8) return;
			event.preventDefault();
			const now = Date.now();
			if (now - wheelStepAtRef.current < 230) return;
			wheelStepAtRef.current = now;
			stepArc(event.deltaY > 0 ? 1 : -1);
		};
		nav.addEventListener("wheel", onWheel, { passive: false });
		return () => nav.removeEventListener("wheel", onWheel);
	}, [stepArc]);

	return <>
		<div className="mea-radial-video-stage" aria-hidden="true">{videoSources.map((video) => <video key={video} className={activeScene.video === video ? "mea-radial-video-active" : ""} autoPlay muted loop playsInline preload="metadata"><source src={video} type="video/mp4" /></video>)}<div className="mea-radial-video-tint" /></div>
		<aside ref={navRef} className="mea-radial-nav" aria-label="Explore MEA sections" onPointerMove={() => { lastPointerMoveRef.current = Date.now(); }} onPointerLeave={() => { lastPointerMoveRef.current = 0; }}>
			<div className="mea-radial-brand"><span>MEA</span><em>'27</em></div><p className="mea-radial-instruction">HOVER / SCROLL</p>
			<nav>{scenes.map((scene, index) => {
				let distance = index - activeIndex;
				if (distance > Math.floor(scenes.length / 2)) distance -= scenes.length;
				if (distance < -Math.floor(scenes.length / 2)) distance += scenes.length;
				// Negative X values bend the wheel outward toward the left screen edge.
				const x = -Math.abs(distance) * Math.abs(distance) * 15;
				const style = { "--arc-slot": distance, "--arc-x": `${x}px`, "--arc-tilt": `${distance * -9}deg`, "--arc-scale": `${1 - Math.abs(distance) * .055}`, "--arc-opacity": `${1 - Math.abs(distance) * .16}` } as CSSProperties;
				return <button key={scene.id} type="button" className={`mea-radial-item ${activeScene.id === scene.id ? "mea-radial-item-active" : ""}`} style={style} onMouseEnter={() => requestHover(scene.id)} onFocus={() => queueScene(scene.id)} onClick={() => queueScene(scene.id)} aria-current={activeScene.id === scene.id ? "page" : undefined}><small>{String(index + 1).padStart(2, "0")}</small><span>{scene.label}</span><i /></button>;
			})}</nav>
		</aside>
		<section className="mea-radial-canvas" aria-live="polite"><div key={activeId} className="mea-radial-canvas-inner">
			<p className="mea-radial-kicker">{activeScene.kicker}</p><h2>{activeScene.title}</h2><p className="mea-radial-copy">{activeScene.copy}</p><div className="mea-radial-details">{activeScene.details.map((detail) => <span key={detail}>{detail}</span>)}</div>
			<SceneContent scene={activeScene} data={data} isUser={isUser} /><p className="mea-radial-hint">Hover an arc label or scroll over the arc to open its live section.</p>
		</div></section>
	</>;
}
