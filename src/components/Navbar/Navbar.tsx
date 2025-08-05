import { Bars3Icon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import Drawer from './Drawer';
import Drawerdata from './Drawerdata';
import Image from 'next/image';
import DownloadButton from '../hero/DownloadButton';

interface NavigationItem {
    name: string;
    id: string;
    current: boolean;
}

const initialNavigation: NavigationItem[] = [
    { name: 'HOME', id: 'home', current: false },
    { name: 'ABOUT', id: 'about', current: false },
    { name: 'SERVICES', id: 'services', current: false },
    { name: 'FAQS', id: 'faqs', current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [navigation, setNavigation] = useState<NavigationItem[]>(initialNavigation);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;

        const updatedNav = initialNavigation.map((item) => {
            const section = document.getElementById(item.id);
            if (section) {
                const offsetTop = section.offsetTop;
                const offsetHeight = section.offsetHeight;
                const buffer = 150;

                const inView =
                    scrollY >= offsetTop - buffer && scrollY < offsetTop + offsetHeight - buffer;

                return { ...item, current: inView };
            }
            return item;
        });

        setNavigation(updatedNav);
    };

    useEffect(() => {
        handleScroll(); // run once on mount
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-6 z-50 max-w-[1440px] mx-auto w-full flex items-center justify-center">
            <div className="bg-white shadow-md rounded-full w-full lg:max-w-7xl max-w-4xl ">
                <div className="px-6 lg:px-8">
                    <div className="relative flex items-center justify-between">
                        <div className="flex flex-1 items-center justify-between py-2">
                            {/* Logo */}
                            <div className="flex items-center">
                                <div className="flex items-center w-8 h-8 mr-2">
                                    <Image
                                        className="block h-full w-full"
                                        width={10}
                                        height={10}
                                        src={'/logo.svg'}
                                        alt="esthetic-logo"
                                    />
                                </div>
                                <p className="font-extrabold text-lg">ESTHETIC MATCH</p>
                            </div>

                            {/* Links */}
                            <div className="hidden lg:block ml-20">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <span
                                            key={item.name}
                                            onClick={() => scrollToSection(item.id)}
                                            className={classNames(
                                                item.current
                                                    ? 'text-black font-semibold'
                                                    : 'text-[#A5AEA8]',
                                                'px-3 py-4 text-sm hover:text-black hover:opacity-75 space-links cursor-pointer'
                                            )}
                                        >
                                            {item.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <DownloadButton text="Download App" className="hidden lg:inline-flex py-2.5 rounded-full" />
                        </div>

                        {/* Drawer (Mobile) */}
                        <div className="block lg:hidden">
                            <Bars3Icon
                                className="block h-6 w-6"
                                aria-hidden="true"
                                onClick={() => setIsOpen(true)}
                            />
                        </div>

                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
