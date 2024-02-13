import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type * as SelectPrimitive from "@radix-ui/react-select";
import type { InputHTMLAttributes, ReactNode } from "react";
import type {
  Control,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import type { z } from "zod";

export interface IUpsertForm<schema extends z.ZodObject<z.ZodRawShape>> {
  defaultValues?: z.infer<schema>;
  formType: "create" | "update";
  onSubmit: (props: z.infer<schema>) => void;
}

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
      "defaultValue" | "name" | "checked" | "onCheckedChange"
    > {}

export interface IDropdownInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBasicFormField<TFieldValues, TName>,
    Omit<
      SelectPrimitive.SelectProps,
      "defaultValue" | "name" | "onValueChange"
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
      "defaultValue" | "name" | "type" | "value" | "onChange"
    > {
  containImage?: boolean;
  maxHeight?: number;
  maxWidth?: number;
  quality?: number;
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
