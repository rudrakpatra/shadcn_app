import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ViewTransitionLink } from "@/components/view-transition/view-transition-link";
import { ViewTransitions } from "@/components/view-transition/view-transition-types";

const components = [
    {
        name: "Button",
        description: "Displays a button or a component that looks like a button.",
        href: "/components/button",
        status: "Available",
        category: "Actions"
    },
    {
        name: "Card",
        description: "Displays a card with header, content, and footer.",
        href: "/components/card",
        status: "Available",
        category: "Layout"
    },
    {
        name: "Dialog",
        description: "A window overlaid on either the primary window or another dialog window.",
        href: "/components/dialog",
        status: "Available",
        category: "Overlay"
    },
    {
        name: "Form",
        description: "Building forms with React Hook Form and Zod validation.",
        href: "/components/form",
        status: "Available",
        category: "Forms"
    },
    {
        name: "Input",
        description: "Displays a form input field or a component that looks like an input field.",
        href: "/components/input",
        status: "Available",
        category: "Forms"
    },
    {
        name: "Label",
        description: "Renders an accessible label associated with controls.",
        href: "/components/label",
        status: "Available",
        category: "Forms"
    },
    {
        name: "VisualViewportView",
        description: "A div that resizes based on the visual viewport. Perfect for mobile keyboards and responsive layouts.",
        href: "/components/visual-viewport",
        status: "Available",
        category: "Views"
    },
    {
        name: "Blocks",
        description: "Complex UI components and layouts for building rich user interfaces.",
        href: "/components/blocks",
        status: "Available",
        category: "Blocks"
    },
];

const categories = [...new Set(components.map(component => component.category))];

export default function ComponentsPage() {
    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Components
                </h1>
                <p className="text-lg text-muted-foreground">
                    Browse and explore all available shadcn/ui components with detailed examples and documentation.
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Available Components ({components.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {components.map((component) => (
                        <Card key={component.name} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{component.name}</CardTitle>
                                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                                        {component.status}
                                    </span>
                                </div>
                                <CardDescription>{component.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        {component.category}
                                    </span>
                                    <ViewTransitionLink href={component.href} animation={ViewTransitions.Semantic.Forward}>
                                        <Button size="sm" variant="outline">
                                            View Examples
                                        </Button>
                                    </ViewTransitionLink>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Categories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => {
                        const categoryComponents = components.filter(c => c.category === category);
                        return (
                            <Card key={category}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">{category}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {categoryComponents.length} component{categoryComponents.length !== 1 ? 's' : ''}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>
                        Learn how to use these components in your project
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Each component page includes detailed examples, usage patterns, and code snippets.
                        Click on any component above to see interactive examples and learn how to implement them.
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            View Docs
                        </Button>
                        <Button>
                            Start Building
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
