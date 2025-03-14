import Header from "@/components/Header";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-screen flex-col bg-primary-foreground mt-6">
			<Header />
			<main className="">{children}</main>
		</div>
	);
}
