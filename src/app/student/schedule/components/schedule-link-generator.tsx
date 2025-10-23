"use client";
import { useState, type FC } from "react";
import CopyButton from "./copy-button";
import LabeledInput from "./labeled-input";

const ScheduleLinkGenerator: FC = () => {
  const [input, setInput] = useState<string>(""); // hook for storing content of input field

  const calIDExtractReg: RegExp =
    /^https:\/\/cloud\.timeedit\.net\/chalmers\/web\/public\/(.*)\.ics$/;
  const match: RegExpMatchArray | null = input.trim().match(calIDExtractReg);
  const calID: string | null = (match && match[1]) || null;
  const output: string = calID
    ? `${window.location.origin}/api/ics/${calID}`
    : "";

  return (
    <div>
      <LabeledInput
        errorMsg={
          input && !calID
            ? "Länken är inte en TimeEdit-länk med .ics-ändelse"
            : null
        }
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
