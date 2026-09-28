"use server";

import { auth } from "@/libs/auth";
import { headers } from "next/headers";

export async function getUser() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		return session?.user;
	} catch {
		// Authentication is optional for public pages. This also keeps local
		// development usable before the DAuth environment variables are configured.
		return undefined;
	}
}
