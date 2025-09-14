import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/view-transition/view-transition-layout.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DynamicThemeColor } from "@/components/dynamic-theme-color";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { ViewTransitions } from "next-view-transitions";
import { Metadata, Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "shadcn/ui",
  description: "A modern React application with beautiful UI components",
};


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
          <link rel="icon" type="image/png" sizes="196x196" href="/favicon-196.png" />
          <link rel="apple-touch-icon" href="/apple-icon-180.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
