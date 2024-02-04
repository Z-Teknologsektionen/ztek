import type { CommitteeType } from "@prisma/client";

export const getCommitteeTypeStringFromEnum = (
  type: CommitteeType,
  plural: boolean = false,
): string => {
  switch (type) {
    case "COMMITTEE":
      return plural ? "Kommittéer" : "Kommitté";
    case "SUB_COMMITTEE":
      return "Utskott";
    case "WORKING_GROUP":
      return plural ? "Arbetsgrupper" : "Arbetsgrupp";
    case "OTHER":
      return "Övrigt";
  }
};
