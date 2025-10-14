import {
  convertIcsCalendar,
  generateIcsCalendar,
  type IcsCalendar,
} from "ts-ics";
import { Multimap } from "~/utils/multimap";

/**
 * Fields embedded in VEVENT property values of typical (as of 2025) Chalmers' TimeEdit .ics Calendars.
 * For example:
 * ```
 * SUMMARY:Kurs kod: LMT212_50_HT25_67120. Kurs namn: Mekani
 *  k\, fortsättningskurs\, Kurs kod: MMS216_40_HT25_47133
 *  . Kurs namn: Mekanik 2\, Activity: Datorövning\, Activ
 *  ity: Räknestuga\, Klass kod: TKAUT-2. Klass namn: Auto
 *  mation och mekatronik\, Klass kod: TIMEL-2. Klass namn
 *  : Mekatronik
 * ```
 */
enum EventFields {
  Activity = "Activity: ",
  Campus = "Campus: ",
  ComputerCount = "Antal datorer: ",
  ClassCode = "Klass kod: ",
  ClassName = "Klass namn: ",
  CourseCode = "Kurs kod: ",
  CourseName = "Kurs namn: ",
  Facility = "Lokalnamn: ", // Facility = room + ✨✨
  MapURI = "Kartlänk: ", //Or MURI for short, but that'd be confusing
}

/**
 * Parses poorly delimited key-value pairs where:
 *  - keys are members of the `EventFields` string enum
 *  - values are arbitrary strings, which do not contain any keys
 * @param text - Text to parse.
 * @param out - Map where parsed values are to be added. Keys need not exist upon call.
 */
const parseInfo = (text: string, out: Multimap<EventFields, string>): void => {
  // let's do the O(text.length) complexity linear search!!

  const keyAt = (key: EventFields, position: number): boolean => {
    for (let offset: number = 0; offset < key.length; offset++) {
      if (position + offset >= text.length) return false;
      if (key[offset] !== text[position + offset]) return false;
    }
    return true;
  };

  let currentKey: EventFields | null = null; // key whose value is being parsed
  let startIndex: number = 0; // start index of value
  let index: number = 0; // index at which to look for next key (aka end of current value)
  let value: string = "";

  while (index < text.length) {
    for (const nextKey of Object.values(EventFields)) {
      if (keyAt(nextKey, index)) {
        value = text
          .substring(startIndex, index)
          .replace(/^[,.\s]+|[,.\s]+$/gu, ""); // regex is for trimming
        currentKey && out.add(currentKey, value); //    // append currently parsed value onto mapped list
        currentKey = nextKey; //                        // set new key
        startIndex = index + currentKey.length; //      // new value begins right after new key
        index = startIndex - 1; //                      // continue scanning at startIndex
        break;
      }
    }

    index++;
  }

  // add last value
  currentKey && out.add(currentKey, value);
};

const constructLocation = (info: Multimap<EventFields, string>): string => {
  const facilities: string[] = info.get(EventFields.Facility) || [];
  const mapLinks: string[] = info.get(EventFields.MapURI) || [];
  const result: string[] = [];

  for (
    let i: number = 0;
    i < Math.max(facilities.length, mapLinks.length);
    i++
  ) {
    const row: string[] = [];
    if (i < facilities.length) row.push(facilities[i] as string);
    if (i < mapLinks.length) row.push(mapLinks[i] as string);
    result.push(row.join(", "));
  }

  return result.join("\n");
};

const constructSummary = (info: Multimap<EventFields, string>): string => {
  const courseCodes: string[] = [];
  const activities: string[] = [];

  for (const courseCode of info.getUnique(EventFields.CourseCode)) {
    courseCodes.push(courseCode.substring(0, 6)); //only the first 6 chars in a course code is relevant
  }
  for (const activity of info.getUnique(EventFields.Activity)) {
    activities.push(activity);
  }

  return [courseCodes.join(", "), activities.join(", ")].join("\n");
};

const constructDescription = (info: Multimap<EventFields, string>): string => {
  return [...info.getUnique(EventFields.CourseName)].join(", ");
};

const simplifySchedule = (input: string): string => {
  const vCalendar: IcsCalendar = convertIcsCalendar(undefined, input); //only first VCALENDAR block in file will be considered (library limitation)(also apparently this is de-facto standard)
  for (const vEvent of vCalendar.events || []) {
    // edit each VEVENT of the calendar

    // parsed data
    const eventInfo = new Multimap<EventFields, string>();

    // parse
    parseInfo(vEvent.summary, eventInfo);
    parseInfo(vEvent.location || "", eventInfo);

    // overwrite with new
    vEvent.location = constructLocation(eventInfo);
    vEvent.summary = constructSummary(eventInfo);
    vEvent.description = constructDescription(eventInfo);
  }

  return generateIcsCalendar(vCalendar);
};

export default simplifySchedule;
