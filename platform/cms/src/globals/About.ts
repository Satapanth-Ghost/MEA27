import { GlobalConfig } from "payload/types";

export const About: GlobalConfig = {
	slug: "about",
	fields: [
		{
			name: "about",
			label: "Community description (shown on the MEA27 home page)",
			type: "textarea",
			admin: {
				description: "Edit this text, save it, then refresh http://localhost:3000 to see the change.",
			},
			defaultValue: "Edit this text at the CMS website :)",
		},
	],
	access: {
		read: () => true,
		update: ({ req }) => req.user,
	},
};
