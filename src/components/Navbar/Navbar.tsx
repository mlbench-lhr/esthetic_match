import { Bars3Icon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Drawer from './Drawer';
import Drawerdata from './Drawerdata';
import Image from 'next/image';
import DownloadButton from '../hero/DownloadButton';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationItem {
    name: string;
    id: string;
    current: boolean;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [navigation, setNavigation] = useState<NavigationItem[]>([]);

    // Get navigation items from translation
    const getNavigationItems = (): NavigationItem[] => {
        const links = t('navbar.links', { returnObjects: true }) as Array<{ name: string; id: string }>;
        return links.map(link => ({
            name: link.name,
            id: link.id,
            current: false
        }));
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const currentNavigation = getNavigationItems();

        const updatedNav = currentNavigation.map((item) => {
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
        // Initialize navigation with translated items
        setNavigation(getNavigationItems());
        
        handleScroll(); // run once on mount
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [t]); // Re-run when translation changes

    return (
        <div className="fixed top-6 z-50  mx-auto w-full flex items-center justify-center px-4">
            <div className="bg-white shadow-md rounded-full w-full lg:max-w-7xl max-w-5xl">
                <div className="px-4 lg:px-8">
                    <div className="relative flex items-center justify-between">
                        <div className="flex flex-1 items-center justify-between py-2">
                            {/* Logo */}
                            <div className="flex items-center flex-shrink-0">
                                <div className="flex items-center w-8 h-8 mr-2">
                                    <Image
                                        className="block h-full w-full"
                                        width={10}
                                        height={10}
                                        src={'/logo.svg'}
                                        alt={t('navbar.logo.alt')}
                                    />
                                </div>
                                <p className="font-extrabold text-base lg:text-lg whitespace-nowrap">{t('navbar.logo.text')}</p>
                            </div>

                            {/* Links */}
                            <div className="hidden lg:block ml-4 xl:ml-20 flex-1">
                                <div className="flex items-center justify-end me-10 space-x-2 xl:space-x-4">
                                    {navigation.map((item) => (
                                        <span
                                            key={item.name}
                                            onClick={() => scrollToSection(item.id)}
                                            className={classNames(
                                                item.current
                                                    ? 'text-black font-semibold'
                                                    : 'text-[#A5AEA8]',
                                                'px-2 xl:px-3 py-4 text-xs xl:text-sm hover:text-black hover:opacity-75 space-links cursor-pointer whitespace-nowrap'
                                            )}
                                        >
                                            {item.name}
                                        </span>
                                    ))}
                                    <div className="ml-2">
                                        <LanguageSwitcher />
                                    </div>
                                </div>
                            </div>

                            <DownloadButton 
                                text={t('navbar.downloadButton')} 
                                className="hidden lg:inline-flex py-2.5 px-4 xl:px-6 text-xs xl:text-sm rounded-full flex-shrink-0" 
                            />
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