import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ViewTransitionLink } from "@/components/view-transition/view-transition-link";
import { ViewTransitions } from "@/components/view-transition/view-transition-types";

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
                        <CardTitle>List & Item</CardTitle>
                        <CardDescription>
                            Sortable lists with drag & drop functionality, virtualization, and custom rendering
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Drag & drop reordering with visual feedback</p>
                                <p>• Customizable item rendering with shadcn/ui Cards</p>
                                <p>• Accessible drag handles and keyboard navigation</p>
                                <p>• Avatar and badge support</p>
                            </div>
                        </div>
                        <ViewTransitionLink href="/components/blocks/list" animation={ViewTransitions.Semantic.Forward}>
                            <Button className="w-full" size="sm">
                                View List Examples
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </ViewTransitionLink>
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
            </div>
        </div>
    );
}
