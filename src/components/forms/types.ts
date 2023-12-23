import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type * as LabelPrimitive from "@radix-ui/react-label";
import type { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes } from "react";

import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

export interface IBasicFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  description?: string;
  formControlProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Slot>,
    "children"
  >;
  formItemProps?: Omit<HTMLAttributes<HTMLDivElement>, "children">;
  formLabelProps?: Omit<
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    "children"
  >;
  label: string;
}

export interface IBooleanInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBasicFormField<TFieldValues, TName> {
  checkboxProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "checked" | "onCheckedChange"
  >;
  description?: string;
  label: string;
}
