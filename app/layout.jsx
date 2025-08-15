import "./globals.css";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Edu Platform Pro",
  description: "منصة تعليمية حديثة مبنية بـ Next.js + Firebase"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen">
        <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
          <div className="container flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="logo" className="h-6 w-6" />
              <span className="font-semibold">Edu Platform Pro</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/courses" className="link">الدورات</Link>
              <Link href="/dashboard" className="link">لوحة التحكم</Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-12">
          <div className="container py-8 text-sm text-slate-500">© {new Date().getFullYear()} Edu Platform Pro</div>
        </footer>
      </body>
    </html>
  );
}
