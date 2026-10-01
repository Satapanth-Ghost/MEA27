import { getAbout, getCareerCraft, getGoodToKnow, getHighlights, getInitiatives, getProceed, getProjects } from "@actions/cms";
import { getUser } from "@actions/user";
import Navigation from "@components/Landing/Navigation";
import Hero from "@components/Landing/Hero";
import Highlights from "@components/Landing/Highlights";
import About from "@components/Landing/About";
import Initiatives from "@components/Landing/Initiatives";
import Footer from "@components/Landing/Footer";
import WelcomeSequence from "@components/Landing/WelcomeSequence";
import ScrollSmoke from "@components/Landing/ScrollSmoke";

export default async function Home() {
	const [user, about, highlights, initiatives, goodToKnow, careerCraft, proceed, projects] = await Promise.all([
		getUser(),
		getAbout(),
		getHighlights(),
		getInitiatives(),
		getGoodToKnow(),
		getCareerCraft(),
		getProceed(),
		getProjects(),
	]);
	return <><WelcomeSequence /><Navigation isUser={Boolean(user)} initialData={{ about, highlights, initiatives, goodToKnow, careerCraft, proceed, projects }} /><main><ScrollSmoke /><Hero isUser={Boolean(user)} /><Highlights content={highlights} /><About content={about} /><Initiatives initiatives={initiatives} /></main><Footer /></>;
}
