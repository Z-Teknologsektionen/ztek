//THIS PACKAGE CAN PARSE (and even has a nicer API for doing so), NEVERTHELESS CAN NOT GENERATE. DO NOT USE.
//import type { ICS } from "@filecage/ical";
//import { parseString } from "@filecage/ical/parser";

import { convertIcsCalendar, generateIcsCalendar, IcsCalendar } from "ts-ics";

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
  CourseCode = "Kurs kod: ",
  CourseName = "Kurs namn: ",
  ClassCode = "Klass kod: ",
  ClassName = "Klass namn: ",
  Activity = "Activity: ",
  Facility = "Lokalnamn: ", // Facility = room + ✨✨
  Campus = "Campus: ",
  ComputerCount = "Antal datorer: ",
  MapURI = "Kartlänk: ", //Or MURI for short, but that'd be confusing
}

/**
 * Parses poorly delimited key-value pairs where:
 *  - keys are members of the `EventFields` string enum
 *  - values are arbitrary strings, which do not contain any keys
 * @param text - Text to parse.
 * @param out - Map where parsed values are to be added. Keys need not exist upon call.
 */
const parseInfo = (text: string, out: Map<EventFields, string[]>): void => {
  // let's do the O(text.length) complexity linear search!!

  const keyAt = (key: EventFields, position: number): boolean => {
    throw new Error("Not implemented");
  };
  let currentKey: EventFields | null = null; // key whose value is being parsed
  let startIndex: number = 0; // start index of value
  let index: number = 0; // index at which to look for next key (aka end of current value)
  while (index < text.length) {
    for (const nextKey of Object.values(EventFields)) {
      if (keyAt(nextKey, index)) {
        const value: string = text.substring(startIndex, index);
        currentKey &&
          (out.get(currentKey) === undefined
            ? out.set(currentKey, [value])
            : out.get(currentKey)!.push(currentKey)); //          // append currently parsed value onto mapped list
        currentKey = nextKey; //                                  // set new key
        startIndex = index + currentKey.length; //                // new value begins right after new key
        index = startIndex - 1; //                                // continue scanning at startIndex
        break;
      }
    }
    index++;
  }
};

const constructLocation = (info: Map<EventFields, string[]>): string => {
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

const constructSummary = (info: Map<EventFields, string[]>): string => {
  const courseCodes: string[] = [];
  const activities: string[] = [];
  for (const courseCode of info.get(EventFields.CourseCode) || []) {
    courseCodes.push(courseCode.substring(0, 6)); //only the first 6 chars in a course code is relevant
  }
  for (const activity of info.get(EventFields.Activity) || []) {
    if (!(activity in activities)) activities.push(activity); //no duplicate activities
  }
  return [courseCodes.join(", "), activities.join(", ")].join("\n");
};

const constructDescription = (info: Map<EventFields, string[]>): string => {
  throw new Error("Not implemented");
};

const simplifySchedule = (input: string): string => {
  const vCalendar: IcsCalendar = convertIcsCalendar(undefined, input); //only first VCALENDAR block in file will be considered (library limitation)(also apparently this is de-facto standard)
  for (const vEvent of vCalendar.events || []) {
    const eventInfo = new Map<EventFields, string[]>();
    for (const field of Object.values(EventFields)) eventInfo.set(field, []); //TODO: check if initialization is redundant before done

    parseInfo(vEvent.summary, eventInfo);
    parseInfo(vEvent.location || "", eventInfo);

    vEvent.location = constructLocation(eventInfo);
    vEvent.summary = constructSummary(eventInfo);
    vEvent.description = constructDescription(eventInfo);
  }

  return generateIcsCalendar(vCalendar);
};

export default simplifySchedule;
