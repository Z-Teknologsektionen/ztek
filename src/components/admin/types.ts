import type { z } from "zod";

export interface IUpsertForm<schema extends z.ZodObject<z.ZodRawShape>> {
  defaultValues: z.infer<schema>;
  formType: "create" | "update";
  onSubmit: (props: z.infer<schema>) => void;
}
