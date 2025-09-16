"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { List, ListItem } from "@/components/blocks/list-item";
import { VisualViewportView } from "@/components/ui/views/visual-viewport-view";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import TopAppBar from "@/components/blocks/app-bar/top-app-bar";

// Create a large dataset for virtualization demo
const largeDataset: ListItem[] = Array.from({ length: 100 }, (_, index) => ({
    id: `large-${index}`,
    title: `Item ${index + 1}`,
    description: `This is item number ${index + 1} in the virtualized list`
}));

export default function VirtualizedListPage() {
    const [items, setItems] = useState<ListItem[]>(largeDataset);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleDelete = useCallback((item: ListItem) => {
        setItems(prev => prev.filter(i => i.id !== item.id));
        setSelectedItems(prev => prev.filter(id => id !== item.id));
    }, []);

    const handleSelect = useCallback((item: ListItem) => {
        setSelectedItems(prev =>
            prev.includes(item.id)
                ? prev.filter(id => id !== item.id)
                : [...prev, item.id]
        );
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const [availableHeight, setAvailableHeight] = useState(400);

    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const topAppBarHeight = 64; // Approximate TopAppBar height
                const padding = 32; // Approximate padding
                const height = window.innerHeight - rect.top - topAppBarHeight - padding;
                setAvailableHeight(Math.max(height, 300)); // Minimum height of 300px
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <VisualViewportView className="bg-background" immediatelyRender={false}>
            <div className="h-full flex flex-col">
                <TopAppBar />
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <div ref={containerRef} className="max-w-6xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8">
                        <List
                            data={items}
                            onReorder={setItems}
                            onDelete={handleDelete}
                            onSelect={handleSelect}
                            selectedItems={selectedItems}
                            sortable={true}
                            selectable={true}
                            showDragHandle={false}
                            showCheckbox={false}
                            showDeleteButton={false}
                            virtualized={true}
                            virtualListHeight={availableHeight}
                            swipeToDeleteThreshold={100}
                            adjustScale={true}
                            useDragOverlay={true}
                            strategy={verticalListSortingStrategy}
                        />
                    </div>
                </div>
            </div>
        </VisualViewportView>
    );
}
