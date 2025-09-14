"use client";

import React, { useEffect, useRef, useState } from "react";
import "./fullscreen-viewport.css";

// Extend HTMLElement with vendor-specific fullscreen methods
interface ExtendedHTMLElement extends HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
}

// Extend Document with vendor-specific fullscreen methods
interface ExtendedDocument extends Document {
    webkitExitFullscreen?: () => Promise<void>;
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitFullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
    msFullscreenElement?: Element | null;
}

interface FullscreenViewportProps {
    children: React.ReactNode;
    className?: string;
}

export function FullscreenViewport({ children, className = "" }: FullscreenViewportProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            ) || window.innerWidth <= 768;
            setIsMobile(isMobileDevice);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Enter fullscreen function
    const enterFullscreen = async () => {
        if (!viewportRef.current || isFullscreen || !isMobile) return;

        try {
            const element = viewportRef.current as ExtendedHTMLElement;
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                await element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } catch (error) {
            console.warn("Failed to enter fullscreen:", error);
        }
    };


    // Handle fullscreen change events
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!(
                document.fullscreenElement ||
                (document as ExtendedDocument).webkitFullscreenElement ||
                (document as ExtendedDocument).mozFullScreenElement ||
                (document as ExtendedDocument).msFullscreenElement
            );
            setIsFullscreen(isCurrentlyFullscreen);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
        };
    }, []);

    // Touch event handlers
    const handleTouchStart = () => {
        if (isMobile && !isFullscreen) {
            enterFullscreen();
        }
    };

    const handleTouchMove = () => {
        if (isMobile && !isFullscreen) {
            enterFullscreen();
        }
    };

    const handleTouchEnd = () => {
        if (isMobile && !isFullscreen) {
            enterFullscreen();
        }
    };

    // Scroll event handler
    const handleScroll = () => {
        if (isMobile && !isFullscreen) {
            enterFullscreen();
        }
    };

    // Handle click/tap events
    const handleClick = () => {
        if (isMobile && !isFullscreen) {
            enterFullscreen();
        }
    };

    return (
        <div
            ref={viewportRef}
            className={`fullscreen-viewport ${className}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
            onClick={handleClick}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "auto",
                WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
            }}
        >
            {children}
            {isMobile && !isFullscreen && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: "none",
                        background: "transparent",
                        zIndex: 1,
                    }}
                />
            )}
        </div>
    );
}
