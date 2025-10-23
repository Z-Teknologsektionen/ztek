"use client";
import { ReactNode, useId, type FC } from "react";

import { Input, InputProps } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export interface LabeledInputProps extends InputProps {
  title: string;
  errorMsg?: string | null;
  children?: ReactNode;
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
        <Input className="flex-grow" type="text" id={id} {...props} />
        {children}
      </div>
      <p className="text-sm font-medium text-red-500 dark:text-red-900">
        {!errorMsg || errorMsg.trim() == "" ? <>&nbsp;</> : errorMsg}
      </p>
    </>
  );
};

export default LabeledInput;
