import type { MouseEventHandler, PropsWithChildren } from "react";
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { ScrollArea } from "~/components/ui/scroll-area";

const FormWrapper = <TData extends FieldValues>({
  form,
  onValid,
  onInvalid,
  children,
  resetForm,
  formType,
}: PropsWithChildren<{
  form: UseFormReturn<TData>;
  formType: "create" | "update";
  onInvalid?: SubmitErrorHandler<TData>;
  onValid: SubmitHandler<TData>;
  resetForm: MouseEventHandler<HTMLButtonElement>;
}>): React.JSX.Element => {
  return (
    <Form {...form}>
      <form
        className="space-y-8"
        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        onSubmit={form.handleSubmit(onValid, onInvalid)}
      >
        <ScrollArea className="h-96 ">
          <div className="space-y-4 p-1">{children}</div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={resetForm} type="button" variant={"outline"}>
            Återställ
          </Button>
          <Button type="submit" variant={"default"}>
            {formType === "create" ? "Skapa" : "Uppdatera"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default FormWrapper;
