import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { type ReactElement, useState } from "react";
import toast from "react-hot-toast";
import { UpsertZenithMediaForm } from "~/components/active/zenith-media/upsert-zenith-media-form";
import { DataTableFacetedFilter } from "~/components/data-table/data-table-faceted-filter";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MIN_MEDIA_ORDER_NUMBER } from "~/constants/zenith-media";
import { useCreateZenithMediaAsAuthed } from "~/hooks/mutations/useMutateZenithMedia";
import {
  getVisibilityStateName,
  visibilityStates,
} from "~/utils/get-visibility-state";
import { handleCreateZenithMediaFile } from "~/utils/sftp/handle-create-sftp-file";
import { imageOperations } from "~/utils/sftp/handle-image-forms";
import { slugifyString } from "~/utils/string-utils";

interface MemberTableToolbarProps<TData> {
  table: Table<TData>;
}

export const ZenithMediaTableToolbar = <TData,>({
  table,
}: MemberTableToolbarProps<TData>): ReactElement => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewZenithMedia, isPending: creatingNewZenithMedia } =
    useCreateZenithMediaAsAuthed({
      onSuccess: () => setIsOpen(false),
    });

  const titleColumn = table.getColumn("Titel");

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            onChange={(event) =>
              titleColumn?.setFilterValue(event.target.value)
            }
            placeholder="Filtrera på titel..."
          />
          <DataTableFacetedFilter
            column={table.getColumn("Visas")}
            options={visibilityStates.map((state) => ({
              value: state,
              label: getVisibilityStateName(state),
            }))}
            title="Filtrera på synlighet"
          />

          {isFiltered && (
            <Button
              className="h-8 px-2 lg:px-3"
              onClick={() => table.resetColumnFilters()}
              variant="outline"
            >
              Återställ
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertZenithMediaForm
                key="new"
                formType="create"
                onSubmit={async ({
                  coverImage,
                  coverImageFile,
                  media: { file: fileInput, url },
                  title,
                  year,
                  order,
                  startDateTime,
                  endDateTime,
                }) => {
                  const loadingToastId = toast.loading(
                    "Laddar upp media. Detta kan ta en stund!",
                  );

                  const imageResult = await imageOperations.processImageChanges(
                    {
                      newImageFile: coverImageFile,
                      currentImageUrl: coverImage,
                      oldImageUrl: "",
                      entityName: slugifyString(title + "cover"),
                    },
                  );
                  if (!imageResult.success) {
                    return;
                  }

                  try {
                    if (fileInput)
                      url = await handleCreateZenithMediaFile({
                        file: fileInput,
                        title,
                        order: order || MIN_MEDIA_ORDER_NUMBER,
                        year,
                      });

                    if (!url)
                      return toast.error(
                        "Något gick fel vid hantering av ny mediet. Försök igen senare eller kontakta webbgruppen",
                      );

                    toast.success("Mediet uppladdad!");

                    return createNewZenithMedia({
                      url,
                      coverImage: imageResult.data || "",
                      title,
                      year,
                      order,
                      startDateTime,
                      endDateTime,
                    });
                  } catch (error) {
                    if (error instanceof Error) {
                      return toast.error(error.message);
                    }

                    toast.error(
                      "Något gick fel. Försök igen senare eller kontakta webbgruppen",
                    );
                  } finally {
                    toast.dismiss(loadingToastId);
                  }
                }}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Skapa ny media"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewZenithMedia}
                size="lg"
                type="button"
                variant="outline"
              >
                Ny media
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
