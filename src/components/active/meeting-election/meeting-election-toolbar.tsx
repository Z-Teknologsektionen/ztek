"use client";

import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import UpsertMeetingElectionForm from "./upsert-meeting-election-form";

interface MeetingElectionTableToolbarProps<TData> {
  table: Table<TData>;
}

export const MeetingElectionTableToolbar = <TData,>({
  table: _table,
}: MeetingElectionTableToolbarProps<TData>): JSX.Element => {
  const ctx = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewMeeting, isLoading: creatingNewMeeting } =
    api.meetingElection.createOne.useMutation({
      onMutate: () => toast.loading("Skapar ny omröstning..."),
      onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
      onSuccess: () => {
        toast.success(`En ny omröstning har skapats!`);
        void ctx.meetingElection.invalidate();
      },
      onError: (error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Något gick fel. Försök igen senare");
        }
      },
    });

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* Add filters here */}
        </div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertMeetingElectionForm
                key={"new"}
                formType="create"
                onSubmit={(values) => createNewMeeting(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Skapa ny medlem"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewMeeting}
                size="lg"
                type="button"
                variant="outline"
              >
                Skapa ny omröstning
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
