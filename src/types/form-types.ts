import type { HTMLInputTypeAttribute } from "react";
import type {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import type { input, output, ZodEffects, ZodObject, ZodRawShape } from "zod";

export interface IUpsertForm<
  schema extends ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>,
> {
  defaultValues?: input<schema>;
  formType: "create" | "update";
  onSubmit: SubmitHandler<output<schema>>;
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

export interface IFormFieldMappableDefaults<TFieldValues extends FieldValues>
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
  extends IFormFieldMappableDefaults<TFieldValues> {
  scrollArea?: boolean;
}

export interface IFormFieldCombobox<TFieldValues extends FieldValues>
  extends IFormFieldMappableDefaults<TFieldValues> {
  noResultsText: string;
  searchText: string;
}

export interface IFormFieldInputImage<
  TFieldValues extends FieldValues = FieldValues,
> extends IFormFieldDefaults<TFieldValues> {
  circularCrop?: boolean;
  freeCrop?: boolean;
  imageFieldName?: Path<TFieldValues>;
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
