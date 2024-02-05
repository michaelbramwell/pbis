"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex flex-col h-screen">
      <section className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className={
              pathname === "/console"
                ? "font-bold"
                : "text-gray-500 dark:text-gray-400"
            }
            href="/console"
          >
            Dashboard
          </Link>
          <Link
            className={
              pathname === "/console/scheduler"
                ? "font-bold"
                : "text-gray-500 dark:text-gray-400"
            }
            href="/console/scheduler"
          >
            Scheduler
          </Link>
        </nav>
      </section>
      {children}
    </div>
  );
}
