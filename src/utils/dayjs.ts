import dayjs from "dayjs";

const localeObject: ILocale = {
  name: "se",
  formats: {
    LTS: "h:mm:ss A",
    LT: "h:mm A",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A",
  },
  relativeTime: {
    future: "om %s",
    past: "%s sedan",
    s: "några sekunder",
    m: "en minut",
    mm: "%d minuter",
    h: "en timme",
    hh: "%d timmar",
    d: "en dag",
    dd: "%d dagar",
    M: "en månad",
    MM: "%d månader",
    y: "ett år",
    yy: "%d år",
  },
};

dayjs.locale(localeObject, undefined, true); // load locale for later use

export default localeObject;
