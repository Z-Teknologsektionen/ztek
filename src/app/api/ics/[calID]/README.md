




# ICS API

## purpose 
Schedules (.ics Calendars) from Chalmers Timeedit are condsiderably cluttered. This API is for requesting a de-cluttered version of the calendar file.

The original calendar file is taken from `https://cloud.timeedit.net/chalmers/web/public/${(await params).calID}.ics`, where `calID` is given by the API route. A link for this API may be obtained from the frontend link generator at `https://ztek.se/student/schedule`

## ics files

Ics files have key-value pairs (also called "properties"). As far as relevant for this application all values are strings.

```ics
DTSTART:20260330T111500Z
DTEND:20260330T130000Z
X-WR-CALNAME:TimeEdit-TKAUT-2\, Automation och mekatronik-20260401
```

... and blocks like ...
```ics
END:VEVENT
    // more key-value pairs here (or blocks but usually not)
BEGIN:VEVENT
```

Furthermore, they apply some simple text replacement operations to the string values:
 - `,` -> `\,`
 - line break -> `\n`
 - nothing -> line break + space (this is done only on some places to limit line length)

 *All of the described above is handled by the ics parser supplied in the `ts-ics` package, and is nothing that'll be considered in source*

## expected input ics files

When calendars are recieved from timeedit VEVENT blocks look something like this:

```ics
BEGIN:VEVENT
DTSTART:20260331T060000Z
DTEND:20260331T074500Z
UID:77261-569704435-0@timeedit.com
DTSTAMP:20260401T193446Z
LAST-MODIFIED:20260401T193446Z
URL:https://maps.chalmers.se/#2be8826b-4ccf-4a71-a421-5840b2d408c8
SUMMARY:Course code: EDA488_40_VT26_47111. Course name: Maski
 norienterad programmering\, Title: Grupp A\, B\, Activity:
  Simulering\, Class code: TKAUT-2. Name: Automation och me
 katronik
LOCATION:Room: SB-D080. Map link: https://maps.chalmers.se/#2be88
 26b-4ccf-4a71-a421-5840b2d408c8. Computer: 62. Campus: Johanne
 berg
DESCRIPTION:ID 77261
END:VEVENT
```

ofc, this is not what we want, since most relevant data is lumped together in long string values (eek) of the SUMMARY and LOCATION propreties. (Thus there's a custom parser implemented for this, see below) 

The following expectations were made to these strings:
- There's a finite (and rather small) set of keys (ie `Map link`) that may be encountered.
- key-value separator is `: `
- key-value pair separator is inconsistent (no assumptions can be made)

## expected output ics files

Output may (hopefully) look something like the following:

```ics
BEGIN:VEVENT
DTSTART;VALUE=DATE-TIME:20260331T060000Z
DTEND;VALUE=DATE-TIME:20260331T074500Z
UID:77261-569704435-0@timeedit.com
DTSTAMP;VALUE=DATE-TIME:20260402T162008Z
LAST-MODIFIED;VALUE=DATE-TIME:20260402T162008Z
URL:https://maps.chalmers.se/#2be8826b-4ccf-4a71-a421-5840b2d408c8
SUMMARY:EDA488\nSimulering\nGrupp A\, B
LOCATION:SB-D080\, https://maps.chalmers.se/#2be8826b-4ccf-4a71-a421-5840b2
 d408c8
DESCRIPTION:Maskinorienterad programmering
END:VEVENT
```

## principle of operation

### route.ts
This file contains the route handler (aka entry point of what'll be executed when GET request is recieved). Upon recieving a GET request, it will:
1.  Send another GET request to TimeEdit
2.  Check it doesn't recieve an error response.
1.  Call `simplifySchedule` (see below) with the recieved calendar.
1.  Respond with the simplified schedule.

### simplify-schedule.ts
Calendar rewriting is implemented in the `simplifySchedule` method.

1.  The ics file (actually just a string) is parsed using the `ts-ics` package
1.  For each VEVENT block:

    1.  A map of key-value pairs found in the arbitrary property value strings is kept:
    ```tsx
    const eventInfo = new Multimap<EventFields, string>();
    ```
    1.  SUMMARY and LOCATION's values are parsed. Found keys are output to the map. 
    ```tsx
    parseInfo(vEvent.summary, eventInfo);
    parseInfo(vEvent.location || "", eventInfo);
    ```
    1. The found data is written back to the VEVENT fields in a more human-readable manner:
    ```tsx
    vEvent.location = constructLocation(eventInfo);
    vEvent.summary = constructSummary(eventInfo);
    vEvent.description = constructDescription(eventInfo);
    ```
1. The ics calendar is generated (aka reverse parsed), also using the `ts-ics` package.

### parsing

`EnumFields` is an enum abstraction of keys that may be encountered. 

This is used as key for the `eventInfo` map because enums (finite set of members) are more suitable for this than strings (infinite amount of values, well... almost)

```tsx
enum EventFields {
  ClassCode,
  ClassName,
  // etc etc...
}
```

... whereas `knownKeys` is a map from actual string representations of the keys, to the `EventFields` enum. This is used for parsing.

This is a many-to-one map, since there seems to be inconsistensies in what strings are used for keys in the supplied calendars, especially over time (many keys switched from swedish to english at the beginning of 2026).

```tsx
const knownKeys: Map<string, EventFields> = new Map<string, EventFields>([
  ["Klass kod",  EventFields.ClassCode],
  ["Class code", EventFields.ClassCode],
  ["Klass namn", EventFields.ClassName],
  ["Name",       EventFields.ClassName],
  //etc etc
]);
```
### 


