"use client";
import {
  Calendar as CalendarIcon,
  ChevronsRight,
  Clock,
  List as ListIcon,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import { formatEventDate, sameDay, type CalendarEvent } from "./calendar-helpers";
import MonthCalendar from "./month-calendar";

type ViewMode = "list" | "calendar";
const ZALOONEN_CALENDAR_URL =
  "https://embed.styledcalendar.com/#KwrikxxDh0q9078hGAzF";



const Calendar: FC<{events: CalendarEvent[]} > = ({events}) => {
  const [mode, setMode] = useState<ViewMode>("list");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const eventsForSelectedDay = events.filter((e) =>
    sameDay(e.date, selectedDate),
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter((event) => event.date >= today);

  return (
    <div className="mt-4 rounded-xl bg-neutral-300 p-4">
      <div className="flex items-center justify-between rounded-md bg-neutral-700 px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-white">
          Zaloonens kalender(Demo)
        </h3>
        <div className="flex gap-1">
          <button
            aria-label="Listvy"
            className={`rounded p-1.5 ${
              mode === "list"
                ? "bg-neutral-500 text-white"
                : "text-neutral-300 hover:text-white"
            }`}
            onClick={() => setMode("list")}
            type="button"
          >
            <ListIcon size={16} />
          </button>
          <button
            aria-label="Kalendervy"
            className={`rounded p-1.5 ${
              mode === "calendar"
                ? "bg-neutral-500 text-white"
                : "text-neutral-300 hover:text-white"
            }`}
            onClick={() => setMode("calendar")}
            type="button"
          >
            <CalendarIcon size={16} />
          </button>
        </div>
      </div>

      {mode === "list" ? (
        <div className="mt-2 space-y-2">
          
          {upcomingEvents.length === 0 && (
            <p className="rounded-md bg-neutral-700 px-4 py-3 text-sm text-neutral-300">
              Inga kommande händelser.
            </p>
          )}
          {upcomingEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between gap-3 rounded-md bg-neutral-700 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-bold text-white">{event.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-300">
                    <Clock size={12} />
                    {formatEventDate(event.date)}, {event.time}
                    <span className="mx-1">·</span>
                    <MapPin size={12} />
                    {event.location}
                  </p>
                </div>
                <Link
                  className="shrink-0 rounded-md bg-amber-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-900"
                  href={ZALOONEN_CALENDAR_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Mer info
                </Link>
              </div>
            ))}
        </div>
      ) : (
        <div className="mt-2 rounded-md bg-neutral-700 p-4">
          <MonthCalendar
            events={events}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <div className="mt-4 border-t border-neutral-600 pt-3">
            <p className="mb-2 text-xs font-semibold text-neutral-300">
              {selectedDate.toLocaleDateString("sv-SE", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
           {eventsForSelectedDay.length === 0 ? (
              <p className="text-xs text-neutral-400">
                Inga händelser den här dagen.
              </p>
            ) : (
              <div className="space-y-2">
                {eventsForSelectedDay.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-md bg-neutral-600 px-3 py-2"
                  >
                    <p className="text-sm font-bold text-white">
                      {event.title}
                    </p>
                    <p className="text-xs text-neutral-300">
                      {event.time} · {event.location}
                    </p>
                    {event.description && (
                      <p className="mt-1 text-xs text-neutral-200">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Link
        className="mt-3 flex items-center justify-center gap-1 rounded-md bg-amber-800 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-amber-900"
        href="/student-division/zaloonen"
        rel="noopener noreferrer"
        target="_blank"
      >
        Se hela Zaloonens kalender
        <ChevronsRight size={14} />
      </Link>
    </div>
  );
}

export default Calendar;