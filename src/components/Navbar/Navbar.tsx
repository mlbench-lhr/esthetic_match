import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import Image from 'next/image';
import DownloadButton from '../hero/DownloadButton';


interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'HOME', href: '#product', current: true },
    { name: 'ABOUT', href: '#pricing', current: false },
    { name: 'BLOG', href: '#features', current: false },
    { name: 'CONTACTS', href: '#features', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="fixed top-6 z-50 max-w-[1440px] mx-auto w-full flex items-center justify-center">
            <div className="bg-white shadow-md rounded-full w-full max-w-7xl ">
                <>
                    <div className="px-6 lg:px-8">
                        <div className="relative flex  items-center justify-between">
                            <div className="flex flex-1 items-center justify-between py-2">

                                {/* LOGO */}
                                <div className='flex items-center'>
                                    <div className="flex items-center w-8 h-8 mr-2">
                                        <Image
                                            className="block h-full w-full "
                                            width={10}
                                            height={10}
                                            src={'/logo.svg'}
                                            alt="esthetic-logo"
                                        />

                                    </div>
                                    <p className='font-extrabold text-lg'>ESTHETIC MATCH</p>
                                </div>
                                {/* LINKS */}
                                <div className="hidden lg:block ml-20">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? ' text-black hover:opacity-75' : 'hover:text-black hover:opacity-75',
                                                    'px-3 py-4 text-sm font-normal text-[#A5AEA8] space-links '
                                                )}
                                                aria-current={item.href ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <DownloadButton text="Download App" />
                            </div>

                            {/* SIGNIN DIALOG */}
                           

                            {/* DRAWER ICON FOR MOBILE */}
                            <div className='block lg:hidden'>
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
                            </div>

                            {/* MOBILE DRAWER */}
                            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                                <Drawerdata />
                            </Drawer>
                        </div>
                    </div>
                </>
            </div>

        </div>
    )
}

export default Navbar;
