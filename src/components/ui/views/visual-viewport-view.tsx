"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useVisualViewport } from '@/hooks/use-visual-viewport';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { cn } from '@/lib/utils';

interface VisualViewportViewProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Whether to show debug information about the viewport
     * @default false
     */
    debug?: boolean;
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
    debug = false,
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

    // Lock scroll when VisualViewportView is mounted
    useScrollLock({ autoLock: true });

    // Scroll prevention hack
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) {
            console.log('scrollContainer is null, skipping');
            return;
        }

        console.log('scrollContainer found, setting up scroll prevention');

        const handleScrollEnd = () => {
            // Revert to position after scroll ends to prevent overscroll
            scrollContainer.scrollTo({ left: .5, top: .5, behavior: 'instant' });
        };

        scrollContainer.addEventListener('scrollend', handleScrollEnd);

        // Set initial scroll position
        scrollContainer.scrollTo({ left: .5, top: .5, behavior: "instant" });

        return () => {
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
            className={cn(
                debug && "border-2 border-blue-500 border-dashed",
                className
            )}
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
            {debug && (
                <div className="absolute top-2 left-2 bg-black/80 text-white text-xs p-2 rounded font-mono">
                    <div>Width: {viewport.width}px</div>
                    <div>Height: {viewport.height}px</div>
                    <div>Offset: ({viewport.offsetLeft}, {viewport.offsetTop})</div>
                    <div>Page: ({viewport.pageLeft}, {viewport.pageTop})</div>
                    <div>Scale: {viewport.scale}</div>
                </div>
            )}
        </div>
    );
}
