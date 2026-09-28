"use client";

import Blush from "@assets/images/Common/blush.png";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import { z } from "zod";
import { HighlightsSchema } from "@actions/cms/schemas";

export default function Highlights({
	content,
}: {
	content: z.infer<typeof HighlightsSchema>;
}) {
	const [activeIndex, setActiveIndex] = useState(0);
	if (content.length === 0) {
		return (
			<section id="highlights" className="mea-empty-highlights min-h-[65vh] w-screen overflow-hidden bg-slate-50 px-6 py-20 text-center">
				<div className="mea-scanline" />
				<p className="font-montserrat text-xs font-bold uppercase tracking-[.25em] text-[#168ca8]">What&apos;s happening</p>
				<h2 className="mt-3 font-outfit text-5xl font-bold text-[#06141e] sm:text-7xl">
					Highlights
				</h2>
				<div className="mea-empty-console mx-auto mt-10 max-w-2xl text-left">
					<span className="text-[#7ff2da]">01 / INCOMING SIGNAL</span>
					<p>New events, workshops, wins and moments will land here. Add the first Highlight from the CMS to bring this wall to life.</p>
					<div className="mea-loading-rail"><i /><i /><i /></div>
				</div>
			</section>
		);
	}

	return (
		<section id="highlights" className="mea-video-section min-h-screen w-screen flex flex-col relative overflow-x-hidden py-16">
			<p className="font-montserrat text-xs font-bold uppercase tracking-[.25em] text-[#168ca8] w-full text-center">What&apos;s happening</p>
			<h2 className="mt-3 text-[#06141e] font-outfit font-bold text-5xl sm:text-7xl w-full text-center">
				Highlights
			</h2>
			<div className="flex flex-1 flex-col sm:flex-row p-6 sm:p-10 gap-8 w-full h-full">
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					loop={true}
					navigation={true}
					modules={[Autoplay, Pagination, Navigation]}
					onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
					className="h-[280px] sm:h-auto w-full sm:w-1/2 sm:my-auto rounded-2xl shadow-xl overflow-hidden"
					id={"highlightSwiper"}
				>
					{content.map((slide) => (
						<SwiperSlide
							key={slide.id}
							id="highlightSlide"
							className=""
						>
							<Image
								src={`${slide.url}`}
								fill={true}
								alt="Highlight"
								className=" h-full w-full object-cover select-none"
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="w-full sm:w-1/2 sm:my-auto border-t-4 sm:border-t-0 sm:border-l-4 border-customBlue pt-5 sm:pl-8 sm:py-5 overflow-y-auto font-montserrat text-lg leading-relaxed text-slate-700">
					{content[activeIndex]?.description}
				</div>
			</div>
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
		</section>
	);
}
