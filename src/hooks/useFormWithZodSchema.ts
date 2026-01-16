/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { zodResolver } from "@hookform/resolvers/zod";
import type { DefaultValues, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export const useFormWithZodSchema = <TSchema extends z.Schema>({
  schema,
  defaultValues,
}: {
  defaultValues?: DefaultValues<z.input<TSchema>>;
  schema: TSchema;
}): UseFormReturn<z.input<TSchema>> =>
  useForm<z.input<TSchema>>({
    resolver: async (data, context, options) => {
      return zodResolver(schema)(data, context, options);
    },
    defaultValues: defaultValues,
  });
