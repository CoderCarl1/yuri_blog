import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {draftMode().isEnabled && (
          <div className='w-fit py-2.5 px-1'>
            <a
              className="rounded-md p-4 bg-blue-400 text-white block border border-transparent hover:bg-indigo-200 hover:border-indigo-500 hover:text-black focus:bg-indigo-200 focus:border-indigo-500 focus:text-black active:bg-indigo-200 active:border-indigo-600 active:text-black"
              href="/api/disable-draft"
            >
              Disable preview mode
            </a>
          </div>
        )}
        <main>{children}</main>
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
