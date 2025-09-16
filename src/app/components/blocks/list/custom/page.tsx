"use client";

import React, { useState, useCallback } from "react";
import { List, ListItem } from "@/components/blocks/list-item";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { VisualViewportView } from "@/components/ui/views/visual-viewport-view";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import TopAppBar from "@/components/blocks/app-bar/top-app-bar";

export default function CustomListPage() {
    const [items, setItems] = useState<ListItem[]>([
        { id: "task-1", title: "Design new logo", description: "Create a modern logo for the brand" },
        { id: "task-2", title: "Update website", description: "Refresh the homepage with new content" },
        { id: "task-3", title: "Review code", description: "Code review for the latest feature" },
        { id: "task-4", title: "Plan sprint", description: "Plan next sprint goals and tasks" },
        { id: "task-5", title: "Write documentation", description: "Document the new API endpoints" }
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

    // Custom Item Renderer
    const renderCustomItem = (item: ListItem) => {
        return (
            <div className="flex flex-col gap-2">
                <Input
                    value={item.title}
                    onChange={(e) => setItems(prev =>
                        prev.map(i =>
                            i.id === item.id
                                ? { ...i, title: e.target.value }
                                : i
                        )
                    )}
                    placeholder="Task title"
                    className="font-medium"
                />
                <Textarea
                    value={item.description || ""}
                    onChange={(e) => setItems(prev =>
                        prev.map(i =>
                            i.id === item.id
                                ? { ...i, description: e.target.value }
                                : i
                        )
                    )}
                    placeholder="Task description"
                    className="min-h-[60px] resize-none"
                />
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        Task ID: {item.id}
                    </span>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item)}
                        className="h-6 w-6 p-0"
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <VisualViewportView className="bg-background" immediatelyRender={false}>
            <div className="h-full flex flex-col">
                <TopAppBar />
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <List
                        className="max-w-6xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8 space-y-4"
                        data={items}
                        renderItem={renderCustomItem}
                        onReorder={setItems}
                        onDelete={handleDelete}
                        onSelect={handleSelect}
                        selectedItems={selectedItems}
                        sortable={true}
                        selectable={false}
                        showDragHandle={false}
                        showCheckbox={false}
                        showDeleteButton={false}
                        virtualized={false}
                        swipeToDeleteThreshold={100}
                        adjustScale={false}
                        useDragOverlay={true}
                        strategy={verticalListSortingStrategy}
                    />
                </div>
            </div>
        </VisualViewportView>
    );
}
