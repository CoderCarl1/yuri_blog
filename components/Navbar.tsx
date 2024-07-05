'use client';
import SearchBar from './Search';
import { InternalLink,  } from './Link';
// import { draftMode } from 'next/headers';

export default function NavBar({ children }: { children: React.ReactNode }) {

    return (
        <div className='bg-cyan-400 text-white  p-4 flex justify-between'>
            <InternalLink href='/'>
                <h1>LOGO</h1>
            </InternalLink>
            {children}
            <SearchBar input={"word"} />
        </div>
    )
}