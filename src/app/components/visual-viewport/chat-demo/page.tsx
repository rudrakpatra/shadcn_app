"use client";

import { Button } from "@/components/ui/button";
import { VisualViewportView } from "@/components/ui/views/visual-viewport-view";
import { Fab } from "@/components/ui/fab";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ViewTransitionLink } from "@/components/view-transition/view-transition-link";
import { ViewTransitions } from "@/components/view-transition/view-transition-types";
import { motion } from "framer-motion";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export default function ChatDemoPage() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hey! 👋 How are you?", isUser: false, timestamp: new Date() },
        { id: "2", text: "Hi! I'm good, thanks. How about you?", isUser: true, timestamp: new Date() },
        { id: "3", text: "Doing well! Are you coming to the meeting later?", isUser: false, timestamp: new Date() },
        { id: "4", text: "Yes, I'll be there at 3pm. Do you need anything prepared?", isUser: true, timestamp: new Date() },
        { id: "5", text: "Just bring the project update. 😊", isUser: false, timestamp: new Date() },
    ]);
    const [animateMessageId, setAnimateMessageId] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (!scrollContainerRef.current) return;
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: message.trim(),
                isUser: true,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, newMessage]);
            setAnimateMessageId(newMessage.id);
            setMessage("");

            // Clear animation trigger after animation completes
            setTimeout(() => {
                setAnimateMessageId(null);
            }, 500);
        }
    };

    return (
        <VisualViewportView
            className="bg-muted"
            debug={false}
            immediatelyRender={false}
        >
            <div className="flex flex-col h-full">
                <ViewTransitionLink href="/components/visual-viewport" animation={ViewTransitions.Semantic.Backward}>
                    <Button variant="ghost" className="p-4">
                        ← Back to VisualViewportView
                    </Button>
                </ViewTransitionLink>
                <div ref={scrollContainerRef} className="p-4 flex-1 space-y-4 overflow-y-auto">
                    {messages.map((msg, index) => {
                        const shouldAnimate = animateMessageId === msg.id;

                        return (
                            <motion.div
                                key={msg.id}
                                initial={shouldAnimate ? {
                                    opacity: 0,
                                    y: 20,
                                    scale: 0.8,
                                    x: msg.isUser ? 20 : -20
                                } : {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    x: 0
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    x: 0
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25,
                                    duration: 0.4
                                }}
                                className={`relative p-3 rounded-lg w-fit max-w-2/3 ${msg.isUser
                                    ? "bg-primary text-primary-foreground ml-auto"
                                    : "bg-card"
                                    }`}
                            >
                                <p className="text-sm relative z-10">{msg.text}</p>
                                {/* Chat bubble tail */}
                                <div
                                    className={`absolute w-0 h-0 z-0
                                        ${msg.isUser
                                            ? "bottom-[-5px] right-[-8px] border-l-[25px] border-l-primary border-t-[25px] border-t-transparent rotate-30"
                                            : "bottom-[-5px] left-[-8px] border-r-[25px] border-r-card border-t-[25px] border-t-transparent -rotate-30"
                                        }`}
                                />
                            </motion.div>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2 bg-card px-4 pt-2 pb-4 rounded-none border-t border-border">
                    <Input
                        ref={inputRef}
                        value={message}
                        placeholder="Type a message..."
                        className="flex-1"
                        onChange={(e) => setMessage(e.target.value)}
                        enterKeyHint="send"
                        type="search" // prevent showing password, card info and location suggestions
                        // global css to disable search clear icon
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                    />
                    <Fab
                        className="shadow-lg rounded-sm"
                        size="sm"
                        onPointerDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            sendMessage();
                        }}
                    >
                        <Send className="w-6 h-6" />
                    </Fab>
                </div>
            </div>
        </VisualViewportView>
    );
}
