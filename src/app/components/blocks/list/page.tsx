'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { List, ListItem, type Item } from '@/components/blocks/list/list';

const defaultItems: Item[] = [
    {
        id: 'task-1',
        label: 'Organize a team-building event',
    },
    {
        id: 'task-2',
        label: 'Create and maintain office inventory',
    },
    {
        id: 'task-3',
        label: 'Update company website content',
    },
    {
        id: 'task-4',
        label: 'Plan and execute marketing campaigns',
    },
    {
        id: 'task-5',
        label: 'Coordinate employee training sessions',
    },
    {
        id: 'task-6',
        label: 'Manage facility maintenance',
    },
    {
        id: 'task-7',
        label: 'Organize customer feedback surveys',
    },
    {
        id: 'task-8',
        label: 'Coordinate travel arrangements',
    },
];

const projectItems: Item[] = [
    {
        id: 'project-1',
        label: 'Mobile App Redesign',
    },
    {
        id: 'project-2',
        label: 'API Documentation',
    },
    {
        id: 'project-3',
        label: 'User Analytics Dashboard',
    },
    {
        id: 'project-4',
        label: 'Payment Integration',
    },
];

export default function ListPage() {
    const [items, setItems] = useState(defaultItems);
    const [projects, setProjects] = useState(projectItems);

    const handleReorder = (newItems: Item[]) => {
        setItems(newItems);
    };

    const handleProjectReorder = (newProjects: Item[]) => {
        setProjects(newProjects);
    };

    const handleDelete = (itemId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const handleProjectDelete = (itemId: string) => {
        setProjects(prevProjects => prevProjects.filter(project => project.id !== itemId));
    };

    const resetItems = () => {
        setItems(defaultItems);
        setProjects(projectItems);
    };

    return (
        <div className="container mx-auto p-4 sm:p-5 md:p-6 lg:p-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">List & Item Components</h1>
                <p className="text-muted-foreground">
                    Sortable lists with drag & drop functionality using shadcn/ui Card components.
                </p>
            </div>

            <div className="flex justify-end">
                <Button onClick={resetItems} variant="outline">
                    Reset Lists
                </Button>
            </div>

            {/* Basic List Example */}
            <section className="space-y-4">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Basic Sortable List</h2>
                    <p className="text-muted-foreground">
                        A simple list with drag & drop reordering. Grab the drag handle to reorder items, or drag to the delete zone at the bottom of the screen to remove items.
                    </p>
                </div>
                <List
                    items={items}
                    onReorder={handleReorder}
                    onDelete={handleDelete}
                />

            </section>

            {/* Custom List Items */}
            <section className="space-y-4">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Custom List Items</h2>
                    <p className="text-muted-foreground">
                        List with custom rendering using the ListItem component with additional content. Drag to the delete zone to remove items.
                    </p>
                </div>
                <List
                    items={projects}
                    onReorder={handleProjectReorder}
                    onDelete={handleProjectDelete}
                    renderItem={(item, index) => (
                        <ListItem item={item} index={index} Content={() => (
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Status: In Progress
                                </p>
                            </div>
                        )} />
                    )}
                />
            </section>

            {/* Features */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Drag & Drop</CardTitle>
                            <CardDescription>
                                Intuitive drag and drop reordering with visual feedback
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm space-y-1">
                                <li>• Visual drop indicators</li>
                                <li>• Smooth animations</li>
                                <li>• Accessible drag handles</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Customizable</CardTitle>
                            <CardDescription>
                                Flexible rendering with custom item components
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm space-y-1">
                                <li>• Custom item rendering</li>
                                <li>• Configurable styling</li>
                                <li>• Avatar and badge support</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Accessible</CardTitle>
                            <CardDescription>
                                Built with accessibility in mind
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm space-y-1">
                                <li>• Screen reader support</li>
                                <li>• Keyboard navigation</li>
                                <li>• Live region announcements</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Drag to Delete</CardTitle>
                            <CardDescription>
                                Drag items to the delete zone at the bottom of the screen
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm space-y-1">
                                <li>• Fixed delete zone at bottom center</li>
                                <li>• Visual feedback on hover</li>
                                <li>• Intuitive drop-to-delete pattern</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Usage Example */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Usage</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Usage</CardTitle>
                        <CardDescription>
                            Import and use the List component with your data
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted text-muted-foreground p-4 rounded-lg text-sm overflow-x-auto">
                            <code className="text-foreground">{`import { List, ListItem } from '@/components/blocks/list';

const items = [
  { id: '1', label: 'First item' },
  { id: '2', label: 'Second item' },
  { id: '3', label: 'Third item' },
];

function MyList() {
  const [listItems, setListItems] = useState(items);
  
  return (
    <List
      items={listItems}
      onReorder={setListItems}
    />
  );
}`}</code>
                        </pre>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
