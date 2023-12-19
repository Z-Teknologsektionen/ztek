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
  title: string;
  trigger: ReactNode;
}

export const UpsertProgramBoardMemberDialog: FC<
  ICreateNewProgramBoardMemberWizard
> = ({ form, trigger, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};
