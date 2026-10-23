import { useEffect, useState, type FC } from "react";
import { getZaloonenBookings } from "~/app/(homepage)/_utils/get-zaloonen-bookings";
import type { CalendarEvent } from "~/components/ui/calendar/calendar-helpers";
import Calendar from "~/components/ui/calendar/index";

const HomePageCalendar: FC = () => {
  const [bookings, setBookings] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (bookings.length === 0)
      async () => setBookings(await getZaloonenBookings());
  });

  return <Calendar events={bookings} />;
};

export default HomePageCalendar;
