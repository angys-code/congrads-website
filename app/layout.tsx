import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Congrads",
  description: "A marketing agency who redefines digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} bg-gray-100 antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5JJVGZGJ"
height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
{/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
