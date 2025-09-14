"use client";

import { ViewTransitionLink } from "@/components/view-transition/view-transition-link";
import { ViewTransitions } from "@/components/view-transition/view-transition-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VisualViewportPage() {

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    VisualViewportView Component
                </h1>
                <p className="text-lg text-muted-foreground">
                    A div that resizes based on the visual viewport. Perfect for mobile keyboards, virtual keyboards, and responsive layouts.
                </p>
            </div>

            <div className="space-y-8">
                {/* Chat Demo */}
                <Card>
                    <CardHeader>
                        <CardTitle>Chat Demo</CardTitle>
                        <CardDescription>
                            Chat interface that adapts to mobile keyboard behavior with VisualViewportView
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Mobile Keyboard Behavior</h3>
                            <p className="text-sm text-muted-foreground">
                                Click the button below to see how the chat interface stays above the keyboard when the input is focused.
                            </p>
                        </div>

                        <ViewTransitionLink href="/components/visual-viewport/chat-demo" animation={ViewTransitions.Semantic.Forward}>
                            <Button variant="outline">Open Chat Demo</Button>
                        </ViewTransitionLink>
                    </CardContent>
                </Card>

                {/* Code Example */}
                <Card>
                    <CardHeader>
                        <CardTitle>Code Example</CardTitle>
                        <CardDescription>
                            How to use the VisualViewportView component
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{`import { VisualViewportView } from "@/components/ui/views/visual-viewport-view"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SimpleChat() {
  const [message, setMessage] = useState("")
  
  return (
    <VisualViewportView 
      className="bg-background flex flex-col h-full"
      debug={false}
      immediatelyRender={false}
    >
      <div className="flex-1 p-4 space-y-2">
        <div className="bg-card p-2 rounded text-sm">
          Hello! 👋
        </div>
        <div className="bg-primary text-primary-foreground p-2 rounded text-sm ml-auto w-fit">
          Hi there!
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1" 
          />
          <Button size="sm" onClick={() => setMessage("")}>
            Send
          </Button>
        </div>
      </div>
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
