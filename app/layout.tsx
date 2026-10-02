import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const appFont = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixora - Design Interfaces Faster with AI",
  description:
    "Generate creative UI mockups, prototypes, and design concepts instantly with Pixora. Build modern digital experiences from simple ideas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${appFont.className}`}
        suppressHydrationWarning
      >
        <Provider>
          <body className="min-h-full flex flex-col">{children}</body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
