import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,

    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'



const MobileNav = () => {
    const pathname = usePathname()
    return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
        <SheetTrigger asChild>
            <Image
            src='/icons/hamburger.svg'
            alt='hamburger'
            height={36}
            width={36}
            className='cursor-pointer sm:hidden'
            />
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-dark-1'>
        <Link href='/' className='flex items-center gap-1 px-1'>
            <Image
                src='/icons/logo.png'
                alt='logo'
                width={100}
                height={100}

            />
        </Link>
        <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
            <SheetClose asChild>
                <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route

                    return(
                        <SheetClose key={link.route} asChild>
    <                       Link href={link.route} key={link.label} className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60',{
                                'bg-blue-1': isActive,
                            })}>
                                <Image
                                    src={link.imgURL}
                                    alt={link.label}
                                    width={20}
                                    height={20}
                                />
                                <p className='font-semibold'>
                                    {link.label}
                                </p>
                            </Link>
                        </SheetClose>
                        
                        
                    )
                })}
                </section>
            </SheetClose>
        </div>
        </SheetContent>
        </Sheet>

    </section>
    )
}

export default MobileNav