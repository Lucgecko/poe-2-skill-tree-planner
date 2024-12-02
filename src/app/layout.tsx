import "./globals.css";
import { NodesProvider } from "../contexts/NodesContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NodesProvider>{children}</NodesProvider>
      </body>
    </html>
  );
}