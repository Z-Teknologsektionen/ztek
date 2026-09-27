"use client";
import { useMemo } from "react";
import { addDays } from "../_utils/date_helpers";
import type { EventItem } from "../_utils/types";

// Mock data source. Every other component only ever consumes plain
// EventItem objects, so this hook is the single place to swap in a
// real API / CMS call later.
export default function useUpcomingEvents(): EventItem[] {
  return useMemo<EventItem[]>(() => {
    const today = new Date();
    return [
      {
        id: 1,
        title: "Zenith Skrivarkväll",
        date: addDays(today, 4),
        time: "19:00",
        location: "Zaloonen",
        description:
          "Mysig skrivarkväll för alla som har en labbrapport eller två att beta av.",
      },
      {
        id: 2,
        title: "Daltonz häfv",
        date: addDays(today, 11),
        time: "18:00",
        location: "Zaloonen",
        description: "Häfv anordnad av Daltonz inför kommande sittning.",
      },
      {
        id: 3,
        title: "ZoK zittning",
        date: addDays(today, 19),
        time: "19:00",
        location: "Zaloonen",
        description: "Sektionens återkommande zittning, arrangerad av ZoK.",
      },
      {
        id: 4,
        title: "Styrelsemöte",
        date: addDays(today, 27),
        time: "17:15",
        location: "Sektionsrummet",
        description: "Öppet styrelsemöte, alla medlemmar är välkomna att närvara.",
      },
    ].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, []);
}