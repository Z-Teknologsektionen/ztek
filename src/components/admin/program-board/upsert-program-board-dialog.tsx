import { useState, type FC, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface ICreateNewProgramBoardMemberWizard {
  form: ReactNode;
  trigger: ReactNode;
  type: "create" | "update";
}

export const UpsertProgramBoardMemberDialog: FC<
  ICreateNewProgramBoardMemberWizard
> = ({ form, trigger, type }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Skapa" : "Uppdatera"} programmedlem
          </DialogTitle>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};
