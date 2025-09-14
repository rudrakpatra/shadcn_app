"use client";

import { useEffect, useState } from 'react';

export function ServiceWorkerRegistration() {
    useEffect(() => {
        // Only register service worker in production builds
        if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const registerSW = async () => {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js', {
                        scope: '/',
                    });

                    console.log('Service Worker registered successfully:', registration);

                    // Handle updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New content is available, notify user
                                    if (confirm('New version available! Reload to update?')) {
                                        window.location.reload();
                                    }
                                }
                            });
                        }
                    });

                    // Handle controller change (when SW takes control)
                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                        console.log('Service Worker controller changed');
                    });

                } catch (error) {
                    console.error('Service Worker registration failed:', error);
                }
            };

            registerSW();
        } else if (process.env.NODE_ENV === 'development') {
            console.log('Service Worker disabled in development mode');

            // Unregister any existing service workers in development
            if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then((registrations) => {
                    registrations.forEach((registration) => {
                        registration.unregister();
                        console.log('Unregistered existing service worker for development');
                    });
                });
            }
        }
    }, []);

    return null; // This component doesn't render anything
}

// Hook for checking service worker status
export function useServiceWorker() {
    const [swState, setSwState] = useState<{
        isSupported: boolean;
        isRegistered: boolean;
        isOnline: boolean;
    }>({
        isSupported: false,
        isRegistered: false,
        isOnline: navigator.onLine,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isSupported = 'serviceWorker' in navigator && process.env.NODE_ENV === 'production';

            if (isSupported) {
                navigator.serviceWorker.getRegistration().then((registration) => {
                    setSwState(prev => ({
                        ...prev,
                        isSupported: true,
                        isRegistered: !!registration,
                    }));
                });
            } else {
                // In development, set supported to false
                setSwState(prev => ({
                    ...prev,
                    isSupported: false,
                    isRegistered: false,
                }));
            }

            // Listen for online/offline events
            const handleOnline = () => setSwState(prev => ({ ...prev, isOnline: true }));
            const handleOffline = () => setSwState(prev => ({ ...prev, isOnline: false }));

            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);

            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            };
        }
    }, []);

    return swState;
}
