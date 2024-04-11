import { ZaloonenBookingStatus } from "@prisma/client";

export const authedZaloonenBookingUpdates = [
  ZaloonenBookingStatus.APPROVED_FIRST_DATETIME,
  ZaloonenBookingStatus.APPROVED_SECOND_DATETIME,
  ZaloonenBookingStatus.DENIED,
] as const;
