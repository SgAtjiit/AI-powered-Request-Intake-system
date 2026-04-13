import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'AI-powered-intake request system',
  description: 'AI-powered-intake request system for QenixLabs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.2),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)]">
          <header className="border-b border-white/60 bg-white/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/submit" className="flex items-center gap-3 text-slate-950">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  CX
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    AI-powered
                  </span>
                  <span className="block text-base font-semibold">
                    intake request system
                  </span>
                </span>
              </Link>
              <nav className="flex items-center gap-2 rounded-full bg-white/80 p-1 ring-1 ring-slate-200">
                <Link
                  href="/submit"
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Submit
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Dashboard
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
