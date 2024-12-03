"use client"
import "./globals.css";
import { NodesProvider } from "../contexts/NodesContext";
import { AscendancyProvider } from "@/contexts/AscendancyContext";
import { HoverProvider } from "@/contexts/HoverContext";
import { AllNodesProvider } from "@/contexts/AllNodesContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AllNodesProvider>
          <HoverProvider>
            <NodesProvider>
              <AscendancyProvider>
              {children}
              </AscendancyProvider>
            </NodesProvider>
          </HoverProvider>
        </AllNodesProvider>
      </body>
    </html>
  );
}