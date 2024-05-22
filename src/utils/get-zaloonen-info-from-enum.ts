import type {
  ZaloonenBookingEventTypes,
  ZaloonenBookingTypes,
} from "@prisma/client";

export const getZaloonenBookingEventNameFromType = (
  type: ZaloonenBookingEventTypes,
): string => {
  switch (type) {
    case "OFFICIAL":
      return "Officiellt Z-arrangemang";
    case "INTERNAL":
      return "Interna Z-arrangemang";
    case "OTHER_WITH_Z":
      return "Övrig grupp/kommité med sittande Z-tekonolog";
    case "OTHER_WITHOUT_Z":
      return "Övrig grupp/kommité utan sittande Z-teknolog";
  }
};

export const getZaloonenBookingShortEventNameFromType = (
  type: ZaloonenBookingEventTypes,
): string => {
  switch (type) {
    case "OFFICIAL":
      return "Officiellt Z";
    case "INTERNAL":
      return "Interna Z";
    case "OTHER_WITH_Z":
      return "Övrig utan Z";
    case "OTHER_WITHOUT_Z":
      return "Övrig med Z";
  }
};

export const getZaloonenBookingNameFromType = (
  type: ZaloonenBookingTypes,
): string => {
  switch (type) {
    case "ALL":
      return "Hela zaloonen";
    case "KITCHEN":
      return "Enbart köket";
    case "APPLIANCES":
      return "Enbart köksredskap";
  }
};

export const getShortZaloonenBookingNameFromType = (
  type: ZaloonenBookingTypes,
): string => {
  switch (type) {
    case "ALL":
      return "Hela";
    case "KITCHEN":
      return "Kök";
    case "APPLIANCES":
      return "Redskap";
  }
};
