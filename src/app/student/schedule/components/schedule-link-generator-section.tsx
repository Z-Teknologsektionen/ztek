"use client";
import { useState, type FC } from "react";
import BooleanCell from "~/components/columns/boolean-cell";

//TODO: split ScheduleLinkGenerator out of ScheduleLinkGeneratorSection

const ScheduleLinkGeneratorSection: FC<{}> = () => {
  const [input, setInput] = useState<string>(""); // hook for storing content of input field
  const [copied, setCopied] = useState<boolean>(false); // hook for `copied` state (determines button text)

  const calIDExtractReg: RegExp =
    /^https:\/\/cloud\.timeedit\.net\/chalmers\/web\/public\/(.*)\.ics$/;
  const match: RegExpMatchArray | null = input.trim().match(calIDExtractReg);
  const calID: string | null = (match && match[1]) || null;
  const output: string = calID ? `/api/ics/${calID}` : "";

  //TODO: add domain name to output link (relative links won't work from outside, dummy
  //TODO: Style this generator
  //TODO: add error field for no RegEx match (aka non-timeEdit link)

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setCopied(false);
        }}
      />
      <input type="text" value={output} readOnly />
      <button
        onClick={(e) => {
          navigator.clipboard.writeText(output);
          setCopied(true);
        }}
      >
        {copied ? "Kopierad" : "Kopiera"}
        <BooleanCell value={copied} />
      </button>
    </>
  );
};

export default ScheduleLinkGeneratorSection;
