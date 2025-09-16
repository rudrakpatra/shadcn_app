import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlocksPage() {
    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Blocks Components
                </h1>
                <p className="text-lg text-muted-foreground">
                    Complex UI components and layouts for building rich user interfaces. Includes sortable lists, app bars, and more.
                </p>
            </div>

            <div className="space-y-8">
                {/* List Components */}
                <Card>
                    <CardHeader>
                        <CardTitle>List Components</CardTitle>
                        <CardDescription>
                            Sortable lists with drag & drop functionality, virtualization, and custom rendering
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">List Examples</h3>
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">
                                        Interactive List Demonstrations
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        Explore different configurations and use cases of the sortable List component
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                        <p>• Simple List: Basic list with 4 items, full features enabled</p>
                                        <p>• Virtualized List: Large dataset (100 items) with virtualization</p>
                                        <p>• Custom List: Custom item rendering with task-style layout</p>
                                        <p>• Interactive demos with drag & drop, selection, and deletion</p>
                                    </div>
                                    <Link href="/components/blocks/list">
                                        <Button className="w-full" size="sm">
                                            View All List Examples
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                {/* App Bar Components */}
                <Card>
                    <CardHeader>
                        <CardTitle>App Bar Components</CardTitle>
                        <CardDescription>
                            Navigation and header components for mobile and desktop applications
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Top App Bar</h3>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Responsive navigation with back button</p>
                                <p>• Theme switcher integration</p>
                                <p>• Dynamic title handling</p>
                                <p>• Mobile-optimized layout</p>
                            </div>
                            <div className="p-4 border rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">
                                    Used in list pages for consistent navigation experience
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Features */}
                <Card>
                    <CardHeader>
                        <CardTitle>Key Features</CardTitle>
                        <CardDescription>
                            Advanced functionality and capabilities of the blocks components
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Drag & Drop</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                    <p><strong>Sortable Lists:</strong> Drag to reorder items with smooth animations</p>
                                    <p><strong>Visual Feedback:</strong> Selected items show blue ring, about-to-delete items show red ring</p>
                                </div>
                                <div>
                                    <p><strong>Press Delay:</strong> 250ms delay prevents accidental drags</p>
                                    <p><strong>Drag Overlay:</strong> Smooth drag preview with scale effects</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Performance</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                    <p><strong>Virtualization:</strong> Large lists use react-tiny-virtual-list for optimal performance</p>
                                    <p><strong>Memory Efficient:</strong> Only renders visible items</p>
                                </div>
                                <div>
                                    <p><strong>Smooth Scrolling:</strong> Optimized scroll behavior with overscroll prevention</p>
                                    <p><strong>Mobile Optimized:</strong> Visual viewport support for mobile devices</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Interactions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                    <p><strong>Click to Select:</strong> Click anywhere on the item to select/deselect</p>
                                    <p><strong>Swipe to Delete:</strong> Drag horizontally more than 100px to delete items</p>
                                </div>
                                <div>
                                    <p><strong>Checkbox Selection:</strong> Traditional checkbox selection mode</p>
                                    <p><strong>Inline Editing:</strong> Custom items support inline editing</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Component Props */}
                <Card>
                    <CardTitle>Component Props</CardTitle>
                    <CardDescription>
                        Available props for List and Item components
                    </CardDescription>
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

                {/* Code Example */}
                <Card>
                    <CardHeader>
                        <CardTitle>Code Example</CardTitle>
                        <CardDescription>
                            How to use the List component in your code
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{`import { List, ListItem } from "@/components/blocks/list-item"
import { VisualViewportView } from "@/components/ui/views/visual-viewport-view"

export function ListDemo() {
  const [items, setItems] = useState<ListItem[]>([
    { id: "1", title: "Apple", description: "Red and crunchy" },
    { id: "2", title: "Banana", description: "Yellow and sweet" }
  ])

  return (
    <VisualViewportView className="p-4">
      <List
        data={items}
        onReorder={setItems}
        sortable={true}
        selectable={true}
        showDragHandle={true}
        showCheckbox={true}
        showDeleteButton={true}
      />
    </VisualViewportView>
  )
}`}</code>
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
