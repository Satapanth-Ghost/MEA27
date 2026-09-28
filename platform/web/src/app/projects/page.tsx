import Projects from "@components/Landing/Projects";
import { getProjects } from "@actions/cms";
import { getUser } from "@actions/user";
import Navigation from "@components/Landing/Navigation";

export default async function ProjectsPage() {
	const [user, projects] = await Promise.all([getUser(), getProjects()]);
	return <><Navigation isUser={Boolean(user)} /><Projects entries={projects} /></>;
}
