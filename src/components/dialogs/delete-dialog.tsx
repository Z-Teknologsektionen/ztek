import type { FC, ReactNode } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type DeleteDialogProps = {
  description?: string;
  disabled?: boolean;
  onSubmit: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  title?: string;
  trigger: ReactNode;
};

const DeleteDialog: FC<DeleteDialogProps> = ({
  trigger,
  description = "Denna ändringen går inte att ångra!",
  title = "Är du säker?",
  onSubmit,
  primaryButtonText = "Radera",
  secondaryButtonText = "Avbryt",
  disabled,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="group" disabled={disabled}>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>{secondaryButtonText}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => onSubmit()} variant={"destructive"}>
              {primaryButtonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
