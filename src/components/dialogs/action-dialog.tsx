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
import { cn } from "~/utils/utils";

type ActionDialogProps = {
  classNameButton?: string;
  description?: string;
  disabled?: boolean;
  onSubmit: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  title?: string;
  trigger: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

const ActionDialog: FC<ActionDialogProps> = ({
  trigger,
  description = "Denna ändringen går inte att ångra!",
  title = "Är du säker?",
  onSubmit,
  primaryButtonText = "Radera",
  secondaryButtonText = "Avbryt",
  disabled,
  variant = "destructive",
  classNameButton = "",
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
            <Button
              className={cn(classNameButton)}
              onClick={() => onSubmit()}
              variant={variant}
            >
              {primaryButtonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
