import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type * as SelectPrimitive from "@radix-ui/react-select";
import type { InputHTMLAttributes, ReactNode } from "react";
import type {
  Control,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

export interface IBasicFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  control: Control<TFieldValues>;
  description?: ReactNode;
  label: string;
}

export interface IBooleanInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBasicFormField<TFieldValues, TName>,
    Omit<
      React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
      "checked" | "onCheckedChange" | "defaultValue" | "name"
    > {}

export interface IDropdownInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBasicFormField<TFieldValues, TName>,
    Omit<
      SelectPrimitive.SelectProps,
      "onValueChange" | "defaultValue" | "name"
    > {
  mappable: { id: string; name: string }[];
  placeholder: string;
}

export interface IImageInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBasicFormField<TFieldValues, TName>,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "defaultValue" | "name" | "file" | "value" | "onChange" | "type"
    > {
  defaultImage?: string;
}

export interface INumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBasicFormField<TFieldValues, TName>,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "defaultValue" | "name" | "value" | "onChange" | "type"
    > {}

export interface ITextAreaInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBasicFormField<TFieldValues, TName>,
    Omit<InputHTMLAttributes<HTMLTextAreaElement>, "defaultValue" | "name"> {}

export interface ITextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBasicFormField<TFieldValues, TName>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name"> {}
