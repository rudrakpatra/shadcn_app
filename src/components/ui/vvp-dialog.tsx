"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useVisualViewport, VisualViewportData } from "@/hooks/use-visual-viewport";
import { cn } from "@/lib/utils";

function VVPDialog({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
    return <DialogPrimitive.Root data-slot="vvp-dialog" {...props} />
}

function VVPDialogTrigger({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
    return <DialogPrimitive.Trigger data-slot="vvp-dialog-trigger" {...props} />
}

function VVPDialogPortal({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
    return <DialogPrimitive.Portal data-slot="vvp-dialog-portal" {...props} />
}

function VVPDialogClose({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
    return <DialogPrimitive.Close data-slot="vvp-dialog-close" {...props} />
}

function VVPDialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    const viewport = useVisualViewport();

    return (
        <DialogPrimitive.Overlay
            data-slot="vvp-dialog-overlay"
            className={cn(
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
                className
            )}
            style={{
                position: 'fixed',
                top: `${viewport.offsetTop}px`,
                left: `${viewport.offsetLeft}px`,
                width: `${viewport.width}px`,
                height: `${viewport.height}px`,
            }}
            {...props}
        />
    )
}

function VVPDialogContent({
    className,
    children,
    showCloseButton = true,
    vvpStyle,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean
    vvpStyle?: (viewport: VisualViewportData) => React.CSSProperties
}) {
    const viewport = useVisualViewport();

    return (
        <VVPDialogPortal data-slot="vvp-dialog-portal">
            <VVPDialogOverlay />
            <DialogPrimitive.Content
                data-slot="vvp-dialog-content"
                className={cn(
                    "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                    className
                )}
                style={{
                    position: 'fixed',
                    top: `${viewport.offsetTop + viewport.height / 2}px`,
                    left: `${viewport.offsetLeft + viewport.width / 2}px`,
                    ...vvpStyle?.(viewport),
                }}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <DialogPrimitive.Close
                        data-slot="vvp-dialog-close"
                        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    >
                        <XIcon />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </VVPDialogPortal>
    )
}

function VVPDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="vvp-dialog-header"
            className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
            {...props}
        />
    )
}

function VVPDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="vvp-dialog-footer"
            className={cn(
                "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
                className
            )}
            {...props}
        />
    )
}

function VVPDialogTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="vvp-dialog-title"
            className={cn("text-lg leading-none font-semibold", className)}
            {...props}
        />
    )
}

function VVPDialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="vvp-dialog-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    )
}

export {
    VVPDialog,
    VVPDialogPortal,
    VVPDialogOverlay,
    VVPDialogClose,
    VVPDialogTrigger,
    VVPDialogContent,
    VVPDialogHeader,
    VVPDialogFooter,
    VVPDialogTitle,
    VVPDialogDescription,
};
