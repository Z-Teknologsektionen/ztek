import type { HTMLInputTypeAttribute } from "react";
import type {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

export interface IUpsertForm<schema extends z.ZodObject<z.ZodRawShape>> {
  defaultValues?: z.input<schema>;
  formType: "create" | "update";
  onSubmit: SubmitHandler<z.output<schema>>;
}

export interface IFormFieldDefaults<
  TFieldValues extends FieldValues = FieldValues,
> {
  description?: string;
  disabled?: boolean;
  form: UseFormReturn<TFieldValues>;
  label: string;
  name: Path<TFieldValues>;
}

export interface IFormFieldMapableDefaults<TFieldValues extends FieldValues>
  extends IFormFieldDefaults<TFieldValues> {
  options: { label: string; value: string }[];
  placeholder: string;
  resetButton?: boolean;
}

export interface IFormFieldInput<TFieldValues extends FieldValues = FieldValues>
  extends IFormFieldDefaults<TFieldValues> {
  className?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
}
export interface IFormFieldCheckbox<
  TFieldValues extends FieldValues = FieldValues,
> extends IFormFieldDefaults<TFieldValues> {
  description: string;
}

export interface IFormFieldSelect<TFieldValues extends FieldValues>
  extends IFormFieldMapableDefaults<TFieldValues> {
  scrollArea?: boolean;
}

export interface IFormFieldCombobox<TFieldValues extends FieldValues>
  extends IFormFieldMapableDefaults<TFieldValues> {
  noResultsText: string;
  serchText: string;
}

export interface IFormFieldInputImage<
  TFieldValues extends FieldValues = FieldValues,
> extends IFormFieldDefaults<TFieldValues> {
  circularCrop?: boolean;
  freeCrop?: boolean;
  maxHeight: number;
  maxWidth: number;
  quality: number;
  ruleOfThirds?: boolean;
}

export interface IFormFieldFileInput<
  TFieldValues extends FieldValues = FieldValues,
> extends IFormFieldDefaults<TFieldValues> {
  accept: string;
  className?: string;
}

export interface IFormFieldInputDatetimeLocal<
  TFieldValues extends FieldValues = FieldValues,
> extends IFormFieldDefaults<TFieldValues> {
  className?: string;
}

export interface IFormFieldInputNumber<
  TFieldValues extends FieldValues = FieldValues,
> extends IFormFieldDefaults<TFieldValues> {
  max: number;
  min: number;
}

export interface IFormFieldTextArea<
  TFieldValues extends FieldValues = FieldValues,
> extends IFormFieldDefaults<TFieldValues> {
  className?: string;
}

export interface IFormFieldMultiCheckbox<
  TFieldValues extends FieldValues = FieldValues,
> extends IFormFieldDefaults<TFieldValues> {
  horizontal?: boolean;
  items: {
    label: string;
    value: string | number;
  }[];
}
