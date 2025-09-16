"use client";
import TopAppBar from "@/components/blocks/app-bar/top-app-bar";

export default function ComponentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <TopAppBar />
            {children}
        </div >
    );
}