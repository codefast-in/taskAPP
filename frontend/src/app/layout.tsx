import type {Metadata} from "next";
import {Sen} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/toaster";
import {Bricolage_Grotesque} from "next/font/google";
import {Space_Mono} from "next/font/google";

import "./globals.css";
import StoreProvider from "@/reduxconfig/StoreProvider";

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: "400",
});
export const metadata: Metadata = {
  title: "Task App",
  description: "Worked by Sachin & Dharmendra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen  antialiased flex justify-center items-center",

          fontHeading.variable,
          fontBody.variable
        )}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
