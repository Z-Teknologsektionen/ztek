"use client";
import { useState, type FC } from "react";

import CopyButton from "~/components/ui/copy-button";
import LabeledInput from "~/components/ui/labeled-input";

const ScheduleLinkGenerator: FC = () => {
  const [input, setInput] = useState<string>(""); // hook for storing content of input field
  const calIDExtractReg: RegExp =
    /^https:\/\/cloud\.timeedit\.net\/chalmers\/web\/(public|student)\/(.*)\.ics$/; // regEx to extract "calendar ID" (used in URL for both ztek and TimeEdit calendar API)

  // extract data from regEx
  const match: RegExpMatchArray | null = input.trim().match(calIDExtractReg);
  const calID: string | null = match?.[2] || null;
  const loggedIntoTimeEdit: boolean = match?.[1] == "student" || false;

  // put data into output and errorMsg
  const output: string = calID
    ? `${window.location.origin}/api/ics/${calID}`
    : "";
  let errorMsg: string | null;
  if (!input) errorMsg = null;
  else if (loggedIntoTimeEdit)
    errorMsg =
      "Länken är från en inloggad session på TimeEdit. Logga ut och hämta en bättre länk från öppen schemavisning.";
  else if (!match)
    errorMsg = "Länken är inte en TimeEdit-länk från Chalmers med .ics-ändelse";
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

      <LabeledInput title="Genererad ztek-länk" value={output} readOnly>
        <CopyButton value={output} />
      </LabeledInput>
    </div>
  );
};

export default ScheduleLinkGenerator;
