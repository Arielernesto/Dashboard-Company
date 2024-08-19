import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AuthSessionProvider from "@/store/AuthSessionProvider";


export const metadata: Metadata = {
  title: "Dahsboard Companies | ExoCode",
  description: "My Admin Dashboard for practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body>
      <AuthSessionProvider>
        <ThemeProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange>
        {children}
        <Toaster />
        </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
