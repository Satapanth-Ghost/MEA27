import { CMS_URL } from "@/utils/config";

export default function AdminPage() {
	const adminURL = `${CMS_URL || "http://localhost:3001"}/admin`;
	return (
		<main className="grid min-h-screen place-items-center bg-[#07131d] px-6 text-white">
			<section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur sm:p-12">
				<p className="font-montserrat text-xs font-bold uppercase tracking-[.25em] text-[#ff8c54]">
					Content management
				</p>
				<h1 className="mt-5 font-outfit text-5xl font-semibold">CMS admin</h1>
				<p className="mt-5 font-montserrat leading-7 text-slate-300">
					Manage events, team members, gallery highlights, research profiles,
					and public website content in Payload.
				</p>
				<a
					href={adminURL}
					className="mt-9 block rounded-full bg-[#f36b2b] px-6 py-3 text-center font-montserrat text-sm font-bold transition hover:bg-[#ff8c54]"
				>
					Open CMS admin
				</a>
			</section>
		</main>
	);
}
