import Link from "next/link";

export default async function Hero(props: { isUser: boolean }) {
	return (
		<section className="mea-hero relative min-h-screen w-screen overflow-hidden bg-[#040a18]">
			<div className="absolute inset-0">
				<video className="h-full w-full object-cover object-center opacity-65" autoPlay muted loop playsInline preload="metadata">
					<source src="/media/mea-motion.mp4" type="video/mp4" />
				</video>
			</div>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(93,237,215,.42),transparent_25%),linear-gradient(100deg,rgba(4,10,24,.97),rgba(4,10,24,.62)_52%,rgba(4,10,24,.82))]" />
			<div className="mea-hero-grid absolute inset-0" />
			<div className="mea-hero-mono">ENGINEER / IMAGINE / EVOLVE</div>
			<div className="mea-hero-orb mea-hero-orb-one" /><div className="mea-hero-orb mea-hero-orb-two" />
			<div className="relative mx-auto flex min-h-screen max-w-[1500px] flex-col justify-end px-6 pb-20 pt-32 text-white lg:px-10 lg:pb-28">
				<p className="mea-hero-enter mea-delay-1 font-montserrat text-[10px] font-bold uppercase tracking-[.38em] text-[#7ff2da]">Mechanical Engineering Association · NIT Trichy</p>
				<h1 className="mea-hero-enter mea-delay-2 mt-6 max-w-5xl font-outfit text-[clamp(4rem,10vw,10rem)] font-semibold leading-[.76] tracking-[-.085em]">BUILD<br />WHAT&apos;S <span className="font-serif font-normal italic text-[#7ff2da]">NEXT.</span></h1>
				<p className="mea-hero-enter mea-delay-3 mt-9 max-w-xl font-montserrat text-base leading-8 text-slate-100 sm:text-xl">Where curious minds become formidable engineers. Learn deeper, build together, and turn possibility into momentum.</p>
				<div className="mea-hero-enter mea-delay-4 mt-10 flex flex-wrap gap-4">
					<Link href={props.isUser ? "/study" : "/login"} className="bg-[#ff5c3d] px-6 py-4 font-montserrat text-xs font-bold tracking-[.08em] transition hover:-translate-y-1 hover:bg-[#ff765d]">{props.isUser ? "OPEN STUDY HUB  →" : "LOGIN WITH DAUTH  →"}</Link>
					<Link href="#highlights" className="border border-white/60 px-6 py-4 font-montserrat text-xs font-bold tracking-[.08em] transition hover:bg-white hover:text-[#06141e]">EXPLORE MEA ↗</Link>
				</div>
				<div className="mea-hero-enter mea-delay-5 mt-14 flex items-center gap-4 font-montserrat text-[10px] font-bold tracking-[.22em] text-[#7ff2da]"><span className="mea-pulse-line h-px w-12 bg-[#7ff2da]" />SCROLL TO IGNITE</div>
			</div>
		</section>
	);
}
