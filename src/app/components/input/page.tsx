"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InputPage() {
    const [inputValue, setInputValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Input Components</h1>
                <p className="text-muted-foreground">
                    Various input types and variants using shadcn/ui Input components.
                </p>
            </div>

            {/* Basic Inputs */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Basic Inputs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Default Input</CardTitle>
                            <CardDescription>Standard input field with placeholder</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="default">Default Input</Label>
                                <Input
                                    id="default"
                                    placeholder="Enter your text here..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="disabled">Disabled Input</Label>
                                <Input
                                    id="disabled"
                                    placeholder="This input is disabled"
                                    disabled
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Input with Label</CardTitle>
                            <CardDescription>Input fields with proper labels</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="johndoe"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Input Types */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Input Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Text Inputs</CardTitle>
                            <CardDescription>Different text input variations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="text">Text Input</Label>
                                <Input
                                    id="text"
                                    type="text"
                                    placeholder="Enter text"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="search">Search Input</Label>
                                <Input
                                    id="search"
                                    type="search"
                                    placeholder="Search..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="url">URL Input</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Specialized Inputs</CardTitle>
                            <CardDescription>Inputs for specific data types</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Input</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password Input</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={passwordValue}
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="number">Number Input</Label>
                                <Input
                                    id="number"
                                    type="number"
                                    placeholder="123"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Input Variants */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Input Variants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Input Sizes</CardTitle>
                            <CardDescription>Different input sizes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="small">Small Input</Label>
                                <Input
                                    id="small"
                                    className="h-8"
                                    placeholder="Small input"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="default-size">Default Input</Label>
                                <Input
                                    id="default-size"
                                    placeholder="Default input"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="large">Large Input</Label>
                                <Input
                                    id="large"
                                    className="h-12"
                                    placeholder="Large input"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Interactive Input States</CardTitle>
                            <CardDescription>Click buttons to see animated state changes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="error">Error State</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowError(!showError)}
                                    >
                                        {showError ? "Hide" : "Show"} Error
                                    </Button>
                                </div>
                                <Input
                                    id="error"
                                    className={`transition-colors ${showError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="Error state"
                                />
                                <AnimatePresence>
                                    {showError && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, y: -10 }}
                                            animate={{ opacity: 1, height: "auto", y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -10 }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm text-red-500">This field has an error</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="success">Success State</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowSuccess(!showSuccess)}
                                    >
                                        {showSuccess ? "Hide" : "Show"} Success
                                    </Button>
                                </div>
                                <Input
                                    id="success"
                                    className={`transition-colors ${showSuccess ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                                    placeholder="Success state"
                                />
                                <AnimatePresence>
                                    {showSuccess && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, y: -10 }}
                                            animate={{ opacity: 1, height: "auto", y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -10 }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm text-green-500">This field is valid</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="warning">Warning State</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowWarning(!showWarning)}
                                    >
                                        {showWarning ? "Hide" : "Show"} Warning
                                    </Button>
                                </div>
                                <Input
                                    id="warning"
                                    className={`transition-colors ${showWarning ? "border-yellow-500 focus-visible:ring-yellow-500" : ""}`}
                                    placeholder="Warning state"
                                />
                                <AnimatePresence>
                                    {showWarning && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, y: -10 }}
                                            animate={{ opacity: 1, height: "auto", y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -10 }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm text-yellow-500">Please review this field</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Input with Icons */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Input with Icons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Icon Inputs</CardTitle>
                            <CardDescription>Inputs with leading and trailing icons</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="search-icon">Search with Icon</Label>
                                <div className="relative">
                                    <svg
                                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <Input
                                        id="search-icon"
                                        className="pl-10"
                                        placeholder="Search..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email-icon">Email with Icon</Label>
                                <div className="relative">
                                    <svg
                                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                    <Input
                                        id="email-icon"
                                        className="pl-10"
                                        type="email"
                                        placeholder="Enter email"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Input with Actions</CardTitle>
                            <CardDescription>Inputs with buttons or actions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="clearable">Clearable Input</Label>
                                <div className="relative">
                                    <Input
                                        id="clearable"
                                        placeholder="Type something..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    {inputValue && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                                            onClick={() => setInputValue("")}
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="with-button">Input with Button</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id="with-button"
                                        placeholder="Enter code"
                                        className="flex-1"
                                    />
                                    <Button type="button">Submit</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Form Example */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Form Example</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Form</CardTitle>
                        <CardDescription>Example form using various input types</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email</Label>
                            <Input
                                id="contactEmail"
                                type="email"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Input
                                id="message"
                                placeholder="Your message here..."
                            />
                        </div>
                        <Button className="w-full">Send Message</Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
