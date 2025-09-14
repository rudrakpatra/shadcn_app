"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogPage() {
    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                    Dialog Component
                </h1>
                <p className="text-lg text-muted-foreground">
                    A window overlaid on either the primary window or another dialog window. Perfect for modals, forms, and confirmations.
                </p>
            </div>

            <div className="space-y-8">
                {/* Basic Dialog */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Dialog</CardTitle>
                        <CardDescription>
                            Simple dialog with trigger button and content
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Simple Dialog</h3>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Open Dialog</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline">Cancel</Button>
                                        <Button variant="destructive">Delete</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Dialog */}
                <Card>
                    <CardHeader>
                        <CardTitle>Form Dialog</CardTitle>
                        <CardDescription>
                            Dialog containing a form with input fields
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Contact Form</h3>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Contact Us</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Contact Information</DialogTitle>
                                        <DialogDescription>
                                            Fill out the form below and we&apos;ll get back to you as soon as possible.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name" className="pb-2">
                                                Name
                                            </Label>
                                            <Input id="name" placeholder="Your name" className="flex-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="email" className="pb-2">
                                                Email
                                            </Label>
                                            <Input id="email" type="email" placeholder="your@email.com" className="flex-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="message" className="pb-2">
                                                Message
                                            </Label>
                                            <Input id="message" placeholder="Your message" className="flex-1" />
                                        </div>
                                    </div>
                                    <DialogFooter className="flex flex-row justify-end gap-2">
                                        <Button variant="outline">Cancel</Button>
                                        <Button>Send Message</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Confirmation Dialog */}
                <Card>
                    <CardHeader>
                        <CardTitle>Confirmation Dialog</CardTitle>
                        <CardDescription>
                            Dialog for confirming destructive actions
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Delete Confirmation</h3>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="destructive">Delete Item</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Delete Item</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete this item? This action cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline">Cancel</Button>
                                        <Button variant="destructive">Delete</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Information Dialog */}
                <Card>
                    <CardHeader>
                        <CardTitle>Information Dialog</CardTitle>
                        <CardDescription>
                            Dialog for displaying information or help content
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Help & Information</h3>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Help
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>How to use this feature</DialogTitle>
                                        <DialogDescription>
                                            Here&apos;s everything you need to know about this feature.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold mb-2">Getting Started</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    This feature allows you to manage your content efficiently. Follow these steps to get started.
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">Tips & Tricks</h4>
                                                <ul className="text-sm text-muted-foreground space-y-1">
                                                    <li>• Use keyboard shortcuts for faster navigation</li>
                                                    <li>• Save your work frequently</li>
                                                    <li>• Check the documentation for advanced features</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button>Got it!</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Custom Size Dialog */}
                <Card>
                    <CardHeader>
                        <CardTitle>Custom Size Dialog</CardTitle>
                        <CardDescription>
                            Dialog with custom width and height
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Fullscreen Dialog</h3>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Open Fullscreen Dialog</Button>
                                </DialogTrigger>
                                <DialogContent
                                    style={{
                                        maxWidth: '100%',
                                        height: '100%',
                                    }}
                                    className="rounded-none">
                                    <DialogHeader>
                                        <DialogTitle>Fullscreen Content Dialog</DialogTitle>
                                        <DialogDescription>
                                            This dialog has a custom maximum width to accommodate more content.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">
                                                This is an example of a dialog with custom sizing. You can adjust the maximum width
                                                and height to fit your content needs. The dialog will automatically adjust to the
                                                content size while respecting the maximum dimensions you set.
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-muted rounded-lg">
                                                    <h4 className="font-semibold mb-2">Feature 1</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Description of the first feature.
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-muted rounded-lg">
                                                    <h4 className="font-semibold mb-2">Feature 2</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Description of the second feature.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline">Close</Button>
                                        <Button>Continue</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Code Example */}
                <Card>
                    <CardHeader>
                        <CardTitle>Code Example</CardTitle>
                        <CardDescription>
                            How to use the Dialog component in your code
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{`import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            Dialog description goes here.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Your content here */}
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}</code>
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
