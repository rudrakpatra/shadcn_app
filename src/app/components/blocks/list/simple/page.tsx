"use client";

import React, { useState, useCallback } from "react";
import { List, ListItem } from "@/components/blocks/list-item";
import { VisualViewportView } from "@/components/ui/views/visual-viewport-view";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import TopAppBar from "@/components/blocks/app-bar/top-app-bar";

export default function SimpleListPage() {
    const [items, setItems] = useState<ListItem[]>([
        { id: "1", title: "Apple", description: "Red and crunchy" },
        { id: "2", title: "Banana", description: "Yellow and sweet" },
        { id: "3", title: "Orange", description: "Citrus and juicy" },
        { id: "4", title: "Grape", description: "Small and purple" }
    ]);
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

    return (
        <VisualViewportView className="bg-background" immediatelyRender={false}>
            <div className="h-full flex flex-col">
                <TopAppBar />
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <List
                        data={items}
                        onReorder={setItems}
                        onDelete={handleDelete}
                        onSelect={handleSelect}
                        selectedItems={selectedItems}
                        sortable={true}
                        selectable={true}
                        showDragHandle={true}
                        showCheckbox={true}
                        showDeleteButton={true}
                        virtualized={false}
                        swipeToDeleteThreshold={100}
                        adjustScale={true}
                        useDragOverlay={true}
                        strategy={verticalListSortingStrategy}
                    />
                </div>
            </div>
        </VisualViewportView>
    );
}
