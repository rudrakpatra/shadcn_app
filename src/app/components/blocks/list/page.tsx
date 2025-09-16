import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ListPage() {
    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    List Component Examples
                </h1>
                <p className="text-lg text-muted-foreground">
                    Explore different configurations and use cases of the sortable List component.
                </p>
            </div>

            <div className="space-y-8">
                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Simple List */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Simple List
                            </CardTitle>
                            <CardDescription>
                                Basic list with 4 items, full features enabled
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Drag handles, checkboxes, delete buttons</p>
                                <p>• Perfect for small lists with rich interactions</p>
                                <p>• No virtualization needed</p>
                                <p>• Full control over UI elements</p>
                            </div>
                            <Link href="/components/blocks/list/simple">
                                <Button className="w-full">
                                    View Simple List
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Virtualized List */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Virtualized List
                            </CardTitle>
                            <CardDescription>
                                Large dataset (100 items) with virtualization
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Optimized performance for large datasets</p>
                                <p>• Uses react-tiny-virtual-list</p>
                                <p>• Minimal UI for better performance</p>
                                <p>• Swipe to delete functionality</p>
                            </div>
                            <Link href="/components/blocks/list/virtualized">
                                <Button className="w-full">
                                    View Virtualized List
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Custom List */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Custom List
                            </CardTitle>
                            <CardDescription>
                                Custom item rendering with task-style layout
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Complete control over item rendering</p>
                                <p>• Inline editing capabilities</p>
                                <p>• Task management style UI</p>
                                <p>• Custom styling and behavior</p>
                            </div>
                            <Link href="/components/blocks/list/custom">
                                <Button className="w-full">
                                    View Custom List
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}