"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ListItem {
    id: string;
    title: string;
    description?: string;
}

export interface ItemProps {
    item: ListItem;
    index: number;
    isSelected?: boolean;
    onSelect?: (item: ListItem) => void;
    onDelete?: (item: ListItem) => void;
    selectable?: boolean;
    showDragHandle?: boolean;
    showCheckbox?: boolean;
    showDeleteButton?: boolean;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    wrapperStyle?: React.CSSProperties;
    dragOverlay?: boolean;
    aboutToDelete?: boolean;
}

export function Item({
    item,
    index,
    isSelected = false,
    onSelect,
    onDelete,
    selectable = true,
    showDragHandle = false,
    showCheckbox = true,
    showDeleteButton = true,
    className,
    children,
    style,
    wrapperStyle,
    dragOverlay = false,
    aboutToDelete = false,
}: ItemProps) {
    const [isClient, setIsClient] = useState(false);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hasMovedRef = useRef(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        return () => {
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
        };
    }, []);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item.id,
        disabled: !isClient,
    });

    const handleSelect = () => {
        if (selectable && onSelect) {
            onSelect(item);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(item);
        }
    };


    return (
        <div
            ref={setNodeRef}
            style={wrapperStyle}
            className={cn(
                "select-none",
                selectable && !showCheckbox && "cursor-pointer",
                className
            )}
            onClick={selectable && !showCheckbox ? handleSelect : undefined}
        >
            <Card
                style={{
                    transform: CSS.Transform.toString(transform),
                    transition: transition,
                    ...style,
                }}
                className={cn(
                    "transition-colors duration-200 ease-in-out",
                    "hover:shadow-md scale-100",
                    isDragging && "opacity-50 shadow-lg",
                    dragOverlay && "shadow-2xl scale-105",
                    isSelected && "border-primary",
                    aboutToDelete && "border-destructive",
                    className
                )}
                {...(isClient && !showDragHandle ? attributes : {})}
                {...(isClient && !showDragHandle ? listeners : {})}
            >
                <CardContent>
                    <div className="flex items-center gap-3">
                        {/* Drag Handle */}
                        {showDragHandle && (
                            <div
                                {...(isClient ? attributes : {})}
                                {...(isClient ? listeners : {})}
                                className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded transition-colors"
                            >
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                            </div>
                        )}

                        {/* Checkbox */}
                        {selectable && showCheckbox && (
                            <Checkbox
                                checked={isSelected}
                                onCheckedChange={handleSelect}
                                className="flex-shrink-0"
                            />
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {children || (
                                <>
                                    <div className="font-medium text-sm truncate">
                                        {item.title}
                                    </div>
                                    {item.description && (
                                        <div className="text-xs text-muted-foreground truncate mt-1">
                                            {item.description}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Delete Button */}
                        {onDelete && showDeleteButton && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleDelete}
                                className="flex-shrink-0 h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
