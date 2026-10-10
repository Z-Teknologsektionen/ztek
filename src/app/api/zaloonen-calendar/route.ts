import { convertIcsCalendar, extendByRecurrenceRule } from "ts-ics";

const CALENDAR_ICS_URL =
  "https://calendar.google.com/calendar/ical/5k34kjsd0eghetn8t6cp7k1pb8%40group.calendar.google.com/public/basic.ics";

export async function GET(): Promise<Response> {
  let calendarResponse: Response;
  try {
    calendarResponse = await fetch(CALENDAR_ICS_URL, {
      next: { revalidate: 300 },
    });
  } catch {
    return Response.json(
      { error: "Could not connect to the Zaloonen calendar." },
      { status: 502 },
    );
  }

  if (!calendarResponse.ok) {
    return Response.json(
      { error: "The Zaloonen calendar returned an error." },
      { status: 502 },
    );
  }

  let calendar: ReturnType<typeof convertIcsCalendar>;
  try {
    calendar = convertIcsCalendar(undefined, await calendarResponse.text());
  } catch {
    return Response.json(
      { error: "The Zaloonen calendar data could not be parsed." },
      { status: 502 },
    );
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

  const events = (calendar.events ?? [])
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
        .map((start) => ({
          id: `${event.uid}:${start.getTime()}`,
          title: event.summary || "Bokning",
          date: start.toISOString(),
          location: event.location || "Zaloonen",
          description: event.description || "",
          allDay: event.start.type === "DATE",
        }));
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return Response.json({ events });
}
