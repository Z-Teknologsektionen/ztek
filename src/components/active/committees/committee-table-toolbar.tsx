import { CommitteeType } from "@prisma/client";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import UpsertCommitteeForm from "~/components/active/committees/upsert-committee-form";
import { DataTableFacetedFilter } from "~/components/data-table/data-table-faceted-filter";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { useCreateCommitteeAsAuthed } from "~/hooks/mutations/useMutateCommittee";
import { getCommitteeTypeStringFromEnum } from "~/utils/get-committee-type-string-from-enum";
import { imageOperations } from "~/utils/sftp/handle-image-forms";

interface CommitteeTableToolbarProps<TData> {
  table: Table<TData>;
}

export const CommitteeTableToolbar = <TData,>({
  table: table,
}: CommitteeTableToolbarProps<TData>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewCommittee, isLoading: creatingNewCommittee } =
    useCreateCommitteeAsAuthed({
      onSuccess: () => setIsOpen(false),
    });

  const committeeTypeColumn = table.getColumn("Typ");
  const committeeElectionPeriodColumn = table.getColumn("Har inval i LP");

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <DataTableFacetedFilter
            column={committeeTypeColumn}
            options={Object.values(CommitteeType).map((type) => ({
              value: type,
              label: getCommitteeTypeStringFromEnum(type, false),
            }))}
            title="Filtrera på typ"
          />
          <DataTableFacetedFilter
            column={committeeElectionPeriodColumn}
            options={[1, 2, 3, 4].map((value) => ({
              value: value,
              label: value.toString(),
            }))}
            title="Filtrera på inval"
          />
        </div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertCommitteeForm
                key={"new"}
                formType="create"
                onSubmit={async ({ name, image, slug, imageFile, ...rest }) => {
                  const imageResult = await imageOperations.processImageChanges(
                    {
                      newImageFile: imageFile,
                      currentImageUrl: image,
                      oldImageUrl: "",
                      entityName: slug,
                    },
                  );

                  if (!imageResult.success) {
                    return;
                  }
                  createNewCommittee({
                    name,
                    slug,
                    image: imageResult.data || "",
                    ...rest,
                  });
                }}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Skapa nytt organ"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewCommittee}
                size="lg"
                type="button"
                variant="outline"
              >
                Skapa nytt organ
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
