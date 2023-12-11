import type { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface ICreateNewOrganWizard {
  form: ReactNode;
  trigger: ReactNode;
}

export const UpsertOrganDialog: FC<ICreateNewOrganWizard> = ({
  form,
  trigger,
}) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Skapa nytt organ</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa,
            voluptatum?
          </DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};
