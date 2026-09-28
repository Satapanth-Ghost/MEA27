"use client";

import Image from "next/image";
import Link from "next/link";
import mealogo from "@/assets/images/Navbar/meaLogo.png";
import clgLogo from "@/assets/images/Navbar/clgLogo.png";

const links = [
	["Study materials", "/study", true],
	["Projects", "/projects", false],
	["Good to know", "/good-to-know", false],
	["Career craft", "/career-craft", false],
	["Proceed", "/proceed", false],
] as const;

export default function Navigation({ isUser }: { isUser: boolean }) {
	const year = new Date().getFullYear().toString().slice(-2);
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#040a18]/70 backdrop-blur-xl">
			<div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-5 lg:px-10">
				<Link href="/" className="flex items-center gap-3" aria-label="MEA home">
					<Image src={mealogo} alt="MEA logo" className="h-11 w-11 object-contain" priority />
					<span className="font-outfit text-xl font-semibold tracking-[.12em] text-white">MEA <em className="not-italic text-[#7ff2da]">&apos;27</em></span>
				</Link>
				<nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
					{links.map(([label, href, protectedRoute]) => (
						<Link key={label} href={protectedRoute && !isUser ? "/login" : href} className="font-montserrat text-[11px] font-bold uppercase tracking-[.08em] text-slate-200 transition hover:text-[#7ff2da]">{label}</Link>
					))}
				</nav>
				<div className="flex items-center gap-3">
					{isUser ? <Link href="/study" className="rounded-full bg-[#ff5c3d] px-4 py-2 font-montserrat text-xs font-bold text-white">Open study hub</Link> : <Link href="/login" className="rounded-full border border-[#7ff2da]/60 px-4 py-2 font-montserrat text-xs font-bold text-[#dffaff] transition hover:bg-[#7ff2da] hover:text-[#06141e]">Login with DAuth</Link>}
					<Image src={clgLogo} alt="NIT Trichy" className="hidden h-10 w-10 object-contain lg:block" />
				</div>
			</div>
			<details className="border-t border-white/10 xl:hidden"><summary className="cursor-pointer px-5 py-3 font-montserrat text-xs font-semibold uppercase tracking-[.2em] text-slate-300">Explore MEA</summary><nav className="grid grid-cols-2 gap-x-5 px-5 pb-4">{links.map(([label, href, protectedRoute]) => <Link key={label} href={protectedRoute && !isUser ? "/login" : href} className="py-2 font-montserrat text-sm text-white">{label}</Link>)}<Link href="/admin" className="py-2 font-montserrat text-sm text-[#5bd7f4]">CMS admin</Link></nav></details>
		</header>
	);
}
