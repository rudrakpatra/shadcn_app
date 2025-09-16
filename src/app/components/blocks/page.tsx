"use client";

import React, { useState, useCallback } from "react";
import { List, ListItem } from "@/components/blocks/list-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


// Create a large dataset for virtualization demo
const largeDataset: ListItem[] = Array.from({ length: 50 }, (_, index) => ({
    id: `large-${index}`,
    title: `Item ${index + 1}`
}));

export default function BlocksPage() {
    // Example 1: Small Dataset
    const [smallItems, setSmallItems] = useState<ListItem[]>([
        { id: "1", title: "Apple", description: "Red and crunchy" },
        { id: "2", title: "Banana", description: "Yellow and sweet" },
        { id: "3", title: "Orange", description: "Citrus and juicy" },
        { id: "4", title: "Grape", description: "Small and purple" }
    ]);
    const [smallSelectedItems, setSmallSelectedItems] = useState<string[]>([]);

    // Example 2: Virtualized Dataset
    const [virtualizedItems, setVirtualizedItems] = useState<ListItem[]>(largeDataset);
    const [virtualizedSelectedItems, setVirtualizedSelectedItems] = useState<string[]>([]);

    // Example 3: Custom Item Dataset
    const [customItems, setCustomItems] = useState<ListItem[]>([
        { id: "task-1", title: "Design new logo", description: "Create a modern logo for the brand" },
        { id: "task-2", title: "Update website", description: "Refresh the homepage with new content" },
        { id: "task-3", title: "Review code", description: "Code review for the latest feature" },
        { id: "task-4", title: "Plan sprint", description: "Plan next sprint goals and tasks" },
        { id: "task-5", title: "Write documentation", description: "Document the new API endpoints" }
    ]);
    const [customSelectedItems, setCustomSelectedItems] = useState<string[]>([]);

    // Handlers for Small Dataset
    const handleSmallDelete = useCallback((item: ListItem) => {
        setSmallItems(prev => prev.filter(i => i.id !== item.id));
        setSmallSelectedItems(prev => prev.filter(id => id !== item.id));
    }, []);

    const handleSmallSelect = useCallback((item: ListItem) => {
        setSmallSelectedItems(prev =>
            prev.includes(item.id)
                ? prev.filter(id => id !== item.id)
                : [...prev, item.id]
        );
    }, []);

    // Handlers for Virtualized Dataset
    const handleVirtualizedDelete = useCallback((item: ListItem) => {
        setVirtualizedItems(prev => prev.filter(i => i.id !== item.id));
        setVirtualizedSelectedItems(prev => prev.filter(id => id !== item.id));
    }, []);

    const handleVirtualizedSelect = useCallback((item: ListItem) => {
        setVirtualizedSelectedItems(prev =>
            prev.includes(item.id)
                ? prev.filter(id => id !== item.id)
                : [...prev, item.id]
        );
    }, []);

    // Handlers for Custom Dataset
    const handleCustomDelete = useCallback((item: ListItem) => {
        setCustomItems(prev => prev.filter(i => i.id !== item.id));
        setCustomSelectedItems(prev => prev.filter(id => id !== item.id));
    }, []);

    const handleCustomSelect = useCallback((item: ListItem) => {
        setCustomSelectedItems(prev =>
            prev.includes(item.id)
                ? prev.filter(id => id !== item.id)
                : [...prev, item.id]
        );
    }, []);

    // Custom Item Renderer
    const renderCustomItem = (item: ListItem, index: number) => {
        return (
            <div className="flex flex-col gap-2">
                <Input
                    value={item.title}
                    onChange={(e) => setCustomItems(prev =>
                        prev.map(i =>
                            i.id === item.id
                                ? { ...i, title: e.target.value }
                                : i
                        )
                    )}
                />
                <Textarea
                    value={item.description}
                    onChange={(e) => setCustomItems(prev =>
                        prev.map(i =>
                            i.id === item.id
                                ? { ...i, description: e.target.value }
                                : i
                        )
                    )}
                />
            </div>
        );
    };

    return (
        <div className="container mx-auto p-6 space-y-8 overflow-x-hidden">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">List Component Examples</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Three different configurations showcasing the List component capabilities
                </p>
            </div>

            {/* Example 1: Small Dataset */}
            <Card>
                <CardHeader>
                    <CardTitle>Example 1: Small Dataset</CardTitle>
                    <CardDescription>
                        Basic list with 4 items, full features enabled
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-4">
                            Perfect for small lists with rich interactions. All features enabled including drag handles, checkboxes, and delete buttons.
                        </p>
                    </div>
                    <List
                        data={smallItems}
                        onReorder={setSmallItems}
                        onDelete={handleSmallDelete}
                        onSelect={handleSmallSelect}
                        selectedItems={smallSelectedItems}
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
                </CardContent>
            </Card>

            {/* Example 2: Virtualized Dataset */}
            <Card>
                <CardHeader>
                    <CardTitle>Example 2: Virtualized Dataset</CardTitle>
                    <CardDescription>
                        Large dataset (50 items) with virtualization for optimal performance
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-4">
                            Handles large datasets efficiently using react-tiny-virtual-list. Only renders visible items for smooth performance.
                        </p>
                    </div>
                    <List
                        data={virtualizedItems}
                        onReorder={setVirtualizedItems}
                        onDelete={handleVirtualizedDelete}
                        onSelect={handleVirtualizedSelect}
                        selectedItems={virtualizedSelectedItems}
                        sortable={true}
                        selectable={true}
                        showDragHandle={false}
                        showCheckbox={false}
                        showDeleteButton={false}
                        virtualized={true}
                        maxHeight={400}
                        activationConstraint={{
                            delay: 250,
                            tolerance: 5,
                        }}
                        swipeToDeleteThreshold={100}
                        adjustScale={true}
                        useDragOverlay={true}
                        strategy={verticalListSortingStrategy}
                    />
                </CardContent>
            </Card>

            {/* Example 3: Custom Item */}
            <Card>
                <CardHeader>
                    <CardTitle>Example 3: Custom Item</CardTitle>
                    <CardDescription>
                        Custom item rendering with task-style layout
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-4">
                            Demonstrates custom item rendering with a task management style. Uses renderItem prop for complete customization.
                        </p>
                    </div>
                    <List
                        data={customItems}
                        renderItem={renderCustomItem}
                        onReorder={setCustomItems}
                        onDelete={handleCustomDelete}
                        onSelect={handleCustomSelect}
                        selectedItems={customSelectedItems}
                        sortable={true}
                        selectable={false}
                        showDragHandle={false}
                        showCheckbox={false}
                        showDeleteButton={false}
                        virtualized={false}
                        activationConstraint={{
                            delay: 250,
                            tolerance: 5,
                        }}
                        swipeToDeleteThreshold={100}
                        adjustScale={false}
                        useDragOverlay={true}
                        strategy={verticalListSortingStrategy}
                    />
                </CardContent>
            </Card>

            {/* Component Props Documentation */}
            <Card>
                <CardHeader>
                    <CardTitle>Component Props</CardTitle>
                    <CardDescription>
                        Available props for List and Item components
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">List Props</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p><strong>data:</strong> Array of ListItem objects</p>
                                    <p><strong>onReorder:</strong> (items: ListItem[]) =&gt; void</p>
                                    <p><strong>onDelete:</strong> (item: ListItem) =&gt; void</p>
                                    <p><strong>onSelect:</strong> (item: ListItem) =&gt; void</p>
                                </div>
                                <div>
                                    <p><strong>selectedItems:</strong> string[]</p>
                                    <p><strong>sortable:</strong> boolean (default: true)</p>
                                    <p><strong>selectable:</strong> boolean (default: true)</p>
                                    <p><strong>showDragHandle:</strong> boolean (default: false)</p>
                                </div>
                                <div>
                                    <p><strong>showCheckbox:</strong> boolean (default: true)</p>
                                    <p><strong>showDeleteButton:</strong> boolean (default: true)</p>
                                    <p><strong>virtualized:</strong> boolean (default: false)</p>
                                    <p><strong>maxHeight:</strong> number (default: 400)</p>
                                </div>
                                <div>
                                    <p><strong>swipeToDeleteThreshold:</strong> number (default: 100)</p>
                                    <p><strong>renderItem:</strong> (item, index) =&gt; ReactNode</p>
                                    <p><strong>className:</strong> string</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">Item Props</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p><strong>item:</strong> ListItem</p>
                                    <p><strong>index:</strong> number</p>
                                    <p><strong>isSelected:</strong> boolean</p>
                                    <p><strong>onSelect:</strong> () =&gt; void</p>
                                </div>
                                <div>
                                    <p><strong>onDelete:</strong> () =&gt; void</p>
                                    <p><strong>selectable:</strong> boolean</p>
                                    <p><strong>showDragHandle:</strong> boolean</p>
                                    <p><strong>showCheckbox:</strong> boolean</p>
                                </div>
                                <div>
                                    <p><strong>showDeleteButton:</strong> boolean</p>
                                    <p><strong>aboutToDelete:</strong> boolean</p>
                                    <p><strong>className:</strong> string</p>
                                    <p><strong>children:</strong> React.ReactNode</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};