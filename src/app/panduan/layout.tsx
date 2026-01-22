import NavigationItem from "./components/layout/NavigasiButton";

export default function PanduanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-slate-50/50 min-h-screen">
      <NavigationItem />
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
      </main>
    </div>
  );
}