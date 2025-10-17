import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import DialogflowMessenger from "@/components/DialogflowMessenger";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drink Panda | Juice Shop",
  description: "Simple and cool juice e-commerce site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen"
        style={{ backgroundColor: "rgb(var(--bg))", color: "rgb(var(--text))" }}
      >
        <header
          className="sticky top-0 z-50 border-b backdrop-blur-md"
          style={{
            borderColor: "rgba(75,85,99,.4)",
            backgroundColor: "rgb(var(--surface))",
          }}
        >
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-lg font-extrabold">🥤 Drink Panda</span>
            </Link>
            <Nav />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer
          className="border-t py-4"
          style={{
            borderColor: "rgba(75,85,99,.4)",
            backgroundColor: "rgb(var(--surface))",
          }}
        >
          <div className="container mx-auto flex items-center justify-between px-4">
            <span className="opacity-70">
              © {new Date().getFullYear()} Drink Panda
            </span>
            <span className="opacity-70">Fresh juice, delivered.</span>
          </div>
        </footer>
        <DialogflowMessenger />
      </body>
    </html>
  );
}
