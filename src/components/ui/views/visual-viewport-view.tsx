"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useVisualViewport } from '@/hooks/use-visual-viewport';

interface VisualViewportViewProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Whether to render immediately without waiting for hydration
     * @default false
     */
    immediatelyRender?: boolean;
}

export function VisualViewportView({
    children,
    className,
    style,
    immediatelyRender = false,
}: VisualViewportViewProps) {
    const viewport = useVisualViewport();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(immediatelyRender);

    // Handle hydration for immediatelyRender prop
    useEffect(() => {
        if (!immediatelyRender) {
            setIsMounted(true);
        }
    }, [immediatelyRender]);

    // The ultimate scroll prevention that prevent visual viewport from scrolling
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;
        // Revert to position after scroll ends to prevent overscroll
        const handleScrollEnd = () => scrollContainer.scrollTo({ left: .5, top: .5, behavior: 'instant' });
        //overscroll contain to prevent overscroll
        scrollContainer.style.overscrollBehavior = 'contain';
        scrollContainer.addEventListener('scrollend', handleScrollEnd);

        // Set initial scroll position
        handleScrollEnd();

        return () => {
            scrollContainer.style.overscrollBehavior = 'auto';
            scrollContainer.removeEventListener('scrollend', handleScrollEnd);
        };
    }, [isMounted]); // Run when component is mounted

    const dynamicStyle: React.CSSProperties = {
        ...style,
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div
            className={className}
            style={{
                ...dynamicStyle,
                position: 'fixed',
                top: `${viewport.offsetTop}px`,
                left: `${viewport.offsetLeft}px`,
                width: `${viewport.width}px`,
                height: `${viewport.height}px`,
                zIndex: 50,
            }}
        >
            {/* Outer container - slightly smaller */}
            <div
                ref={scrollContainerRef}
                className="w-full h-full overflow-auto [&::-webkit-scrollbar]:hidden"
                style={{
                    width: '100%',
                    height: '100%',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE/Edge
                }}
            >
                {/* Inner container - slightly bigger to create scrollable area */}
                <div
                    className="relative"
                    style={{
                        width: 'calc(100% + 1px)',
                        height: 'calc(100% + 1px)',
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
