import { standardNumber, standardString } from "./common-zod-helpers";

export const datetimeString = standardString.datetime({
  precision: 3,
  offset: false,
  message: "Otillåtet datum/tidsformat",
});

export const validYear = standardNumber
  .int("Måste vara ett heltal")
  .min(1000, "Årtalet måste vara ett fyrsiffrigt tal")
  .max(9999, "Årtalet måste vara ett fyrsiffrigt tal");

export const validYearPastOrCurrent = validYear.refine(
  (val) => val <= new Date().getFullYear(),
  "Årtalet får inte vara ett framtida årtal",
);

/**
 * @description Argument for `.refine()` Zod function. Checks if a dateTime interval is valid.
 * Assures either:
 * 1. At least one of arguments are nullish
 * 2. Start date is before end date
 * @param startDateTime - Start date as nullish string
 * @param endDateTime - End date as nullish string
 * @returns True when refinement was passed.
 * @see dateTimeIntervalError
 */
export const dateTimeIntervalCheck = ({
  endDateTime,
  startDateTime,
}: {
  endDateTime?: string | null;
  startDateTime?: string | null;
}): boolean => {
  if (startDateTime && endDateTime) {
    return new Date(endDateTime) > new Date(startDateTime);
  }

  return true;
};

/** @description Argument for `.refine()` Zod function. @see dateTimeIntervalCheck */
export const dateTimeIntervalError = {
  message: "Slutdatum måste vara efter startdatum",
  path: ["endDateTime"],
};
