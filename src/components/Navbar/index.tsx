"use client";

import React, { useEffect } from 'react';
import Navbar from './Navbar';

const Navbarin: React.FC = () => {
    useEffect(() => {
        const debounce = <Args extends unknown[]>(fn: (...args: Args) => void): ((...args: Args) => void) => {
            let frame: number;

            return (...args: Args) => {
                if (frame) {
                    cancelAnimationFrame(frame);
                }

                frame = requestAnimationFrame(() => {
                    fn(...args);
                });
            };
        };

        const storeScroll = (): void => {
            document.documentElement.dataset.scroll = window.scrollY.toString();
        };

        const debouncedStoreScroll = debounce(storeScroll);

        document.addEventListener('scroll', debouncedStoreScroll, { passive: true });

        storeScroll();

        return () => {
            document.removeEventListener('scroll', debouncedStoreScroll);
        };
    }, []);

    return (
        <div className="bg-navbar">
            <Navbar />
        </div>
    );
};

export default Navbarin;
