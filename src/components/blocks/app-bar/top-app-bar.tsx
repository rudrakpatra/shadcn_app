"use client";

import { usePathname } from "next/navigation";
import { ViewTransitionLink } from "@/components/view-transition/view-transition-link";
import { ViewTransitions } from "@/components/view-transition/view-transition-types";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ChevronLeftIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";

export default function TopAppBar({
    showBack = true,
    actions = [<ThemeSwitcher key="theme-switcher" />],
    title
}: {
    showBack?: boolean;
    onBack?: () => void;
    actions?: React.ReactNode[];
    title?: string;
}) {
    const pathname = usePathname();
    const shortTextRef = useRef<HTMLSpanElement>(null);
    const fullTextRef = useRef<HTMLSpanElement>(null);
    const [textWidths, setTextWidths] = useState({ short: 0, full: 0 });

    // Generate back link based on current path
    const pathSegments = pathname.split("/").filter(Boolean);
    let backLink = "/";
    let backText = "Home";

    if (pathSegments.length > 1) {
        // Remove the last segment to go back one level
        pathSegments.pop();
        backLink = "/" + pathSegments.join("/");

        // Set appropriate back text
        if (pathSegments.length === 1 && pathSegments[0] === "components") {
            backText = "Components";
        } else if (pathSegments.length === 0) {
            backText = "Home";
        } else {
            backText = pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() +
                pathSegments[pathSegments.length - 1].slice(1);
        }
    }

    // Measure text widths
    useLayoutEffect(() => {
        if (shortTextRef.current && fullTextRef.current) {
            setTextWidths({
                short: shortTextRef.current.clientWidth,
                full: fullTextRef.current.clientWidth
            });
        }
    }, [backText]);

    const backButton =
        <ViewTransitionLink href={backLink} animation={ViewTransitions.Semantic.Backward}>
            <motion.div
                className="group"
                whileHover="hover"
                initial="initial"
            >
                <Button variant="outline">
                    <motion.div
                        variants={{
                            initial: { x: 0 },
                            hover: { x: -6 }
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut"
                        }}
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                    </motion.div>

                    <motion.div
                        className="relative overflow-hidden text-left whitespace-nowrap"
                        variants={{
                            initial: { width: textWidths.short || "auto" },
                            hover: { width: textWidths.full || "auto" },
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                    >
                        <span ref={shortTextRef} className="opacity-0">Back</span>
                        <span ref={fullTextRef} className="absolute left-0">Back to {backText}</span>
                    </motion.div>
                </Button>
            </motion.div>
        </ViewTransitionLink>

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border" >
            <div className="max-w-6xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8 flex items-center justify-between gap-2">
                {showBack && backButton}
                {title && <span className="text-lg font-bold flex-1 text-center overflow-hidden text-ellipsis whitespace-nowrap">{title}</span>}
                {actions && actions.map((action, index) => (
                    <div key={index}>{action}</div>
                ))}
            </div>
        </header >
    );
}