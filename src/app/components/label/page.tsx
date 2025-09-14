import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LabelPage() {
    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Label Components</h1>
                <p className="text-muted-foreground">
                    Various label examples and use cases using shadcn/ui Label components.
                </p>
            </div>

            {/* Basic Labels */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Basic Labels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Simple Labels</CardTitle>
                            <CardDescription>Basic label usage with form inputs</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Enter your password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="Enter your full name" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Required Labels</CardTitle>
                            <CardDescription>Labels with required indicators</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="required-email">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input id="required-email" type="email" placeholder="Required field" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="required-name">
                                    Name <span className="text-red-500">*</span>
                                </Label>
                                <Input id="required-name" placeholder="Required field" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="optional-field">Optional Field</Label>
                                <Input id="optional-field" placeholder="This field is optional" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Label with Different Input Types */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Labels with Different Input Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Text Inputs</CardTitle>
                            <CardDescription>Labels with various text input types</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="text-input">Text Input</Label>
                                <Input id="text-input" type="text" placeholder="Enter text" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="search-input">Search Input</Label>
                                <Input id="search-input" type="search" placeholder="Search..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="url-input">URL Input</Label>
                                <Input id="url-input" type="url" placeholder="https://example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="number-input">Number Input</Label>
                                <Input id="number-input" type="number" placeholder="123" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Textarea</CardTitle>
                            <CardDescription>Labels with textarea inputs</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Enter your message here..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter a description..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Labels with Form Controls */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Labels with Form Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Checkboxes</CardTitle>
                            <CardDescription>Labels with checkbox controls</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">I agree to the terms and conditions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="newsletter" />
                                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="notifications" />
                                <Label htmlFor="notifications">Enable notifications</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Radio Groups</CardTitle>
                            <CardDescription>Labels with radio button groups</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Gender</Label>
                                <RadioGroup defaultValue="male">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="male" id="male" />
                                        <Label htmlFor="male">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="female" id="female" />
                                        <Label htmlFor="female">Female</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="other" id="other" />
                                        <Label htmlFor="other">Other</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-2">
                                <Label>Experience Level</Label>
                                <RadioGroup defaultValue="intermediate">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="beginner" id="beginner" />
                                        <Label htmlFor="beginner">Beginner</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="intermediate" id="intermediate" />
                                        <Label htmlFor="intermediate">Intermediate</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="advanced" id="advanced" />
                                        <Label htmlFor="advanced">Advanced</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Labels with Switches and Selects */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Labels with Switches and Selects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Switches</CardTitle>
                            <CardDescription>Labels with switch controls</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="dark-mode">Dark Mode</Label>
                                <Switch id="dark-mode" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="notifications-switch">Notifications</Label>
                                <Switch id="notifications-switch" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="auto-save">Auto Save</Label>
                                <Switch id="auto-save" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Select Dropdowns</CardTitle>
                            <CardDescription>Labels with select controls</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                        <SelectItem value="ca">Canada</SelectItem>
                                        <SelectItem value="au">Australia</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                        <SelectItem value="de">German</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Label Styling Variants */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Label Styling Variants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Label Sizes</CardTitle>
                            <CardDescription>Different label sizes and styles</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="small-label" className="text-sm">Small Label</Label>
                                <Input id="small-label" placeholder="Small label input" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="default-label">Default Label</Label>
                                <Input id="default-label" placeholder="Default label input" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="large-label" className="text-lg">Large Label</Label>
                                <Input id="large-label" placeholder="Large label input" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Label Colors</CardTitle>
                            <CardDescription>Labels with different color variants</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="default-color">Default Label</Label>
                                <Input id="default-color" placeholder="Default color" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="primary-color" className="text-primary">Primary Label</Label>
                                <Input id="primary-color" placeholder="Primary color" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="muted-color" className="text-muted-foreground">Muted Label</Label>
                                <Input id="muted-color" placeholder="Muted color" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Complex Form Example */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Complex Form Example</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>User Profile Form</CardTitle>
                        <CardDescription>Complete form showcasing various label and input combinations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">
                                    First Name <span className="text-red-500">*</span>
                                </Label>
                                <Input id="first-name" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">
                                    Last Name <span className="text-red-500">*</span>
                                </Label>
                                <Input id="last-name" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about yourself..."
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Country</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="au">Australia</SelectItem>
                                    <SelectItem value="de">Germany</SelectItem>
                                    <SelectItem value="fr">France</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <Label>Preferences</Label>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="newsletter-pref" />
                                    <Label htmlFor="newsletter-pref">Subscribe to newsletter</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="marketing-pref" />
                                    <Label htmlFor="marketing-pref">Receive marketing emails</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="updates-pref" />
                                    <Label htmlFor="updates-pref">Get product updates</Label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label>Notification Settings</Label>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="email-notifications">Email Notifications</Label>
                                    <Switch id="email-notifications" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="push-notifications">Push Notifications</Label>
                                    <Switch id="push-notifications" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                                    <Switch id="sms-notifications" />
                                </div>
                            </div>
                        </div>

                        <Button className="w-full">Save Profile</Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
