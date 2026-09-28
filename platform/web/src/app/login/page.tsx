"use client";

import Link from "next/link";
import { authClient } from "@/libs/auth-client";

export default function LoginPage() {
	return (
		<main className="grid min-h-screen place-items-center bg-[#07131d] px-6 text-white">
			<section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur sm:p-12">
				<p className="font-montserrat text-xs font-bold uppercase tracking-[.25em] text-[#ff8c54]">
					MEA member access
				</p>
				<h1 className="mt-5 font-outfit text-5xl font-semibold">
					Welcome back.
				</h1>
				<p className="mt-5 font-montserrat leading-7 text-slate-300">
					Sign in with your DAuth account to access study materials and
					member-only resources.
				</p>
				<button
					onClick={() =>
						authClient.signIn.oauth2({
							providerId: "dauth",
							callbackURL: "/study",
						})
					}
					className="mt-9 w-full rounded-full bg-[#f36b2b] px-6 py-3 font-montserrat text-sm font-bold transition hover:bg-[#ff8c54]"
				>
					Continue with DAuth
				</button>
				<Link
					href="/"
					className="mt-6 block text-center font-montserrat text-sm text-slate-300 underline underline-offset-4"
				>
					Return to MEA
				</Link>
			</section>
		</main>
	);
}
