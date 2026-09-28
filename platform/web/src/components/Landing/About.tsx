"use client";

import Image from "next/image";
import Blush from "@assets/images/Common/blush.png";
import { useEffect, useRef, useState } from "react";
export default function About({ content }: { content: string }) {
	const ref = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.18 });
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<section ref={ref} className={`mea-reveal mea-video-section relative min-h-[70vh] w-screen overflow-x-hidden px-6 py-24 flex flex-col items-center justify-center ${visible ? "mea-is-visible" : ""}`}>
			<Image
				src={Blush}
				alt="Blush"
				className=" absolute h-[90%] object-fit -left-28 sm:-left-16 -z-50"
			/>
			<Image
				src={Blush}
				alt="Blush"
				className=" absolute h-[90%] object-fit -right-28 sm:-right-16 rotate-180 -z-50"
			/>
			<p className="mea-reveal-item font-montserrat text-xs font-bold uppercase tracking-[.25em] text-[#168ca8]">
				The MEA community
			</p>
			<h2 className="mea-reveal-item mea-reveal-item-2 mt-3 text-[#06141e] font-outfit font-bold text-5xl sm:text-7xl">
				Built around students.
			</h2>
			<div className="mea-reveal-item mea-reveal-item-3 mt-8 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 font-montserrat text-justify text-lg leading-relaxed text-slate-700 shadow-xl shadow-slate-200/60">
				{content ||
					"The Mechanical Engineering Association connects students, faculty, and alumni through learning, collaboration, and hands-on engineering."}
			</div>
		</section>
	);
}
