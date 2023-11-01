import type { FC, PropsWithChildren } from "react";
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

interface IDeleteDialog {
  description?: string;
  onSubmit: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  title?: string;
}

const DeleteDialog: FC<PropsWithChildren<IDeleteDialog>> = ({
  children: trigger,
  description = "Denna ändringen går inte att ångra!",
  title = "Är du säker?",
  onSubmit,
  primaryButtonText = "Radera",
  secondaryButtonText = "Avbryt",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
