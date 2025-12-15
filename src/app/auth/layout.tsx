import { AuthHero } from "./components/AuthHero";
import { AuthMobileBackground } from "./components/AuthMobileBackground";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full bg-gray-50 flex items-center justify-center relative">
			{/* Background Mobile - hanya muncul di mobile */}
			<AuthMobileBackground />

			{/* Hero Section - hanya muncul di desktop */}
			<AuthHero />

			{/* Content dengan z-index lebih tinggi */}
			<div className="relative z-10 w-full lg:w-1/2">{children}</div>
		</div>
	);
}

