import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Aesthetic Showcase | Interactive Web Design Gallery",
  description: "Explore 8 iconic code-inspired design styles: retro terminals, VS Code aesthetics, brutalism, cyberpunk glitch, creative coding, live code playground, gradient builder, and palette generator.",
  keywords: ["code aesthetic", "web design", "terminal", "brutalism", "glitch", "cyberpunk", "code playground", "gradient generator", "palette generator", "interactive gallery"],
  authors: [{ name: "Z.ai Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Code Aesthetic Showcase | Interactive Web Design Gallery",
    description: "Explore 8 iconic code-inspired design styles: retro terminals, VS Code aesthetics, brutalism, cyberpunk glitch, creative coding, live code playground, gradient builder, and palette generator.",
    siteName: "Code Aesthetic Showcase",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Aesthetic Showcase | Interactive Web Design Gallery",
    description: "Explore 8 iconic code-inspired design styles: retro terminals, VS Code aesthetics, brutalism, cyberpunk glitch, creative coding, live code playground, gradient builder, and palette generator.",
  },
  other: {
    'theme-color': '#0a0a0a',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
