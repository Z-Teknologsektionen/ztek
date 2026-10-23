"use client";
import { useState, type FC } from "react";

import CopyButton from "~/components/buttons/copy-button";
import LabeledInput from "~/components/ui/labeled-input";

const ScheduleLinkGenerator: FC = () => {
  const [input, setInput] = useState<string>(""); // hook for storing content of input field
  const calIDExtractReg: RegExp =
    /^https:\/\/cloud\.timeedit\.net\/chalmers\/web\/(public|student)\/(.*)\.ics$/; // regEx to extract "calendar ID" (used in URL for both ztek and TimeEdit calendar API)

  // extract data from regEx
  const match: RegExpMatchArray | null = input.trim().match(calIDExtractReg);
  const calID: string | null = match?.[2] || null;
  const loggedIntoTimeEdit: boolean = match?.[1] == "student" || false; // We don't want links from logged in sessions on TimeEdit. Those calendars look different, and are not supported by backend.

  // put data into output and errorMsg
  const output: string | null = calID
    ? `${window.location.origin}/api/ics/${calID}`
    : null;
  let errorMsg: string | null;
  if (!input) errorMsg = null;
  else if (loggedIntoTimeEdit)
    errorMsg =
      "Länken är från en inloggad session på TimeEdit. Logga ut och hämta en bättre länk från öppen schemavisning.";
  else if (!match)
    errorMsg = "Länken pekar inte på en .ics-fil från Chalmers TimeEdit";
  else errorMsg = null;

  return (
    <div>
      <LabeledInput
        errorMsg={errorMsg}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        title="Klistra in TimeEdit-länk här"
        value={input}
      />

      <LabeledInput
        title="Länk för post-processat schema"
        value={output || ""}
        readOnly
      >
        <CopyButton
          tooltip={!output ? "Hämta en TimeEdit-Länk först :3" : null}
          value={output}
        />
      </LabeledInput>
    </div>
  );
};

export default ScheduleLinkGenerator;
