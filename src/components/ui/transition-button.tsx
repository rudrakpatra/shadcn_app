"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { TransitionConfig, TransitionPreset } from '@/types/transitions';
import { useEnhancedPageTransition } from '@/hooks/use-enhanced-page-transition';

interface TransitionButtonProps extends React.ComponentProps<typeof Button> {
    href: string;
    transition?: TransitionConfig | TransitionPreset;
    enablePreloading?: boolean;
    preloadDelay?: number;
    children: React.ReactNode;
}

export function TransitionButton({
    href,
    transition,
    enablePreloading = true,
    children,
    ...props
}: TransitionButtonProps) {
    const { navigate, handlePreloadStart, handlePreloadCancel } = useEnhancedPageTransition();

    const handleClick = () => {
        navigate(href, transition);
    };

    const handleMouseEnter = () => {
        if (enablePreloading && handlePreloadStart) {
            handlePreloadStart(href);
        }
    };

    const handleMouseLeave = () => {
        if (enablePreloading && handlePreloadCancel) {
            handlePreloadCancel();
        }
    };

    const handleFocus = () => {
        if (enablePreloading && handlePreloadStart) {
            handlePreloadStart(href);
        }
    };

    const handleBlur = () => {
        if (enablePreloading && handlePreloadCancel) {
            handlePreloadCancel();
        }
    };

    return (
        <Button
            {...props}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {children}
        </Button>
    );
}

// Convenience components for common transitions
export function SlideLeftButton({ href, children, ...props }: Omit<TransitionButtonProps, 'transition'>) {
    return (
        <TransitionButton href={href} transition="slideLeft" {...props}>
            {children}
        </TransitionButton>
    );
}

export function SlideRightButton({ href, children, ...props }: Omit<TransitionButtonProps, 'transition'>) {
    return (
        <TransitionButton href={href} transition="slideRight" {...props}>
            {children}
        </TransitionButton>
    );
}

export function SlideUpButton({ href, children, ...props }: Omit<TransitionButtonProps, 'transition'>) {
    return (
        <TransitionButton href={href} transition="slideUp" {...props}>
            {children}
        </TransitionButton>
    );
}

export function SlideDownButton({ href, children, ...props }: Omit<TransitionButtonProps, 'transition'>) {
    return (
        <TransitionButton href={href} transition="slideDown" {...props}>
            {children}
        </TransitionButton>
    );
}

export function FadeButton({ href, children, ...props }: Omit<TransitionButtonProps, 'transition'>) {
    return (
        <TransitionButton href={href} transition="fadeIn" {...props}>
            {children}
        </TransitionButton>
    );
}

export function ScaleButton({ href, children, ...props }: Omit<TransitionButtonProps, 'transition'>) {
    return (
        <TransitionButton href={href} transition="scaleIn" {...props}>
            {children}
        </TransitionButton>
    );
}

export function RotateButton({ href, children, ...props }: Omit<TransitionButtonProps, 'transition'>) {
    return (
        <TransitionButton href={href} transition="rotateIn" {...props}>
            {children}
        </TransitionButton>
    );
}

export function FlipHorizontalButton({ href, children, ...props }: Omit<TransitionButtonProps, 'transition'>) {
    return (
        <TransitionButton href={href} transition="flipHorizontal" {...props}>
            {children}
        </TransitionButton>
    );
}

export function FlipVerticalButton({ href, children, ...props }: Omit<TransitionButtonProps, 'transition'>) {
    return (
        <TransitionButton href={href} transition="flipVertical" {...props}>
            {children}
        </TransitionButton>
    );
}
