import type { visibilityStates } from "~/constants/home-page-carousel";

export const getCarouselStatusName = (
  status: (typeof visibilityStates)[number],
): string => {
  switch (status) {
    case "scheduled":
      return "Schemalagd";
    case "visible":
      return "Visas";
    case "passed":
      return "Passerad";
  }
};

export const getCarouselStatusFromDates = ({
  endDateTime,
  startDateTime,
}: {
  endDateTime: Date | null;
  startDateTime: Date | null;
}): (typeof visibilityStates)[number] => {
  if (startDateTime !== null && startDateTime > new Date()) return "scheduled";

  if (endDateTime !== null && endDateTime < new Date()) return "passed";

  return "visible";
};
