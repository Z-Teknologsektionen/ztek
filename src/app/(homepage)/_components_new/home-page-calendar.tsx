"use server";

import { cacheLife } from "next/cache";
import { Suspense, type FC } from "react";
import Calendar from "~/components/ui/calendar/index";
import { cacheableCaller } from "~/utils/trpc-client/caller";

const HomePageCalendar: FC = async () => {
  // get bookings server-side
  const bookings = await (async () => {
    "use cache";
    cacheLife("hours");
    return await cacheableCaller.zaloonenBooking.getAll();
  })();

  // don't pre-render `Calendar`, as it runs `new Date()`
  // suspend until code is run on client
  return (
    <Suspense>
      <Calendar events={bookings} />
    </Suspense>
  );
};

export default HomePageCalendar;
