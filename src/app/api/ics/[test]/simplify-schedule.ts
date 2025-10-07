//THIS PACKAGE CAN PARSE (and even has a nicer API for doing so), NEVERTHELESS CAN NOT GENERATE. DO NOT USE.
//import type { ICS } from "@filecage/ical";
//import { parseString } from "@filecage/ical/parser";

import { convertIcsCalendar, generateIcsCalendar, IcsCalendar } from "ts-ics";

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

const parseInfo = (text: string, output: Map<EventFields, string[]>): void => {
  throw Error("NOT IMPLEMENTED");
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
