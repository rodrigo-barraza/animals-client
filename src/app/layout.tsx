import { Inter } from "next/font/google";
import {
  ComponentsProvider,
  ThemeProvider,
  generateThemeInitScript,
} from "@rodrigo-barraza/components-library";
import "./globals.css";
import SessionTrackerComponent from "@/components/SessionTrackerComponent";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Animals — Wildlife Species Tracker",
  description:
    "Wildlife species catalog and sighting tracker — species encyclopedia, sightings, habitats, and conservation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <template
          dangerouslySetInnerHTML={{
            __html: `<script>${generateThemeInitScript("animals:theme")}</script>`,
          }}
          suppressHydrationWarning
        />
      </head>
      <body className={inter.variable}>
        <ThemeProvider storageKey="animals:theme">
          <ComponentsProvider>
            {children}
            <SessionTrackerComponent />
          </ComponentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
