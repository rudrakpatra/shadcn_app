"use client";

import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { AnimationType, ViewTransitions, SemanticAnimationType } from "./view-transition-types";

export interface ViewTransitionLinkProps {
    href: string;
    children: React.ReactNode;
    animation?: AnimationType | SemanticAnimationType;
    duration?: number;
    easing?: string;
    customAnimation?: () => void;
    className?: string;
}

export function ViewTransitionLink({
    href,
    children,
    animation = ViewTransitions.Semantic.Backward,
    duration = 350,
    easing = "cubic-bezier(0.1, 0.1, 0.1, 1)",
    customAnimation,
    className
}: ViewTransitionLinkProps) {
    const router = useTransitionRouter();

    const getAnimationFunction = () => {
        if (animation === "custom" && customAnimation) {
            return customAnimation;
        }

        return animationPresets[animation as AnimationType];
    };

    return (
        <Link
            href={href}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                router.push(href, {
                    onTransitionReady: () => getAnimationFunction()(duration, easing),
                });
            }}
        >
            {children}
        </Link>
    );
}

// Animation presets
const animationPresets: Record<AnimationType | SemanticAnimationType, (duration: number, easing: string) => void> = {
    slideLeft: (duration, easing) => {
        // Old page slides out to the left
        document.documentElement.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-100%)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        // New page slides in from the right
        document.documentElement.animate(
            [
                { transform: "translateX(100%)" },
                { transform: "translateX(0)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    },

    slideRight: (duration, easing) => {
        // Old page slides out to the right
        document.documentElement.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(100%)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        // New page slides in from the left
        document.documentElement.animate(
            [
                { transform: "translateX(-100%)" },
                { transform: "translateX(0)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    },

    slideUp: (duration, easing) => {
        // Old page slides up
        document.documentElement.animate(
            [
                { transform: "translateY(0)" },
                { transform: "translateY(-100%)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        // New page slides in from bottom
        document.documentElement.animate(
            [
                { transform: "translateY(100%)" },
                { transform: "translateY(0)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    },

    slideDown: (duration, easing) => {
        // Old page slides down
        document.documentElement.animate(
            [
                { transform: "translateY(0)" },
                { transform: "translateY(100%)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        // New page slides in from top
        document.documentElement.animate(
            [
                { transform: "translateY(-100%)" },
                { transform: "translateY(0)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    },

    fade: (duration, easing) => {
        // Old page fades out
        document.documentElement.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        // New page fades in
        document.documentElement.animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    },

    scale: (duration, easing) => {
        // Old page scales down
        document.documentElement.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(0.8)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        // New page scales up
        document.documentElement.animate(
            [
                { transform: "scale(1.2)" },
                { transform: "scale(1)" }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    },

    scaleFade: (duration, easing) => {
        // Old page scales down and fades out
        document.documentElement.animate(
            [
                {
                    opacity: 1,
                    transform: "scale(1)"
                },
                {
                    opacity: 0,
                    transform: "scale(0.9)"
                }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        // New page scales up and fades in
        document.documentElement.animate(
            [
                {
                    opacity: 0,
                    transform: "scale(1.1)"
                },
                {
                    opacity: 1,
                    transform: "scale(1)"
                }
            ],
            {
                duration,
                easing,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    },



    custom: () => {
        // Custom animation will be handled by the customAnimation prop
    }
};