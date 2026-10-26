import { TRPCError } from "@trpc/server";
import { convertIcsCalendar, extendByRecurrenceRule } from "ts-ics";
import type { CalendarEvent } from "~/components/ui/calendar/calendar-helpers";
import { ZALOONEN_BOOKING_ICS_URL } from "~/constants/3rd-party-apis";
import { trpc } from "~/server/trpc/init";
import { publicProcedure } from "~/server/trpc/procedure-builders";

export const zaloonenBookingRouter = trpc.router({
  /**
   * Fetches zaloonen-bookings, from Google Calendar, server-side.
   * This can not be done client-side, due to *SOP*.
   * See https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy .
   *
   * this tRPC resolver is mostly AI GENERATED
   */
  getAll: publicProcedure.query(async () => {
    let calendarResponse: Response;
    try {
      calendarResponse = await fetch(ZALOONEN_BOOKING_ICS_URL, {
        next: { revalidate: 300 },
      });
    } catch {
      throw new TRPCError({
        message: "Could not connect to the Zaloonen calendar.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    if (!calendarResponse.ok) {
      throw new TRPCError({
        message: "The Zaloonen calendar returned an error.",
        code: "BAD_GATEWAY",
      });
    }

    let calendar: ReturnType<typeof convertIcsCalendar>;
    try {
      calendar = convertIcsCalendar(undefined, await calendarResponse.text());
    } catch {
      throw new TRPCError({
        message: "The Zaloonen calendar data could not be parsed.",
        code: "BAD_GATEWAY",
      });
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
  }),
});
