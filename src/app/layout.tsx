import { AppState } from "@/context/appState";
import "./globals.css";
import Link from "next/link";
import { Package2Icon } from "@/lib/utilsUi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppState>
        <head />
        <body>
          <div className="flex flex-col h-screen">
            <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
              <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                  className="flex items-center gap-2 text-lg font-semibold md:text-base"
                  href="#"
                >
                  <Package2Icon className="w-6 h-6" />
                  <span className="sr-only">PBIS</span>
                </Link>
              </nav>
            </header>

            <div className="flex flex-col h-screen">{children}</div>
          </div>
        </body>
      </AppState>
    </html>
  );
}
