/** @description enum for (often time-dependent) visibility of media items such as Zenith media or Carousel items */
export const visibilityStates = ["scheduled", "visible", "passed"] as const;

export const getVisibilityStateName = (
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

export const getVisibilityState = ({
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
