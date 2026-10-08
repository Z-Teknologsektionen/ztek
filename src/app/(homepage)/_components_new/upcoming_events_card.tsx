"use client";
import {
  Calendar as CalendarIcon,
  ChevronsRight,
  Clock,
  List as ListIcon,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { formatEventDate, sameDay } from "../_utils/date_helpers";
import MonthCalendar from "./month_calendar";
import useUpcomingEvents from "./upcoming_events";

type ViewMode = "list" | "calendar";

export default function UpcomingEventsCard() {
  const events = useUpcomingEvents();
  const [mode, setMode] = useState<ViewMode>("list");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const eventsForSelectedDay = events.filter((e) => sameDay(e.date, selectedDate));

  return (
    <div className="mt-4 rounded-xl bg-neutral-300 p-4">
      <div className="flex items-center justify-between rounded-md bg-neutral-700 px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-white">
          Kalender under konstruktion
        </h3>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Listvy"
            onClick={() => setMode("list")}
            className={`rounded p-1.5 ${
              mode === "list" ? "bg-neutral-500 text-white" : "text-neutral-300 hover:text-white"
            }`}
          >
            <ListIcon size={16} />
          </button>
          <button
            type="button"
            aria-label="Kalendervy"
            onClick={() => setMode("calendar")}
            className={`rounded p-1.5 ${
              mode === "calendar" ? "bg-neutral-500 text-white" : "text-neutral-300 hover:text-white"
            }`}
          >
            <CalendarIcon size={16} />
          </button>
        </div>
      </div>

      {mode === "list" ? (
        <div className="mt-2 space-y-2">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between gap-3 rounded-md bg-neutral-700 px-4 py-3"
            >
              <div>
                <p className="text-sm font-bold text-white">Kalender under konstruktion</p>{/*byt ut med {event.title} */}
                <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-300">
                  <Clock size={12} />
                  {formatEventDate(event.date)}, {event.time}
                  <span className="mx-1">·</span>
                  <MapPin size={12} />
                  {event.location}
                </p>
              </div>
              <a
                href="#"
                className="shrink-0 rounded-md bg-amber-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-900"
              >
                Mer info
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2 rounded-md bg-neutral-700 p-4">
          <MonthCalendar
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
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
              <p className="text-xs text-neutral-400">Inga händelser den här dagen.</p>
            ) : (
              <div className="space-y-2">
                {eventsForSelectedDay.map((event) => (
                  <div key={event.id} className="rounded-md bg-neutral-600 px-3 py-2">
                    <p className="text-sm font-bold text-white">Kalender under konstruktion</p>{/*replace with {event.title} */ }
                    <p className="text-xs text-neutral-300">
                      {event.time} · {event.location}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <a
        href="#"
        className="mt-3 flex items-center justify-center gap-1 rounded-md bg-amber-800 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-amber-900"
      >
        Kalendern är under konstruktion
        <ChevronsRight size={14} />
      </a>
    </div>
  );
}