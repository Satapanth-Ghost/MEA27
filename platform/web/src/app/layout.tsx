import type { Metadata } from "next";
import "./globals.css";
import Providers from "@utils/providers";
import MotionBackground from "@components/Common/MotionBackground";
import MoodLift from "@components/Common/MoodLift";

export const metadata: Metadata = {
	title: "MEA | NIT Trichy",
	description: "Mechanical Engineering Association, NIT Trichy.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<MotionBackground />
				<Providers>{children}<MoodLift /></Providers>
			</body>
		</html>
	);
}
