import { AuthHero } from "./components/AuthHero";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
			<AuthHero />
			{children}
		</div>
	);
}

