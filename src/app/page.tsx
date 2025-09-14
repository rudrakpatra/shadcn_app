import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ViewTransitionLink } from "@/components/view-transition/view-transition-link";
import { ViewTransitions } from "@/components/view-transition/view-transition-types";


export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <ThemeSwitcher />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Next.js + shadcn/ui
          </h1>
          <p className="text-lg text-muted-foreground">
            A modern React application with beautiful UI components
          </p>
        </div>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Your Next.js app with shadcn/ui is ready!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You can now start building your application using the shadcn/ui components.
              Check out the components directory to see all available components.
            </p>
            <div className="flex gap-2 justify-start">
              <ViewTransitionLink href="/components" animation={ViewTransitions.Semantic.Forward}>
                <Button variant="outline">Components</Button>
              </ViewTransitionLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
