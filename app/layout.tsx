import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn Kaspa | The Ultimate Guide to the Kaspa BlockDAG",
  description:
    "Master the Kaspa network with our open-source guide. Clear, multi-level explanations of the world's fastest Proof-of-Work cryptocurrency, from beginner basics to developer deep-dives.",
  openGraph: {
    title: "Learn Kaspa | Free Open-Source BlockDAG Education",
    description:
      "Discover how Kaspa solves the blockchain trilemma. Free, plain-English to technical explanations of the fastest Proof-of-Work network.",
    url: "https://learnkaspa.com",
    siteName: "LearnKaspa",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Kaspa | The Ultimate Guide to the Kaspa BlockDAG",
    description:
      "Master the Kaspa network with our open-source guide. Clear, multi-level explanations of the world's fastest Proof-of-Work cryptocurrency.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-obsidian-950 text-neutral-200 antialiased selection:bg-kaspa selection:text-black">
      <body className="min-h-screen flex flex-col font-sans border-t-2 border-kaspa overflow-x-hidden w-full">
        {children}
      </body>
    </html>
  );
}