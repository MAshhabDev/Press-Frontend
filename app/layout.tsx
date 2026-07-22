import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={("h-full antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        {/* Navbar */}
        {children}

        {/* Footer */}
        </body>
    </html>
  );
}