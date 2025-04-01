import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { UpsertDialog } from "~/components/dialogs/upsert-dialog";
import { Button } from "~/components/ui/button";
import { useCreateCourseAsAuthed } from "~/hooks/mutations/useMutateCourse";
import UpsertCourseForm from "./upsert-courses-form";

interface CoursesTableToolbarProps<TData> {
  table: Table<TData>;
}

export const CoursesTableToolbar = <TData,>({
  table: table,
}: CoursesTableToolbarProps<TData>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createNewCourse, isLoading: creatingNewCourse } =
    useCreateCourseAsAuthed({
      onSuccess: () => setIsOpen(false),
    });

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2"></div>
        <div className="flex justify-end">
          <UpsertDialog
            form={
              <UpsertCourseForm
                key={"new"}
                formType="create"
                onSubmit={(values) => createNewCourse(values)}
              />
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Skapa ny kurs"
            trigger={
              <Button
                className="ml-2 h-8 px-2 lg:px-3"
                disabled={creatingNewCourse}
                size="lg"
                type="button"
                variant="outline"
              >
                Skapa ny kurs
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
