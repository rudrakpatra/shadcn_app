"use client";

import React, { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import VirtualList from "react-tiny-virtual-list";
import {
    Active,
    closestCenter,
    CollisionDetection,
    DragOverlay,
    DndContext,
    DropAnimation,
    KeyboardSensor,
    KeyboardCoordinateGetter,
    Modifiers,
    MouseSensor,
    MeasuringConfiguration,
    PointerActivationConstraint,
    ScreenReaderInstructions,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    arrayMove,
    useSortable,
    SortableContext,
    sortableKeyboardCoordinates,
    SortingStrategy,
    verticalListSortingStrategy,
    AnimateLayoutChanges,
    NewIndexGetter,
} from "@dnd-kit/sortable";
import { Item, ListItem } from "./item";
import { cn } from "@/lib/utils";

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};

const screenReaderInstructions: ScreenReaderInstructions = {
    draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
};

export interface ListProps {
    data: ListItem[];
    onReorder?: (items: ListItem[]) => void;
    onDelete?: (item: ListItem) => void;
    onSelect?: (item: ListItem) => void;
    selectedItems?: string[];
    sortable?: boolean;
    selectable?: boolean;
    showDragHandle?: boolean;
    showCheckbox?: boolean;
    showDeleteButton?: boolean;
    virtualized?: boolean;
    maxHeight?: number;
    renderItem?: (item: ListItem, index: number) => React.ReactNode;
    className?: string;
    activationConstraint?: PointerActivationConstraint;
    swipeToDeleteThreshold?: number;
    // Enhanced drag and drop options
    adjustScale?: boolean;
    animateLayoutChanges?: AnimateLayoutChanges;
    collisionDetection?: CollisionDetection;
    coordinateGetter?: KeyboardCoordinateGetter;
    dropAnimation?: DropAnimation | null;
    getItemStyles?: (args: {
        id: UniqueIdentifier;
        index: number;
        isSorting: boolean;
        isDragOverlay: boolean;
        overIndex: number;
        isDragging: boolean;
    }) => React.CSSProperties;
    wrapperStyle?: (args: {
        active: Pick<Active, 'id'> | null;
        index: number;
        isDragging: boolean;
        id: UniqueIdentifier;
    }) => React.CSSProperties;
    isDisabled?: (id: UniqueIdentifier) => boolean;
    measuring?: MeasuringConfiguration;
    modifiers?: Modifiers;
    strategy?: SortingStrategy;
    useDragOverlay?: boolean;
}

export function SortableList({
    data,
    onReorder,
    onDelete,
    onSelect,
    selectedItems = [],
    sortable = true,
    selectable = true,
    showDragHandle = false,
    showCheckbox = true,
    showDeleteButton = true,
    virtualized = false,
    maxHeight = 400,
    renderItem,
    className,
    activationConstraint = {
        delay: 250,
        tolerance: 5,
    },
    swipeToDeleteThreshold = 100,
    // Enhanced options
    adjustScale = false,
    animateLayoutChanges,
    collisionDetection = closestCenter,
    coordinateGetter = sortableKeyboardCoordinates,
    dropAnimation = dropAnimationConfig,
    getItemStyles = () => ({}),
    wrapperStyle = () => ({}),
    isDisabled = () => false,
    measuring,
    modifiers,
    strategy = verticalListSortingStrategy,
    useDragOverlay = true,
}: ListProps) {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [aboutToDeleteId, setAboutToDeleteId] = useState<string | null>(null);
    const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: sortable ? activationConstraint : undefined,
        }),
        useSensor(TouchSensor, {
            activationConstraint: sortable ? activationConstraint : undefined,
        }),
        useSensor(KeyboardSensor, {
            // Disable smooth scrolling in Cypress automated tests
            scrollBehavior: typeof window !== 'undefined' && 'Cypress' in window ? 'auto' : undefined,
            coordinateGetter,
        })
    );

    const getIndex = useCallback(
        (id: UniqueIdentifier) => data.findIndex((item) => item.id === id),
        [data]
    );

    const activeIndex = activeId != null ? getIndex(activeId) : -1;

    const handleDragStart = useCallback(({ active }: { active: { id: UniqueIdentifier } }) => {
        setActiveId(active.id);
        setAboutToDeleteId(null);
        setDragDelta({ x: 0, y: 0 });
    }, []);

    const handleDragMove = useCallback(({ delta }: { delta: { x: number; y: number } }) => {
        setDragDelta(delta);

        // Check if dragged far enough horizontally to trigger delete state
        if (Math.abs(delta.x) > swipeToDeleteThreshold && activeId) {
            setAboutToDeleteId(activeId.toString());
        } else {
            setAboutToDeleteId(null);
        }
    }, [activeId, swipeToDeleteThreshold]);

    const handleDragEnd = useCallback(
        ({ over }: { over: { id: UniqueIdentifier } | null }) => {
            // If dragged far enough horizontally, delete the item
            if (Math.abs(dragDelta.x) > swipeToDeleteThreshold && activeId && onDelete) {
                const itemToDelete = data.find(item => item.id === activeId.toString());
                if (itemToDelete) {
                    onDelete(itemToDelete);
                }
            } else if (over && onReorder) {
                // Normal reordering
                const overIndex = getIndex(over.id);
                if (activeIndex !== overIndex && activeIndex !== -1) {
                    const newItems = arrayMove(data, activeIndex, overIndex);
                    onReorder(newItems);
                }
            }

            setActiveId(null);
            setAboutToDeleteId(null);
            setDragDelta({ x: 0, y: 0 });
        },
        [data, activeIndex, getIndex, onReorder, onDelete, dragDelta.x, swipeToDeleteThreshold, activeId]
    );

    const handleDragCancel = useCallback(() => {
        setActiveId(null);
        setAboutToDeleteId(null);
        setDragDelta({ x: 0, y: 0 });
    }, []);

    const renderListItem = useCallback(
        ({ index, style }: { index: number; style: React.CSSProperties }) => {
            const item = data[index];
            const isSelected = selectedItems.includes(item.id);
            const aboutToDelete = aboutToDeleteId === item.id;

            return (
                <div key={item.id} style={{ ...style }}>
                    <Item
                        item={item}
                        index={index}
                        isSelected={isSelected}
                        onSelect={onSelect}
                        onDelete={onDelete}
                        selectable={selectable}
                        showDragHandle={showDragHandle}
                        showCheckbox={showCheckbox}
                        showDeleteButton={showDeleteButton}
                        aboutToDelete={aboutToDelete}
                        wrapperStyle={wrapperStyle({
                            active: activeId ? { id: activeId } : null,
                            index,
                            isDragging: activeId === item.id,
                            id: item.id,
                        })}
                        style={getItemStyles({
                            id: item.id,
                            index,
                            isSorting: activeId !== null,
                            isDragOverlay: false,
                            overIndex: -1,
                            isDragging: activeId === item.id,
                        })}
                    >
                        {renderItem ? renderItem(item, index) : undefined}
                    </Item>
                </div>
            );
        },
        [data, selectedItems, onSelect, onDelete, selectable, showDragHandle, showCheckbox, showDeleteButton, aboutToDeleteId, renderItem, activeId, wrapperStyle, getItemStyles]
    );

    const renderDragOverlay = () => {
        if (activeId == null || activeIndex === -1) return null;

        const activeItem = data[activeIndex];
        const isSelected = selectedItems.includes(activeItem.id);
        const aboutToDelete = aboutToDeleteId === activeItem.id;

        return (
            <Item
                item={activeItem}
                index={activeIndex}
                isSelected={isSelected}
                onSelect={onSelect}
                onDelete={onDelete}
                selectable={selectable}
                showDragHandle={showDragHandle}
                showCheckbox={showCheckbox}
                showDeleteButton={showDeleteButton}
                aboutToDelete={aboutToDelete}
                dragOverlay
                wrapperStyle={wrapperStyle({
                    active: activeId ? { id: activeId } : null,
                    index: activeIndex,
                    isDragging: true,
                    id: activeItem.id,
                })}
                style={getItemStyles({
                    id: activeItem.id,
                    index: activeIndex,
                    isSorting: true,
                    isDragOverlay: true,
                    overIndex: -1,
                    isDragging: true,
                })}
            >
                {renderItem ? renderItem(activeItem, activeIndex) : undefined}
            </Item>
        );
    };

    if (!sortable) {
        // Non-sortable list
        if (virtualized && data.length > 10) {
            return (
                <div className={cn("w-full", className)}>
                    <VirtualList
                        width="100%"
                        height={maxHeight}
                        itemCount={data.length}
                        itemSize={80}
                        renderItem={renderListItem}
                    />
                </div>
            );
        }

        return (
            <div className={cn("space-y-2", className)}>
                {data.map((item, index) => {
                    const isSelected = selectedItems.includes(item.id);
                    return (
                        <Item
                            key={item.id}
                            item={item}
                            index={index}
                            isSelected={isSelected}
                            onSelect={onSelect}
                            onDelete={onDelete}
                            selectable={selectable}
                            showDragHandle={showDragHandle}
                            showCheckbox={showCheckbox}
                            showDeleteButton={showDeleteButton}
                        >
                            {renderItem ? renderItem(item, index) : undefined}
                        </Item>
                    );
                })}
            </div>
        );
    }

    // Sortable list with DnD context
    if (!isClient) {
        // Render non-sortable version during SSR
        return (
            <div className={cn("w-full", className)}>
                {virtualized && data.length > 10 ? (
                    <VirtualList
                        width="100%"
                        height={maxHeight}
                        itemCount={data.length}
                        itemSize={80}
                        renderItem={renderListItem}
                    />
                ) : (
                    <div className="space-y-2" style={{ maxHeight, overflowY: "auto" }}>
                        {data.map((item, index) => {
                            const isSelected = selectedItems.includes(item.id);
                            return (
                                <Item
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    isSelected={isSelected}
                                    onSelect={onSelect}
                                    onDelete={onDelete}
                                    selectable={selectable}
                                    showDragHandle={showDragHandle}
                                    showCheckbox={showCheckbox}
                                    showDeleteButton={showDeleteButton}
                                >
                                    {renderItem ? renderItem(item, index) : undefined}
                                </Item>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <DndContext
            accessibility={{
                screenReaderInstructions,
            }}
            sensors={sensors}
            collisionDetection={collisionDetection}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            measuring={measuring}
            modifiers={modifiers}
        >
            <SortableContext items={data.map((item) => item.id)} strategy={strategy}>
                <div className={cn("w-full", className)}>
                    {virtualized && data.length > 10 ? (
                        <VirtualList
                            width="100%"
                            height={maxHeight}
                            itemCount={data.length}
                            itemSize={80}
                            stickyIndices={activeId != null ? [data.findIndex((item) => item.id === activeId)] : undefined}
                            renderItem={renderListItem}
                        />
                    ) : (
                        <div className="space-y-2" style={{ maxHeight, overflowY: "auto" }}>
                            {data.map((item, index) => {
                                const isSelected = selectedItems.includes(item.id);
                                const aboutToDelete = aboutToDeleteId === item.id;
                                return (
                                    <Item
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        isSelected={isSelected}
                                        onSelect={onSelect}
                                        onDelete={onDelete}
                                        selectable={selectable}
                                        showDragHandle={showDragHandle}
                                        showCheckbox={showCheckbox}
                                        showDeleteButton={showDeleteButton}
                                        aboutToDelete={aboutToDelete}
                                    >
                                        {renderItem ? renderItem(item, index) : undefined}
                                    </Item>
                                );
                            })}
                        </div>
                    )}
                </div>
            </SortableContext>

            {useDragOverlay && createPortal(
                <DragOverlay
                    adjustScale={adjustScale}
                    dropAnimation={dropAnimation}
                >
                    {renderDragOverlay()}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
}
