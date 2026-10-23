"use client";
import { useEffect, useState } from "react";
import { formatEventTime } from "../_utils/date_helpers";
import type { EventItem } from "../_utils/types";

interface CalendarApiEvent {
  allDay: boolean;
  date: string;
  description: string;
  id: string;
  location: string;
  title: string;
}

interface CalendarApiResponse {
  events: CalendarApiEvent[];
}

interface UpcomingEventsResult {
  events: EventItem[];
  status: "loading" | "ready" | "error";
}

const isCalendarApiEvent = (value: unknown): value is CalendarApiEvent =>
  typeof value === "object" &&
  value !== null &&
  "allDay" in value &&
  typeof value.allDay === "boolean" &&
  "date" in value &&
  typeof value.date === "string" &&
  "description" in value &&
  typeof value.description === "string" &&
  "id" in value &&
  typeof value.id === "string" &&
  "location" in value &&
  typeof value.location === "string" &&
  "title" in value &&
  typeof value.title === "string";

const isCalendarApiResponse = (value: unknown): value is CalendarApiResponse =>
  typeof value === "object" &&
  value !== null &&
  "events" in value &&
  Array.isArray(value.events) &&
  value.events.every(isCalendarApiEvent);

export default function useUpcomingEvents(): UpcomingEventsResult {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [status, setStatus] = useState<UpcomingEventsResult["status"]>("loading");

  useEffect(() => {
    const controller = new AbortController();

    const loadEvents = async (): Promise<void> => {
      try {
        const response = await fetch("/api/zaloonen-calendar", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Calendar request failed");
        }

        const data: unknown = await response.json();
        if (!isCalendarApiResponse(data)) {
          throw new Error("Unexpected calendar response");
        }

        const parsedEvents = data.events
          .filter((event) => !Number.isNaN(new Date(event.date).getTime()))
          .map((event) => {
            const date = new Date(event.date);
            return {
              ...event,
              date,
              time: event.allDay ? "Hela dagen" : formatEventTime(date),
            };
          })
          .sort((a, b) => a.date.getTime() - b.date.getTime());

        setEvents(parsedEvents);
        setStatus("ready");
      } catch {
        if (!controller.signal.aborted) {
          setStatus("error");
        }
      }
    };

    void loadEvents();
    return () => controller.abort();
  }, []);

  return { events, status };
}