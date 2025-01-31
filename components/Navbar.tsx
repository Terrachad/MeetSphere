import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return ( 
    <nav className='flex flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-[26px]'>
        <Link href='/' className='flex items-center gap-1 px-[2px]'>
            <Image
                src='/icons/logo.png'
                alt='logo'
                width={120}
                height={120}
                className='max-sm:w-[80px]'
            />
        </Link>
        <div className='flex flex-between gap-5'>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {/*user auth*/}
            <MobileNav/>
        </div>
    </nav>
  )
}

export default Navbar