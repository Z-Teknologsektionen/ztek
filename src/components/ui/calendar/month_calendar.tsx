"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { getMonthGrid, sameDay } from "../_utils/date_helpers";
import type { EventItem } from "../_utils/types";

interface MonthCalendarProps {
  events: EventItem[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function MonthCalendar({ events, selectedDate, onSelectDate }: MonthCalendarProps) {
  const [viewDate, setViewDate] = useState<Date>(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const cells = useMemo(
    () => getMonthGrid(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const eventsOn = (date: Date): EventItem[] => events.filter((e) => sameDay(e.date, date));
  const monthLabel = viewDate.toLocaleDateString("sv-SE", {
    month: "long",
    year: "numeric",
  });
  const weekdayLabels = ["M", "T", "O", "T", "F", "L", "S"];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Föregående månad"
          onClick={() =>
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
          }
          className="rounded-md p-1 text-neutral-300 hover:bg-neutral-600 hover:text-white"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold capitalize text-white">{monthLabel}</span>
        <button
          type="button"
          aria-label="Nästa månad"
          onClick={() =>
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
          }
          className="rounded-md p-1 text-neutral-300 hover:bg-neutral-600 hover:text-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-neutral-400">
        {weekdayLabels.map((w, i) => (
          <div key={i}>{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          const dayEvents = eventsOn(cell.date);
          const isSelected = sameDay(cell.date, selectedDate);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectDate(cell.date)}
              className={`relative aspect-square rounded-md text-xs transition-colors
                ${cell.inMonth ? "text-white" : "text-neutral-600"}
                ${isSelected ? "bg-amber-800 text-white" : "hover:bg-neutral-600"}`}
            >
              {cell.date.getDate()}
              {dayEvents.length > 0 && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}