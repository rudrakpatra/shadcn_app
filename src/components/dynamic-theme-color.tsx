"use client";

import { useEffect, useState } from "react";
import { formatHex, parse } from "culori";

interface DynamicThemeColorProps {
    initialColor: string;
    fallbackColor: string;
    storageKey: string;
}

/**
 * Dynamic theme color component that reads theme from localStorage
 * and fetches colors from CSS custom properties like the generation scripts
 */
export function DynamicThemeColor({ initialColor, fallbackColor, storageKey }: DynamicThemeColorProps) {
    const [themeColor, setThemeColor] = useState(initialColor);

    useEffect(() => {
        const getThemeColorFromCSS = () => {
            try {
                const root = document.documentElement;
                const computedStyle = getComputedStyle(root);
                const color = computedStyle.getPropertyValue('--background').trim();

                // Convert color to hex using culori library
                const colorToHex = (colorValue: string) => {
                    try {
                        // Parse the color using culori
                        const color = parse(colorValue);
                        if (color) {
                            // Convert to hex format
                            return formatHex(color);
                        }
                    } catch {
                        console.warn('Failed to parse color:', colorValue);
                    }

                    // Fallback colors
                    return fallbackColor;
                };

                return colorToHex(color);
            } catch {
                return fallbackColor; // fallback
            }
        };

        const updateThemeColor = () => {
            const newColor = getThemeColorFromCSS();
            setThemeColor(newColor);

            // Also set the color of the HTML element
            document.documentElement.style.color = newColor;
        };

        // Update immediately
        updateThemeColor();

        // Listen for storage changes
        const handleStorageChange = () => updateThemeColor();
        window.addEventListener('storage', handleStorageChange);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleMediaChange = () => updateThemeColor();
        mediaQuery.addEventListener('change', handleMediaChange);

        // Listen for theme changes via class changes on html element
        const observer = new MutationObserver(() => {
            updateThemeColor();
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            mediaQuery.removeEventListener('change', handleMediaChange);
            observer.disconnect();
        };
    }, [storageKey, fallbackColor]);

    return (
        <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content={themeColor}
        />
    );
}