import {
  convertIcsCalendar,
  generateIcsCalendar,
  type IcsCalendar,
} from "ts-ics";
import { Multimap } from "~/utils/multimap";

/**
 * Fields embedded in VEVENT properties' string values of typical (as of 2025) Chalmers' TimeEdit .ics Calendars.
 * "Fields" in this context refer to an enum abstraction of the actual strings that may be used as keys.
 */
// eslint-disable-next-line no-shadow
enum EventFields {
  Activity,
  Campus,
  ClassCode,
  ClassName,
  ComputerCount,
  CourseCode,
  CourseName,
  Facility,
  Initial /* Substring found before first key (special)  */,
  MapURI /* Or MURI for short, but that'd be confusing  */,
  Title,
}

/**
 * Known keys that have been seen (embedded in string values) in calendar files to be parsed,
 * and mapped `EventFields` enum.
 *
 * If you encounter files with previously unseen keys, add them to this map constructor.
 * Do not remove outdated keys, unless u have a reason. (plz)
 */
const knownKeys: Map<string, EventFields> = new Map<string, EventFields>([
  ["Activity", EventFields.Activity],

  ["Campus", EventFields.Campus],

  ["Klass kod", EventFields.ClassCode],
  ["Class code", EventFields.ClassCode],

  ["Klass namn", EventFields.ClassName],
  ["Name", EventFields.ClassName],

  ["Antal datorer", EventFields.ComputerCount],
  ["Computer", EventFields.ComputerCount],
  ["Computers", EventFields.ComputerCount],

  ["Kurs kod", EventFields.CourseCode],
  ["Course code", EventFields.CourseCode],

  ["Kurs namn", EventFields.CourseName],
  ["Course name", EventFields.CourseName],

  ["Lokalnamn", EventFields.Facility],
  ["Room", EventFields.Facility],

  ["Kartlänk", EventFields.MapURI],
  ["Map link", EventFields.MapURI],

  ["Titel", EventFields.Title],
  ["Title", EventFields.Title],
]);

/**
 * Edits a typical .ics schedule from Chalmers' Timeedit, to make it less cluttered.
 * @param input - The contents of an .ics file, as a string
 * @returns The new .ics file (still a string), and a recommended filename
 */
const simplifySchedule = (input: string): { icsCal: string; name: string } => {
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

  //rename and return
  vCalendar.name = `ZtekPostProcessed-${vCalendar.name || "TimeEdit-Calendar"}`;
  return {
    icsCal: generateIcsCalendar(vCalendar),
    name: vCalendar.name,
  };
};

/**
 * Parses poorly delimited key-value pairs where:
 *  - keys are string members of the `knownKeys` Map Keys
 *  - values are arbitrary strings, except they may not contain any keys followed by a key-value separator
 *  - key-value separators are `": "`
 *  - key-value pair separators are inconsistent.. and not uniquely used for this purpose
 * @param text - Text to parse.
 * @param out - Map where parsed values are to be added. Keys need not exist upon call.
 */
const parseInfo = (text: string, out: Multimap<EventFields, string>): void => {
  let currentKey: EventFields = EventFields.Initial; // key whose value is being parsed
  let startIndex: number = 0; // start index of value
  let index: number = 0; // index at which to look for next key (aka end of current value)
  let value: string = ""; // value found so far (since end of the current key)

  const keyAt = (key: string, position: number): boolean => {
    const fullKey = `${key}: `; // full string to search for (includes key-value separator)

    // check each char until 1 mismatch or all chars match
    for (let offset: number = 0; offset < fullKey.length; offset++) {
      if (position + offset >= text.length) return false;
      if (fullKey[offset] !== text[position + offset]) return false;
    }
    return true;
  };

  while (index <= text.length) {
    // index is for 1: exclusive upper bound for `value` substring, 2: position (inclusive lower) at which to look for next key
    value = text
      .substring(startIndex, index)
      .replace(/^[,.\s]+|[,.\s]+$/gu, ""); // regex is for trimming

    // check each key
    for (const nextKey of knownKeys.keys()) {
      if (keyAt(nextKey, index)) {
        if (value != "") out.add(currentKey, value); // / append currently parsed value onto mapped list
        currentKey = knownKeys.get(nextKey)!; //        / set new key
        startIndex = index + `${nextKey}: `.length; //  / new value begins right after new key
        index = startIndex - 1; //                      / continue scanning at startIndex
        break;
      }
    }

    index++;
  }

  // add last value
  if (value != "") out.add(currentKey, value);
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
  return [
    [...info.getUnique(EventFields.Initial)].join(", "),
    [...info.getUnique(EventFields.CourseCode)]
      .map((value: string): string => value.substring(0, 6))
      .join(", "),
    [...info.getUnique(EventFields.Activity)].join(", "),
    [...info.getUnique(EventFields.Title)].join(", "),
  ]
    .filter((value: string): boolean => value !== "")
    .join("\n");
};

const constructDescription = (info: Multimap<EventFields, string>): string => {
  return [...info.getUnique(EventFields.CourseName)].join(", ");
};

export default simplifySchedule;
