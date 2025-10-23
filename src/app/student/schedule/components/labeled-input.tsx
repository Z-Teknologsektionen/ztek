"use client";
import type { FC, ReactNode } from "react";
import { useId } from "react";

import type { InputProps } from "~/components/ui/input";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export interface LabeledInputProps extends InputProps {
  children?: ReactNode;
  errorMsg?: string | null;
  title: string;
}

const LabeledInput: FC<LabeledInputProps> = ({
  title,
  errorMsg,
  children,
  ...props
}) => {
  const id: string = useId(); //id hook
  return (
    <>
      <Label className="py-1" htmlFor={id}>
        {title}
      </Label>
      <div className="m-0 flex flex-row items-center">
        <Input className="flex-grow" id={id} type="text" {...props} />
        {children}
      </div>
      <p className="text-sm font-medium text-red-500 dark:text-red-900">
        {!errorMsg || errorMsg.trim() == "" ? <>&nbsp;</> : errorMsg}
      </p>
    </>
  );
};

export default LabeledInput;
