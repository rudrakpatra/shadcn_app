'use client';

import React, {
    createContext,
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import ReactDOM from 'react-dom';
import invariant from 'tiny-invariant';

import {
    attachClosestEdge,
    type Edge,
    extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import * as liveRegion from '@atlaskit/pragmatic-drag-and-drop-live-region';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
    draggable,
    dropTargetForElements,
    type ElementDropTargetEventBasePayload,
    monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';

import { cn } from '@/lib/utils';
import { GripVertical, X } from 'lucide-react';


type ItemPosition = 'first' | 'last' | 'middle' | 'only';

type CleanupFn = () => void;

type ItemEntry = { itemId: string; element: HTMLElement };

type ListContextValue = {
    getListLength: () => number;
    registerItem: (entry: ItemEntry) => CleanupFn;
    reorderItem: (args: {
        startIndex: number;
        indexOfTarget: number;
        closestEdgeOfTarget: Edge | null;
    }) => void;
    deleteItem?: (itemId: string) => void;
    instanceId: symbol;
};

const ListContext = createContext<ListContextValue | null>(null);

function useListContext() {
    const listContext = useContext(ListContext);
    invariant(listContext !== null);
    return listContext;
}

export type Item = {
    id: string;
    label: string;
    closestEdge?: Edge | null;
    draggableState?: DraggableState;
};

const itemKey = Symbol('item');
type ItemData = {
    [itemKey]: true;
    item: Item;
    index: number;
    instanceId: symbol;
};

function getItemData({
    item,
    index,
    instanceId,
}: {
    item: Item;
    index: number;
    instanceId: symbol;
}): ItemData {
    return {
        [itemKey]: true,
        item,
        index,
        instanceId,
    };
}

function isItemData(data: Record<string | symbol, unknown>): data is ItemData {
    return data[itemKey] === true;
}

type DraggableState =
    | { type: 'idle' }
    | { type: 'preview'; container: HTMLElement }
    | { type: 'dragging' };

const idleState: DraggableState = { type: 'idle' };
const draggingState: DraggableState = { type: 'dragging' };

function getItemRegistry() {
    const registry = new Map<string, HTMLElement>();

    function register({ itemId, element }: ItemEntry) {
        registry.set(itemId, element);

        return function unregister() {
            registry.delete(itemId);
        };
    }

    function getElement(itemId: string): HTMLElement | null {
        return registry.get(itemId) ?? null;
    }

    return { register, getElement };
}

type ListState = {
    items: Item[];
    lastCardMoved: {
        item: Item;
        previousIndex: number;
        currentIndex: number;
        numberOfItems: number;
    } | null;
};

interface ListProps {
    items: Item[];
    onReorder?: (items: Item[]) => void;
    onDelete?: (itemId: string) => void;
    renderItem?: (item: Item, index: number) => React.ReactNode;
    className?: string;
}

export function List({
    items: initialItems,
    onReorder,
    onDelete,
    renderItem = (item, index) => {
        return <ListItem
            key={item.id}
            item={item}
            index={index}
        />
    },
    className
}: ListProps) {
    const [{ items, lastCardMoved }, setListState] = useState<ListState>({
        items: initialItems,
        lastCardMoved: null,
    });
    const [registry] = useState(getItemRegistry);
    const [isDragOverDeleteZone, setIsDragOverDeleteZone] = useState(false);
    const [isAnyItemDragging, setIsAnyItemDragging] = useState(false);

    // Isolated instances of this component from one another
    const [instanceId] = useState(() => Symbol('instance-id'));

    // Update items when prop changes
    useEffect(() => {
        setListState(prev => ({ ...prev, items: initialItems }));
    }, [initialItems]);


    const reorderItem = useCallback(
        ({
            startIndex,
            indexOfTarget,
            closestEdgeOfTarget,
        }: {
            startIndex: number;
            indexOfTarget: number;
            closestEdgeOfTarget: Edge | null;
        }) => {
            const finishIndex = getReorderDestinationIndex({
                startIndex,
                closestEdgeOfTarget,
                indexOfTarget,
                axis: 'vertical',
            });

            if (finishIndex === startIndex) {
                // If there would be no change, we skip the update
                return;
            }

            setListState((listState) => {
                const item = listState.items[startIndex];
                const newItems = reorder({
                    list: listState.items,
                    startIndex,
                    finishIndex,
                });

                // Call onReorder after the state update is queued
                if (onReorder) {
                    queueMicrotask(() => onReorder(newItems));
                }

                return {
                    items: newItems,
                    lastCardMoved: {
                        item,
                        previousIndex: startIndex,
                        currentIndex: finishIndex,
                        numberOfItems: listState.items.length,
                    },
                };
            });
        },
        [onReorder],
    );

    useEffect(() => {
        return monitorForElements({
            canMonitor({ source }) {
                return isItemData(source.data) && source.data.instanceId === instanceId;
            },
            onDrop({ location, source }) {
                const target = location.current.dropTargets[0];
                if (!target) {
                    return;
                }

                const sourceData = source.data;
                const targetData = target.data;
                if (!isItemData(sourceData) || !isItemData(targetData)) {
                    return;
                }

                const indexOfTarget = items.findIndex((item) => item.id === targetData.item.id);
                if (indexOfTarget < 0) {
                    return;
                }

                const closestEdgeOfTarget = extractClosestEdge(targetData);

                reorderItem({
                    startIndex: sourceData.index,
                    indexOfTarget,
                    closestEdgeOfTarget,
                });
            },
        });
    }, [instanceId, items, reorderItem]);

    // Monitor for drag start/end to show/hide delete zone
    useEffect(() => {
        return monitorForElements({
            canMonitor({ source }) {
                return isItemData(source.data) && source.data.instanceId === instanceId;
            },
            onDragStart() {
                setIsAnyItemDragging(true);
            },
            onDrop() {
                setIsAnyItemDragging(false);
                setIsDragOverDeleteZone(false);
            },
        });
    }, [instanceId]);

    // once a drag is finished, we have some post drop actions to take
    useEffect(() => {
        if (lastCardMoved === null) {
            return;
        }

        const { item, previousIndex, currentIndex, numberOfItems } = lastCardMoved;

        // Only announce the move, no visual flash
        liveRegion.announce(
            `You've moved ${item.label} from position ${previousIndex + 1
            } to position ${currentIndex + 1} of ${numberOfItems}.`,
        );
    }, [lastCardMoved]);


    // cleanup the live region when this component is finished
    useEffect(() => {
        return function cleanup() {
            liveRegion.cleanup();
        };
    }, []);

    const getListLength = useCallback(() => items.length, [items.length]);

    const deleteItem = useCallback((itemId: string) => {
        setListState(prevState => {
            const newItems = prevState.items.filter(item => item.id !== itemId);
            return {
                ...prevState,
                items: newItems,
            };
        });

        // Call onDelete immediately after state update
        if (onDelete) {
            onDelete(itemId);
        }
    }, [onDelete]);

    // Create delete zone drop target
    const deleteZoneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = deleteZoneRef.current;
        if (!element) return;

        return dropTargetForElements({
            element,
            canDrop({ source }) {
                return isItemData(source.data) && source.data.instanceId === instanceId;
            },
            onDragEnter() {
                setIsDragOverDeleteZone(true);
            },
            onDragLeave() {
                setIsDragOverDeleteZone(false);
            },
            onDrop({ source }) {
                const sourceData = source.data;
                if (!isItemData(sourceData)) return;

                // Delete the item
                if (deleteItem) {
                    deleteItem(sourceData.item.id);
                }
                setIsDragOverDeleteZone(false);
            },
        });
    }, [instanceId, deleteItem]);

    const contextValue: ListContextValue = useMemo(() => {
        return {
            registerItem: registry.register,
            reorderItem,
            deleteItem,
            instanceId,
            getListLength,
        };
    }, [registry.register, reorderItem, deleteItem, instanceId, getListLength]);

    return (
        <ListContext.Provider value={contextValue}>
            <div className={cn(className)}>
                {items.map((item, index) => {
                    return (
                        <Fragment key={item.id}>
                            {renderItem(item, index)}
                        </Fragment>
                    );
                })}
            </div>

            {/* Delete Zone - Always render but with conditional visibility */}
            <div
                ref={deleteZoneRef}
                className={cn(
                    "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50",
                    "w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center",
                    "transition-all duration-300 ease-in-out",
                    "opacity-0 translate-y-4 pointer-events-none",
                    isAnyItemDragging && "opacity-100 translate-y-0 pointer-events-auto",
                    isDragOverDeleteZone
                        ? "bg-destructive border-destructive text-destructive-foreground scale-110"
                        : "bg-background border-muted-foreground text-muted-foreground"
                )}
                aria-label="Drop here to delete item"
            >
                <X className="w-6 h-6" />
            </div>
        </ListContext.Provider>
    );
}

interface ListItemProps {
    item: Item;
    index: number;
    Content?: React.FC<{ item: Item }>;
}

export function ListItem({ item, index, Content }: ListItemProps) {
    const { registerItem, instanceId, deleteItem } = useListContext();

    const ref = useRef<HTMLDivElement>(null);
    const dragHandleRef = useRef<HTMLDivElement>(null);

    const [draggableState, setDraggableState] = useState<DraggableState>(idleState);
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

    useEffect(() => {
        const element = ref.current;
        const dragHandle = dragHandleRef.current;
        invariant(element);
        invariant(dragHandle);

        const data = getItemData({ item, index, instanceId });

        function onChange({ source, self }: ElementDropTargetEventBasePayload) {
            const isSource = source.element === dragHandle;
            if (isSource) {
                setClosestEdge(null);
                return;
            }

            const closestEdge = extractClosestEdge(self.data);

            const sourceIndex = source.data.index;
            invariant(typeof sourceIndex === 'number');

            const isItemBeforeSource = index === sourceIndex - 1;
            const isItemAfterSource = index === sourceIndex + 1;

            const isDropIndicatorHidden =
                (isItemBeforeSource && closestEdge === 'bottom') ||
                (isItemAfterSource && closestEdge === 'top');

            if (isDropIndicatorHidden) {
                setClosestEdge(null);
                return;
            }

            setClosestEdge(closestEdge);
        }


        return combine(
            registerItem({ itemId: item.id, element }),
            draggable({
                element: dragHandle,
                getInitialData: () => data,
                onGenerateDragPreview({ nativeSetDragImage }) {
                    setCustomNativeDragPreview({
                        nativeSetDragImage,
                        getOffset: pointerOutsideOfPreview({
                            x: '16px',
                            y: '8px',
                        }),
                        render({ container }) {
                            setDraggableState({ type: 'preview', container });

                            return () => setDraggableState(draggingState);
                        },
                    });
                },
                onDragStart() {
                    setDraggableState(draggingState);
                },
                onDrop() {
                    setDraggableState(idleState);
                },
            }),
            dropTargetForElements({
                element,
                canDrop({ source }) {
                    return isItemData(source.data) && source.data.instanceId === instanceId;
                },
                getData({ input }) {
                    return attachClosestEdge(data, {
                        element,
                        input,
                        allowedEdges: ['top', 'bottom'],
                    });
                },
                onDragEnter: onChange,
                onDrag: onChange,
                onDragLeave() {
                    setClosestEdge(null);
                },
                onDrop() {
                    setClosestEdge(null);
                },
            })
        );
    }, [instanceId, item, index, registerItem]);

    return (
        <Fragment>
            {index != 0 && (
                <div className='h-[1px] bg-border' />
            )}
            <div
                ref={ref}
                className={cn(
                    "relative bg-card text-card-foreground origin-center",
                    draggableState.type === 'dragging' && "opacity-40 z-50"
                )}
            >
                <div className="flex items-center gap-3 p-4">
                    <div
                        ref={dragHandleRef}
                        className="cursor-grab active:cursor-grabbing p-2"
                        aria-label={`Reorder ${item.label}`}
                    >
                        <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="flex-1 truncate">
                        {item.label}
                        {Content && <Content item={{
                            ...item,
                            closestEdge,
                            draggableState
                        }} />}
                    </div>
                </div>
                {closestEdge && (
                    <div className="absolute left-0 right-0 h-0.5 bg-primary rounded-full z-50"
                        style={{
                            [closestEdge]: "-1.5px"
                        }}
                    />
                )}
            </div>
            {draggableState.type === 'preview' &&
                ReactDOM.createPortal(
                    <div className="px-4 py-2 bg-popover text-popover-foreground border border-border rounded-md shadow-md max-w-sm truncate">
                        {item.label}
                    </div>,
                    draggableState.container,
                )}
        </Fragment>
    );
}

// Export the context and hook for custom list items
export { useListContext, type ItemPosition };
