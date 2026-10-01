import { getUser } from "@/actions/user";
import { getGoodToKnow } from "@/actions/cms";
import Navigation from "@components/Landing/Navigation";
import SectionFrame from "@components/Common/SectionFrame";

export default async function Page() {
	const user = await getUser();
	const content = await getGoodToKnow();
	return (
		<>
			<Navigation isUser={user !== undefined} />
			<SectionFrame index="04" kicker="MEA '27 / FIELD NOTES" title="GOOD TO KNOW">
				<div className="space-y-6">
					<div
						className="lexical-content font-montserrat"
						dangerouslySetInnerHTML={{
							__html: content.replace(
								/<a /g,
								'<a target="_blank" rel="noopener noreferrer" ',
							),
						}}
					/>
				</div>
			</SectionFrame>
		</>
	);
}
