import { getAbout, getCareerCraft, getGoodToKnow, getHighlights, getInitiatives, getProceed, getProjects } from "@actions/cms";

export const dynamic = "force-dynamic";

export async function GET() {
	const [about, highlights, initiatives, goodToKnow, careerCraft, proceed, projects] = await Promise.all([
		getAbout(), getHighlights(), getInitiatives(), getGoodToKnow(), getCareerCraft(), getProceed(), getProjects(),
	]);
	return Response.json({ about, highlights, initiatives, goodToKnow, careerCraft, proceed, projects }, { headers: { "Cache-Control": "no-store" } });
}
