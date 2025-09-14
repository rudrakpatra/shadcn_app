import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/view-transition/view-transition-layout.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DynamicThemeColor } from "@/components/dynamic-theme-color";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <DynamicThemeColor
            initialColor="#171717"
            fallbackColor="#171717"
            storageKey="shadcn-ui-theme"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* Service Worker is disabled in development mode */}
            <ServiceWorkerRegistration />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
