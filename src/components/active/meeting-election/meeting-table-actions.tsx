import { type FC } from "react";
import toast from "react-hot-toast";

import Link from "next/link";
import { MdArrowOutward, MdDelete } from "react-icons/md";
import DeleteDialog from "~/components/dialogs/delete-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import type { MeetingElectionType } from "./meeting-election-columns";
export const MeetingElectionTableActions: FC<MeetingElectionType> = ({
  id,
}) => {
  const ctx = api.useUtils();

  const { mutate: deleteMeetingElection } =
    api.meetingElection.deleteOne.useMutation({
      onMutate: () => toast.loading("Raderar omröstning..."),
      onSettled: (_c, _d, _e, toastId) => {
        toast.remove(toastId);
        void ctx.meetingElection.invalidate();
      },
      onSuccess: () => toast.success("Omröstningen har raderats!"),
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  return (
    <div className="flex justify-end">
      <Button className="h-6" size={"sm"} variant="outline" asChild>
        <Link href={`/meeting-election/${id}`} target="_blank">
          <MdArrowOutward className="mx-1" size={15}>
            Gå till omröstning
          </MdArrowOutward>
        </Link>
      </Button>
      <DeleteDialog
        onSubmit={() => deleteMeetingElection({ id })}
        trigger={
          <Button className="h-6" size={"sm"} variant="outline">
            <MdDelete className="mx-1" color="red" size={15}>
              Radera
            </MdDelete>
          </Button>
        }
      ></DeleteDialog>
    </div>
  );
};
