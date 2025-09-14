import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ButtonPage() {
    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Button Component
                </h1>
                <p className="text-lg text-muted-foreground">
                    Displays a button or a component that looks like a button. Supports various variants, sizes, and states.
                </p>
            </div>

            <div className="space-y-8">
                {/* Variants */}
                <Card>
                    <CardHeader>
                        <CardTitle>Variants</CardTitle>
                        <CardDescription>
                            Different visual styles for different use cases
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Default Variants</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button>Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="link">Link</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">With Icons</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Item
                                </Button>
                                <Button variant="outline">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View
                                </Button>
                                <Button variant="destructive">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sizes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sizes</CardTitle>
                        <CardDescription>
                            Different sizes for different contexts
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Size Variants</h3>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button size="sm">Small</Button>
                                <Button size="default">Default</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Icon Only Buttons</h3>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button size="sm" variant="outline">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </Button>
                                <Button size="default" variant="outline">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </Button>
                                <Button size="lg" variant="outline">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* States */}
                <Card>
                    <CardHeader>
                        <CardTitle>States</CardTitle>
                        <CardDescription>
                            Different states for user interaction feedback
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Interactive States</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button>Normal</Button>
                                <Button disabled>Disabled</Button>
                                <Button className="hover:bg-primary/90">Custom Hover</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Loading State</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button disabled>
                                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Usage Examples */}
                <Card>
                    <CardHeader>
                        <CardTitle>Usage Examples</CardTitle>
                        <CardDescription>
                            Common patterns and use cases
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Action Buttons</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button>Save Changes</Button>
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive">Delete Account</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Navigation Buttons</h3>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="outline">
                                    <ChevronLeftIcon className="w-4 h-4" />
                                    Previous
                                </Button>
                                <Button variant="outline">
                                    Next
                                    <ChevronRightIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Full Width Buttons</h3>
                            <div className="space-y-2">
                                <Button className="w-full">Sign In</Button>
                                <Button variant="outline" className="w-full">Create Account</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Code Example */}
                <Card>
                    <CardHeader>
                        <CardTitle>Code Example</CardTitle>
                        <CardDescription>
                            How to use the Button component in your code
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`}</code>
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
