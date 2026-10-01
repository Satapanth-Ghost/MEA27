import { getUser } from "@/actions/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import BackButton from "@components/Common/BackButton";
import Navigation from "@components/Landing/Navigation";
import SectionFrame from "@components/Common/SectionFrame";

export default async function Page() {
	const user = await getUser();
	if (!user) redirect("/?callbackUrl=/study");

	return (
		<>
			<Navigation isUser={true} />
			<SectionFrame index="02" kicker="MEA '27 / KNOWLEDGE BASE" title="STUDY MATERIALS">
				<div className="relative mb-6 flex items-center justify-center">
					<BackButton href={`/`} />
					<span className="font-montserrat text-xs font-bold tracking-[.2em] text-[#7ff2da]">SELECT A LIBRARY</span>
				</div>
				<Link
					href={`/study/core`}
					className="mea-study-choice"
				>
					<span>IRs/PCs/PEs</span>
					<span className=" bg-blue-300 text-blue-700 rounded-full px-2 text-xs my-auto py-1">
						View
					</span>
				</Link>
				<Link
					href={`/study/oe`}
					className="mea-study-choice"
				>
					<span>OEs</span>
					<span className=" bg-blue-300 text-blue-700 rounded-full px-2 text-xs my-auto py-1">
						View
					</span>
				</Link>
				<Link
					href={`/study/minor`}
					className="mea-study-choice"
				>
					<span>Minors</span>
					<span className=" bg-blue-300 text-blue-700 rounded-full px-2 text-xs my-auto py-1">
						View
					</span>
				</Link>
			</SectionFrame>
		</>
	);
}
