import type { z } from "zod";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export interface IUpsertForm<schema extends z.ZodObject<z.ZodRawShape>> {
  defaultValues: DeepPartial<z.infer<schema>>;
  formType: "create" | "update";
  onSubmit: (props: z.infer<schema>) => void;
}
