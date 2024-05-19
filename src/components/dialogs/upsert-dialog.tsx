import type { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type UpsertDialogProps = {
  description?: string;
  disabled?: boolean;
  form: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  trigger: ReactNode;
};

export const UpsertDialog: FC<UpsertDialogProps> = ({
  form,
  trigger,
  title,
  description = "",
  isOpen,
  setIsOpen,
  disabled,
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className={"group"} disabled={disabled}>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};
