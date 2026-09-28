"use client";

import { useEffect } from "react";

/** Gives the landing-page copy an enter / dissolve-on-scroll treatment. */
export default function ScrollSmoke() {
	useEffect(() => {
		const root = document.querySelector("main");
		if (!root) return;

		const targets = Array.from(
			root.querySelectorAll<HTMLElement>("h1, h2, h3, p, a, li, blockquote"),
		).filter((element) => !element.closest(".swiper-pagination"));

		targets.forEach((element, index) => {
			element.classList.add("mea-smoke-text");
			element.style.setProperty("--smoke-delay", `${Math.min((index % 6) * 55, 275)}ms`);
		});

		let frame = 0;
		const update = () => {
			frame = 0;
			const viewport = window.innerHeight;
			targets.forEach((element) => {
				const box = element.getBoundingClientRect();
				const isInView = box.top < viewport * 0.86 && box.bottom > viewport * 0.1;
				const hasPassed = box.bottom <= viewport * 0.1;
				element.classList.toggle("mea-smoke-visible", isInView);
				element.classList.toggle("mea-smoke-passed", hasPassed);
			});
		};
		const onScroll = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) window.cancelAnimationFrame(frame);
			targets.forEach((element) => {
				element.classList.remove("mea-smoke-text", "mea-smoke-visible", "mea-smoke-passed");
				element.style.removeProperty("--smoke-delay");
			});
		};
	}, []);

	return null;
}
