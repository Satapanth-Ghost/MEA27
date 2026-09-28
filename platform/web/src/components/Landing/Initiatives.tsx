"use client";

import { InitiativesSchema } from "@actions/cms/schemas";
import Blush from "@assets/images/Common/blush.png";
import Image from "next/image";
import { z } from "zod";

export default function Initiatives({
	initiatives,
}: {
	initiatives: z.infer<typeof InitiativesSchema>;
}) {
	return (
		<section className="mea-video-section-dark min-h-screen w-screen flex flex-col relative overflow-hidden py-20">
			{/* Section Heading */}
			<p className="font-montserrat text-xs font-bold uppercase tracking-[.25em] text-[#7ee6ff] w-full text-center">Learn beyond lectures</p>
			<h2 className="text-white font-outfit font-bold text-5xl sm:text-7xl w-full text-center mt-3">
				MEA initiatives
			</h2>

			{/* Initiatives */}
			<div className="flex flex-wrap justify-center gap-8 p-6 sm:p-10 w-full">
				{initiatives.map((initiative) => (
					<div
						key={initiative.id}
						className="bg-white/10 rounded-2xl shadow-lg p-7 border border-white/15 hover:bg-white/15 transition duration-300 flex flex-col items-start text-left min-w-80 max-w-md min-h-64"
					>
						<h3 className="font-outfit text-3xl font-bold text-[#7ee6ff] mb-4">
							{initiative.title}
						</h3>

						<div className="overflow-y-auto">
							<p className="text-slate-200 font-montserrat leading-7">
								{initiative.description}
							</p>
						</div>
					</div>
				))}
				{initiatives.length === 0 && (
					<p className="font-montserrat text-slate-300">
						New initiatives will be announced here soon.
					</p>
				)}
			</div>

			{/* Background Decorations */}
			<Image
				src={Blush}
				alt="Blush"
				className="absolute h-[90%] object-fit -left-28 sm:-left-16 -z-50"
			/>
			<Image
				src={Blush}
				alt="Blush"
				className="absolute h-[90%] object-fit -right-28 sm:-right-16 rotate-180 -z-50"
			/>
		</section>
	);
}
