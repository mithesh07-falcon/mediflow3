
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-6 bg-white dark:bg-zinc-950", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-6",
        month_caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-lg"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-lg"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "grid grid-cols-7 mb-2",
        weekday: "text-slate-400 dark:text-slate-500 font-bold text-[10px] text-center uppercase tracking-widest h-8 flex items-center justify-center",
        weeks: "space-y-1",
        week: "grid grid-cols-7 w-full",
        day: cn(
          "h-11 w-11 p-0 font-bold transition-all flex items-center justify-center rounded-xl text-sm relative",
          "hover:bg-primary/10 hover:text-primary focus-within:relative focus-within:z-20"
        ),
        day_button: "h-full w-full flex items-center justify-center rounded-xl transition-all",
        selected: "!bg-primary !text-white font-black shadow-lg shadow-primary/30 scale-105",
        today: "after:content-[''] after:absolute after:bottom-2 after:h-1 after:w-1 after:rounded-full after:bg-primary font-black text-primary",
        outside: "text-muted-foreground/30 opacity-50",
        disabled: "text-muted-foreground/10 opacity-10 cursor-not-allowed",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => {
          if (props.orientation === 'left') {
            return <ChevronLeft className="h-4 w-4" />;
          }
          return <ChevronRight className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
