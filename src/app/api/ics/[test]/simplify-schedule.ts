//THIS PACKAE CAN PARSE (and even has a nicer API for doing so), NEVERTHELESS CAN NOT GENERATE. DO NOT USE.
//import type { ICS } from "@filecage/ical";
//import { parseString } from "@filecage/ical/parser";

import { convertIcsCalendar, IcsCalendar } from "ts-ics";

const simplifySchedule = (input: string): string => {
  //

  const vCalendar: IcsCalendar = convertIcsCalendar(undefined, input); //only first VCALENDAR block in file will be considered (library limitation)(also apparently this is de-facto standard)
  for (const vEvent of vCalendar.events || []) {
    const foundFields: Map<string, string[]> = new Map<string, string[]>([
      ["Kurs kod: ", []],
      ["Kurs namn: ", []],
      ["Activity: ", []],
      ["Klass kod: ", []],
      ["Lokalnamn: ", []],
      ["Campus: ", []],
      ["Antal datorer: ", []],
      ["Kartlänk: ", []],
      ["Campus: ", []],
    ]);

    const findFields = (text: string): void => {
      throw Error("NOT IMPLEMENTED");
    };

    const constructLocation = (): string => {
      const locations: string[] = foundFields.get("Lokalnamn: ") || [];
      const mapLinks: string[] = foundFields.get("Kartlänk: ") || [];
      const result: string[] = [];
      for (
        let i: number = 0;
        i < Math.max(locations.length, mapLinks.length);
        i++
      ) {
        const row: string[] = [];
        if (i < locations.length) row.push(locations[i] as string);
        if (i < mapLinks.length) row.push(mapLinks[i] as string);
        result.push(row.join(", "));
      }
      return result.join("\n");
    };

    const constructSummary = (): string => {
      const courseCodes: string[] = [];
      const activities: string[] = [];
      for (const courseCode of foundFields.get("Kurs kod: ") || []) {
        courseCodes.push(courseCode.substring(0, 6));
      }
      for (const activity of foundFields.get("Activity: ") || []) {
        if (!(activity in activities)) activities.push(activity);
      }
      return [courseCodes.join(", "), activities.join(", ")].join("\n");
    };

    const constructDescription = (): string => {
      throw new Error("Not implemented");
    };

    findFields(vEvent.summary);
    findFields(vEvent.location || "");

    vEvent.location = constructLocation();
    vEvent.summary = constructSummary();
    vEvent.description = constructDescription();
  }

  //return input;
  throw new Error("Not implemented");
};

export default simplifySchedule;
