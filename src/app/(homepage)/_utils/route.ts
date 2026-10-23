import { convertIcsCalendar, extendByRecurrenceRule } from "ts-ics";
import type { CalendarEvent } from "~/components/ui/calendar/calendar-helpers";

const CALENDAR_ICS_URL =
  "https://calendar.google.com/calendar/ical/5k34kjsd0eghetn8t6cp7k1pb8%40group.calendar.google.com/public/basic.ics";

export const getZaloonenBookings = async (): Promise<CalendarEvent[]> => {
  let calendarResponse: Response;
  try {
    calendarResponse = await fetch(CALENDAR_ICS_URL, {
      next: { revalidate: 300 },
    });
  } catch {
    throw new Error("Could not connect to the Zaloonen calendar.");
  }

  if (!calendarResponse.ok) {
    throw new Error("The Zaloonen calendar returned an error.");
  }

  let calendar: ReturnType<typeof convertIcsCalendar>;
  try {
    calendar = convertIcsCalendar(undefined, await calendarResponse.text());
  } catch {
    throw new Error("The Zaloonen calendar data could not be parsed.");
  }

  const now = new Date();
  const rangeStart = new Date(
    Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), 1),
  );
  const rangeEnd = new Date(
    Date.UTC(
      now.getUTCFullYear() + 2,
      now.getUTCMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    ),
  );

  const events: CalendarEvent[] = (calendar.events ?? [])
    .filter((event) => event.status !== "CANCELLED")
    .flatMap((event) => {
      const starts = event.recurrenceRule
        ? extendByRecurrenceRule(event.recurrenceRule, {
            start: event.start.date,
            end: rangeEnd,
            exceptions: event.exceptionDates?.map(({ date }) => date),
          })
        : [event.start.date];

      return starts
        .filter((start) => start >= rangeStart && start <= rangeEnd)
        .map(
          (start) =>
            ({
              id: `${event.uid}:${start.getTime()}`,
              title: event.summary || "Bokning",
              date: start,
              location: event.location || "Zaloonen",
              description: event.description || "",
              allDay: event.start.type === "DATE",
            }) satisfies CalendarEvent,
        );
    })
    .sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));

  return events;
};
