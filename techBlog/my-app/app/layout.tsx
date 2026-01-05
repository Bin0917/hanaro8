import { Terminal } from 'lucide-react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import { use } from 'react';
import UserProfile from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Beans tech-Blog',
  description: 'Generated next vision',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /// useSession시 session 정보가 담김
  const session = use(auth());
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}min-h-screen antialiased`}
      >
        <SessionProvider session={session}>
          <div className="p-5">
            <div className="mx-auto flex max-w-27xl items-center justify-between px-4 py-4 lg:px-8">
              {/* Logo */}
              <Link href="/">
                <div className="flex items-center gap-2">
                  <div className="glow-primary flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Terminal className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-foreground text-xl tracking-tight">
                    DevBlog
                  </span>
                </div>
              </Link>

              {session?.user ? (
                <UserProfile data={session} />
              ) : (
                <Link href="/sign">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
            <div>{children}</div>
            <footer>2025 hanaro_LEESEUNGBIN</footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
