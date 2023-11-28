"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { vi } from "date-fns/locale";
import { addMonths, isSameMonth, setYear } from "date-fns";
import { Input } from "./input";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(addMonths(new Date(), 0));
  const [selectedYear, setSelectedYear] = React.useState(month.getFullYear());

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSelectedYear(1);
      return;
    }
    const newYear = parseInt(event.target.value, 10);

    if (!isNaN(newYear) && newYear < 10000) {
      setSelectedYear(newYear);
      setMonth(new Date(newYear, month.getMonth(), 1));
    }
  };

  return (
    <DayPicker
      locale={vi}
      month={month}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <span
            className="absolute inset-0 flex items-center justify-center"
            onClick={() => {
              setMonth((pre) => {
                const result = new Date(pre.getFullYear(), pre.getMonth() - 1);
                setSelectedYear(result.getFullYear());
                return result;
              });
            }}
          >
            <ChevronLeft size={18} />
          </span>
        ),
        IconRight: ({ ...props }) => (
          <span
            className="absolute inset-0 flex items-center justify-center"
            onClick={() => {
              setMonth((pre) => {
                const result = new Date(pre.getFullYear(), pre.getMonth() + 1);
                setSelectedYear(result.getFullYear());
                return result;
              });
            }}
          >
            <ChevronRight size={18} />
          </span>
        ),
      }}
      footer={
        <div className="flex items-center justify-between mt-2 space-x-2">
          <Button
            variant={"outline"}
            className="bg-transparent opacity-50 hover:opacity-100"
            disabled={isSameMonth(new Date(), month)}
            onClick={() => setMonth(new Date())}
          >
            Ngày hiện tại
          </Button>
          <Input
            value={selectedYear.toString()}
            className="w-20"
            onChange={handleYearChange}
          />
        </div>
      }
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
