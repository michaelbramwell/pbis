"use client";

import { Calendar } from "@/components/ui/calendar";
import { Defaults } from "@/components/console/scheduler/defaults";

export default function Page() {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <section>
        <Defaults></Defaults>
      </section>
      <section>
        <Calendar></Calendar>
      </section>
    </main>
  );
}
