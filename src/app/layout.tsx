import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Escape the Permanent Underclass | AI Job Risk Report",
  description:
    "Find out how likely AI is to replace your job. Get a personalized report with your risk score, career pivot strategies, and asset allocation guidance.",
  keywords: ["AI job replacement", "career risk", "AI automation", "job displacement", "career planning"],
  openGraph: {
    title: "Escape the Permanent Underclass",
    description: "Will AI replace your job? Get your personalized risk report.",
    url: "https://escapepermanentunderclass.com",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale } = await params.catch(() => ({ locale: "en" }));
  const lang = locale || "en";

  return (
    <html lang={lang} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
