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
    useLayoutEffect,
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
import { Button } from '@/components/ui/button';
import { GripVertical } from 'lucide-react';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';

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
    renderItem?: (item: Item, index: number) => React.ReactNode;
    className?: string;
}

export function List({
    items: initialItems,
    onReorder,
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
    const [itemPositions, setItemPositions] = useState<Map<string, number>>(new Map());

    // Isolated instances of this component from one another
    const [instanceId] = useState(() => Symbol('instance-id'));

    // Update items when prop changes
    useEffect(() => {
        setListState(prev => ({ ...prev, items: initialItems }));
    }, [initialItems]);

    // Capture positions before reorder
    const capturePositions = useCallback(() => {
        const newPositions = new Map<string, number>();
        items.forEach((item) => {
            const element = registry.getElement(item.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                newPositions.set(item.id, rect.top);
            }
        });
        setItemPositions(newPositions);
    }, [items, registry]);

    // Animate to new positions
    const animateToNewPositions = useCallback(() => {

        items.forEach((item) => {
            const element = registry.getElement(item.id);
            if (element) {
                const oldY = itemPositions.get(item.id);
                const newRect = element.getBoundingClientRect();
                const newY = newRect.top;

                if (oldY !== undefined && oldY !== newY) {
                    const deltaY = oldY - newY;

                    // Set initial position
                    element.style.transform = `translateY(${deltaY}px)`;
                    element.style.transition = 'none';

                    // Force reflow
                    element.offsetHeight;

                    // Animate to final position
                    element.style.transition = 'transform 300ms cubic-bezier(0.2, 0, 0.2, 1)';
                    element.style.transform = 'translateY(0px)';
                }
            }
        });

        setTimeout(() => {
            // Clean up transforms
            items.forEach((item) => {
                const element = registry.getElement(item.id);
                if (element) {
                    element.style.transform = '';
                    element.style.transition = '';
                }
            });
        }, 300);
    }, [items, itemPositions, registry]);

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

            // Capture current positions before reordering
            capturePositions();

            setListState((listState) => {
                const item = listState.items[startIndex];
                const newItems = reorder({
                    list: listState.items,
                    startIndex,
                    finishIndex,
                });

                // Defer the onReorder callback to avoid setState during render
                if (onReorder) {
                    setTimeout(() => onReorder(newItems), 0);
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
        [onReorder, capturePositions],
    );

    // Trigger animation after items change
    useLayoutEffect(() => {
        if (lastCardMoved !== null) {
            animateToNewPositions();
        }
    }, [lastCardMoved, animateToNewPositions]);

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

    const contextValue: ListContextValue = useMemo(() => {
        return {
            registerItem: registry.register,
            reorderItem,
            instanceId,
            getListLength,
        };
    }, [registry.register, reorderItem, instanceId, getListLength]);

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
        </ListContext.Provider>
    );
}

interface ListItemProps {
    item: Item;
    index: number;
    children?: React.ReactNode;
}

export function ListItem({ item, index, children }: ListItemProps) {
    const { registerItem, instanceId } = useListContext();

    const ref = useRef<HTMLDivElement>(null);
    const dragHandleRef = useRef<HTMLButtonElement>(null);

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
            }),
        );
    }, [instanceId, item, index, registerItem]);

    return (
        <Fragment>
            <div
                ref={ref}
                className={cn(
                    "relative bg-card text-card-foreground border-b last:border-b-0 border-border transition-colors",
                    draggableState.type === 'dragging' && "opacity-40 z-50"
                )}
            >
                <div className="flex items-center gap-3 p-4">
                    <Button
                        ref={dragHandleRef}
                        variant="ghost"
                        size="sm"
                        className="cursor-grab active:cursor-grabbing"
                        aria-label={`Reorder ${item.label}`}
                        type="button"
                    >
                        <GripVertical className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 truncate">
                        {item.label}
                        {children}
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
