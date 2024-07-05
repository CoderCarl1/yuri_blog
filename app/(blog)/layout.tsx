import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { VisualEditing } from 'next-sanity';
import NavBar from '../../components/Navbar';
import { draftMode } from 'next/headers';
import {ButtonLink} from '../../components/Link';


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
        <NavBar>
        {draftMode().isEnabled && (
        //   <div className='w-fit py-2.5 px-1'>
            <ButtonLink
              href="/api/disable-draft"
            >
              Disable preview mode
            </ButtonLink>
        //   </div>
        )}
        </NavBar>
        <main>{children}</main>
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
